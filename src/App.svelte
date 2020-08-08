<script>
  import { onMount } from "svelte";

  import { parseYTDuration } from "./utils.js";

  const THIRTY_ONE_DAYS_IN_MS = 31 * 24 * 3600 * 1000;
  const NOW = Date.now();

  let videosObj = {};

  $: videos = sortVideos(videosObj);

  function sortVideos(vidObj) {
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

  function filterTags(tags) {
    if (!tags) {
      return;
    }
    return tags.filter(t => {
      return !["yt:cc=on", "čeština", "slovenčina"].includes(t);
    });
  }

  async function fetchVideos() {
    const key = process.env.YOUTUBE_API_KEY;
    const playlistId = process.env.PLAYLIST_ID;
    let pageToken = "";

    do {
      const urlPlaylistItems = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&maxResults=9&playlistId=${playlistId}&part=snippet&pageToken=${pageToken}`;
      let response = await fetch(urlPlaylistItems);
      let json = await response.json();

      pageToken = json.nextPageToken;
      const newItemsObj = {};
      const ids = [];
      for (const item of json.items) {
        const id = item.snippet.resourceId.videoId;
        ids.push(id);
      }

      const urlVideos = `https://www.googleapis.com/youtube/v3/videos?key=${key}&id=${ids.join(
        ","
      )}&part=snippet,contentDetails`;
      response = await fetch(urlVideos);
      json = await response.json();
      for (const item of json.items) {
        const id = item.id;
        item.duration = parseYTDuration(item.contentDetails.duration);
        item.tags = filterTags(item.snippet.tags);
        item.isNew =
          NOW - Date.parse(item.snippet.publishedAt) < THIRTY_ONE_DAYS_IN_MS;
        newItemsObj[id] = item;
      }

      videosObj = { ...videos, ...newItemsObj };
    } while (pageToken);
  }

  onMount(fetchVideos);
</script>

<style>
  .App__container {
    display: flex;
    flex-wrap: wrap;
  }

  .App__container .video {
    width: 230px;
    padding: 10px;
    text-align: center;
    margin-bottom: 20px;
  }

  .App__container .video a {
    display: block;
    position: relative;
  }

  .App__container .video a:hover {
    text-decoration: none;
  }

  .thumb {
    height: 129px;
  }

  .duration {
    height: 20px;
    padding: 0 5px;
    line-height: 20px;
    text-align: right;
    text-decoration: none;
    color: white;
    position: absolute;
    right: 5px;
    bottom: 5px;
    background-color: black;
    box-sizing: border-box;
    font-size: 80%;
    border-radius: 3px;
  }

  .title {
    padding: 3px;
    text-align: left;
    color: #333;
    font-size: 90%;
    font-weight: 600;
  }

  .App__container .video img {
    max-width: 100%;
  }

  .tags {
    text-align: left;
    padding-top: 3px;
    font-size: 85%;
  }

  .tag {
    color: white;
    background-color: gray;
    padding: 0.2ex 0.5ex;
    border-radius: 3px;
  }

  .new {
    background-color: black;
  }
</style>

<div class="App__container">
  {#if videos.length === 0}
    <div>Nahrávam...</div>
  {:else}
    {#each videos as { id, duration, tags, isNew, snippet: { title, thumbnails } } (id)}
      <div class="video">
        <a
          class="thumb"
          href={`https://youtube.com/watch?v=${id}`}
          target="_blank">
          <img alt={title} src={thumbnails.medium.url} />
          <div class="duration">{duration}</div>
        </a>
        <a href={`https://youtube.com/watch?v=${id}`} target="_blank">
          <div class="title">{title}</div>
          {#if tags}
            <div class="tags">
              {#if isNew}
                <span class="tag new">nové</span>
              {/if}
              {#each tags as tag (tag)}
                <span class="tag">{tag}</span>
                {' '}
              {/each}
            </div>
          {/if}
        </a>
      </div>
    {/each}
  {/if}
</div>
