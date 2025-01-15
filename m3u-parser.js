function parseM3U(content) {
  const lines = content.split("\n");
  const channels = [];
  lines.forEach((line, index) => {
    if (line.startsWith("#EXTINF")) {
      const name = line.split(",")[1].trim();
      const url = lines[index + 1]?.trim();
      if (url) {
        channels.push({ name, url });
      }
    }
  });
  return channels;
}
