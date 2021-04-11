const admin = require('firebase-admin');

const env = process.env.ENV;

let serviceAccount;
const remoteEnvs = ['dev'];

try {
  serviceAccount = remoteEnvs.includes(env)
    ? null
    : require('../../codec-idired-config.json')
} catch (e) {
  console.log(e);
}

let app;
let firestoreRef;

try {
  app = admin.initializeApp({
    credential: remoteEnvs.includes(env)
      ? admin.credential.applicationDefault()
      : serviceAccount
        ? admin.credential.cert(serviceAccount)
        : null,
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
