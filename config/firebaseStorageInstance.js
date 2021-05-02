var admin = require("firebase-admin");

var serviceAccount = require("./work-hub-b455f-firebase-adminsdk-gjgaz-35222dba37.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "work-hub-b455f.appspot.com"
});

var bucket = admin.storage().bucket();
global.FirebaseBucket = bucket;