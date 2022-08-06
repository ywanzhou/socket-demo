<script setup lang="ts">
import { reactive, ref } from 'vue'
import MainContainer from './components/MainContainer.vue'
import NavHeader from './components/NavHeader.vue'
import ChatItem, { ChatDataItem } from './components/ChatItem.vue'
import InputBox from './components/InputBox.vue'
import JoinModal, { JoinEvent } from './components/JoinModal.vue'
import YwzDrawer from './components/YwzDrawer.vue'
import { io } from 'socket.io-client'
// 创建 socket 实例
const socket = io('ws://localhost:5432')

const chatData = ref<ChatDataItem[]>([])
const curUser = reactive({
  name: '',
  avatar: '',
  id: '',
})
const userList = ref(new Map())
const message = ref('')
const drawerShow = ref(false)

const handleJoin = (e: JoinEvent) => {
  socket.emit('join', Object.assign({}, e))
}
const handleOpenDrawer = () => {
  drawerShow.value = true
}
socket.on('joined', (e: typeof curUser) => {
  curUser.avatar = e.avatar
  curUser.id = e.id
  curUser.name = e.name
})

// 监听 welcome
socket.on('welcome', ({ name, uList }) => {
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

const handleSend = (v: string) => {
  const obj = {
    id: Math.random().toString().split('.')[1].slice(0, 10),
    name: curUser.name,
    avatar: curUser.avatar,
    content: v,
    userId: curUser.id,
  }
  // 在 chatData 中新增一条数据，表示自己发送的
  const type: 'me' = 'me'
  chatData.value.push(Object.assign({}, { type }, obj))
  // 清空 input box 中的内容
  message.value = ''
  // 发出send事件，将消息发送出去
  socket.emit('send', obj)
}
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
  <!-- 外层容器 -->
  <MainContainer>
    <!-- 顶部栏 -->
    <NavHeader
      :group-name="'甜粥铺'"
      :person-number="userList.size"
      @more="handleOpenDrawer"
    />
    <!-- 内容区域 -->
    <div class="px-4">
      <ChatItem :chat-data="chatData" />
    </div>
    <InputBox v-model="message" @send="handleSend" />
  </MainContainer>
  <JoinModal @join="handleJoin" />
  <YwzDrawer v-model="drawerShow">
    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
      <!-- Sidebar content here -->
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </YwzDrawer>
</template>

<style scoped></style>
