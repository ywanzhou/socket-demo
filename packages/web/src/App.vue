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
interface User {
  name: string
  avatar: string
  id: string
  new: boolean
}
const userList = ref<Map<string, User>>(new Map())
const message = ref('')
const drawerShow = ref(false)
const userChatData = ref<Map<string, ChatDataItem[]>>(new Map())
const chatUserId = ref('')
const userMessage = ref('')

const handleJoin = (e: JoinEvent) => {
  socket.emit('join', Object.assign({}, e))
}
const handleOpenDrawer = (user: typeof curUser) => {
  chatUserId.value = user.id
  const u = userList.value.get(chatUserId.value)
  if (u) {
    u.new = false
  }
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

// 群聊发送消息
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

// 私聊发送消息
const handleSendUser = (v: string) => {
  const obj = {
    id: Math.random().toString().split('.')[1].slice(0, 10),
    name: curUser.name,
    avatar: curUser.avatar,
    content: v,
    userId: curUser.id,
    sendUserId: chatUserId.value,
  }
  // 在 userChatData 中新增一条数据，表示自己发送的
  const type: 'me' = 'me'

  if (!userChatData.value.has(chatUserId.value)) {
    userChatData.value.set(chatUserId.value, [])
  }
  const _chatData = userChatData.value.get(chatUserId.value) ?? []
  _chatData.push(Object.assign({}, { type }, obj))
  // 清空 input box 中的内容
  userMessage.value = ''
  // 发出send事件，将消息发送出去
  socket.emit('send-user', obj)
}
// 监听接受消息
socket.on('message-user', (e: any) => {
  const msg = Object.assign({}, e, { type: 'your' }) as ChatDataItem
  const sendId = e.userId
  if (!userChatData.value.has(sendId)) {
    userChatData.value.set(sendId, [])
  }
  const chatData = userChatData.value.get(sendId) ?? []
  chatData.push(msg)
  const u = userList.value.get(sendId)
  if (u) {
    u.new = true
  }
})
// 监听退出
socket.on('quit', (id: string) => {
  const user = userList.value.get(id)
  userList.value.delete(id)
  chatData.value.push({
    type: 'tips',
    id: Math.random().toString().split('.')[1].slice(0, 10),
    content: user?.name + '退出群聊~',
  })
})
// 点击用户头像
const handleClickUserAvatar = (e: typeof curUser) => {
  if (e.id === curUser.id) {
    return
  }
  handleOpenDrawer(e)
}
</script>

<template>
  <!-- 外层容器 -->
  <MainContainer>
    <!-- 顶部栏 -->
    <NavHeader
      :group-name="'甜粥铺'"
      :person-number="userList.size"
      @more="handleOpenDrawer"
      :user-list="userList"
      :cur-user-id="curUser.id"
    />
    <!-- 内容区域 -->
    <div class="px-4">
      <ChatItem :chat-data="chatData" @click-user="handleClickUserAvatar" />
    </div>
    <InputBox v-model="message" @send="handleSend" />
  </MainContainer>
  <JoinModal @join="handleJoin" />
  <YwzDrawer v-model="drawerShow">
    <div class="p-4 w-[920px]">
      <div class="px-4">
        <h4 class="text-center mb-2 text-xl">
          {{ userList.get(chatUserId)?.name }}
        </h4>
        <ChatItem
          style="height: calc(100vh - 134px)"
          :chat-data="userChatData.get(chatUserId) ?? []"
        />
      </div>
      <InputBox v-model="userMessage" @send="handleSendUser" />
    </div>
  </YwzDrawer>
</template>

<style scoped></style>
