const pg = require('pg')
const express = require('express')
const app = express();
const port = 3002; 

const client = new pg.Client('postgres://localhost/dealers_choice_db')

const setUp = async ()=> {
    await client.connect();
}
setUp();




app.listen(port, ()=> console.log(`listening on port ${port}`));