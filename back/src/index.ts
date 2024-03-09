// app.ts

import express from 'express';
import router from './routes/routes';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
import * as path from 'path';
import cors from 'cors';

// Carrega o arquivo YAML do Swagger como um objeto JavaScript
const swaggerDocument = YAML.load(path.join(__dirname, 'config/swagger/swagger.yml'))

// Use o objeto swaggerDocument conforme necessário

const app = express();

// Configurar o body-parser para analisar solicitações do tipo JSON
app.use(bodyParser.json());

app.use(cors())

// Configurar o body-parser para analisar solicitações do tipo URL encoded
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Configuração das rotas
app.use(router);

// Outras configurações e rotas da aplicação...

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Gerenciamento de Clientes');
});

// Inicia o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
