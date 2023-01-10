const cors = require('cors');
const bodyParser = require('body-parser');

const { v4: uuidv4 } = require('uuid');

const express = require('express');
const app = express();
app.use(express.json())
// app.use(express.json());
// app.use(bodyParser.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
 const {username} = request.headers

  const user = users.find((resp) => resp.username === username)

  if(!user){
    return response.status(400).json({message:  'Usuário já cadastrado!' })
  }

  request.user = user
  return next()
}

app.post('/users', (request, response) => {
  const {name, username} = request.body;

  users.push({
    id: uuidv4(),
    name,
    username,
    todo: []
  })

  const userExists = users.some((users) => users.username === username);

  if(!userExists){
    return response.status(400).json({message: 'Account already exists'});
  }

  return response.status(200).send()

});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;

  const todos = user.todo;

  return response.status(200).json({ todos: todos }).send();
});

app.post('/todoCreated', checksExistsUserAccount, (request, response) => {
  
  const { user } = request;
  const { title , deadline} = request.body
  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    createdAt: new Date(),
  }

  user.todo.push(todo)
  return response.status(200).json({ message: "Tarefa Cadastrada com sucesso!"}).send();
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;