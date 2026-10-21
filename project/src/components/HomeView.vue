<template>
    <div class="welcome-container" :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${items[currentIndex].image})` }">
      <div class="article">
        <h2 class="active-title">{{ items[currentIndex].title }}</h2>
        <p class="active-desc">{{ items[currentIndex].subtitle }}</p>
        <router-link :to="items[currentIndex].link" class="explore-btn">查看更多</router-link>
      </div>
      <div class="wheel-menu">
        <div 
          v-for = "(item, index) in items" 
          :key="index"
          class="wheel-item"
          :class="{ active: currentIndex === index }"
          @click="selectItem(index)"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="pagination-dots">
        <span 
          v-for="(item, index) in items" 
          :key="index"
          class="dot"
          :class="{ active: currentIndex === index }"
          @click="selectItem(index)"
        ></span>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import webImg from '@/assets/code.avif'
import photoImg from '@/assets/photo.avif'
import lifeImg from '@/assets/life.avif'
import winImg from '@/assets/TZ.jpg'

const items =ref([
  { title: '關於 TZ', subtitle: '以多重角色與經歷為經緯，將一路走來的點滴與養分，揉合成此刻踏實前行的自己。', link: '/about', image: winImg},
  { title: '網頁開發', subtitle: '以清晰的邏輯為骨架，將抽象的構想與排版，一行行刻劃成真實運行的專案。', link: '/web', image: webImg},
  { title: '靜態攝影', subtitle: '以觀景窗為邊界，將日常的光影與瞬間透過鏡頭，裁切成永恆留存的片刻。', link: '/photo', image: photoImg},
  { title: '文字碎片', subtitle: '以文字為載體，不急不徐地梳理日常的韻律，寫下屬於自己的安靜軌跡。', link: '/text', image: lifeImg}
  
])

const currentIndex = ref(0)

const selectItem = (index) => {
  currentIndex.value = index
}
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}
</style>

<style scoped>
.welcome-container{
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-size: cover;
  background-position: 90% center;
  transition: background-image 0.5s ease-in-out;
}

.article {
  margin-left: 50px;
  z-index: 10;
}

.active-title {
  font-size: 5rem;
  color: #fff; 
  margin: 50px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.active-desc {
  font-size: 1.2rem;
  color: #fff;
  margin: 50px;
  width: 475px;
}

.explore-btn {
  display: inline-block;
  margin: 30px 50px;
  padding: 10px 24px;
  background-color: #343638;
  color: #fff;
  border-radius: 30px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s;
}

.explore-btn:hover {
  background-color: #343638;
}

/* 右側旋轉選單模擬 */
.wheel-menu {
  position: absolute;
  right: 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: right;
}

.wheel-item {
  font-size: 2rem;
  font-weight: bold;
  color: rgba(240, 240, 240, 0.6);
  cursor: pointer;
  transition: all 0.3s ease;
  transform: rotate(-10deg); /* 帶點微傾斜的視覺感 */
}

.wheel-item:hover {
  color: #fff;
}
.wheel-item.active{
  color: #fff;
  font-size: 2.5rem;
  transform: rotate(0deg);
}

.pagination-dots {
  position: absolute;
  right: 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #aaa;
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background-color: #fff;
  border-color: #fff;
  transform: scale(1.2);
}
</style>
