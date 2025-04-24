const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://fir-auth-9dc31.web.app',
    'https://fir-auth-9dc31.firebaseapp.com'
  ],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// JWT verification middleware
const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
};

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sw25b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Uncomment this in production
    // await client.connect();

    const jobsCollection = client.db('JobPortal').collection('jobs');
    const jobApplicationsCollection = client.db('JobPortal').collection('jobApplications');

    // Auth API
    app.post('/jwt', (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' });
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ success: true });
    });

    app.post('/logout', (req, res) => {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      }).send({ success: 'token cleared' });
    });

    // Job APIs
    app.get('/jobs', async (req, res) => {
      const email = req.query.hr_email;
      const query = email ? { hr_email: email } : {};
      const result = await jobsCollection.find(query).toArray();
      res.send(result);
    });

    app.get('/JobDetails/:id', async (req, res) => {
      const id = req.params.id;
      const result = await jobsCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.post('/AddJobs', async (req, res) => {
      const jobData = req.body;
      const result = await jobsCollection.insertOne(jobData);
      res.send(result);
    });

    app.delete('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const result = await jobsCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // Applications APIs
    app.post('/job-Applications', async (req, res) => {
      const jobApplication = req.body;
      const result = await jobApplicationsCollection.insertOne(jobApplication);

      const jobId = jobApplication.job_id;
      const job = await jobsCollection.findOne({ _id: new ObjectId(jobId) });

      const updatedCount = (job?.applicationCount || 0) + 1;

      await jobsCollection.updateOne(
        { _id: new ObjectId(jobId) },
        { $set: { applicationCount: updatedCount } }
      );

      res.send(result);
    });

    app.get('/job-Applications', verifyToken, async (req, res) => {
      const email = req.query.email;
      if (req.user.email !== email) {
        return res.status(403).send({ message: 'Forbidden' });
      }
      const query = { applicant_email: email };
      const result = await jobApplicationsCollection.find(query).toArray();
      res.send(result);
    });

    app.patch('/job-applications/:id', async (req, res) => {
      const id = req.params.id;
      const { status } = req.body;
      const result = await jobApplicationsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } }
      );
      res.send(result);
    });

    app.get('/view-applications/jobs/:job_id', async (req, res) => {
      const job_id = req.params.job_id;
      const query = { job_id };
      const result = await jobApplicationsCollection.find(query).toArray();
      res.send(result);
    });

    console.log('Pinged your deployment. Connected to MongoDB!');
  } finally {
    // Optionally close client on shutdown
    // await client.close();
  }
}

run().catch(console.dir);

// Base Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
