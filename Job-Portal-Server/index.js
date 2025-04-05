const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sw25b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const jobsCollection = client.db('JobPortal').collection('jobs');
    const jobApplicationsCollection = client.db('JobPortal').collection('jobApplications');

    app.get('/jobs', async (req, res) => {
      const email = req.query.hr_email;
      let query = {};
      if (email) {
        query = { hr_email: email };
      }
      
      const result = await jobsCollection.find().toArray();
      res.send(result);
    });

    app.delete('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const result = await jobsCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.get('/JobDetails/:id', async (req, res) => {
      const id = req.params.id;
      const result = await jobsCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.post('/job-Applications', async (req, res) => {
      const jobApplication = req.body;
      const result = await jobApplicationsCollection.insertOne(jobApplication);
      res.send(result);
    });

    app.get('/job-Applications', async (req, res) => {
      const email = req.query.email;
  
      const query = {
        applicant_email: email
      }
      const result = await jobApplicationsCollection.find(query).toArray();
      res.send(result);
    });

    app.post('/AddJobs', async (req, res)=>{
      const jobData = req.body;
      const result = await jobsCollection.insertOne(jobData);
      res.send(result);
    });






    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
