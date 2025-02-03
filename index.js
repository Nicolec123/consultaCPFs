const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Importa o middleware CORS
const app = express();

// Permite requisições CORS ( Nunca tire isso, seus boletos contam com ele!)
app.use(cors());

// Middleware para interpretar JSON
app.use(express.json());

app.post('/api/autenticacao', async (req, res) => {
    console.log('Requisição recebida no proxy:', req.body); // Depuração
    try {
        const response = await axios({
            method: 'POST',
            url: 'https://api.jae.com.br/autenticacao',
            headers: {
                'Content-Type': 'application/json',
            },
            
            data: req.body,
        });    


        
        console.log('Resposta da API do joao:', response.data); // Depuração 
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Erro ao redirecionar a requisição:', error.message);
        res.status(error.response?.status || 500).json({
            error: error.message,
        });
    }
});


app.listen(3000, () => {
    console.log('Servidor proxy rodando na porta 3000');
});





