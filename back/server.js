import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json())
app.use(cors())


app.listen(port, (error) => {
    error ? console.log(error) : console.log(`le serveur a démarré sur le port ${port}`);
})

app.get('/task', (request, response) => {
    const test = [
        {
        id: 1, 
        element: 'Faire la vaisselle'
        }
    ];
    response.send(test);
})