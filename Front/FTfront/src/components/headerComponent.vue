<template>
  <header class="marketing-header">
    <div class="marketing-logo">FinTrack</div>
    <input 
      type="text" 
      class="marketing-search" 
      placeholder="Поиск (Ctrl+K)" 
    />
    <nav class="marketing-nav">
      <a href="#">Продукты</a>
      <a href="#">Сообщество</a>
      <a href="#">Рынки</a>
      <a href="#">Брокеры</a>
      <a href="#">Ещё</a>
    </nav>
    <div class="marketing-header-right">
      <span class="marketing-lang">🌐 RU</span>
      <span class="marketing-user">👤</span>
      <button class="marketing-register" @click="handleRegister">
        Регистрация
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const handleRegister = (): void => {
  // Логика регистрации
  console.log('Регистрация clicked');
}
</script>

<style scoped>
.marketing-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  background-color: rgba(0, 0, 0, 0.6);
}

.marketing-logo {
  font-weight: bold;
  font-size: 20px;
  color: white;
}

.marketing-search {
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  margin: 0 20px;
  flex: 1;
  max-width: 250px;
  background-color: #222;
  color: white;
}

.marketing-search::placeholder {
  color: #888;
}

.marketing-nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

.marketing-nav a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.marketing-nav a:hover {
  color: #00b0f0;
}

.marketing-header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.marketing-lang,
.marketing-user {
  color: white;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.marketing-lang:hover,
.marketing-user:hover {
  opacity: 0.7;
}

.marketing-register {
  background: linear-gradient(80deg, #00c6ff, #6206bd);
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.marketing-register:hover {
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .marketing-header {
    flex-wrap: wrap;
    gap: 10px;
    padding: 15px 20px;
  }
  
  .marketing-search {
    order: 1;
    flex-grow: 1;
    margin: 10px 0 0 0;
    max-width: 100%;
  }
  
  .marketing-nav {
    display: none;
  }
}
</style>