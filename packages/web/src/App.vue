<script setup lang="ts"></script>

<template>
  <div
    class="from-primary to-secondary text-primary-content grid place-items-center items-end bg-gradient-to-br pt-20 h-screen relative"
  >
    <svg
      class="fill-secondary col-start-1 row-start-1 h-auto w-full"
      width="1600"
      height="595"
      viewBox="0 0 1600 595"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 338L53.3 349.2C106.7 360.3 213.3 382.7 320 393.8C426.7 405 533.3 405 640 359.3C746.7 313.7 853.3 222.3 960 189.2C1066.7 156 1173.3 181 1280 159.2C1386.7 137.3 1493.3 68.7 1546.7 34.3L1600 0V595H1546.7C1493.3 595 1386.7 595 1280 595C1173.3 595 1066.7 595 960 595C853.3 595 746.7 595 640 595C533.3 595 426.7 595 320 595C213.3 595 106.7 595 53.3 595H0V338Z"
      ></path>
    </svg>

    <div
      class="text-base-content glass xl:rounded-box bg-opacity-60 xl:pb-0 absolute ywz-container inset-0 m-auto"
    >
      <!-- 顶部栏 -->
      <div class="navbar text-primary-content rounded-box space-x-1 h-16">
        <div class="flex-1">
          <a class="normal-case text-xl pl-4">甜粥铺(312)</a>
        </div>
        <div class="flex-none">
          <button class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-5 h-5 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="px-4">
        <div
          class="chat-area card w-full bg-base-300 shadow-xl px-8 pt-4 overflow-auto"
        >
          <!-- 内容区域 -->
          <!-- 左 -->
          <div class="my-4">
            <div class="left flex">
              <div class="avatar mr-2">
                <div class="w-12 h-12 rounded">
                  <img
                    src="https://img2.woyaogexing.com/2022/07/06/9e84ba5dd3ed54cc!400x400.jpg"
                  />
                </div>
              </div>

              <div class="user">
                <span>小周</span>
                <div class="bg-left p-2 mt-2 rounded-t max-w-192">
                  爱你呦~小甜
                </div>
              </div>
            </div>
          </div>
          <!-- 右 -->
          <div class="my-4">
            <div class="right flex flex-row-reverse">
              <div class="avatar ml-2">
                <div class="w-12 h-12 rounded">
                  <img
                    src="https://img2.woyaogexing.com/2022/07/06/70751345f0ad2330!400x400.jpg"
                  />
                </div>
              </div>

              <div class="user flex flex-col">
                <span class="self-end">小甜</span>
                <div class="bg-right p-2 mt-2 rounded-t max-w-192">
                  我也爱你呀
                </div>
              </div>
            </div>
          </div>
          <div class="my-4 mx-auto">欢迎狗哥加入群聊~</div>

          <!-- 左 -->
          <div class="my-4">
            <div class="left flex">
              <div class="avatar mr-2">
                <div class="w-12 h-12 rounded">
                  <img
                    src="https://img2.woyaogexing.com/2022/07/05/c566ec62e7945221!400x400.jpg"
                  />
                </div>
              </div>

              <div class="user">
                <span>狗哥</span>
                <div class="bg-left p-2 mt-2 rounded-t max-w-192">
                  别瞎修恩爱
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-control mt-4">
        <div class="input-group px-4">
          <input
            type="text"
            placeholder="..."
            class="input input-bordered w-full"
            style="--tw-bg-opacity: 0.7"
          />
          <button class="btn btn-square" style="--tw-bg-opacity: 0.7">
            发送
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- <button class="btn btn-primary">Button</button> -->
</template>

<style scoped>
.ywz-container {
  width: 1080px;
  height: 720px;
}
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
