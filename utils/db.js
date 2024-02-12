// Import the MongoClient class from the 'mongodb' library
const { MongoClient } = require('mongodb');

// Set default values or use environment variables for connection parameters
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';

// Construct the MongoDB connection URL
const url = `mongodb://${host}:${port}`;

// Define the DBClient class
class DBClient {
  // Constructor method
  constructor() {
    // Establish a connection to MongoDB using MongoClient
    MongoClient.connect(url, (err, client) => {
      if (!err) {
        // If connection successful, set the 'db' property to the 'files_manager' database
        this.db = client.db(database);
      } else {
        // If an error occurs during connection, set 'db' to false
        this.db = false;
      }
    });
  }

  // Check if the connection to MongoDB is alive
  isAlive() {
    // Return true if 'db' is truthy, indicating a successful connection
    // Otherwise, return false
    return Boolean(this.db);
  }

  // Asynchronous method to retrieve the number of documents in the 'users' collection
  async nbUsers() {
    // Use the 'countDocuments' method to get the count of documents in the 'users' collection
    return this.db.collection('users').countDocuments();
  }

  // Asynchronous method to retrieve the number of documents in the 'files' collection
  async nbFiles() {
    // Use the 'countDocuments' method to get the count of documents in the 'files' collection
    return this.db.collection('files').countDocuments();
  }
}

// Create an instance of the DBClient class
const dbClient = new DBClient();

// Export the instance as the default export of the module
export default dbClient;
