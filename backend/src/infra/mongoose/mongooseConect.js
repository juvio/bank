const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

async function connectDB() {
  try {
    if (process.env.MONGO_URI) {
      // Conectar ao MongoDB real (Docker ou produção)
      await mongoose.connect(process.env.MONGO_URI);
      console.log('✅ Conectado ao MongoDB:', process.env.MONGO_URI);
    } else {
      // Iniciar MongoDB em memória para desenvolvimento local
      const mongod = await MongoMemoryServer.create();
      const mongoUri = mongod.getUri();
      await mongoose.connect(mongoUri);
      console.log('✅ Conectado ao MongoDB em memória');
    }
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
}

module.exports = connectDB;