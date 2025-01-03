require('dotenv').config();

const API_KEY = process.env.YOUTUBE_API_KEY;

function search(query, amount) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=${amount}&key=${API_KEY}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP hata durumu: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      data.items.forEach(item => {
        const videoId = item.id.videoId;
        if (videoId) {
          console.log(`Başlık: ${item.snippet.title}`);
          console.log(`Kanal: ${item.snippet.channelTitle}`);
          console.log(`URL: https://www.youtube.com/watch?v=${videoId}`);
        }
      });
    })
    .catch(error => console.error("Hata:", error));
}