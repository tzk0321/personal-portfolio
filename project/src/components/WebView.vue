<template>
  <div class="skill">
    <h1 class="title">技能專長</h1>
    <hr class="glow-line" />
    <div class="tech-content">
      <div
        v-for = "(item, index) in items" 
        :key="index"
        class="tech-card"
      >
        <i :class="item.icon"></i>
      </div>
    </div>
  </div>

  <div class="skill">
    <h1 class="title">資訊證照</h1>
    <hr class="glow-line" />
    <ul class="if">
      <li>(TQC+) 軟體開發知識</li>
      <li>(TQC+) 網頁程式設計 HTML5 第2版</li>
      <li>電腦硬體裝修 - 丙級技術士證</li>
    </ul>
  </div>

  <div class="skill">
    <h1 class="title">作品集</h1>
    <hr class="glow-line" />
    <div class="article1">
      <div
        v-for="( project, index ) in projects"
        :key="index"
        class="project"
        @click="selectProject(index)"
      >
        <h3>{{ project.title }}</h3>
        <p>{{ project.article }}</p>
        
        <div class="tags">
          <span 
            v-for="(tag, tagIndex) in project.tags" 
            :key="tagIndex" 
            class="tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>

  <section class="gallery-section">
  <div class="section-header">
    <h2>{{ currentProject.title }}</h2>
  </div>

  <!-- ★ 關鍵雙欄容器 ★ -->
  <div class="detail-content-wrapper">
    
    <!-- ------- 左側：圖片輪播 + 圓點 + 底部按鈕 ------- -->
    <div class="gallery-column">
      <div class="gallery-container" ref="galleryContainer">
        <div v-for="(show, index) in currentProject.shows" :key="index" class="gallery-show">
          <img :src="show.image" :alt="show.title" />
        </div>
      </div>
      
      <!-- 圓點切換 -->
      <div class="gallery-dots">
        <span 
          v-for="(show, index) in currentProject.shows" 
          :key="index"
          :class="['dot', { active: currentIndex === index }]"
          @click="goToSlide(index)"
        ></span>
      </div>

      <!-- ★ 放在圖片的正下方並保持距離 ★ -->
      <div class="action-buttons-under-gallery">
        <button class="custom-btn" disabled title="此專案程式碼暫不公開">原始碼暫未公開</button>
        <button class="custom-btn" disabled title="線上展示建置中">Demo 體驗中 🚧</button>
      </div>
    </div>

    <!-- ------- 右側：詳細介紹（Tabs 切換區） ------- -->
    <div class="info-panel-column">
      <!-- 頂部 Tab 切換按鈕 -->
      <div class="tab-header">
        <button 
          v-for="(tab, index) in tabs" 
          :key="index"
          :class="['tab-btn', { active: activeTab === index }]"
          @click="activeTab = index"
        >
          {{ tab.title }}
        </button>
      </div>

      <!-- Tab 內容顯示區 -->
      <div class="tab-content">
        <!-- Tab 0: 亮點與痛點 -->
        <div v-if="activeTab === 0" class="tab-pane">
          <p v-if="currentProject.background">{{ currentProject.background }}</p>
          <!-- 如果沒有 background 欄位，自動顯示舊有的 features 列表 -->
          <ul v-else-if="currentProject.features" class="feature-list">
            <li v-for="feature in currentProject.features" :key="feature.title" class="feature-item">
              <div class="feature-header">
                <span class="icon">{{ feature.icon }}</span>
                <strong>{{ feature.title }}</strong>
              </div>
              <p>{{ feature.desc }}</p>
            </li>
          </ul>
        </div>

        <!-- Tab 1: 角色與貢獻 -->
        <div v-else-if="activeTab === 1" class="tab-pane">
          <p>{{ currentProject.role || '獨立負責全站介面設計、Vue 組件封裝與前端開發。' }}</p>
        </div>

        <!-- Tab 2: 技術與突破 -->
        <div v-else-if="activeTab === 2" class="tab-pane">
          <p>{{ currentProject.highlights || '優化動態表單與圖片輪播跨裝置（RWD）適配體驗。' }}</p>
        </div>

        <div v-else-if="activeTab === 3" class="tab-pane">
          <p>{{ currentProject.skill || '優化動態表單與圖片輪播跨裝置（RWD）適配體驗。' }}</p>
        </div>
      </div>
    </div>

  </div>
