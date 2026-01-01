import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { jobId } = params;

    // Mock response for video status
    // In a real app, this would check a database or external service

    return NextResponse.json({
        id: jobId,
        status: 'completed',
        progress: 100,
        url: 'https://example.com/video.mp4',
        timestamp: new Date().toISOString()
    });
}
