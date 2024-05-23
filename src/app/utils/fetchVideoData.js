// src/app/utils/fetchVideoData.js

import connectToDatabase from '@/app/lib/db';
import Video from '@/app/models/Video';

export async function fetchVideoData() {
  await connectToDatabase();
  const videos = await Video.find().lean();
  return videos;
}
export default fetchVideoData;