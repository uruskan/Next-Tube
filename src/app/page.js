import React from 'react';
import Head from 'next/head';
import VideoGrid from './components/VideoGrid';
import Header from './components/Header';
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
      </Head>
      <VideoGrid initialVideos={videos} initialPage={initialPage} hasMore={hasMore} />
    </>
  );
};

export default HomePage;
