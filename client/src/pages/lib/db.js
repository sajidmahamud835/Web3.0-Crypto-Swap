import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

// Ensure this code is only executed on the server side
if (typeof window === 'undefined') {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so the client is not recreated
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
} else {
  // If this code somehow runs on the client, set clientPromise to null
  clientPromise = null;
}

export default clientPromise;
