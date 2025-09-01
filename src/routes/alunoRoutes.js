const express = require("express");
const router = express.Router();
const AlunoController = require("../controller/alunoController");

router.post("/criar", AlunoController.create);
router.get("/listar", AlunoController.getAll);
router.get("/:id", AlunoController.getOne);
router.put("/:id", AlunoController.update);
router.delete("/:id", AlunoController.delete);

module.exports = router;
