<template>
  <div id="app">
    <img alt="Vue logo" src="@/assets/logo.png" class="rotateimg180" />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="stylus">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px

.rotateimg180 {
  transform: rotate(180deg);
}
</style>
