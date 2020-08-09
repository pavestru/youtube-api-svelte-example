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

export function relativeTimeDifference(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    const number = Math.round(elapsed / 1000);
    const tvar = number === 1 ? "sekundou" : "sekundami";
    return `pred ${number} ${tvar}`;
  } else if (elapsed < msPerHour) {
    const number = Math.round(elapsed / msPerMinute);
    const tvar = number === 1 ? "minútou" : "minútami";
    return `pred ${number} ${tvar}`;
  } else if (elapsed < msPerDay) {
    const number = Math.round(elapsed / msPerHour);
    const tvar = number === 1 ? "hodinou" : "hodinami";
    return `pred ${number} ${tvar}`;
  } else if (elapsed < msPerMonth) {
    const number = Math.round(elapsed / msPerDay);
    const tvar = number === 1 ? "dňom" : "dňami";
    return `pred ${number} ${tvar}`;
  } else if (elapsed < msPerYear) {
    const number = Math.round(elapsed / msPerMonth);
    const tvar = number === 1 ? "mesiacom" : "mesiacmi";
    return `pred ${number} ${tvar}`;
  } else {
    const number = Math.round(elapsed / msPerYear);
    const tvar = number === 1 ? "rokom" : "rokmi";
    return `pred ${number} ${tvar}`;
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
