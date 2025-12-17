require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

async function resetAllCollections() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    
    // Hapus semua data dari semua collections
    const collections = await db.listCollections().toArray();
    
    for (const collection of collections) {
      const result = await db.collection(collection.name).deleteMany({});
      console.log(`Collection ${collection.name}: ${result.deletedCount} data dihapus.`);
    }
    
    console.log('✅ Seluruh database berhasil direset!');
    
  } finally {
    await client.close();
  }
}

resetAllCollections().catch(console.error);