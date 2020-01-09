<script>
	import { onMount } from 'svelte';

  let videos = [];

  async function fetchVideos() {
    const key = process.env.YOUTUBE_API_KEY;
		const playlistId = process.env.PLAYLIST_ID;
    let pageToken = "";

    do {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&playlistId=${playlistId}&part=snippet&pageToken=${pageToken}`;
      const response = await fetch(url);
      const json = await response.json();
      pageToken = json.nextPageToken;
      videos = [...videos, ...json.items];
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
    width: 250px;
    padding: 10px;
    text-align: center;
  }

  .App__container .video img {
    max-width: 100%;
  }
</style>

<div class="App__container">
  {#if videos.length === 0}
    <div>Loading...</div>
  {:else}
    {#each videos as { snippet: { resourceId, title, thumbnails } } (resourceId.videoId)}
      <div class="video">
        <a href={`https://youtube.com/watch?v=${resourceId.videoId}`}>
          <img alt={title} src={thumbnails.medium.url} />
          <br />
          {title}
        </a>
      </div>
    {/each}
  {/if}
</div>
