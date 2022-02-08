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
        desc_id INTEGER REFERENCES icecream(id), 
        image_location VARCHAR (1000)
    );


    INSERT INTO icecream(id, name) VALUES (1, 'Salted Caramel');
    INSERT INTO icecream(id, name) VALUES (2, 'Vegan Cookies & Cream Caramel Swirl');
    INSERT INTO icecream(id, name) VALUES (3, 'Sicilian Pistachio');
    INSERT INTO icecream(id, name) VALUES (4, 'Honeycomb');
    INSERT INTO icecream(id, name) VALUES (5, 'Earl Grey Tea');
    INSERT INTO icecream(id, name) VALUES (6, 'Kraft Mac & Cheese');

    INSERT INTO info(id, description, desc_id, cost) VALUES (1, 'salty like pure cane sugar caramelized in small copper pots with cold ground vanilla and a touch of sea salt', 1, 12.00);
    INSERT INTO info(id, description, desc_id, cost) VALUES (2, 'cream-filled dark chocolate cookies, with a touch of cold-ground Tahitian vanilla and a swirl of housemade caramel', 2, 12.00);
    INSERT INTO info(id, description, desc_id, cost) VALUES (3, 'these pistachios are only found on Mount Etna, folded into a creamy cashew milk base', 3, 12.00);
    INSERT INTO info(id, description, desc_id, cost) VALUES (4, 'not made with honeycombs or honey, made with a chewy, crunchy caramel candy and folded into vanilla caramel base', 4, 12.00);
    INSERT INTO info(id, description, desc_id, cost) VALUES (5, 'hand-harvested Rishi Tea leaves from the tea tree forests in the Yunnan province of China, and a little bergamot citrus', 5, 12.00);
    INSERT INTO info(id, description, desc_id, cost) VALUES (6, 'limited edition, kraft mac & cheese in ice cream form!', 6, 12.00);

    UPDATE info SET image_location = 'https://vanleeuwenicecream.com/wp-content/uploads/2020/03/SALTED-CARAMEL_OVERSCOOPED-1.jpg' WHERE id = 1; 
    UPDATE info SET image_location = 'https://vanleeuwenicecream.com/wp-content/uploads/2020/03/COOKIES-_-CREAM-CARAMEL-SWIRL_OVERSCOOPED-1.jpg' WHERE id = 2; 
    UPDATE info SET image_location = 'https://vanleeuwenicecream.com/wp-content/uploads/2020/03/PISTACHIO_OVERSCOOPED-1.jpg' WHERE id = 3; 
    UPDATE info SET image_location = 'https://vanleeuwenicecream.com/wp-content/uploads/2020/03/HONEYCOMB_OVERSCOOPED.jpeg' WHERE id = 4; 
    UPDATE info SET image_location = 'https://vanleeuwenicecream.com/wp-content/uploads/2020/03/EARL-GREY_OVERSCOOPED-1.jpg' WHERE id = 5;
    UPDATE info SET image_location = 'https://vanleeuwenicecream.com/wp-content/uploads/2021/07/KRAFT-MAC-_-CHEESE_OVERSCOOPED-1.jpg' WHERE id = 6;
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