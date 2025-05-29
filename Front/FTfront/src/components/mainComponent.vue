<template>
  <main>
    <!-- Marketing Section -->
    <section class="marketing-main">
      <div class="marketing-content">
        <h1>
          <span>Look first /</span><br>
          <span>Then leap.</span>
        </h1>
        <p class="marketing-subtitle">
          Сначала подготовка, затем действие. Так совершаются лучшие поступки.
        </p>
        <button class="marketing-cta" @click="showMarket">
          Зарегистрироваться бесплатно
        </button>
        <p class="marketing-note">
          0 $ навсегда — и никакой банковской карты
        </p>
      </div>
      <div class="marketing-video">
        <p class="marketing-person">Лео Хоулдинг, путешественник</p>
      </div>
    </section>

    <!-- Market Section -->
    <section class="content">
      <h2>Обзор рынка›</h2>
      
      <!-- Tabs -->
      <div class="tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="{ active: activeTab === tab.id }"
          @click="setActiveTab(tab.id)"
        >
          {{ tab.name }}
        </button>
      </div>

      <!-- Market Indexes -->
      <div class="market-indexes">
        <div 
          v-for="index in marketIndexes" 
          :key="index.symbol"
          :class="['index-card', index.changeClass]"
          :data-symbol="index.symbol"
          @click="selectIndex(index.symbol)"
        >
          <span>{{ index.name }}</span>
          <strong>{{ index.value }}</strong>
          <span class="percent">{{ index.change }}</span>
        </div>
      </div>

      <!-- Chart Container -->
      <div class="chart-container">
        <div class="tradingview-widget-container">
          <div id="tradingview_chart"></div>
        </div>
      </div>

      <!-- Community Ideas -->
      <section class="community-ideas">
        <div class="section-header">
          <h3>Идеи нашего сообщества</h3>
          <div class="idea-tabs">
            <button 
              v-for="ideaTab in ideaTabs" 
              :key="ideaTab.id"
              :class="{ active: activeIdeaTab === ideaTab.id }"
              @click="setActiveIdeaTab(ideaTab.id)"
            >
              {{ ideaTab.name }}
            </button>
          </div>
        </div>
        
        <div class="video-grid">
          <div v-for="video in videos" :key="video.id" class="video-item">
            <div class="video-thumbnail" @click="playVideo(video.id)">
              <img :src="video.thumbnail" :alt="video.title">
              <div class="video-duration">{{ video.duration }}</div>
              <div class="play-button">▶</div>
            </div>
            <div class="video-details">
              <h4 class="video-title">{{ video.title }}</h4>
              <div class="video-author">{{ video.author }}</div>
              <div class="video-stats">
                <span>{{ video.views }} просмотров</span>
                <span>•</span>
                <span>{{ video.time }}</span>
              </div>
              <div class="video-description">{{ video.description }}</div>
              <div class="video-likes">
                <span class="like-icon">👍</span>
                <span class="like-count">{{ video.likes }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Leaders Section -->
      <section class="leaders-section">
        <div class="section-header">
          <h3>Лидеры роста</h3>
          <h3>Лидеры падения</h3>
        </div>
        
        <div class="leaders-container">
          <!-- Growth Leaders -->
          <div class="leaders-block">
            <div class="leaders-list">
              <div v-for="leader in growthLeaders" :key="leader.ticker" class="leader-item">
                <div class="leader-info">
                  <span class="leader-name">{{ leader.name }}</span>
                  <span class="leader-ticker">{{ leader.ticker }}</span>
                  <span class="leader-price">{{ leader.price }}</span>
                </div>
                <span class="leader-change positive">{{ leader.change }}</span>
              </div>
            </div>
            <a href="#" class="show-all">Все акции с большим ростом за сутки ></a>
          </div>

          <!-- Decline Leaders -->
          <div class="leaders-block">
            <div class="leaders-list">
              <div v-for="leader in declineLeaders" :key="leader.ticker" class="leader-item">
                <div class="leader-info">
                  <span class="leader-name">{{ leader.name }}</span>
                  <span class="leader-ticker">{{ leader.ticker }}</span>
                  <span class="leader-price">{{ leader.price }}</span>
                </div>
                <span class="leader-change negative">{{ leader.change }}</span>
              </div>
            </div>
            <a href="#" class="show-all">Все акции с большим падением за сутки ></a>
          </div>
        </div>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

interface Tab {
  id: string
  name: string
}

interface MarketIndex {
  symbol: string
  name: string
  value: string
  change: string
  changeClass: string
}

interface Video {
  id: string
  title: string
  author: string
  views: string
  time: string
  duration: string
  description: string
  likes: number
  thumbnail: string
}

interface Leader {
  name: string
  ticker: string
  price: string
  change: string
}

const activeTab = ref<string>('indexes')
const activeIdeaTab = ref<string>('editorial')

const tabs: Tab[] = [
  { id: 'indexes', name: 'Индексы' },
  { id: 'stocks', name: 'Акции' },
  { id: 'crypto', name: 'Криптовалюты' },
  { id: 'futures', name: 'Фьючерсы' },
  { id: 'forex', name: 'Форекс' },
  { id: 'bonds', name: 'Облигации' },
  { id: 'etf', name: 'ETF' }
]

const ideaTabs: Tab[] = [
  { id: 'editorial', name: 'Выбор редакции' },
  { id: 'foryou', name: 'Для вас' },
  { id: 'authors', name: 'Ваши авторы' },
  { id: 'popular', name: 'Популярные' }
]

const marketIndexes: MarketIndex[] = [
  {
    symbol: 'MOEX:IMOEX',
    name: '🇷🇺 Индекс МосБиржи',
    value: '2 958,75',
    change: '−2,50%',
    changeClass: 'red'
  },
  {
    symbol: 'MOEX:RTSI',
    name: '🇷🇺 Индекс РТС',
    value: '1 142,68',
    change: '−1,32%',
    changeClass: 'red'
  },
  {
    symbol: 'SP:SPX',
    name: 'S&P 500',
    value: '5 536,56',
    change: '+0,14%',
    changeClass: 'green'
  },
  {
    symbol: 'NASDAQ:NDX',
    name: 'Nasdaq 100',
    value: '19 499,34',
    change: '+0,37%',
    changeClass: 'green'
  },
  {
    symbol: 'DOW:DJI',
    name: 'Dow 30',
    value: '39 000,12',
    change: '+0,25%',
    changeClass: 'green'
  },
  {
    symbol: 'NYSE:NYA',
    name: 'NYSE Composite',
    value: '17 845,67',
    change: '+0,18%',
    changeClass: 'green'
  }
]

const videos: Video[] = [
  {
    id: '1',
    title: 'XRP. Возможно продолжение роста.',
    author: 'ViktorTrade888',
    views: '10K',
    time: '23 часа назад',
    duration: '3:03',
    description: 'Всем привет, очередной разбор по XRP, прошу досмотреть видео до конца, так как есть нюансы.',
    likes: 41,
    thumbnail: 'https://i.ytimg.com/vi/example1/hqdefault.jpg'
  },
  {
    id: '2',
    title: 'EURUSD утренний разбор 29.04',
    author: 'Dobrunia',
    views: '2.1K',
    time: '9 часов назад',
    duration: '2:10',
    description: 'В этом видео вы найдете утренний разбор пары EUR/USD. Я проанализирую предвзятость, направления на сегодняшний день.',
    likes: 10,
    thumbnail: 'https://i.ytimg.com/vi/example2/hqdefault.jpg'
  },
  {
    id: '3',
    title: 'ICP / USDT: В зоне макро-поддержки',
    author: 'от аттептёвого',
    views: '5.7K',
    time: 'Апр 27',
    duration: '4:15',
    description: 'Цена достигла целевой зоны макро-поддержки для формирования долгосрочного дна. Пока цена остаётся...',
    likes: 28,
    thumbnail: 'https://i.ytimg.com/vi/example3/hqdefault.jpg'
  }
]

const growthLeaders: Leader[] = [
  {
    name: 'АО "УК "Кузбассраврезуголь" - обыкн.',
    ticker: 'KZRU',
    price: '52,000 RUB',
    change: '+21,97%'
  },
  {
    name: 'ПАО "МЭСС" - обыкн.',
    ticker: 'MESS',
    price: '0,089979 RUB',
    change: '+9,73%'
  },
  {
    name: 'ПАО "Уральская кузница" - обыкн.',
    ticker: 'URKZ',
    price: '33 900 RUB',
    change: '+7,28%'
  },
  {
    name: 'НПО Наука - обыкн.',
    ticker: 'NAUK',
    price: '502,5 RUB',
    change: '+6,12%'
  },
  {
    name: 'АО "Волга-флот" - обыкн.',
    ticker: 'VFLT',
    price: '2 597 RUB',
    change: '+3,92%'
  },
  {
    name: 'ОАО АК "Уральск авиалинии" - обыкн.',
    ticker: 'URAL',
    price: '259 000 RUB',
    change: '+3,60%'
  }
]

const declineLeaders: Leader[] = [
  {
    name: 'Группа ЛСР ПАО - обыкн.',
    ticker: 'LSRG',
    price: '780,8 RUB',
    change: '-10,23%'
  },
  {
    name: 'AO "Газэнергосервис" - обыкн.',
    ticker: 'GZES',
    price: '3608 RUB',
    change: '-9,80%'
  },
  {
    name: 'AO "РЭС" - обыкн.',
    ticker: 'RAES',
    price: '112,75 RUB',
    change: '-6,78%'
  },
  {
    name: '"Т Плюс" ПАО ао.',
    ticker: 'VTGK',
    price: '1,2950 RUB',
    change: '-5,72%'
  },
  {
    name: 'VEON Ltd. ORD SHS',
    ticker: 'VEON-RX',
    price: '85,75 RUB',
    change: '-4,56%'
  },
  {
    name: 'ПАО "ГТМ" - обыкн.',
    ticker: 'GTRK',
    price: '227,4 RUB',
    change: '-5,37%'
  }
]

const setActiveTab = (tabId: string): void => {
  activeTab.value = tabId
}

const setActiveIdeaTab = (tabId: string): void => {
  activeIdeaTab.value = tabId
}

const showMarket = (): void => {
  console.log('Show market clicked')
}

const watchVideo = (): void => {
  console.log('Watch video clicked')
}

const playVideo = (videoId: string): void => {
  console.log('Play video:', videoId)
}

// TradingView integration

let currentChart: any = null

function loadTradingViewScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).TradingView) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/tv.js'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load TradingView script'))
    document.head.appendChild(script)
  })
}

