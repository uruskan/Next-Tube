import React from 'react';
import connectToDatabase from '@/app/lib/db';
import Video from '@/app/models/Video';
import VideoPlayer from './components/VideoPlayer';
import VideoInfo from './components/VideoInfo';
import VideoComments from './components/VideoComments';
import RelatedVideos from './components/RelatedVideos';
import styles from './styles/VideoPage.module.css';
import Head from 'next/head';

async function fetchVideo(slug) {
  await connectToDatabase();
  const video = await Video.findOne({ slug }).lean();
  return JSON.parse(JSON.stringify(video));
}

export async function generateMetadata({ params }) {
  const video = await fetchVideo(params.slug);

  if (!video) {
    return {
      title: 'Video Not Found',
      description: 'The video you are looking for does not exist.',
    };
  }

  return {
    title: video.title,
    description: video.description,
    openGraph: {
      type: 'article',
      url: `http://localhost:3000/video/${params.slug}`,
      title: video.title,
      description: video.description,
      images: [
        {
          url: video.thumbnail,
          width: 800,
          height: 600,
          alt: video.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: video.title,
      description: video.description,
      image: video.thumbnail,
    },
  };
}

const VideoPage = async ({ params }) => {
  const { slug } = params;
  const video = await fetchVideo(slug);

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <>
      <Head>
        <title>{video.title}</title>
        <meta name="description" content={video.description} />
        <meta property="og:title" content={video.title} />
        <meta property="og:description" content={video.description} />
        <meta property="og:image" content={video.thumbnail} />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content={`http://localhost:3000/video/${params.slug}`} />
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
      <div className={styles['video-page-container']}>
        <div className={styles.mainContent}>
          <div className={styles.videoPlayerContainer}>
            <div className={styles.videoPlayer}>
              <VideoPlayer url={video.url} />
            </div>
            <div className={styles.detailsCommentsContainer}>
              <div className={styles.videoDetails}>
                <VideoInfo video={video} />
              </div>
              <div className={styles.commentsSection}>
                <VideoComments videoId={video._id} />
              </div>
            </div>
          </div>
          <div className={styles.sideContent}>
            <div className={styles.relatedVideosSection}>
              <h3>Related Videos</h3>
              <div className={styles.relatedVideosList}>
                <RelatedVideos currentVideoId={video._id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPage;
