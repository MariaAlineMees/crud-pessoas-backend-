//importar dependencia/pacote do express
const express = require('express')

const cors = require('cors');
//objeto, criar uma instância do express
//e atribuir a uma variável chamada app
//(manipular rotas e o servidor)
const app = express();

app.use(cors());

//habilitar receber objeto json nas requisicoes
app.use(express.json());


const pessoa = require('./pessoa');


//vetor para armazenar os dados

//referenciar o arquivo rotas
// const pessoa = require('./rotas/pessoa');

//adicionar rotas na aplicacao
app.use('/pessoas', pessoa);



//servidor vai escutar na porta definida
app.listen(3000);
