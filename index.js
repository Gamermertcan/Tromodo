require('dotenv').config();

const API_KEY = process.env.YOUTUBE_API_KEY;

function search(query, amount) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=${amount}&key=${API_KEY}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error State: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      data.items.forEach(item => {
        const videoId = item.id.videoId;
        if (videoId) {
          return { "URL": `https://www.youtube.com/watch?v=${videoId}`, "channel": item.snippet.channelTitle, "title": item.snippet.title};
        } else {
          console.error("Video ID Not Found");
        }
      });
    })
    .catch(error => console.error("Error:", error));
}
