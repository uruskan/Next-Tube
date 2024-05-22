import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/VideoInfo.module.css';

const VideoInfo = ({ video }) => {
  return (
    <div className={styles.videoInfo}>
      <h1>{video.title}</h1>
      <p>{video.description}</p>
      <p><strong>Category:</strong> {video.category}</p>
      <div className={styles.tags}>
        {video.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
      </div>
    </div>
  );
};

VideoInfo.propTypes = {
  video: PropTypes.object.isRequired,
};

export default VideoInfo;
