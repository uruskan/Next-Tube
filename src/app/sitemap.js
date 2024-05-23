import connectToDatabase from '@/app/lib/db';
import Video from '@/app/models/Video';

const BASE_URL = process.env.SITE_URL || 'http://localhost:3000';

async function fetchVideoData() {
  await connectToDatabase();
  const videos = await Video.find().lean();
  return videos;
}

export async function generateSitemaps() {
  const videos = await fetchVideoData();
  const urlsPerSitemap = 49000; // Limit to 49,000 URLs per sitemap to be safe
  const numberOfSitemaps = Math.ceil(videos.length / urlsPerSitemap);

  return Array.from({ length: numberOfSitemaps }, (_, index) => ({ id: index }));
}

export default async function sitemap({ id }) {
  const videos = await fetchVideoData();
  const start = id * 49000;
  const end = start + 49000;
  const videoSubset = videos.slice(start, end);

  const videoUrls = videoSubset.map((video) => ({
    url: `${BASE_URL}/video/${video.slug}`,
    lastModified: new Date(video.createdAt).toISOString(),
    changeFrequency: 'weekly',
    priority: 1,
    title: video.title,
    description: video.description,
    tags: video.tags.join(', '),
    category: video.category,
    video: {
      thumbnailLoc: video.thumbnail,
      contentLoc: video.url,
    },
  }));

  const staticUrls = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // Add more static URLs if needed
  ];

  return [...videoUrls, ...staticUrls];
}
