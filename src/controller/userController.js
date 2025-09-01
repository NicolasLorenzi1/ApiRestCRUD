const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../model/userModel");
const { SECRET } = require("../middleware/auth");

class UserController {
  static async register(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "Username e senha obrigatórios" });
      }

      const exists = await UserModel.findByUsername(username);
      if (exists) {
        return res.status(400).json({ message: "Usuário já existe" });
      }

      const user = await UserModel.create({ username, password });
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findByUsername(username);

      if (!user) {
        return res.status(401).json({ message: "Usuário não encontrado" });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ message: "Senha incorreta" });
      }

      const token = jwt.sign({ username: user.username, id: user.id }, SECRET, {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = UserController;
