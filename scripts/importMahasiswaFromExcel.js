require('dotenv').config();
const { MongoClient } = require('mongodb');
const XLSX = require('xlsx');
const path = require('path');

const uri = process.env.MONGODB_URI;
const filePath = path.join(__dirname, 'data', 'data-mhs-cs.xlsx');

async function run() {
  // Baca file Excel
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  // Koneksi ke MongoDB
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(); // gunakan nama db default dari URI
    const mahasiswa = db.collection('mahasiswa');
    
    // Filter data yang belum ada di database
    const existingNIMs = await mahasiswa.find({}, { projection: { NIM: 1 } }).toArray();
    const existingNIMSet = new Set(existingNIMs.map(doc => doc.NIM));
    
    const newData = data.filter(item => !existingNIMSet.has(item.NIM));
    
    if (newData.length === 0) {
      console.log('Tidak ada data mahasiswa baru untuk diinsert');
      return;
    }
    
    // Insert data baru
    const result = await mahasiswa.insertMany(newData);
    console.log(`Inserted: ${result.insertedCount} mahasiswa baru`);
    console.log(`Skipped: ${data.length - newData.length} mahasiswa (sudah ada di database)`);
    
  } catch (error) {
    if (error.code === 11000) {
      console.log('Error: NIM duplikat terdeteksi. Pastikan data tidak ada duplikasi.');
    } else {
      console.error('Error:', error);
    }
  } finally {
    await client.close();
  }
}

run().catch(console.error);
