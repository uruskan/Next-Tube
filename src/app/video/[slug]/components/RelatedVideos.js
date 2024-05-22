'use client';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import VideoCard from '@/app/components/VideoCard'; // Assuming you have a VideoCard component
import styles from '../styles/RelatedVideos.module.css';

const RelatedVideos = ({ currentVideoId }) => {
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      const response = await fetch(`/api/videos/${currentVideoId}/related`);
      const data = await response.json();
      setRelatedVideos(data.relatedVideos);
    };
    fetchRelatedVideos();
  }, [currentVideoId]);

  return (
    <div className={styles.relatedVideos}>
      <h2>Related Videos</h2>
      {relatedVideos.map(video => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

RelatedVideos.propTypes = {
  currentVideoId: PropTypes.string.isRequired,
};

export default RelatedVideos;
