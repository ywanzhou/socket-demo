<script setup lang="ts">
import { ref } from 'vue'
const emits = defineEmits({
  // 校验 join 事件
  join: (name: string) => {
    console.log(name)

    if (name) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  },
})

const name = ref('')
const isOpen = ref(true)
const handleJoin = () => {
  emits('join', name.value)
  isOpen.value = false
}
</script>
<template>
  <div :class="['modal', isOpen ? 'modal-open' : '']">
    <div class="modal-box">
      <h3 class="font-bold text-lg text-center">加入群聊</h3>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">请输入你的名字</span>
        </label>
        <input
          type="text"
          placeholder="your name"
          v-model="name"
          class="input input-bordered w-full"
          @keyup.enter="handleJoin"
        />
      </div>
      <div class="modal-action justify-center">
        <label for="my-modal" class="btn px-8" @click="handleJoin">进入</label>
      </div>
    </div>
  </div>
</template>
