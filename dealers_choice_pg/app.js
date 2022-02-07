const { client, syncAndSeed } = require('./db/datab.js')
const express = require('express')
const app = express();
const port = 3001; 
const path = require('path');

app.use('/public', express.static(path.join(__dirname, 'public')));


app.get('/', async (req, res, next) => {
    const response = await client.query('SELECT * FROM icecream');
    const icecream = response.rows;
    res.send(`
     <html>
       <head>
        <link rel ='stylesheet' href='/public/style.css'/>
       </head>
       <body>
       <h1> Van Leeuwen Ice Cream Flavors </h1>
       <ul>
         ${
             icecream.map (flavor => `
              <li>
                <a href= '/icecream/${icecream.id}'>
                ${ flavor.name }
                </a>
              </li>
             `).join("")
         }
       </ul>
       </body>
     </html>
        
    `);

    next();
})


const setUp = async ()=> {
        await client.connect();
        await syncAndSeed();
        console.log('connected to db')
    }
    setUp();


app.listen(port, ()=> console.log(`listening on port ${port}`));