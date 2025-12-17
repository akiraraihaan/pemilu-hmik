require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

async function resetVoteStatus() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const mahasiswa = db.collection('mahasiswa');
    
    // Reset semua STATUS_VOTE menjadi false
    const result = await mahasiswa.updateMany(
      {}, // Semua dokumen
      { $set: { STATUS_VOTE: false } } // Set STATUS_VOTE ke false
    );
    
    console.log(`Berhasil reset ${result.modifiedCount} data mahasiswa`);
    console.log('STATUS_VOTE untuk semua mahasiswa sekarang adalah FALSE');
    
    // Cek sample data
    const sample = await mahasiswa.findOne({});
    console.log('Sample data setelah reset:', {
      NIM: sample.NIM,
      STATUS_VOTE: sample.STATUS_VOTE
    });

  } finally {
    await client.close();
  }
}

resetVoteStatus().catch(console.error);