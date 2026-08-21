const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// TikTok Downloader
app.post('/api/download/tiktok', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL required' });

    // TikTok video ID extraction
    const videoId = url.split('video/')[1]?.split('?')[0] || url.split('/')[url.split('/').length - 1];
    
    const response = await axios.get(`https://api.tiktok.com/v1/video/${videoId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }).catch(() => {
      // Fallback: Use alternative API
      return axios.get(`https://www.tiktok.com/api/v1/video/${videoId}/`);
    });

    res.json({
      success: true,
      platform: 'TikTok',
      url: response.data?.video?.downloadAddr || response.data?.downloadUrl,
      title: response.data?.desc || 'TikTok Video',
      thumbnail: response.data?.video?.dynamicCover || response.data?.cover
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to download TikTok video', details: error.message });
  }
});

// Instagram Downloader
app.post('/api/download/instagram', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL required' });

    const response = await axios.get(`https://instagram-url-direct.vercel.app/?url=${encodeURIComponent(url)}`);

    res.json({
      success: true,
      platform: 'Instagram',
      url: response.data?.url || response.data?.download_url,
      title: 'Instagram Video',
      type: response.data?.type || 'video'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to download Instagram video', details: error.message });
  }
});

// YouTube Downloader
app.post('/api/download/youtube', async (req, res) => {
  try {
    const { url, quality = '720' } = req.body;
    if (!url) return res.status(400).json({ error: 'URL required' });

    const response = await axios.get(`https://www.y2mate.com/api/info`, {
      params: { url, quality }
    }).catch(() => {
      return axios.get(`https://api.cobalt.tools/api/json`, {
        method: 'POST',
        data: { url, vCodec: 'h264', vQuality: quality }
      });
    });

    res.json({
      success: true,
      platform: 'YouTube',
      url: response.data?.url || response.data?.url,
      title: response.data?.title || 'YouTube Video',
      quality: quality,
      duration: response.data?.duration || 'N/A'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to download YouTube video', details: error.message });
  }
});

// Facebook Downloader
app.post('/api/download/facebook', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL required' });

    const response = await axios.get(`https://fbdown.net/api/convert`, {
      params: { url }
    }).catch(() => {
      return axios.post(`https://api.fbdown.xyz/api/convert`, { url });
    });

    res.json({
      success: true,
      platform: 'Facebook',
      url: response.data?.url || response.data?.links?.[0]?.url,
      title: 'Facebook Video',
      quality: response.data?.quality || 'HD'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to download Facebook video', details: error.message });
  }
});

// Snapchat Downloader
app.post('/api/download/snapchat', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL required' });

    // Snapchat downloads are restricted, using alternative approach
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)'
      }
    });

    res.json({
      success: true,
      platform: 'Snapchat',
      message: 'Snapchat has strict download restrictions. Please save manually or use the official app.',
      url: url
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process Snapchat link', details: error.message });
  }
});

// Generic URL Downloader
app.post('/api/download', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL required' });

    // Detect platform
    let platform = 'unknown';
    if (url.includes('tiktok')) platform = 'tiktok';
    else if (url.includes('instagram')) platform = 'instagram';
    else if (url.includes('youtube') || url.includes('youtu.be')) platform = 'youtube';
    else if (url.includes('facebook')) platform = 'facebook';
    else if (url.includes('snapchat')) platform = 'snapchat';

    res.json({ platform, url });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process URL', details: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!', timestamp: new Date() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Social Media Video Downloader running on http://localhost:${PORT}`);
  console.log(`📱 Supported platforms: TikTok, Instagram, YouTube, Facebook, Snapchat`);
});