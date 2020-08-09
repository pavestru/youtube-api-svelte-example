<script>
  export let id;
  export let duration;
  export let tags;
  export let isNew;
  export let title;
  export let thumbnails;
</script>

<style>
  .video {
    width: 230px;
    padding: 10px;
    text-align: center;
    margin-bottom: 20px;
  }

  .video a {
    display: block;
    position: relative;
  }

  .video a:hover {
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

  .video img {
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

<div class="video">
  <a class="thumb" href={`https://youtube.com/watch?v=${id}`} target="_blank">
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
