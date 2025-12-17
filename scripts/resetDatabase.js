require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

async function resetDatabase() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    
    // Hapus semua data dari collection mahasiswa
    const result = await db.collection('mahasiswa').deleteMany({});
    console.log(`Database berhasil direset! ${result.deletedCount} data mahasiswa dihapus.`);
    
  } finally {
    await client.close();
  }
}

resetDatabase().catch(console.error);