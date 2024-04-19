import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import express from 'express';
import cors from 'cors';
import { open, readFile, writeFile } from 'node:fs/promises';


// Récuperation de l'url
const dir = dirname(fileURLToPath(import.meta.url))
const fileName = join(dir, '/database/db_todos.json')
console.log(fileName)

async function getFromDatabase() {
  const todoList = await readFile(fileName, { encoding: 'utf8' })
  return JSON.parse(todoList)
}



// Promesse lire sauvegarde


// const contentAllFile = await Promise.all([readFile(fileName, { encoding: 'utf8' }), readFile(fileName2, { encoding: 'utf8' })])

// Promesse ecraser sauvegarde

const nouvelletodoList =
[
  {id:1,content:'Ma première tâche',isCompleted:true},
  {id:1,content:'Ma première tâche',isCompleted:true},
  {id:1,content:'Ma première tâche',isCompleted:true},
]

const nouvelletodoListS = JSON.stringify(nouvelletodoList)

// const openFile = await open(, 'w');
// // le 'r' sert a lire, 'a' sert a ajouter et le 'w' sert à ecraser
const ecraserSauvegarde = await writeFile(fileName, nouvelletodoListS, { encoding: 'utf8' })
// openFile.write(nouvelletodoList)
// openFile.close()

// const readOpenFile = await readFile(openFile, { encoding: 'utf8' })
// console.log(readOpenFile)


// API
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Le serveur a bien démarré sur le port ${port}`);
});

const SauvegardeInitTodoList = [
  {
    id: 1,
    content: 'Ma première tâche',
    isCompleted: true,
  },
  {
    id: 2,
    content: 'Ma deuxième tâche',
    isCompleted: false,
  },
];


app.get('/todo-list', (req, res) => {
  getFromDatabase().then((r) => res.send(r));
});


// ! créer une fonction pour ecraser
app.post('/todo-list', (req, res) => {
  postFromDatabase().then((r) => req.body);
});
