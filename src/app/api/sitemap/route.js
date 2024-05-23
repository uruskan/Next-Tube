// src/app/api/sitemap/route.js

import { NextResponse } from 'next/server';
import NodeCache from 'node-cache';
import nodeCron from 'node-cron';
import fetch from 'node-fetch';
import { fetchVideoData } from '@/app/utils/fetchVideoData';

const sitemapCache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

async function generateSitemap() {
  const videos = await fetchVideoData();
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;

  const videoJsonLd = videos.map((video) => ({
    '@context': 'http://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnail,
    uploadDate: video.createdAt,
    contentUrl: `${siteUrl}/video/${video.slug}`,
    embedUrl: video.url,
    interactionCount: video.views, // Assuming you have a views field
    genre: video.category,
    keywords: video.tags.join(', '),
  }));

  videos.forEach((video) => {
    sitemap += `
      <url>
        <loc>${siteUrl}/video/${video.slug}</loc>
        <lastmod>${new Date(video.createdAt).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
        <video:video>
          <video:thumbnail_loc>${video.thumbnail}</video:thumbnail_loc>
          <video:title><![CDATA[${video.title}]]></video:title>
          <video:description><![CDATA[${video.description}]]></video:description>
          <video:content_loc>${video.url}</video:content_loc>
          <video:category>${video.category}</video:category>
          <video:tag>${video.tags.join(', ')}</video:tag>
        </video:video>
      </url>`;
  });

  sitemap += '</urlset>';

  return sitemap;
}

async function pingGoogle() {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const sitemapUrl = `${siteUrl}/api/sitemap/`;

  try {
    await fetch(`http://www.google.com/ping?sitemap=${sitemapUrl}`);
    console.log('Successfully pinged Google.');
  } catch (error) {
    console.error('Error pinging Google:', error);
  }
}

// Schedule cron job to reset sitemap cache every 60 minutes
nodeCron.schedule('0 * * * *', async () => {
  console.log('Resetting sitemap cache and regenerating sitemap.');
  sitemapCache.flushAll();
  const sitemap = await generateSitemap();
  sitemapCache.set('sitemap', sitemap);
});

// Schedule cron job to ping Google every 60 min
nodeCron.schedule('0 * * * *', async () => {
  console.log('Pinging Google to update sitemap.');
  await pingGoogle();
});

export async function GET(req) {
  const cacheKey = 'sitemap';
  let sitemap = sitemapCache.get(cacheKey);

  if (!sitemap) {
    sitemap = await generateSitemap();
    sitemapCache.set(cacheKey, sitemap);
  }

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600', // Cache for 60 minutes
    },
  });
}
