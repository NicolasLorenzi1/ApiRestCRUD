const db = require("../config/firebase");
const collection = db.collection("alunos"); 

class AlunoModel {
  static async create(data) {
    const docRef = await collection.add(data); 
    return { id: docRef.id, ...data };
  }

  static async findAll() {
    const snapshot = await collection.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  static async findById(id) {
    const doc = await collection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  static async update(id, data) {
    await collection.doc(id).update(data);
    return { id, ...data };
  }

  static async delete(id) {
    await collection.doc(id).delete();
    return { message: "Aluno deletado com sucesso" };
  }
}

module.exports = AlunoModel;
