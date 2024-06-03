// import { getRandomJoke } from './node_modules/one-liner-joke';

//     console.log(getRandomJoke());
// let art = require('figlet')
// art("JAI  SHRII  RAM", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });

let express = require('express')

const app = express()

app.get('/', (req, res)=> {
  res.send("pagal")
})
app.get('/profile', (req, res)=> {
  res.send("hello these is profile")
})

app.listen(3000); // port