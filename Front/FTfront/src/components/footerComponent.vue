<template>
  <footer class="footer">
    <div class="footer-logo">
      <img src="../assets/images/FinTrack_Logo.png" alt="FinTrack Logo" />
    </div>

    <div class="footer-columns">
      <div
        v-for="(column, index) in footerContent"
        :key="index"
        class="footer-column"
      >
        <div v-for="section in column" :key="section.title">
          <h3>{{ section.title }}</h3>
          <ul>
            <li v-for="item in section.items" :key="item.label">
              <a :href="item.link" :class="item.active ? 'nav-link active' : ''">
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>

  <img
    src="https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg"
    alt="Look First"
    class="footer-image"
    style="width: 100%; margin-top: 30px;"
  />
</template>

<script lang="ts" setup>
interface FooterItem {
  label: string;
  link: string;
  active?: boolean;
}

interface FooterSection {
  title: string;
  items: FooterItem[];
}

const footerContent: FooterSection[][] = [
  [
    {
      title: 'СУПЕРГРАФИКИ',
      items: [
        { label: 'Акции', link: '#', active: true },
        { label: 'ETF', link: '#' },
        { label: 'Облигации', link: '#' },
        { label: 'Криптовалюты', link: '#', active: true },
        { label: 'Криптопары', link: '#' },
        { label: 'CEX-пары', link: '#' },
        { label: 'DEX-пары', link: '#' },
        { label: 'Pine', link: '#' }
      ]
    }
  ],
  [
    {
      title: 'ТЕПЛОВЫЕ КАРТЫ',
      items: [
        { label: 'Акции', link: '#', active: true },
        { label: 'ETF', link: '#' },
        { label: 'Криптовалюты', link: '#', active: true }
      ]
    },
    {
      title: 'МАГРАДАРИ',
      items: [
        { label: 'Экономические данные', link: '#' },
        { label: 'Прибыль', link: '#' },
        { label: 'Дивиденды', link: '#' }
      ]
    }
  ],
  [
    {
      title: 'ДРУГИЕ ПРОДУКТЫ',
      items: [
        { label: 'Опросы', link: '#' },
        { label: 'Лента новостей', link: '#' },
        { label: 'Pine Scripts', link: '#' },
        { label: 'Списки редакции', link: '#' }
      ]
    },
    {
      title: 'ПРИЛОЖЕНИЯ',
      items: [
        { label: 'Мобильное', link: '#' },
        { label: 'FinTrack Desktop', link: '#' }
      ]
    }
  ],
  [
    {
      title: 'ВОЗМОЖНОСТИ',
      items: [
        { label: 'Подписки', link: '#' },
        { label: 'Исторические данные', link: '#' }
      ]
    },
    {
      title: 'СПЕЦИАЛЬНЫЕ ПРЕДЛОЖЕНИЯ',
      items: [
        { label: 'Фьючерсы CME Group', link: '#' },
        { label: 'Фьючерсы Bitеx', link: '#' },
        { label: 'Набор данных по акциям США', link: '#' }
      ]
    }
  ],
  [
    {
      title: 'О КОМПАНИИ',
      items: [
        { label: 'Кто мы такие', link: '#' },
        { label: 'Наши принципы', link: '#' },
        { label: 'Наши амбассадоры', link: '#' },
        { label: 'Блог', link: '#' },
        { label: 'Карьера и вакансии', link: '#' },
        { label: 'Медиа-кит', link: '#' }
      ]
    },
    {
      title: 'НАШ МЕРЧ',
      items: [
        { label: 'Мерч FinTrack', link: '#' },
        { label: 'Карты Таро для трейдеров', link: '#' }
      ]
    }
  ],
  [
    {
      title: 'ПОЛИТИКА И ОБЯЗАТЕЛЬСТВА',
      items: [
        { label: 'Условия использования', link: '#' },
        { label: 'Отказ от ответственности', link: '#' },
        { label: 'Политика конфиденциальности', link: '#' },
        { label: 'Политика файлов cookie', link: '#' },
        { label: 'Положение о доступности', link: '#' },
        { label: 'Обязательства безопасности', link: '#' },
        { label: 'Страница статусов', link: '#' }
      ]
    }
  ],
  [
    {
      title: 'СООБЩЕСТВО',
      items: [
        { label: 'Социальная сеть', link: '#' },
        { label: 'Web of Love', link: '#' },
        { label: 'Пригласи друга', link: '#' },
        { label: 'Правила поведения', link: '#' },
        { label: 'Модераторы', link: '#' }
      ]
    },
    {
      title: 'ИДЕИ',
      items: [
        { label: 'Торговля', link: '#' },
        { label: 'Обучение', link: '#' },
        { label: 'Выбор редакции', link: '#' }
      ]
    }
  ],
  [
    {
      title: 'PINE SCRIPT',
      items: [
        { label: 'Индикаторы и стратегии', link: '#' },
        { label: 'Эксперты', link: '#' },
        { label: 'Фрилансеры', link: '#' }
      ]
    },
    {
      title: 'ДЛЯ РАЗРАБОТЧИКОВ',
      items: [
        { label: 'API', link: '#' },
        { label: 'Библиотеки графиков', link: '#' },
        { label: 'Lightweight Charts™', link: '#' },
        { label: 'Продвинутые графики', link: '#' },
        { label: 'Торговая платформа', link: '#' }
      ]
    }
  ],
  [
    {
      title: 'ВОЗМОЖНОСТИ РОСТА',
      items: [
        { label: 'Реклама', link: '#' },
        { label: 'Интеграция брокеров', link: '#' },
        { label: 'Партнёрская программа', link: '#' },
        { label: 'Образовательная программа', link: '#' }
      ]
    }
  ]
];
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

  filter: blur(1%); /* ✅ Сам эффект блюра */
  mask-image: linear-gradient(to left, transparent 0%, black 30%, black 70%, transparent 100%);
  -webkit-mask-image: linear-gradient(to left, transparent 0%, black 30%, black 70%, transparent 100%);
}

.footer::before {
  content: "";
  position: absolute;
  top: 0;
  right: 600px; /* положение до начала ракеты */
  bottom: 0;
  width: px; /* больше ширина → мягче переход */
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

.footer-content {
  position: relative;
  z-index: 2;
}

.footer .footer-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
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
