const functions = require("firebase-functions");
const admin = require('firebase-admin');
const R = require('ramda');
const cors = require('cors')({ origin: true });
admin.initializeApp();
const db = admin.firestore();

/**
 * This function update a document given a callback that
 * use the information written in this document.
 * @param {DocumentReference} docPath Document Reference 
 * @param {Function} lambda Function that update an document
 * @returns Promise of a Firebase Transaction
 */
async function updatePlayerStatus(docPath, lambda) {
    const document = await db.doc(docPath)
    return db.runTransaction((t) => {
        return t.get(document).then((sfDoc) => {
            t.set(document, lambda(sfDoc.data()), { merge: true });
        })
    });
}

/**
 * Parse and obtain the token given in the authorization header
 * @param {express.request} request 
 * @returns admin.auth.DecodedIdToken
 */
async function getTokenFromHeader(request) {
    const token = request.headers.authorization.replace('Bearer ', '');
    if (!token) { throw 401 }
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken) { throw 404 }
    return decodedToken;
}

/**
 * The answer of the question: Is this player lose in this game?
 * @param {DocumentReference} payload a /game document
 * @param {DocumentReference.key | String} playerId The uid of a user
 * @returns boolean 
 */
function __isPlayerDefeated(payload, playerId) {
    const opponent = R.find(player => !R.equals(playerId, player))(payload.players);
    const opponentShots = payload.shots[opponent] || [];
    const plainShips = R.flatten(payload[playerId].map(R.prop('body'))) || [];
    return R.isEmpty(R.difference(plainShips, opponentShots));
}

const isPlayerDefeated = R.curry(__isPlayerDefeated);

/**
 * Functions that answer the question: Is this game, game over?
 * @param {DocumentData} payload The information of a game
 * @returns boolean
 */
function isGameFinished(payload) {
    const p1 = payload.p1;
    const p2 = payload.p2;
    return R.any(isPlayerDefeated(payload), [p1, p2])
}

exports.createPlayerInfo = functions.auth.user().onCreate((user) => {
    return db.collection('users').doc(user.uid).create({
        wins: 0,
        defeats: 0,
        ties: 0,
        activeGames: 0,
        activeGamesRefs: [],
        archivedGames: [],
    });
});

exports.gameStateHandler = functions.firestore.document('games/{gameId}')
    .onUpdate((change, ctx) => {
        const newData = change.after.data();
        const oldData = change.before.data();
        const { state, players, p1, p2 } = newData;

        switch (state) {
            case 'WAITING_FOR_SHIPS':
                const ships = players.map(x => newData[x]).filter(x => x);
                if (ships.length == 2) {
                    return change.after.ref.set({
                        state: 'PLAYER_1_TURN'
                    }, { merge: true })
                }
                break;
            case 'PLAYER_1_TURN':
            case 'PLAYER_2_TURN':
                const beforeShots = oldData.shots;
                const afterShots = newData.shots;

                if (afterShots[p1].length == afterShots[p2].length && isGameFinished(newData)) {
                    return change.after.ref.set({
                        state: 'GAME_FINISHED',
                    }, { merge: true });
                }

                if (R.equals(beforeShots, afterShots)) {
                    return null;
                }

                return change.after.ref.set({
                    state: state == 'PLAYER_1_TURN' ? 'PLAYER_2_TURN' : 'PLAYER_1_TURN',
                }, { merge: true });
            case 'GAME_FINISHED':
                isPlayer1Defeated = isPlayerDefeated(newData)(newData.p1);
                isPlayer2Defeated = isPlayerDefeated(newData)(newData.p2);
                isTie = isPlayer1Defeated && isPlayer2Defeated;

                p1GameStatus = updatePlayerStatus('/users/' + newData.p1, (gameStatusData) => {
                    const { defeats, ties, wins, archivedGames, activeGamesRefs, activeGames } = gameStatusData;
                    return {
                        'activeGames': activeGames - 1,
                        'defeats': isPlayer1Defeated && !isTie ? defeats + 1 : defeats,
                        'ties': isTie ? ties + 1 : ties,
                        'wins': isPlayer2Defeated && !isTie ? wins + 1 : wins,
                        'archivedGames': R.append(change.after.ref, archivedGames),
                        'activeGamesRefs': R.without([(change.after.ref + '') .replace('/games/','')], activeGamesRefs)
                    }
                });

                p2GameStatus = updatePlayerStatus('/users/' + newData.p2, (gameStatusData) => {
                    const { defeats, ties, wins, archivedGames, activeGamesRefs, activeGames } = gameStatusData;
                    return {
                        'activeGames': activeGames - 1,
                        'defeats': isPlayer2Defeated && !isTie ? defeats + 1 : defeats,
                        'ties': isTie ? ties + 1 : ties,
                        'wins': isPlayer1Defeated && !isTie ? wins + 1 : wins,
                        'archivedGames': R.append(change.after.ref, archivedGames),
                        'activeGamesRefs': R.without([(change.after.ref + '').replace('/games/','')], activeGamesRefs),
                    }
                });

                return Promise.all([p1GameStatus, p2GameStatus])
                    .then(results => change.after.ref.set({
                        state: 'ARCHIVED_GAME'
                    }
                        , { merge: true }));
            default:
                return null;
        }
    });

exports.createGame = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const { uid } = await getTokenFromHeader(req);
            const userDocRef = await db.collection('users').doc(uid).get();
            const userData = userDocRef.data();
            const gameDoc = await db.collection('games').add({
                state: 'WAITING_FOR_PLAYER_2',
                p1: uid,
                players: [uid],
                shots: {
                    [uid]: [],
                }
            });
            await userDocRef.ref.set({
                activeGames: userData.activeGames + 1,
                activeGamesRefs: [...userData.activeGamesRefs, gameDoc.id],
            }, { merge: true });
            res.json({ data: { game_id: gameDoc.id } });
        } catch (error) {
            res.status(error).send({ data: error });
        }
    })
});

exports.joinGame = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const { uid } = await getTokenFromHeader(req);
            const { gameid } = req.body.data;
            if (!gameid) { throw 404; }
            const userDoc = await db.collection('users').doc(uid).get();
            const gameDoc = await db.collection('games').doc(gameid).get();
            const userData = userDoc.data();
            const gameData = gameDoc.data();
            const players = [...gameData.players, uid];
            gameDoc.ref.set({
                state: 'WAITING_FOR_SHIPS',
                p2: uid,
                players,
                shots: {
                    ...gameDoc.data().shots,
                    [uid]: [],
                }
            }, { merge: true });
            userDoc.ref.set({
                activeGames: userData.activeGames + 1,
                activeGamesRefs: [...userData.activeGamesRefs, gameDoc.id]
            }, { merge: true })
            res.json({ data: { status: 'ok' } });
        } catch (error) {
            res.status(error).send({ data: error });
        }
    });
});
