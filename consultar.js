const express = require("express");
const cors = require("cors");
const axios = require("axios");
//const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.text()); // Permite body em formato text/plain

const apiUrl = "https://api.jae.com.br/vt-gateway/cadastro/consulta"; // URL da API externa
//const PUBLIC_KEY_PATH = "./public_key.pem"; // Caminho para a chave pública

// Rota POST para consulta
app.post("/vt-gateway/cadastro/consulta", async (req, res) => {
  console.log("Dados recebidos do frontend:", req.body); // Exibe os dados enviados pelo frontend

  // Pega o header Authorization
  const authHeader = req.headers["authorization"];
  let authToken = authHeader;

  // Verifica se o JWT está presente no header
  console.log("Token do backend:", authToken); // Depuração
  if (!authToken) {
    return res.status(400).json({ error: "Requisição inválida. JWT ausente." });
  }

  try {
    // Aqui, o token não é  necessário,
    

    // Reencaminha a requisição para a API externa com os dados do frontend
    const response = await axios.post(apiUrl, req.body, {
      headers: {
        "Content-Type": "text/plain", 
        Authorization: authToken, 
      },
    });

    // Retorna a resposta da API externa para o frontend
    console.log("🔍 Resposta bruta da API externa:", JSON.stringify(response.data, null, 2));
    res.json(response.data);
  } catch (error) {
    console.error("Erro na requisição à API externa:", error.message);
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: "Erro interno no servidor." });
    }
  }
});

// Inicia o servidor na porta 3001
app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