async function createChart(symbol: string) {
  if (!(window as any).TradingView) {
    await loadTradingViewScript()
  }

  if (currentChart) {
    currentChart.remove?.()
    const container = document.getElementById('tradingview_chart')
    if (container) container.innerHTML = ''
  }

  currentChart = new (window as any).TradingView.widget({
    width: '100%',
    height: 400,
    symbol,
    interval: 'D',
    timezone: 'Etc/UTC',
    theme: 'dark',
    style: '1',
    locale: 'ru',
    toolbar_bg: '#1e1e1e',
    enable_publishing: false,
    hide_top_toolbar: true,
    withdateranges: false,
    container_id: 'tradingview_chart',
  })
}

const selectIndex = async (symbol: string): Promise<void> => {
  activeTab.value = 'indexes'  // или другой нужный таб, если нужно
  await createChart(symbol)
}

onMounted(async () => {
  await loadTradingViewScript()
  if (marketIndexes.length > 0) {
    await createChart(marketIndexes[0].symbol)
  }
})
</script>


<style scoped>

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

main {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

/* Marketing Section */
.marketing-main {
  min-height: 91vh;
  overflow: visible;
  position: relative;
  flex: 0 0 auto; /* Убираем flex-grow */
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  background: url('https://static.tradingview.com/static/bundles/leo-look-768.1d2a29fb4592122e55cd.webp') no-repeat center center/cover;
}

.marketing-content {
  max-width: 600px;
}

.marketing-content h1 {
  font-size: 64px;
  line-height: 1.2;
  font-weight: 800;
  color: white;
}

.marketing-subtitle {
  font-size: 20px;
  margin: 20px 0;
  color: white;
}

.marketing-cta {
  background: linear-gradient(80deg, #00c6ff, #6206bd);
  border: none;
  padding: 14px 24px;
  font-size: 16px;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
  transition: transform 0.2s ease;
}

.marketing-cta:hover {
  transform: translateY(-2px);
}

.marketing-note {
  font-size: 14px;
  color: #ccc;
}

.marketing-video {
  position: absolute;
  bottom: 30px;
  right: 40px;
  text-align: right;
}

.marketing-watch-video {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.marketing-watch-video:hover {
  opacity: 0.7;
}

.marketing-person {
  font-size: 14px;
  color: #ccc;
}

/* Content Section */
.content {
  flex: 1; /* Занимает оставшееся пространство */
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  background-color: #000;
  color: white;
  width: 100%;
  position: relative;
  z-index: 1;
}

.content h2 {
  color: white;
  margin-bottom: 20px;
}

.tabs {
  display: flex;
  margin: 10px 0;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.tabs button {
  background: #111;
  color: #aaa;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.tabs button.active {
  background: #333;
  color: white;
  font-weight: bold;
}

.tabs button:hover {
  background: #222;
}

.market-indexes {
  display: flex;
  gap: 20px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.index-card {
  background: #111;
  padding: 15px;
  border-radius: 10px;
  min-width: 160px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.index-card:hover {
  background: #222;
  transform: translateY(-2px);
}

.index-card.red .percent {
  color: #ff4d4d;
}

.index-card.green .percent {
  color: #4dff4d;
}

.chart-container {
  margin-top: 20px;
  background: #111;
  border-radius: 10px;
  padding: 15px;
  min-height: 400px;
}

/* Community Ideas */
.community-ideas {
  margin-top: 40px;
  padding: 20px 0;
  border-top: 1px solid #333;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h3 {
  margin: 0;
  font-size: 1.3em;
  color: #fff;
}

.idea-tabs {
  display: flex;
  gap: 8px;
}

.idea-tabs button {
  background: #222;
  color: #aaa;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9em;
  transition: all 0.2s ease;
}

.idea-tabs button:hover {
  background: #333;
  color: #fff;
}

.idea-tabs button.active {
  background: linear-gradient(90deg, #00c6ff, #a0f);
  color: white;
  font-weight: bold;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 20px;
}

.video-item {
  background: transparent;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.video-item:hover {
  transform: translateY(-3px);
}

.video-thumbnail {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #222;
  aspect-ratio: 16 / 9;
  margin-bottom: 12px;
  cursor: pointer;
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 22px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.video-thumbnail:hover .play-button {
  opacity: 1;
}

.video-details {
  padding: 0 4px;
}

.video-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: white;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  max-height: 2.8em;
  margin-bottom: 8px;
}

.video-author {
  font-size: 13px;
  color: #aaa;
  margin-bottom: 6px;
}

.video-stats {
  font-size: 13px;
  color: #777;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
}

.video-description {
  color: #aaa;
  font-size: 14px;
  margin: 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.video-likes {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #aaa;
  font-size: 13px;
  margin-top: 8px;
}

/* Leaders Section */
.leaders-section {
  margin-top: 40px;
  padding: 0 20px;
}

.leaders-section .section-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 10px;
}

.leaders-section .section-header h3 {
  margin: 0;
  font-size: 18px;
  color: #fff;
  padding: 0 15px;
}

.leaders-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.leaders-block {
  background: #111;
  border-radius: 10px;
  padding: 15px;
}

.leaders-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.leader-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #222;
}

.leader-item:last-child {
  border-bottom: none;
}

.leader-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 0;
}

.leader-name {
  color: #ddd;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.leader-ticker {
  color: #777;
  font-size: 12px;
  margin-top: 2px;
}

.leader-price {
  color: #aaa;
  font-size: 12px;
  margin-top: 2px;
}

.leader-change {
  font-size: 14px;
  font-weight: bold;
  min-width: 70px;
  text-align: right;
}

.leader-change.positive {
  color: #4dff4d;
}

.leader-change.negative {
  color: #ff4d4d;
}

.show-all {
  display: block;
  color: #00b0f0;
  font-size: 13px;
  margin-top: 15px;
  text-decoration: none;
  transition: color 0.2s ease;
}

.show-all:hover {
  text-decoration: underline;
  color: #00c6ff;
}

/* Responsive */
@media (max-width: 768px) {
  .marketing-main {
    padding: 20px;
  }
  
  .marketing-content h1 {
    font-size: 40px;
  }
  
  .marketing-video {
    position: static;
    margin-top: 30px;
    text-align: left;
  }
  
  .market-indexes {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .leaders-container {
    grid-template-columns: 1fr;
  }
  
  .video-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .idea-tabs {
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .market-indexes {
    grid-template-columns: 1fr;
  }
  
  .tabs {
    flex-wrap: wrap;
  }
}
</style>