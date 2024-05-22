import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/VideoPlayer.module.css';

const VideoPlayer = ({ url }) => {
  return (
    <div className={styles.videoPlayer}>
      <video src={url} controls width="100%" />
    </div>
  );
};

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
};

export default VideoPlayer;
