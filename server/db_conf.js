const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.MONGODB_URI;
if (!url) {
  throw new Error('MONGODB_URI environment variable is not set.');
}

const client = new MongoClient(url);

let _db;
const mongoConnect = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    _db = client.db('Blog');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err; // Propagate the error
  }
};

const getDb = async () => {
  if (!_db) {
    await mongoConnect(); // Ensure connection is established
  }
  return _db;
};

module.exports = {
  mongoConnect,
  dbName : client.db('Blog')
};
