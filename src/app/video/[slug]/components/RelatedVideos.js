'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import VideoCard from '@/app/components/VideoCard'; // Assuming you have a VideoCard component
import styles from '../styles/RelatedVideos.module.css';

const RelatedVideos = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchVideos = async (page) => {
    const response = await fetch(`/api/videos?page=${page}`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const loadMoreVideos = async () => {
      const { videos: newVideos, hasMore: moreVideos } = await fetchVideos(page);
      setVideos((prev) => [...prev, ...newVideos]);
      setHasMore(moreVideos);
    };

    loadMoreVideos();
  }, [page]);

  const lastVideoElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMore]);

  return (
    <div className={styles.relatedVideos}>
      {videos.map((video, index) => (
        <VideoCard
          key={video._id}
          video={video}
          ref={index === videos.length - 1 ? lastVideoElementRef : null}
        />
      ))}
      {!hasMore && <p className={styles.text}>No more videos</p>}
    </div>
  );
};

RelatedVideos.propTypes = {
  initialVideos: PropTypes.array,
  initialHasMore: PropTypes.bool,
};

export default RelatedVideos;
