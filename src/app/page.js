import React from 'react';
import Head from 'next/head';
import VideoGrid from './components/VideoGrid';
import connectToDatabase from './lib/db';
import Video from './models/Video';

async function fetchVideos(page = 1, limit = 10) {
  await connectToDatabase();
  const skip = (page - 1) * limit;
  const videos = await Video.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
  const totalVideos = await Video.countDocuments();
  return {
    videos: JSON.parse(JSON.stringify(videos)),
    hasMore: (page * limit) < totalVideos,
  };
}

const HomePage = async () => {
  const initialPage = 1;
  const initialLimit = 10;
  const { videos, hasMore } = await fetchVideos(initialPage, initialLimit);

  return (
    <>
      <Head>
        <title>Video Platform - Home</title>
        <meta name="description" content="Discover and watch videos on our platform. Find videos on various topics, from tutorials to entertainment." />
        <meta name="keywords" content="videos, tutorials, entertainment, watch videos, video platform" />
        <meta name="author" content="Video Platform" />
        <meta property="og:title" content="Video Platform - Home" />
        <meta property="og:description" content="Discover and watch videos on our platform. Find videos on various topics, from tutorials to entertainment." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://localhost:3000" />
        <meta property="og:image" content="https://example.com/default-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Video Platform - Home" />
        <meta name="twitter:description" content="Discover and watch videos on our platform. Find videos on various topics, from tutorials to entertainment." />
        <meta name="twitter:image" content="https://example.com/default-image.jpg" />
      </Head>
      <VideoGrid initialVideos={videos} initialPage={initialPage} hasMore={hasMore} />
    </>
  );
};

export default HomePage;
