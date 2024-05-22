'use client';
import React, { useState, useEffect } from 'react';
import VideoCard from './VideoCard';
import styles from '../styles/VideoGrid.module.css';

const VideoGrid = ({ initialVideos, initialPage, hasMore }) => {
  const [videos, setVideos] = useState(initialVideos);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMoreVideos, setHasMoreVideos] = useState(hasMore);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/videos?page=${page}`);
        const data = await response.json();
        setVideos(prevVideos => [...prevVideos, ...data.videos]);
        setHasMoreVideos(data.hasMore);
      } catch (error) {
        console.error('Failed to fetch videos', error);
      } finally {
        setLoading(false);
      }
    };

    if (page > initialPage) {
      fetchVideos();
    }
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading || !hasMoreVideos) {
      return;
    }
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMoreVideos]);

  return (
    <div className={styles.videoGridContainer}>
      <div className={styles.videoGrid}>
        {videos.map(video => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default VideoGrid;
