<script setup lang="ts">
import { reactive, ref } from 'vue'
import MainContainer from './components/MainContainer.vue'
import NavHeader from './components/NavHeader.vue'
import ChatItem, { ChatDataItem } from './components/ChatItem.vue'
import InputBox from './components/InputBox.vue'
import JoinModal, { JoinEvent } from './components/JoinModal.vue'
import { io } from 'socket.io-client'
// 创建 socket 实例
const socket = io('ws://192.168.0.103:5432')

const chatData = ref<ChatDataItem[]>([])
const curUser = reactive({
  name: '',
  avatar: '',
  id: '',
})
const userList = ref(new Map())
const message = ref('')

const handleSend = (v: string) => {
  chatData.value.push({
    type: 'me',
    id: Math.random().toString().split('.')[1].slice(0, 10),
    name: curUser.name,
    avatar: curUser.avatar,
    content: v,
    userId: curUser.id,
  })
  message.value = ''
  socket.emit('send', {
    id: Math.random().toString().split('.')[1].slice(0, 10),
    name: curUser.name,
    avatar: curUser.avatar,
    content: v,
    userId: curUser.id,
  })
}
const handleJoin = (e: JoinEvent) => {
  socket.emit('join', Object.assign({}, e))
}
socket.on('joined', (e: typeof curUser) => {
  curUser.avatar = e.avatar
  curUser.id = e.id
  curUser.name = e.name
})

// 监听 welcome
socket.on('welcome', ({ name, avatar, id, uList }) => {
  console.log(uList)

  uList.forEach((item: any[]) => {
    const [id, value] = item
    userList.value.set(id, value)
  })

  chatData.value.push({
    type: 'tips',
    id: Math.random().toString().split('.')[1].slice(0, 10),
    content: '欢迎' + name + '加入群聊~',
  })
})

// 监听消息的广播
socket.on('message', (e: any) => {
  const msg = Object.assign({}, e, { type: 'your' }) as ChatDataItem
  chatData.value.push(msg)
})

// 监听退出
socket.on('quit', (id: string) => {
  const user = userList.value.get(id)
  userList.value.delete(id)
  chatData.value.push({
    type: 'tips',
    id: Math.random().toString().split('.')[1].slice(0, 10),
    content: user.name + '退出群聊~',
  })
})
</script>

<template>
  <MainContainer>
    <!-- 顶部栏 -->
    <NavHeader :group-name="'甜粥铺'" :person-number="userList.size" />
    <!-- 内容区域 -->
    <div class="px-4">
      <ChatItem :chat-data="chatData" />
    </div>
    <InputBox v-model="message" @send="handleSend" />
  </MainContainer>
  <JoinModal @join="handleJoin" />
</template>

<style scoped></style>
