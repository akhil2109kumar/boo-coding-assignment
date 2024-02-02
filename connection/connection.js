const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

async function connect() {
  const server = await MongoMemoryServer.create();
  const mongoUri = server.getUri();

  await mongoose.connect(mongoUri, { dbName: "test" });
  console.log("Connected to MongoDB" + mongoUri);
}

exports.connect = connect;
