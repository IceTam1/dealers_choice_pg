const pg = require('pg')

const client = new pg.Client('postgres://localhost/dealers_choice_db')

const syncAndSeed = async () => {
    const SQL = `
    DROP TABLE IF EXISTS "info";
    DROP TABLE IF EXISTS "icecream";
    
    CREATE TABLE icecream (
        id INTEGER PRIMARY KEY, 
        name VARCHAR(100) 
    );

    CREATE TABLE info (
        id INTEGER PRIMARY KEY,
        description VARCHAR (500),
        cost INTEGER,
        desc_id INTEGER REFERENCES icecream(id)

    );


    INSERT INTO icecream(id, name) VALUES (1, 'Salted Caramel');
    INSERT INTO icecream(id, name) VALUES (2, 'Cookies & Cream Caramel Swirl');
    INSERT INTO icecream(id, name) VALUES (3, 'Sicilian Pistachio');
    INSERT INTO icecream(id, name) VALUES (4, 'Honeycomb');
    INSERT INTO info(id, description, desc_id, cost) VALUES (1, 'salty like pure cane sugar caramelized in small copper pots with cold ground vanilla and a touch of sea salt', 1, 12.00);
    INSERT INTO info(id, description, desc_id, cost) VALUES (2, 'cream-filled dark chocolate cookies, folded into creamy vegan base. A touch of cold-ground Tahitian vanilla and a swirl of housemade caramel', 2, 12.00);
    INSERT INTO info(id, description, desc_id, cost) VALUES (3, 'these pistachios are only found on Mount Etna, folded into a creamy cashew milk base', 3, 12.00);
    INSERT INTO info(id, description, desc_id, cost) VALUES (4, 'not made with honeycombs or honey, made with a chewy, crunchy caramel candy and folded into vanilla caramel base', 4, 12.00);
    
    `;


    await client.query(SQL);
};

// const setUp = async ()=> {
//     await client.connect();
//     await syncAndSeed();
//     console.log('connected to db')
// }
// setUp();

module.exports = {
    client,
    syncAndSeed
};