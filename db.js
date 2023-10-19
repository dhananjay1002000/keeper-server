
import mongoose from "mongoose";

const dbURL = "mongodb+srv://admin:1234@cluster0.utkfs.mongodb.net/"; // Replace with your MongoDB URL

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default mongoose;


