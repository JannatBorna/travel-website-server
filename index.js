const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config(); // use for process.env 
const cors = require('cors');
const app = express();
const port = process.env.PORT || 2000;


// middleware
app.use(cors());
app.use(express.json()); // আমরা যদি কখনো কিছু পাঠায় json ফরমেট এ তাহলে তা access করতে পারবো 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zoj9s.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
         await client.connect();
            console.log('database connected successfully')
        const database = client.db('your_travel');
        const shopCollection = database.collection('shops');

        //GET shops API
        app.get('/shops', async (req, res) =>{
            const cursor = shopCollection.find({});
            const shops = await cursor.toArray();
            // const shops = await cursor.limit(5).toArray(); //যদি আমি limit করে দিতে চাই এর ৫ বেশি প্রোডাক্ট দেখাবে না তাহলে limit add করতে হবে 
            res.send(shops);

        })


    }

    finally{
        // await client.close();
    }

}

run().catch(console.dir);


app.get('/',(req, res) => {
    res.send('travel website is running');
});




app.listen(port, () =>{
    console.log('server running at port', port);
})
