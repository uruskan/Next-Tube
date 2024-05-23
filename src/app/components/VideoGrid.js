'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import VideoCard from './VideoCard';
import styles from '../styles/VideoGrid.module.css';

const VideoGrid = ({ initialVideos, initialPage, hasMore }) => {
  const [videos, setVideos] = useState(initialVideos);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMoreVideos, setHasMoreVideos] = useState(hasMore);
  const observer = useRef();

  const loadMoreVideos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/videos?page=${page + 1}`);
      const data = await response.json();
      setVideos((prevVideos) => [...prevVideos, ...data.videos]);
      setHasMoreVideos(data.hasMore);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Failed to fetch videos', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const lastVideoElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreVideos) {
          loadMoreVideos();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMoreVideos, loadMoreVideos]
  );

  return (
    <div className={styles.grid}>
      {videos.map((video, index) => {
        if (videos.length === index + 1) {
          return (
            <div ref={lastVideoElementRef} key={video._id}>
              <VideoCard video={video} />
            </div>
          );
        } else {
          return (
            <div key={video._id}>
              <VideoCard video={video} />
            </div>
          );
        }
      })}
      {loading && <p>Loading...</p>}
      <div className={styles.scrollIndicator}>Scroll down for more videos...</div>
    </div>
  );
};

export default VideoGrid;
