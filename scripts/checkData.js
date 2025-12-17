require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

async function checkData() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const mahasiswa = db.collection('mahasiswa');
    
    // Cek semua data
    const allData = await mahasiswa.find({}).toArray();
    console.log('Total data:', allData.length);
    console.log('Sample data (first 5):');
    allData.slice(0, 5).forEach((doc, index) => {
      console.log(`${index + 1}. NIM: "${doc.NIM}" (type: ${typeof doc.NIM}), EMAIL: "${doc.EMAIL}"`);
    });
    
    // Cek NIM spesifik
    const testNIM = '105222040';
    const specificData = await mahasiswa.findOne({ NIM: testNIM });
    console.log('\nCari NIM 105222040:');
    console.log(specificData);
    
    // Cek dengan regex untuk NIM yang mirip
    const regexData = await mahasiswa.find({ NIM: { $regex: /105222040/ } }).toArray();
    console.log('\nCari NIM dengan regex "105222040":');
    console.log('Found:', regexData.length, 'documents');
    regexData.forEach((doc, index) => {
      console.log(`${index + 1}. NIM: "${doc.NIM}"`);
    });

  } finally {
    await client.close();
  }
}

checkData().catch(console.error);