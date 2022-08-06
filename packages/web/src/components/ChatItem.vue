<script setup lang="ts">
export interface ChatDataItem {
  type: 'your' | 'me' | 'tips'
  id: string
  name?: string
  content: string
  avatar?: string
  userId?: string
}
interface Props {
  chatData: ChatDataItem[]
}
const props = defineProps<Props>()
const emits = defineEmits(['click-user'])
const handleClickAvatar = (e: ChatDataItem) => {
  emits('click-user', {
    name: e.name,
    id: e.userId,
    avatar: e.avatar,
  })
}
</script>
<template>
  <div
    class="chat-area card w-full bg-base-300 shadow-xl px-8 pt-4 overflow-auto"
  >
    <template v-for="item in props.chatData" :key="item.id">
      <div class="my-4" v-if="item.type === 'me' || item.type === 'your'">
        <div
          :class="[
            'flex',
            item.type === 'your' ? 'left' : 'right flex-row-reverse',
          ]"
        >
          <!-- 头像 -->
          <div
            :class="['avatar', item.type === 'your' ? 'mr-2' : 'ml-2']"
            @click="handleClickAvatar(item)"
          >
            <div class="w-12 h-12 rounded">
              <img :src="item.avatar" />
            </div>
          </div>
          <!-- 消息 -->
          <div :class="['user', item.type === 'me' ? 'flex flex-col' : '']">
            <span
              class="text-base-content/100"
              :class="item.type === 'me' ? 'self-end' : ''"
              >{{ item.name }}</span
            >
            <div
              class="p-2 mt-2 rounded-t max-w-192 text-base-content/100"
              :class="item.type === 'your' ? 'bg-left' : 'bg-right'"
            >
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>

      <div v-else class="my-4 mx-auto text-base-content/100">
        {{ item.content }}
      </div>
    </template>
  </div>
</template>
<style scoped>
.chat-area {
  --tw-bg-opacity: 0.7;
  height: calc(720px - 148px);
}
/* 隐藏滚动条 */
.chat-area::-webkit-scrollbar {
  display: none;
}
.bg-left {
  --tw-bg-opacity: 0.8;
  background-color: hsl(var(--a) / var(--tw-bg-opacity));
}
.max-w-192 {
  max-width: 48rem;
}
.bg-right {
  --tw-bg-opacity: 0.8;
  background-color: hsl(var(--p) / var(--tw-bg-opacity));
}
</style>
