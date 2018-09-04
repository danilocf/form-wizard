<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> -
      <router-link to="/register">Register</router-link> - 
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  
  a {
    color: #2c3e50;
    
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
