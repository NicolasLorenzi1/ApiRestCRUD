const AlunoModel = require("../model/alunoModel");

class AlunoController {
  static async create(req, res) {
    try {
      const aluno = await AlunoModel.create(req.body);
      res.status(201).json(aluno);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAll(req, res) {
    try {
      const alunos = await AlunoModel.findAll();
      res.json(alunos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getOne(req, res) {
    try {
      const aluno = await AlunoModel.findById(req.params.id);
      if (!aluno) return res.status(404).json({ message: "Aluno não encontrado" });
      res.json(aluno);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const aluno = await AlunoModel.update(req.params.id, req.body);
      res.json(aluno);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const msg = await AlunoModel.delete(req.params.id);
      res.json(msg);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = AlunoController;
