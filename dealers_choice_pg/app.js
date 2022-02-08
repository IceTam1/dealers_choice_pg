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

       <h1 style="color: skyblue;"> Van Leeuwen Ice Cream Flavors</h1>
       
       <body class= home>
       
       <ul class= flavors>
         ${
             icecream.map (flavor => `
              <div class= flav>
                <a href='/icecream/${flavor.id}' style= 'text-decoration: none; color: white;'>
                ${ flavor.name }
                </a>
              </div>
             `).join("")
         }
       </ul>

       <h3> Est. Brooklyn 2008 </h3>
       </body>
     </html>
        
    `);

    next();
});



app.get('/icecream/:id', async (req, res, next) => {
  try{
    const response = await client.query('SELECT * FROM info WHERE id=$1;', [req.params.id]);
    const info = response.rows;
    res.send(`
     <html>
       <head>
        <link rel ='stylesheet' href='/public/style.css'/>
       </head>
       <h1><a style="text-decoration:none; color: skyblue; " href='/'> Van Leeuwen Ice Cream Flavors</a> </h1>
       <h4> Est. Brooklyn 2008 </h4>

       <body class= detail>
       
       <ul class= p2>
         ${
             info.map (desc => `
             <div>
             <img class="resize" src= "${desc.image_location};" >
             
             </div>
            <div class=info2>
              <div class=des>
                ${ desc.description }
              </div>

              <div class=cost>
                price: $${desc.cost}
              </div>
              <div>

              <div><a href='https://destinilocators.com/vanleeuwen/site/'>
              Check Availibity In Stores
              </a>
              </div>
             `).join("")
         }
       </ul>
       </body>
     </html>
        
    `);
  }
  catch(ex){
    next(ex);
  }
});







const setUp = async ()=> {
        await client.connect();
        await syncAndSeed();
        console.log('connected to db')
    }
    setUp();


app.listen(port, ()=> console.log(`listening on port ${port}`));