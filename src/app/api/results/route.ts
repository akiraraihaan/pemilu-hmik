import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';

export async function GET(request: NextRequest) {
    const db = await dbConnect();
    
    try {
        // Get vote collection
        const voteCollection = db.collection('Vote');
        
        // Aggregate to count votes per candidate
        const voteCounts = await voteCollection.aggregate([
            {
                $group: {
                    _id: '$choice_id',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    choice_id: '$_id',
                    count: 1,
                    _id: 0
                }
            },
            {
                $sort: { count: -1 }
            }
        ]).toArray();

        // Get mahasiswa collection
        const mahasiswaCollection = db.collection('mahasiswa');
        
        // Count statistics
        const totalStudents = await mahasiswaCollection.countDocuments();
        const votedStudents = await mahasiswaCollection.countDocuments({ STATUS_VOTE: true });
        const totalVotes = voteCounts.reduce((sum, item) => sum + item.count, 0);

        return NextResponse.json({
            totalVotes,
            voteCounts,
            votedStudents
        });

    } catch (error: any) {
        console.error('Error fetching results:', error);
        return NextResponse.json(
            { error: 'Failed to fetch results', details: error.message },
            { status: 500 }
        );
    }
}