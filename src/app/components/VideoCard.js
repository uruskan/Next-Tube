import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component
import Head from 'next/head';
import styles from '../styles/VideoCard.module.css';

const VideoCard = ({ video }) => {
    return (
        <>
            <Head>
                <title>{video.title}</title>
                <meta name="description" content={video.description} />
                <meta property="og:title" content={video.title} />
                <meta property="og:description" content={video.description} />
                <meta property="og:image" content={video.thumbnail} />
                <meta property="og:type" content="video.other" />
                <meta property="og:url" content={`/video/${video.slug}`} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "http://schema.org",
                        "@type": "VideoObject",
                        "name": video.title,
                        "description": video.description,
                        "thumbnailUrl": video.thumbnail,
                        "uploadDate": video.createdAt,
                        "contentUrl": video.url,
                        "embedUrl": video.url,
                        "publisher": {
                            "@type": "Organization",
                            "name": "YourSiteName",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://example.com/logo.png"
                            }
                        },
                        "genre": video.category,
                        "keywords": video.tags.join(', '),
                        "interactionCount": video.views // Assuming you have a views field
                    })}
                </script>
            </Head>
            <Link href={`/video/${video.slug}`}>
                <div className={styles.videoCard}>
                    <div className={styles.videoThumbnail}>
                        <Image 
                            src={video.thumbnail} 
                            alt={video.title} 
                            layout="responsive" 
                            width={16} 
                            height={9} 
                            objectFit="cover" 
                            placeholder="blur" // Optional: you can add a blur placeholder for better UX
                            blurDataURL="https://via.placeholder.com/400?text=Placeholder"// Optional: base64 encoded placeholder image
                        />
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
        </>
    );
};

export default VideoCard;
