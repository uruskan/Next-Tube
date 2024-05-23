import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db';
import Video from '@/app/models/Video';
import slugify from 'slugify';

export async function GET(req) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const videos = await Video.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
    const totalVideos = await Video.countDocuments();
    const hasMore = (page * limit) < totalVideos;

    return NextResponse.json({ videos, hasMore });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.error(new Error('Failed to fetch videos'));
  }
}

export async function POST(req) {
  await connectToDatabase();
  const requestBody = await req.json();

  // Check if the request contains a single video or an array of videos
  const videos = Array.isArray(requestBody.videos) ? requestBody.videos : [requestBody];

  // Ensure that each video has a valid slug
  const validVideos = videos.map(video => {
    const slug = slugify(video.title, { lower: true, strict: true });

    return {
      ...video,
      slug,
    };
  });

  try {
    const insertedVideos = await Video.insertMany(validVideos);
    return NextResponse.json(insertedVideos, { status: 201 });
  } catch (error) {
    console.error('Error creating videos:', error);
    return NextResponse.json({ error: 'Failed to create videos' }, { status: 500 });
  }
}
