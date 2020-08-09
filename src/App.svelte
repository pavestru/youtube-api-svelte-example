<script>
  import { onMount } from "svelte";

  import Video from "./Video.svelte";
  import { parseYTDuration, filterTags, sortVideos } from "./utils.js";

  const THIRTY_ONE_DAYS_IN_MS = 31 * 24 * 3600 * 1000;
  const NOW = Date.now();

  let videosObj = {};

  $: videos = sortVideos(videosObj);

  async function fetchVideos() {
    const key = process.env.YOUTUBE_API_KEY;
    const playlistId = process.env.PLAYLIST_ID;
    let pageToken = "";

    do {
      const urlPlaylistItems = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&maxResults=21&playlistId=${playlistId}&part=snippet&pageToken=${pageToken}`;
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
</style>

<div class="App__container">
  {#if videos.length === 0}
    <div>Nahrávam...</div>
  {:else}
    {#each videos as { id, duration, tags, isNew, snippet: { title, thumbnails } } (id)}
      <Video {id} {duration} {tags} {isNew} {title} {thumbnails} />
    {/each}
  {/if}
</div>
