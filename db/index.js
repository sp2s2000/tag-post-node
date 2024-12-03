const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectMongo = async () => {
  try {
    const connection = await mongoose.connect(`mongodb+srv://tagpost:test1234@tag-post-node.2r5tb.mongodb.net/${process.env.DB_COLLECTION}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  
    if (connection)
      console.log('Database connected');
  } catch (error) {
    throw 'Database connection failed';
  }
}

module.exports = connectMongo;