</section>


  <div class="footer">
    <div>
      <h3>Contact Me</h3>
      <p>
        如果你對我的網頁作品、攝影創作感興趣，或有任何合作機會，隨時歡迎交流！ <br>
        ✉️ Mail: tz0966588319@gmail.com <br>
        💻 GitHub: Loading... <br>
        🌐 LinkedIn: Loading...
      </p>
    </div>
    <div class="contact-icon"> <!--連結還沒放-->
      <a href="#" alt="GitHub"><i class="devicon-github-original"></i></a>
      <a href="#" alt="LinkedIn"><i class="devicon-linkedin-plain"></i></a>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import show1 from '@/assets/1.PNG'
import show2 from '@/assets/2.PNG'
import show3 from '@/assets/3.PNG'
import show4 from '@/assets/4.PNG'
import show5 from '@/assets/5.PNG'
import show6 from '@/assets/6.PNG'
import show7 from '@/assets/my1.PNG'

const items = ref([
  { icon: 'devicon-html5-plain' },
  { icon: 'devicon-css3-plain' },
  { icon: 'devicon-javascript-plain' },
  { icon: 'devicon-vuejs-plain' },
  { icon: 'devicon-mysql-plain' }
])



// 1. 定義右側頁籤（Tabs）選單
const tabs = ref([
  { title: '🎯 專案背景' },
  { title: '✨ 核心亮點' },
  { title: '👤 角色與貢獻' },
  { title: '🚀 技術與突破' }
])

// 當前啟用的 Tab 索引 (預設 0)
const activeTab = ref(0)

// 2. 專案完整資料 (包含新增的背景、角色與技術亮點)
const projects = ref([
  {
    title: '專題作品-食物共享平台',
    article: '以「綠色食物」與永續減廢為核心，專為解決家庭剩食開發的分享平台。透過食材管理與媒合機制，讓資源有效流通，輕鬆實踐低碳共享生活。',
    tags: ['HTML5', 'CSS3', 'php', 'MySQL'],
    shows: [
      { image: show1, title: '預覽畫面展示圖' },
      { image: show2, title: '餐點總覽展示圖' },
      { image: show3, title: '搜尋結果展示圖' },
      { image: show4, title: '餐點詳情展示圖' },
      { image: show5, title: '留言板展示圖' },
      { image: show6, title: '登入畫面展示图' }
    ],
    // 🔽 新增對應 Tab 的欄位資料
    background: '🏆 榮獲 屏東大學 114學年度資訊學院實務專題成果競賽 優勝 \n \n 現代生活中，「量販包裝」常使單身或小家庭囤積過多食材；校園與企業活動亦易因訂購過量產生大量剩食。過去多依賴社群隨機發文，面臨資訊零散、缺乏即時性的痛點。\n本專案以永續減廢與低碳生活為核心，打造系統化媒合平台，精準串聯社區與校園的剩食需求，讓資源有效流動，實踐互助共享的永續願景。',
    role: '1. 直覺化引導式表單：設計 Step 1 至 4 的分階段動態填寫流程，有效降低使用者的刊登門檻。\n 2. 高效即時媒合：內建即時留言與預約機制，擺脫傳統社群訊息雜亂的痛點，精準對接需求。\n 3. 餐點預覽與狀態追蹤：提供即時卡片預覽與清楚的預約狀態標籤，讓資源流向一目了然。',
    highlights: '本專案由我全權負責主題發想與核心功能規劃，並獨立使用 HTML 與 CSS 完成前端介面的切版與畫面呈現。後端邏輯與資料庫架構則透過與 AI 協作進行建置，精準對接資料流程，成功打造出完整的食物共享平台。',
    skill: '本專案在開發過程中的關鍵突破與深刻體悟：\n 1. 「先求有再求好」的迭代思維：擺脫一味追求酷炫功能的迷思，轉而聚焦於核心痛點與使用者體驗，確保產品流程流暢直覺。\n 2. 高效 Prompt 工程與 AI 協作：透過精準的需求拆解引導 AI 共同建置後端與資料庫，並深入理解前後端實際運作機制與資料對接。\n 3. 使用者體驗的細節琢磨：從介面排版、按鈕互動到多欄位文字處理，體會到微小設計對整體質感的關鍵影響。'
  },
  {
    title: '個人作品集',
    article: '專為展示個人專案與技術能力打造的 Vue.js 響應式作品集網頁。',
    tags: ['Vue.js', 'HTML5', 'CSS3'],
    shows: [
      { image: show7, title: '首頁展示圖' },
      { image: show2, title: '作品列表圖' }
    ],
    background: '為了以更專業且動態的方式呈現個人技術能力與作品細節，擺脫傳統 PDF 履歷的局限性，打造具備高度互動性的響應式作品集網站。',
    role: '個人獨立開發，從 UI/UX 介面設計（Glassmorphism 視覺風格）、前端組件拆分到部署發布全流程一手包辦。',
    highlights: '採用 Vue 3 Composition API 與 computed 計算屬性實現高效無刷新頁面切換；搭配 CSS Flexbox/Grid 打造全裝置相容的現代風響應式佈局。'
  },
  {
    title: '專題作品',
    article: '以「綠色食物」與永續減廢為核心，專為解決家庭剩食開發的分享平台。透過食材管理與媒合機制，讓資源有效流通，輕鬆實踐低碳共享生活。',
    tags: ['HTML5', 'CSS3', 'Python', 'MySQL'],
    shows: [
      { image: show1, title: '系統介面圖' }
    ],
    background: '針對特定數據分析與食材推播的需求，結合 Python 進行後台數據處理與搜尋優化，提升媒合精準度。',
    role: '負責前端視覺維護、介面互動邏輯撰寫及 API 數據導出整合。',
    highlights: '優化關鍵字篩選演算法回應時間，並串接異步資料載入機制，確保使用者操作時無卡頓感。'
  }
])

