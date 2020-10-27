import express from 'express';
import routes from './routes'

import './database'

const app = express();
app.use(express.json())
app.use(routes)
app.use(express.json())


app.listen(3333, () => {
  console.log('Is runing')
})

