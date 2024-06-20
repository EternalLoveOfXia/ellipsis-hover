<script setup>
</script>

<template>
 <div class="app">
  <div class="container">
    <p v-ellipsis-hover="{lineClamp:3}">这是一段很长的文本，当它超出容器大小时应该显示省略号，并且在hover时显示完整内容。</p>
  </div>
 </div>
</template>

<style scoped>
.app{
  width: 1000px;
  height: 600px;
  /* display: flex; */
  position: relative;
}
.container{
  width: 200px;
  height: 200px;
  background: skyblue;
  position: absolute;
  left: 0px;
  bottom: 30px;
  /* margin: auto; */
}
p{
  padding: 0;
  margin: 0;
}
</style>
