import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db';
import Comment from 'postcss/lib/comment';
import Video from '@/app/models/Video';

export async function GET(req) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get('videoId');
  try {
    const video = await Video.findById(videoId).lean();
    if (video){
        const comments = video.comments;
        return NextResponse.json({ comments });
        
    }else{
        return NextResponse.error(new Error('Video not found'));
    
    }
    //return NextResponse.json({ comments });
  } catch (error) {
    return NextResponse.error(new Error('Failed to fetch comments'));
  }
}
