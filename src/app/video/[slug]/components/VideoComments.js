'use client';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/VideoComments.module.css';

const VideoComments = ({ videoId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/api/videos/comments/?videoId=${videoId}`);
      const data = await response.json();
      setComments(data.comments);
    };
    fetchComments();
  }, [videoId]);

  return (
    <div className={styles.commentsContainer}>
      <div className={styles.videoComments}>
      <h2>Comments</h2>
      {comments.map(comment => (
        <div key={comment._id} className={styles.comment}>
          <p className={styles.commentAuthor}><strong>{comment.userId}</strong></p>
          <p className={styles.commentText}>{comment.text}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

VideoComments.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default VideoComments;
