//importar o express
const express = require('express')
//criando um roteador para as rotas
//isso permite organizar melhor as rotas
const router = express.Router()

let vetor = [
    {id:1, nome:'Mariana', idade: 25},
    {id:2, nome:'Bob', idade: 28},
    {id:3, nome:'Charlie', idade: 22}
];

//id da pessoa
let id = 4;

//definir a porta que o servidor vai escutar
//pode ser qualquer número, mas é comum usar 3000
//const port = 3000

//definir uma rota para a raiz do servidor
//quando alguém acessar a raiz do servidor, vai responder com "Hello World!"
router.get('/', (req, res) => {
  res.status(200).json(vetor);
});

//rota para efetuar uma requisicao POST
router.post('/', (req, res) => {
  //obter o nome e idade do corpo da requisicao
    //const nome = req.body.nome;
    //const idade = req.body.idade;
    //res.json({nome})
    const { nome, idade } = req.body;
  //criar um novo objeto com os dados recebidos
    // res.json({nome, idade});
  //adicionar o novo objeto ao vetor
  //validade se o nome e idade foram informados
  if (!nome || !idade) {
    return res.status(400).json({ error: 'Nome e idade são obrigatórios.' });
  }

  //criar objeto do tipo pessoa
  const obj = {id, nome, idade};
  //adicionar o objeto ao vetor
  vetor.push(obj);
  //incrementar o id para o próximo objeto
id++;
  //responder com o objeto criado
  //retorno
  res.status(201).json(obj);
  

});

//rota para efetuar uma requisicao PUT
router.put('/:idPessoa', (req, res) => {
  //extrair o id da pessoa da rota
  const idPessoa = parseInt(req.params.idPessoa);

  //procurar a pessoa no vetor pelo id
  const pessoa = vetor.findIndex(p => p.id === idPessoa);
  if (pessoa === -1) {
    return res.status(404).json({ error: 'Pessoa não encontrada.' });
  }

const { nome, idade } = req.body;
  //validar se o nome e idade foram informados
if (!nome || !idade) {
    return res.status(400).json({ error: 'Nome e idade são obrigatórios.' });
  }

  //criar objeto atualizado
  const obj = { id: idPessoa, 'nome': nome, 'idade': idade };
  //-1 porque o findIndex retorna -1 se não encontrar
  //obter os dados do corpo da requisicao
  
  //alterar dados no vetor
  vetor[pessoa] = obj;
  
  
  res.status(200).json({obj});
  //procurar a pessoa no vetor pelo id
});

//rota para efetuar uma requisicao DELETE
router.delete('/:idPessoa', (req, res) => {
  //extrair o id da pessoa da rota
  const idPessoa = parseInt(req.params.idPessoa);
  //procurar a pessoa no vetor pelo id
  const pessoaIndex = vetor.findIndex(p => p.id === idPessoa);
  if (pessoaIndex === -1) {
    return res.status(404).json({ error: 'Pessoa não encontrada.' });
  }
  //remover a pessoa do vetor
  vetor.splice(pessoaIndex, 1);
  //responder com sucesso

  res.status(200).json({mensagem: 'Pessoa removida com sucesso'}); // No content response
  //res.status(200).json({message: 'Pessoa removida com sucesso.'});
});

//exportar o roteador para ser usado no index.js
module.exports = router