const functions = require("firebase-functions");
const admin = require('firebase-admin');
const { user } = require("firebase-functions/lib/providers/auth");
const cors = require('cors')({ origin: true });
admin.initializeApp();
const db = admin.firestore();
const R = require('ramda');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        functions.logger.info("Hello logs!", { structuredData: true })
        response.send("Hello from Firebase!")
    })
});

exports.createPlayerInfo = functions.auth.user().onCreate((user) => {
    return db.collection('user').doc(user.uid).create({
        wins: 0,
        defeats: 0,
        ties: 0,
        activeGames: 0,
        activeGamesRef: [],
        archivedGames: [],
    });
});

exports.joinToGame = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        try {
            const token = request.headers.authorization.replace('Bearer ', '');
            const { game_id } = request.body.data;
            const { uid } = await admin.auth().verifyIdToken(token);
            const userDocRef = db.collection('user').doc(uid);
            const userDocData = (await userDocRef.get()).data();
            const { activeGames, activeGamesRef  } = userDocData;

            if( activeGames > 5 ) { throw 406; }

            const gameRef = await (
                game_id ? Promise.resolve(db.collection('games').doc(game_id))
                    : db.collection('games').add({})
            );
            const gameData = (await gameRef.get()).data();
            userDocRef.update({
                activeGames : activeGames + 1,
                activeGamesRef: [...activeGamesRef, gameRef]
            });
            gameRef.update({
                state: 'WAITING_FOR_PLAYERS',
                players: [...(gameData.players || []), uid]
            })
            response.json({data: {game_id: gameRef.id }});
        } catch (error) {
            const message = ({
                406: {
                    status: 'NOT_ACCEPTABLE',
                    message: 'User cannot have more than 5 active games'
                }
            })[error]
            response.status(error).send({data: message});
        }
    })
})