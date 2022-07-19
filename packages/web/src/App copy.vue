<script setup lang="ts">
import { io } from 'socket.io-client'
// 创建 socket 实例
const socket = io('ws://localhost:5432')
const send = () => {
  socket.emit('send', '来自客户端的消息')
}
socket.on('back', e => {
  console.log(e)
})
</script>

<template>
  <button class="btn btn-success" @click="send">发送</button>
</template>

<style scoped></style>
