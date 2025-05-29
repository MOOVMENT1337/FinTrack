<template>
  <footer class="footer">
    <div class="footer-logo">
      <img src="../assets/FinTrack_Logo.png" alt="FinTrack Logo">
    </div>
    
    <div class="footer-columns">
      <!-- Все колонки футера -->
      <div class="footer-column" v-for="(column, index) in footerColumns" :key="index">
        <h3>{{ column.title }}</h3>
        <ul>
          <li v-for="(link, linkIndex) in column.links" :key="linkIndex">
            <a :href="link.url" :class="{'nav-link': true, 'active': link.active}">{{ link.text }}</a>
          </li>
        </ul>
      </div>
    </div>
    <img src="https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg" 
         alt="Look First" 
         class="footer-image">
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface FooterLink {
  text: string;
  url: string;
  active?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export default defineComponent({
  name: 'AppFooter',
  setup() {
    const footerColumns: FooterColumn[] = [
      {
        title: 'СУПЕРГРАФИКИ',
        links: [
          { text: 'Акции', url: '#', active: true },
          { text: 'ETF', url: '#' },
          { text: 'Облигации', url: '#' },
          { text: 'Криптовалюты', url: '#', active: true },
          { text: 'Криптопары', url: '#' },
          { text: 'CEX-пары', url: '#' },
          { text: 'DEX-пары', url: '#' },
          { text: 'Pine', url: '#' }
        ]
      },
      // Остальные колонки...
    ];

    return {
      footerColumns
    };
  }
});
</script>

<style scoped>
.footer {
  position: relative;
  background-color: #000;
  color: white;
  padding: 60px 40px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  min-height: 400px;
}

.footer::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 600px;
  height: 100%;
  background: url('https://static.tradingview.com/static/bundles/rocket-flight-phone.bdf6b29f4731a583bc5b.jpg') no-repeat right bottom;
  background-size: contain;
  z-index: 0;
  opacity: 1;
  pointer-events: none;
  filter: blur(1%);
  mask-image: linear-gradient(to left, transparent 0%, black 30%, black 70%, transparent 100%);
  -webkit-mask-image: linear-gradient(to left, transparent 0%, black 30%, black 70%, transparent 100%);
}

.footer::before {
  content: "";
  position: absolute;
  top: 0;
  right: 600px;
  bottom: 0;
  width: px;
  background: linear-gradient(to right, #000 0%, rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 0.2) 80%, transparent 100%);
  z-index: 1;
  pointer-events: none;
}

.footer > *,
.footer-columns,
.footer-logo {
  position: relative;
  z-index: 2;
}

.footer-logo {
  flex: 1;
  padding-right: 40px;
}

.footer-logo img {
  max-width: 200px;
  height: auto;
}

.footer-columns {
  display: flex;
  flex-wrap: wrap;
  flex: 4;
  gap: 20px;
}

.footer-column {
  flex: 1 1 200px;
  min-width: 180px;
  margin: 10px;
  position: relative;
  z-index: 2;
}

.footer-column h3 {
  font-size: 16px;
  margin-bottom: 20px;
  color: #cccccc;
}

.footer-column ul {
  list-style: none;
}

.footer-column ul li {
  margin-bottom: 10px;
}

.footer-column ul li a {
  color: #999999;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.footer-column ul li a:hover {
  color: #ffffff;
}

.footer-image {
  width: 100%;
  margin-top: 30px;
}

@media (max-width: 768px) {
  .footer {
    flex-direction: column;
  }
  
  .footer-logo {
    padding-right: 0;
    margin-bottom: 30px;
  }
  
  .footer-column {
    min-width: 120px;
    margin-bottom: 20px;
  }
}
</style>