// 當前選中的專案索引
const activeIndex = ref(0)

// 取得當前要顯示的專案物件
const currentProject = computed(() => projects.value[activeIndex.value])

// 輪播圖相關控制
const galleryContainer = ref(null)
const currentIndex = ref(0)

// 點擊下方卡片切換專案：將輪播圖歸零，並把 Tab 重置回第一個
const selectProject = (index) => {
  activeIndex.value = index
  currentIndex.value = 0
  activeTab.value = 0 // 切換專案時，自動回到第一個 Tab (✨ 亮點與痛點)
  if (galleryContainer.value) {
    galleryContainer.value.scrollTo({ left: 0, behavior: 'instant' })
  }
}

// 點擊圓點切換圖片
const goToSlide = (index) => {
  currentIndex.value = index
  if (galleryContainer.value) {
    const width = galleryContainer.value.clientWidth
    galleryContainer.value.scrollTo({
      left: width * index,
      behavior: 'smooth'
    })
  }
}
</script>


<style>
html, body{
  background-color: #071828;
  width: 100vw;
  /*min-height: 100vh;*/
  height: auto;     
  overflow-y: auto;
  overflow-x: hidden; 
}
.skill{
  margin: 50px 175px 150px 175px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title{
  margin: 20px 10px 0px 10px;
  padding: 10px;
  color: #e9e8e8;
}
.glow-line {
  border: none;            
  height: 2px;                 
  background-color: #e9e8e8;    
  margin: 10px 10px;          
  box-shadow: 0 0 5px rgba(100, 200, 255, 0.6), 
              0 0 10px rgba(100, 200, 255, 0.4);
}
.tech-content{
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 10px 25px;
}
.tech-card{
  padding: 10px;
}
.tech-card:hover {
  transform: translateY(-4px);
}
.tech-card i {
  font-size: 2.5rem;
  color: #d9d9d9; 
  transition: color 0.3s ease;
}
.tech-card:hover i {
  color: #fff;
}
.article1{
  margin: 20px;
  display: flex;
  flex-wrap: wrap;   
  justify-content: center;
  gap: 16px;          
}
.project{
  margin: 0;
  padding: 20px;
  width: 325px;
  background: rgba(17, 29, 45, 0.75);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 0 3px rgba(100, 200, 255, 0.6), 
              0 0 3px rgba(100, 200, 255, 0.4);
  color: #fff;
}
p{
  color: #aaaeb4;
  font-size: 0.95rem;
  line-height: 1.6;
  height: 75px;
}
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
  padding: 0;
}
.tag{
  margin: 0px 5px 0px 0px;
  padding: 4px 12px;
  background-color: #26303b; 
  border-radius: 8px;       
  font-size: 0.85rem;
  color: #d1d5db;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.project.clickable {
  cursor: pointer;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
.project.clickable:hover {
  transform: translateY(-5px);
  border-color: rgba(56, 189, 248, 0.4); /* 邊框微亮 */
  box-shadow: 0 8px 20px rgba(56, 189, 248, 0.15); /* 微光浮起效果 */
}



.footer{
  margin: 50px 0px 0px 0px;
  padding: 30px 125px 75px 125px;
  background-color: #3f5062;
  display: flex;
  justify-content: start;
  align-items: center;
}
h3{
  color: #fff;
  font-size: 24px;
  font-weight: 700;
}
.footer p{
  margin: 0px 10px;
  line-height: 2;
  font-size: 16px;
}
.contact-icon{
  margin-left: 75px;
  display: flex;
  gap: 20px;
}
.contact-icon a {
  display: inline-block;
  text-decoration: none;
  margin-right: 15px; 
}
.contact-icon i {
  font-size: 2.5rem;
  color: #d9d9d9;
  display: inline-block; 
  transition: transform 0.5s ease-in-out, color 0.5s ease; 
}
.contact-icon a:hover i {
  color: #fff;
  transform: rotate(360deg);
}



/* ==========================================
   1. 主容器與雙欄對齊
   ================================---------- */
.gallery-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  color: #f8fafc;
  font-family: system-ui, -apple-system, sans-serif;
}

