import connectToDatabase from '../../../lib/db';
import Video from '../../../models/Video';

export default async function handler(req, res) {
  await connectToDatabase();

  const { page = 1, limit = 10 } = req.query;
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  try {
    const videos = await Video.find().sort({ createdAt: -1 }).skip(skip).limit(limitNumber).lean();
    const totalVideos = await Video.countDocuments();
    const hasMore = (pageNumber * limitNumber) < totalVideos;

    res.status(200).json({ videos, hasMore });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
}
