require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

async function setupDatabase() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    
    // Buat collection mahasiswa jika belum ada
    const collections = await db.listCollections({ name: 'mahasiswa' }).toArray();
    if (collections.length === 0) {
      await db.createCollection('mahasiswa');
      console.log('Collection mahasiswa berhasil dibuat');
    }
    
    // Tambahkan unique index pada field NIM
    await db.collection('mahasiswa').createIndex({ NIM: 1 }, { unique: true });
    console.log('Unique index pada NIM berhasil dibuat');
    
    // Tambahkan index pada EMAIL untuk performa
    await db.collection('mahasiswa').createIndex({ EMAIL: 1 });
    console.log('Index pada EMAIL berhasil dibuat');
    
  } catch (error) {
    console.error('Error saat setup database:', error);
  } finally {
    await client.close();
  }
}

setupDatabase();