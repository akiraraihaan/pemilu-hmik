import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import randomizer from '../../../components/randomizer';
import sendMail from '../../../components/sendMail';

export async function PUT(request: NextRequest) {
    const db = await dbConnect();
    const mahasiswa = db.collection('mahasiswa');
    
    const { searchParams } = new URL(request.url);
    const NIM = searchParams.get('NIM');
    const EMAIL = searchParams.get('EMAIL');
    
    const TOKEN = randomizer();
    console.log({ TOKEN, NIM, EMAIL, NIMType: typeof NIM });

    if (!NIM || !EMAIL) {
        return NextResponse.json(
            { success: false, error: 'NIM dan EMAIL harus disediakan' },
            { status: 400 }
        );
    }

    try {
        // Konversi NIM ke number karena di MongoDB disimpan sebagai number
        const NIMNumber = parseInt(NIM, 10);
        console.log('Mencari NIM sebagai number:', NIMNumber);
        
        const existingStudent = await mahasiswa.findOne({ NIM: NIMNumber });
        if (!existingStudent) {
            return NextResponse.json(
                { success: false, error: 'Data dengan NIM tersebut tidak ditemukan' },
                { status: 404 }
            );
        }

        const result = await mahasiswa.updateOne(
            { NIM: NIMNumber },
            { $set: { TOKEN: TOKEN } }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json(
                { success: false, error: 'Gagal mengupdate token' },
                { status: 500 }
            );
        }

        await sendMail(EMAIL, TOKEN);

        return NextResponse.json({
            success: true,
            message: 'Token berhasil dibuat dan dikirim ke email',
            data: { NIM, EMAIL, TOKEN }
        });

    } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json(
            { success: false, error: 'Kesalahan Server', details: error.message },
            { status: 500 }
        );
    }
}