document.getElementById("playlistUpload").addEventListener("change", handleFileUpload);
const channelGrid = document.getElementById("channelGrid");
const videoPlayer = document.getElementById("videoPlayer");
const errorElement = document.getElementById("error");

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.type !== "text/plain") {
    showError("Please upload a valid M3U file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target.result;
    try {
      const channels = parseM3U(content);
      displayChannels(channels);
      errorElement.textContent = ""; // Clear any previous error
    } catch (e) {
      showError("Failed to parse playlist. Ensure it's a valid M3U file.");
    }
  };
  reader.readAsText(file);
}

function displayChannels(channels) {
  channelGrid.innerHTML = ""; // Clear previous channels
  channels.forEach((channel) => {
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h3");
    title.textContent = channel.name;

    const playButton = document.createElement("button");
    playButton.textContent = "Play";
    playButton.onclick = () => playChannel(channel.url);

    card.appendChild(title);
    card.appendChild(playButton);
    channelGrid.appendChild(card);
  });
}

function playChannel(url) {
  videoPlayer.src = url;
  videoPlayer.play();
}

function showError(message) {
  errorElement.textContent = message;
}
