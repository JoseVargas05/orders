const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

const allowedOrigins = ["http://localhost:4000","http://localhost:3000"];

    app.use(
        cors({
            origin: function(origin, callback) {
                if (!origin) return callback(null, true);
                if (allowedOrigins.indexOf(origin) === -1) {
                    var msg =
                        "The CORS policy for this site does not " +
                        "allow access from the specified Origin.";
                    return callback(new Error(msg), false);
                }
                return callback(null, true);
            }
        })
    ); 

app.get('/orders',async (req, res)=>{
    const api_url = 'http://3BATE125JJIX4M3I2NJSTVFCS9TS6GD9@18.219.54.186/api/orders?display=full&limit=0,100&output_format=JSON';
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    console.log(json);
    res.json(json);
});

app.get('/customers', async (req, res)=>{
    const { id } = req.query;
    const api_url = 'http://3BATE125JJIX4M3I2NJSTVFCS9TS6GD9@18.219.54.186/api/customers/'+id+'?output_format=JSON';
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    console.log(json);
    res.json(json);
});

async function init(){
    await app.listen(4000, function(){
        console.log('NodeJS running on port...');
    });
}

init();
