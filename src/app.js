const express = require("express");
const cors = require("cors");
const uuid = require("uuid");

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  const { title } = request.query;

  const results = title
    ? repositories.filter(repository => repository.title.includes(title))
    : repositories;

  return response.json(results);

});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  data = {
    id: uuid.v4(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(data);

  return response.json(data);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found'})
  }

  data = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes,
  }

  repositories[repositoryIndex] = data

  return response.json(data);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex( repository => repository.id === id)
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found'})
  }
  
  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)
  if (repositoryIndex < 0) {
    return response.status(400).json({error: 'Repositoy not found'})
  }

  repositories[repositoryIndex].likes += 1;

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
