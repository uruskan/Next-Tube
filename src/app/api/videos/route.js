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
    return NextResponse.error(new Error('Failed to fetch videos'));
  }
}

export async function POST(req) {
  await connectToDatabase();
  const { title, description, url, thumbnail, tags, category } = await req.json();
  const slug = slugify(title, { lower: true, strict: true });

  try {
    const newVideo = new Video({
      title,
      description,
      url,
      thumbnail,
      slug,
      tags,
      category, // Save category
    });

    await newVideo.save();
    return NextResponse.json(newVideo);
  } catch (error) {
    return NextResponse.error(new Error('Failed to create video'));
  }
}
