<script>
  export let id;
  export let duration;
  export let tags;
  export let isNew;
  export let title;
  export let thumbnails;
  export let ago;
</script>

<style>
  .video {
    width: 230px;
    padding: 10px;
    margin-bottom: 20px;
    box-sizing: content-box;
  }

  .video a {
    display: block;
  }

  .video a:hover {
    text-decoration: none;
  }

  .thumb {
    height: 129px;
    overflow: hidden;
    position: relative;
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
    padding: 5px 1px 1px 1px;
    text-align: left;
    color: #333;
    font-weight: 600;
    font-size: 16px;
    line-height: 1.3;
  }

  .video a:hover .title {
    color: #777;
  }

  .video img {
    max-width: none;
    width: 100%;
    transition: width 700ms, margin 700ms;
  }

  .video a:hover img {
    margin: -10%;
    width: 120%;
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

  .ago {
    margin-top: 5px;
    font-size: 80%;
    color: #999;
  }
</style>

<div class="video">
  <a href={`https://youtube.com/watch?v=${id}`} target="_blank">
    <div class="thumb">
      <img alt={title} src={thumbnails.medium.url} />
      <div class="duration">{duration}</div>
    </div>
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
    <div class="ago">zverejnené {ago}</div>
  </a>
</div>
