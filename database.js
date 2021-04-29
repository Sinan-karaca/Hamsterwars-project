const admin = require('firebase-admin')


let serviceAccount;
if( process.env.PRIVATE_KEY ) {
	// På Heroku
	serviceAccount = process.env.PRIVATE_KEY
} else {
	// Lokalt (på min dator)
	serviceAccount = require('./secret.json');
}

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});


function getDatabase() {
	return admin.firestore()
}

module.exports = getDatabase