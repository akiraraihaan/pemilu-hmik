import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';

export async function PUT(request: NextRequest) {
    const db = await dbConnect();
    const mahasiswa = db.collection('mahasiswa');
    
    const { searchParams } = new URL(request.url);
    const TOKEN = searchParams.get('TOKEN');

    if (!TOKEN) {
        return NextResponse.json({ error: 'TOKEN required' }, { status: 400 });
    }

    try {
        const document = await mahasiswa.findOne({ TOKEN });
        
        if (!document) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // Validasi: Cek apakah sudah voting
        if (document.STATUS_VOTE) {
            return NextResponse.json(
                { error: 'Token sudah digunakan untuk voting' },
                { status: 403 }
            );
        }

        // Update status vote jika belum voting
        await mahasiswa.updateOne(
            { TOKEN },
            { $set: { STATUS_VOTE: true } }
        );

        return NextResponse.json({ success: true });
        
    } catch (error: any) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}