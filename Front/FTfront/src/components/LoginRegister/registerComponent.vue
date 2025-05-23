<template>
  <!-- Контейнер для центрирования -->
  <div class="main-container">
    <!-- Фоновое изображение -->
    <div class="background"></div>
    
    <!-- Анимированный градиент вместо видео -->
    <div class="animated-bg"></div>
    
    <!-- Акцентное свечение за формой -->
    <div class="accent-glow"></div>

    <!-- Форма логина -->
    <div class="wrapper">
      <form @submit.prevent="handleLogin">
        <h1>Регистрация</h1>
        
        <div class="input-box">
          <input 
            type="text" 
            placeholder="Username" 
            v-model="username"
            required
          >
          <i class="bx bxs-user"></i>
        </div>
        
        <div class="input-box">
          <input 
            type="password" 
            placeholder="Password" 
            v-model="password"
            required
          >
          <i class="bx bxs-lock-alt"></i>
        </div>

        <div class="remember-forgot">
          <label>
            <input 
              type="checkbox" 
              v-model="rememberMe"
            > 
            Remember me
          </label>
          <a href="#" @click.prevent="handleForgotPassword">Forgot password?</a>
        </div>

        <button type="submit" class="btn">Login</button>

        <div class="register-link">
          <p>Don't have an account? 
            <a href="#" @click.prevent="goToRegister">Register</a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Реактивные данные
const username = ref<string>('')
const password = ref<string>('')
const rememberMe = ref<boolean>(false)

// Методы
const handleLogin = (): void => {
  console.log('Login:', {
    username: username.value,
    password: password.value,
    rememberMe: rememberMe.value
  })
}

const handleForgotPassword = (): void => {
  console.log('Forgot password clicked')
}

const goToRegister = (): void => {
  console.log('Navigate to registration')
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");
@import url('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

/* Главный контейнер для центрирования */
.main-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #000000;
}

/* Фоновое изображение */
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -3;
  background-image: url('./images/background.jpg');
  background-size: cover;
  background-position: center;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Акцентный градиент за формой */
.accent-glow {
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(0,212,255,0.6) 0%, rgba(81,92,230,0.4) 40%, rgba(170,0,255,0.2) 70%, rgba(0,0,0,0) 100%);
  z-index: 0;
  border-radius: 50%;
  filter: blur(25px);
  animation: pulse 4s infinite alternate;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.1);
    opacity: 1;
  }
}

.wrapper {
  width: 420px;
  background: rgba(33, 123, 208, 0.85);
  border: 2px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.6), 
              0 0 60px rgba(81, 92, 230, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 16px;
  padding: 30px 40px;
  z-index: 2;
  position: relative;
}

/* Неоновый эффект для заголовка */
.wrapper h1 {
  font-size: 36px;
  text-align: center;
  margin-bottom: 30px;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3),
               0 0 20px rgba(255, 255, 255, 0.2),
               0 0 30px rgba(81, 92, 230, 0.4),
               0 0 40px rgba(81, 92, 230, 0.2);
  letter-spacing: 1px;
}

.wrapper .input-box {
  position: relative;
  width: 100%;
  height: 50px;
  margin: 25px 0;
}

.input-box input {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  outline: none;
  border-radius: 40px;
  font-size: 16px;
  color: #fff;
  padding: 20px 45px 20px 20px;
  transition: all 0.3s ease;
}

.input-box input:focus {
  border: 1px solid rgba(81, 92, 230, 0.8);
  box-shadow: 0 0 8px rgba(81, 92, 230, 0.5);
}

.input-box input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.input-box i {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
}

/* Fallback иконки если Boxicons не загружается */
.input-box i::before {
  font-family: "Font Awesome 5 Free", sans-serif;
}

.bx-user::before,
.bxs-user::before {
  content: "👤";
  font-family: "Segoe UI Emoji", sans-serif;
  font-size: 18px;
}

.bx-lock-alt::before,
.bxs-lock-alt::before {
  content: "🔒";
  font-family: "Segoe UI Emoji", sans-serif;
  font-size: 18px;
}

.wrapper .remember-forgot {
  display: flex;
  justify-content: space-between;
  font-size: 14.5px;
  margin: -15px 0 15px;
  color: rgba(255, 255, 255, 0.8);
}

.remember-forgot label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.remember-forgot label input {
  accent-color: #515ce6;
  margin-right: 5px;
}

.remember-forgot a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.remember-forgot a:hover {
  color: #515ce6;
  text-decoration: none;
}

.wrapper .btn {
  width: 100%;
  height: 45px;
  background: linear-gradient(90deg, #00c6ff, #a0f, #00c6ff);
  background-size: 200% 100%;
  background-position: 0% 0%;
  border: none;
  outline: none;
  border-radius: 40px;
  box-shadow: 0 0 10px rgba(170, 0, 255, 0.5);
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  font-weight: 600;
  transition: all 0.5s ease;
}

.wrapper .btn:hover {
  background-position: 100% 0%;
  box-shadow: 0 0 15px rgba(0, 198, 255, 0.7);
  transform: translateY(-2px);
}

.wrapper .register-link {
  font-size: 14.5px;
  text-align: center;
  margin: 20px 0 15px;
  color: rgba(255, 255, 255, 0.8);
}

.register-link p a {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  margin-left: 5px;
}

.register-link p a:hover {
  color: #515ce6;
}

/* Для поддержки мобильных устройств */
@media (max-width: 450px) {
  .wrapper {
    width: 90%;
    padding: 20px;
  }
  
  .accent-glow {
    width: 100%;
    height: 100%;
  }
}
</style>