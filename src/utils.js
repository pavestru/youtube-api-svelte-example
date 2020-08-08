export function parseYTDuration(duration) {
  var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  match = match.slice(1).map(function (x) {
    if (x != null) {
      return x.replace(/\D/, "");
    }
  });

  var hours = parseInt(match[0]) || 0;
  var minutes = parseInt(match[1]) || 0;
  var seconds = parseInt(match[2]) || 0;

  if (hours > 0) {
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return `${minutes}:${seconds}`;
  }
}

export function filterTags(tags) {
  if (!tags) {
    return;
  }
  return tags.filter((t) => {
    return !["yt:cc=on", "čeština", "slovenčina"].includes(t);
  });
}

export function sortVideos(vidObj) {
  return Object.entries(vidObj)
    .map(([key, item]) => item)
    .sort((a, b) => {
      return a.snippet.publishedAt < b.snippet.publishedAt
        ? 1
        : a.snippet.publishedAt > b.snippet.publishedAt
        ? -1
        : 0;
    });
}
