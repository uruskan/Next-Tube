import React from 'react';
import Link from 'next/link';
import styles from '../styles/VideoCard.module.css';

const VideoCard = ({ video }) => {
    return (
        <Link href={`/video/${video.slug}`}>
            <div className={styles.videoCard}>
                <div className={styles.videoThumbnail}>
                    <img src={video.thumbnail} alt={video.title} loading="lazy" />
                </div>
                <div className={styles.videoDetails}>
                    <h3 className={styles.videoTitle}>{video.title}</h3>
                    <p className={styles.videoDescription}>{video.description}</p>
                    <p className={styles.videoCategory}>{video.category}</p>
                    <div className={styles.videoTags}>
                        {video.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;