.section-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 24px;
}

.detail-content-wrapper {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

/* ==========================================
   2. 左側：圖片輪播 + 圓點 + 底部按鈕
   ================================---------- */
.gallery-column {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  align-items: center; /* 讓內容居中對齊 */
  min-width: 0;
}

.gallery-container {
  display: flex;
  width: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  background-color: #0f172a;
}

.gallery-container::-webkit-scrollbar {
  display: none;
}

.gallery-show {
  flex: 0 0 100%;
  width: 100%;
  scroll-snap-align: start;
  aspect-ratio: 2 / 1; /* 2:1 比例 */
  overflow: hidden;
  background-color: #1e293b;
}

.gallery-show img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 圓點切換 */
.gallery-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background-color: #38bdf8;
}

/* ★ 按鈕區塊：放在圖片正下方，隔開距離 ★ */
.action-buttons-under-gallery {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 20px; /* 兩個按鈕之間的橫向距離 */
  margin-top: 28px; /* 離圓點與圖片的正下方距離 */
}

/* ★ 漂亮的按鈕樣式（完全拿掉灰色） ★ */
.custom-btn {
  flex: 1;
  max-width: 200px;
  padding: 12px 18px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  transition: all 0.25s ease;
  
  /* 移除預設背景與覆蓋 */
  background: transparent !important;
  border: 1px solid rgba(255, 255, 255, 0.25) !important;
  color: #f8fafc !important;
  box-shadow: none !important;
}

/* 停用狀態 (disabled)：顯示禁止游標、不變灰塊 */
.custom-btn:disabled {
  opacity: 0.45;
  border-color: rgba(255, 255, 255, 0.15) !important;
  color: #94a3b8 !important;
  cursor: not-allowed !important; /* 🚫 禁止符號 */
  pointer-events: auto !important;
}

/* ==========================================
   3. 右側：詳細介紹（Tabs）
   ================================---------- */
.info-panel-column {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 24px 28px;
  min-width: 0;
}

.tab-header {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 12px;
  margin-bottom: 20px;
}

.tab-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.tab-btn:hover {
  color: #f8fafc;
  background: rgba(255, 255, 255, 0.05);
}

.tab-btn.active {
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.25);
}

.tab-content {
  flex: 1;
  color: #e2e8f0;
  min-height: 180px;
}

.tab-pane p {
  font-size: 1rem;
  line-height: 1.6;
  color: #94a3b8;
  margin: 0;
  white-space: pre-line;
}

/* 備用 Feature 清單樣式 */
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.feature-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f1f5f9;
  font-size: 0.95rem;
}

.feature-item p {
  padding-left: 24px;
  font-size: 0.88rem;
}








.if{
  color: #e2e8f0;
  font-size: 18px;
  margin-left: 10px;
}
.if li{
  margin-bottom: 10px;
}

</style>