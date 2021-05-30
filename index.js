import express from 'express';
import userRoute from './routes/user.js';
import commentRoute from './routes/comment.js';
import postRoute from './routes/post.js';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
const corsOptions = {
  'origin':'*',
  'methods':'GET,PATCH,POST,DELETE,PUT,HEAD',
  'preflightcontinue':'false',
  'optionsSuccessStatus':204
}
const app = express();
app.use(cors(corsOptions));
app.use(express.urlencoded({
  extended:true
}));
app.use(express.json());
const port = process.env.PORT; //même port si existe ou port 3000 si 1ère fois

app.get('/',(req, res) => {
  
  res.send('bonjour, bienvenue sur l API groupomania');
});
app.use('/User', userRoute);
app.use('/Comment', commentRoute);
app.use('/Post', postRoute);
app.listen(port, () => console.log(`serveur démarré sur le port: http://localhost:${port}`)); // ce doit tjrs être la dernière ligne du fichier

