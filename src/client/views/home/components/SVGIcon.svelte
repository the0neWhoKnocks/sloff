<style>
  .svg-icon {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
</style>

<script>
  export let icon = undefined;
</script>

<svg class="svg-icon">
  <use
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xlink:href={`#ui-icon__${icon}`}
  ></use>
</svg>