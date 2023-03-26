const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hnlrj23.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const appointmentCollections = client.db('intershalaTask2').collection('appointments');

        app.post('/appointment', async (req, res) => {
            const appointment = req.body;
            const result = await appointmentCollections.insertOne(appointment);
            res.send(result);
        })
    }
    finally { }
}

run().catch((error) => console.log(error));

app.get('/', (req, res) => {
    res.send('Server is running');
})

app.listen(port, () => {
    console.log(`Server is running on port:${port}`)
})