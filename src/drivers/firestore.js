const admin = require('firebase-admin');

let app;
let firestoreRef;
try {
  app = admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });
  firestoreRef = admin.firestore();
} catch (e) {
  console.error(e);
}

module.exports = {
  app,
  firestoreRef,
  admin,
};
