<script setup lang="ts">
import { ref } from 'vue'
import MainContainer from './components/MainContainer.vue'
import NavHeader from './components/NavHeader.vue'
import ChatItem, { ChatDataItem } from './components/ChatItem.vue'
import InputBox from './components/InputBox.vue'
const chatData = ref<ChatDataItem[]>([
  {
    type: 'your',
    id: Math.random().toString().split('.')[1].slice(0, 10),
    name: '小周',
    avatar:
      'https://img2.woyaogexing.com/2022/07/06/9e84ba5dd3ed54cc!400x400.jpg',
    content: '爱你呦~小甜',
  },
  {
    type: 'me',
    id: Math.random().toString().split('.')[1].slice(0, 10),
    name: '小甜',
    avatar:
      'https://img2.woyaogexing.com/2022/07/06/70751345f0ad2330!400x400.jpg',
    content: '我也爱你呀',
  },
  {
    type: 'tips',
    id: Math.random().toString().split('.')[1].slice(0, 10),
    content: '欢迎狗哥加入群聊~',
  },
  {
    type: 'your',
    id: Math.random().toString().split('.')[1].slice(0, 10),
    name: '狗哥',
    avatar:
      'https://img2.woyaogexing.com/2022/07/05/c566ec62e7945221!400x400.jpg',
    content: '俺老狗来也~',
  },
])
const message = ref('俺来楼')

const handleSend = (v: string) => {
  chatData.value.push({
    type: 'me',
    id: Math.random().toString().split('.')[1].slice(0, 10),
    name: '小甜',
    avatar:
      'https://img2.woyaogexing.com/2022/07/06/70751345f0ad2330!400x400.jpg',
    content: v,
  })
  message.value = ''
}
</script>

<template>
  <MainContainer>
    <!-- 顶部栏 -->
    <NavHeader :group-name="'甜粥铺'" :person-number="3" />
    <!-- 内容区域 -->
    <div class="px-4">
      <ChatItem :chat-data="chatData" />
    </div>
    <InputBox v-model="message" @send="handleSend" />
  </MainContainer>
</template>

<style scoped></style>
