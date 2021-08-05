const functions = require("firebase-functions");
const admin = require('firebase-admin');
const { user } = require("firebase-functions/lib/providers/auth");
const cors = require('cors')({ origin: true });
admin.initializeApp();
const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

async function getTokenFromHeader(request) {
    const token = request.headers.authorization.replace('Bearer ', '');
    if(!token) { throw 401 }
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken) { throw 404 }
    return decodedToken;
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

exports.createGame = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const { uid } = await getTokenFromHeader(req); 
            const userDocRef = await db.collection('users').doc(uid).get();
            const userData = userDocRef.data();
            console.log({userData})
            const gameDoc = await db.collection('games').add({
                state: 'WAITING_FOR_PLAYER_2',
                p1: uid,
                players: [ uid ]
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
            const { game_id } = req.body.data;
            if (!game_id) { throw 404; }
            const userDoc = await db.collection('users').doc(uid).get();
            const gameDoc = await db.collection('games').doc(game_id).get();
            const userData = userDoc.data();
            const gameData = gameDoc.data();
            const players =  [...gameData.players, uid];
            gameDoc.ref.set({
                state: 'WAITING_FOR_SHIPS',
                p2: uid,
                players
            }, {merge: true});
            await Promise.all(players.map(async (player) => {
                await gameDoc.ref.collection('shots').doc(player).create({});
                await gameDoc.ref.collection('ships').doc(player).create({});
            }));
            userDoc.ref.set({
                activeGames: userData.activeGames + 1,
                activeGamesRefs: [...userData.activeGamesRefs, gameDoc.id ]
            }, { merge : true })
            res.json({data: { status: 'ok' }});
        } catch (error) {
            res.status(error).send({ data: error });
        }
    });
});
