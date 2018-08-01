var args = process.argv.slice(2);

var admin = require("firebase-admin");

var serviceAccount = require("./key.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ta-tracking.firebaseio.com"
});
let db = admin.database()
let ref = db.ref('/downloads')
// Create a new post reference with an auto-generated id
var newPostRef = ref.push();
newPostRef.set({
    ta: args[0],
    student: args[1],
    timestamp: admin.database.ServerValue.TIMESTAMP

}).then(() => {
    console.log("done logging")
    process.exit()
})

