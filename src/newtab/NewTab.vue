<template>
  <form id="control-row">
    <label for="input">My Wallet Address:</label>
    <input
      type="text"
      id="input"
      value="0x0416B53d81eE3d868bBE3CE7D93980B45159b8A0"
    />
    <input type="text" id="input" style="width: 400px;" />
    <br />
    <button id="go">Save</button>
  </form>
  <span id="message" hidden></span>

  <button id="save">Save</button>
  <button id="fetch">Fetch</button>
  <button id="insert">Random</button>

  <div id="img"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
