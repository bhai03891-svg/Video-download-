# 🎬 Social Media Video Downloader

Download videos from **TikTok, Instagram, YouTube, Facebook, and Snapchat** with ease!

## ✨ Features

- 🎵 **TikTok** - Download TikTok videos with sound
- 📸 **Instagram** - Download Instagram Reels and videos
- 🎬 **YouTube** - Download YouTube videos in multiple qualities
- 👍 **Facebook** - Download Facebook videos
- 😊 **Snapchat** - Support for Snapchat links
- 📱 **Responsive Design** - Works on desktop and mobile
- 💾 **Recent Downloads** - Track your recent downloads
- 🎨 **Beautiful UI** - Modern and user-friendly interface

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/bhai03891-svg/Video-download-.git
cd Video-download-

# Install dependencies
npm install

# Start the server
npm start
```

The app will be available at `http://localhost:3000`

## 📖 Usage

1. **Open the App**: Go to `http://localhost:3000` in your browser
2. **Select Platform**: Choose which social media platform the video is from
3. **Paste URL**: Paste the video URL in the input field
4. **Choose Quality**: Select desired video quality (for YouTube)
5. **Download**: Click "Download Video" button
6. **Save**: Your video will be ready to download!

## 🛠️ API Endpoints

### Download Endpoints

```
POST /api/download/tiktok
POST /api/download/instagram
POST /api/download/youtube
POST /api/download/facebook
POST /api/download/snapchat
```

### Request Body
```json
{
  "url": "https://www.tiktok.com/video/...",
  "quality": "720"  // Optional, for YouTube
}
```

### Response
```json
{
  "success": true,
  "platform": "TikTok",
  "url": "https://download-url...",
  "title": "Video Title",
  "thumbnail": "https://thumbnail-url..."
}
```

## 📁 Project Structure

```
Video-download-/
├── server.js              # Express server & API routes
├── package.json           # Project dependencies
├── public/
│   ├── index.html        # Main HTML page
│   ├── styles.css        # Styling
│   └── script.js         # Frontend logic
└── README.md             # This file
```

## 🔧 Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Axios** - HTTP client
- **CORS** - Cross-origin resource sharing
- **Cheerio** - HTML parser
- **HTML5/CSS3/JavaScript** - Frontend

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
```

## 🎯 Supported Platforms

| Platform | Status | Features |
|----------|--------|----------|
| TikTok | ✅ Working | Download with audio |
| Instagram | ✅ Working | Download Reels & Posts |
| YouTube | ✅ Working | Multiple quality options |
| Facebook | ✅ Working | Download videos |
| Snapchat | ⚠️ Limited | Links only (strict restrictions) |

## ⚠️ Legal Notice

This tool is for **educational purposes only**. 

**Important:**
- Always respect copyright and intellectual property rights
- Only download content you own or have permission to download
- Check the terms of service of each platform
- Don't use for commercial purposes without permission

## 🐛 Troubleshooting

### "Failed to download" error
- Check if the URL is correct and valid
- Make sure the video is still available on the platform
- Try a different video

### Port already in use
```bash
# Change port in server.js or use:
PORT=3001 npm start
```

### Module not found error
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📝 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

## 👨‍💻 Author

**bhai03891-svg**
- GitHub: [@bhai03891-svg](https://github.com/bhai03891-svg)

## 🙏 Acknowledgments

- Built with Node.js and Express.js
- Inspired by the need for easy video downloading
- Thanks to all contributors and users!

## 📞 Support

For issues, questions, or suggestions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Contact via email: bhai03891@gmail.com

---

**⭐ If you find this useful, please give it a star!**

Made with ❤️ by bhai03891-svg
