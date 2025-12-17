import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || '';

if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined');
}

// Periksa apakah global.mongoose sudah diinisialisasi
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    const db = mongoose.connection;
    db.on('connected', () => {
        console.log('MongoDB connected to:', db.name);
    });
    db.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const clientOptions = {
            serverApi: { version: '1' as const, strict: true, deprecationErrors: true },
        };
        cached.promise = mongoose.connect(uri, clientOptions).then((mongoose) => {
            console.log('Connected to MongoDB');
            return mongoose.connection;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
