// DOM Elements
const platformSelect = document.getElementById('platform');
const videoUrlInput = document.getElementById('videoUrl');
const downloadBtn = document.getElementById('downloadBtn');
const qualitySelect = document.getElementById('quality');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const downloadLink = document.getElementById('downloadLink');
const copyLinkBtn = document.getElementById('copyLink');
const downloadsList = document.getElementById('downloadsList');

let recentDownloads = JSON.parse(localStorage.getItem('recentDownloads')) || [];

// Event Listeners
downloadBtn.addEventListener('click', handleDownload);
copyLinkBtn.addEventListener('click', copyToClipboard);
videoUrlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleDownload();
});

// Platform auto-detect
videoUrlInput.addEventListener('input', () => {
    const url = videoUrlInput.value;
    
    if (url.includes('tiktok')) platformSelect.value = 'tiktok';
    else if (url.includes('instagram')) platformSelect.value = 'instagram';
    else if (url.includes('youtube') || url.includes('youtu.be')) platformSelect.value = 'youtube';
    else if (url.includes('facebook')) platformSelect.value = 'facebook';
    else if (url.includes('snapchat')) platformSelect.value = 'snapchat';
});

// Main download function
async function handleDownload() {
    const url = videoUrlInput.value.trim();
    const platform = platformSelect.value;

    // Validation
    if (!url) {
        showError('❌ Please paste a video URL');
        return;
    }

    if (!platform) {
        showError('❌ Please select a platform');
        return;
    }

    // Validate URL format
    if (!isValidUrl(url)) {
        showError('❌ Invalid URL format');
        return;
    }

    // Show loading
    showLoading(true);
    hideError();
    hideSuccess();

    try {
        const endpoint = `/api/download/${platform}`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                quality: qualitySelect.value
            })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.error || 'Download failed');
        }

        // Show success
        displaySuccess(data, platform);
        addToRecentDownloads(platform, url, data.title);

    } catch (error) {
        showError(`❌ Error: ${error.message}`);
        console.error('Download error:', error);
    } finally {
        showLoading(false);
    }
}

// Display success result
function displaySuccess(data, platform) {
    document.getElementById('videoTitle').textContent = data.title || 'Video Downloaded';
    document.getElementById('videoInfo').textContent = `Platform: ${data.platform} | Quality: ${data.quality || 'Default'}`;
    
    if (data.thumbnail) {
        document.getElementById('thumbnail').src = data.thumbnail;
        document.getElementById('thumbnail').style.display = 'block';
    }

    downloadLink.href = data.url;
    downloadLink.download = `${platform}-video-${Date.now()}`;
    
    successMessage.style.display = 'block';
}

// Copy download link to clipboard
function copyToClipboard() {
    const url = downloadLink.href;
    navigator.clipboard.writeText(url).then(() => {
        const btn = copyLinkBtn;
        const originalText = btn.textContent;
        btn.textContent = '✅ Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }).catch(() => {
        showError('Failed to copy to clipboard');
    });
}

// Add to recent downloads
function addToRecentDownloads(platform, url, title) {
    const download = {
        platform: platform.toUpperCase(),
        url: url,
        title: title || 'Video',
        time: new Date().toLocaleTimeString()
    };

    recentDownloads.unshift(download);
    if (recentDownloads.length > 10) recentDownloads.pop();
    
    localStorage.setItem('recentDownloads', JSON.stringify(recentDownloads));
    displayRecentDownloads();
}

// Display recent downloads
function displayRecentDownloads() {
    if (recentDownloads.length === 0) {
        downloadsList.innerHTML = '<p>No downloads yet</p>';
        return;
    }

    downloadsList.innerHTML = recentDownloads.map((item, index) => `
        <div class="download-item">
            <div class="download-item-info">
                <div class="download-item-platform">🎥 ${item.platform}</div>
                <div class="download-item-time">${item.time}</div>
            </div>
            <button onclick="removeDownload(${index})" style="background: #f33; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Remove</button>
        </div>
    `).join('');
}

// Remove from recent downloads
function removeDownload(index) {
    recentDownloads.splice(index, 1);
    localStorage.setItem('recentDownloads', JSON.stringify(recentDownloads));
    displayRecentDownloads();
}

// UI Helper Functions
function showLoading(show) {
    loading.style.display = show ? 'block' : 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function hideError() {
    errorMessage.style.display = 'none';
}

function hideSuccess() {
    successMessage.style.display = 'none';
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    displayRecentDownloads();
    console.log('✅ Social Media Video Downloader Ready!');
});