const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const alunoRoutes = require("./routes/alunoRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/alunos", alunoRoutes);

app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);
