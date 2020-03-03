<template>
  <div id="app">
    <Header />
    <TabList />
    <Board />
  </div>
</template>

<script>
import Header from './components/Header';
import TabList from './components/TabList';
import Board from './components/Board';

export default {
  name: 'App',
  components: { Header, TabList, Board }
}
</script>

<style lang="scss">

html, body, div {
  margin: 0;
  padding: 0;
};

div {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
}
</style>
