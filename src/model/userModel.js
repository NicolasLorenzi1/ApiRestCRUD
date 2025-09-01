const db = require("../config/firebase");
const bcrypt = require("bcrypt");

const collection = db.collection("users");

class UserModel {
  static async create({ username, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const docRef = await collection.add({ username, password: hashedPassword });
    return { id: docRef.id, username };
  }

  static async findByUsername(username) {
    const snapshot = await collection.where("username", "==", username).get();
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }
}

module.exports = UserModel;
