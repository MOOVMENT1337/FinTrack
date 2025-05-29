<template>
  <main>
    <section class="profile">
      <img src="../assets/icons/avatar.png" alt="Фото пользователя" class="avatar" />
      <div class="profile-info">
        <div><strong>USER</strong> <span style="color: #0f0;">● На сайте</span></div>
        <div id="incomeDisplay" :data-value="incomeTotal">Доходы: {{ incomeTotal }}₽</div>
        <div id="expenseDisplay" :data-value="expenseTotal">Расходы: {{ expenseTotal }}₽</div>
        <div>С {{ formatDate(user.registrationDate) }}</div>
      </div>
    </section>

    <div class="section-title">Мои финансы за этот месяц</div>
    <div id="balanceDisplay" :data-value="balance">Общий баланс: {{ balance }} ₽</div>

    <canvas id="financeChart" height="350"></canvas>

    <div class="buttons">
      <button class="income-btn" @click="showModal('income')">Доход</button>
      <button class="expense-btn" @click="showModal('expense')">Расход</button>
    </div>

    <div class="currency-switcher">
      <div>₽ RUB</div>
      <div>$ USD</div>
      <div>€ EUR</div>
    </div>

    <div id="modal" class="modal" v-show="modalVisible" @click.self="modalVisible = false">
      <div class="modal-content">
        <h3>{{ modalTitle }}</h3>
        <input type="number" v-model.number="amountInput" placeholder="Сумма" />
        <br />
        <button @click="submitAmount">OK</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const labels = ref([])
const balance = ref(0)
const incomeTotal = ref(0)
const expenseTotal = ref(0)
const currentType = ref('')
const amountInput = ref(0)
const modalVisible = ref(false)

// Добавляем данные пользователя для примера
const user = ref({
  registrationDate: new Date('2024-01-15') // Пример даты регистрации
})

const modalTitle = computed(() =>
  currentType.value === 'income' ? 'Введите доход' : 'Введите расход'
)

// Функция форматирования даты
const formatDate = (date) => {
  if (!date) return 'Неизвестно'
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

let financeChart

const updateChart = (amount, type) => {
  if (type === 'income') {
    balance.value += amount
    incomeTotal.value += amount
  } else {
    balance.value -= amount
    expenseTotal.value += amount
  }

  labels.value.push(new Date().toLocaleTimeString())
  financeChart.data.labels = [...labels.value]
  financeChart.data.datasets[0].data.push(balance.value)
  financeChart.update()

  animateDisplay('balanceDisplay', balance.value)
  animateDisplay('incomeDisplay', incomeTotal.value, 'Доходы: ', '₽')
  animateDisplay('expenseDisplay', expenseTotal.value, 'Расходы: ', '₽')
}

const showModal = (type) => {
  currentType.value = type
  modalVisible.value = true
  amountInput.value = 0
}

const submitAmount = () => {
  if (!isNaN(amountInput.value) && amountInput.value > 0) {
    updateChart(amountInput.value, currentType.value)
    modalVisible.value = false
  }
}

const animateDisplay = (id, endValue, prefix = 'Общий баланс: ', suffix = ' ₽') => {
  const element = document.getElementById(id)
  if (!element) return
  
  const startValue = parseFloat(element.dataset.value) || 0
  const duration = 800
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const currentValue = Math.floor(startValue + (endValue - startValue) * progress)
    element.textContent = `${prefix}${currentValue.toLocaleString()}${suffix}`
    element.dataset.value = currentValue
    if (progress < 1) requestAnimationFrame(update)
  }

  requestAnimationFrame(update)
}

onMounted(() => {
  const canvas = document.getElementById('financeChart')
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  financeChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels.value,
      datasets: [{
        label: 'Баланс',
        data: [],
        backgroundColor: function (context) {
          const value = context.raw
          return value >= 0 ? 'rgba(75, 192, 192, 0.6)' : 'rgba(255, 99, 132, 0.6)'
        },
        borderColor: function (context) {
          const value = context.raw
          return value >= 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'
        },
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: { 
        y: { 
          beginAtZero: true,
          ticks: {
            color: '#fff'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        x: {
          ticks: {
            color: '#fff'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      },
      plugins: {
        legend: {
          labels: { 
            color: '#fff' 
          }
        }
      }
    }
  })
})
</script>

<style scoped>
main {
  padding: 20px;
  background: url('@/assets/images/swfv.jpg') no-repeat center;
  background-size: cover;
  min-height: 100vh;
  color: #fff;
}

.profile {
  display: flex;
  align-items: center;
  padding: 20px 30px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  margin-bottom: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
  border: 2px solid #933;
}

.profile-info {
  color: #fff;
}

.profile-info div {
  margin-bottom: 5px;
}

.section-title {
  text-align: center;
  font-size: 24px;
  margin: 20px 0 10px;
  color: #fff;
}

#balanceDisplay {
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
  color: #0f0;
  font-weight: bold;
}

canvas {
  display: block;
  margin: 0 auto 20px;
  max-width: 800px;
  background-color: rgba(34, 34, 34, 0.9);
  padding: 10px;
  border-radius: 10px;
}

.buttons {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  gap: 20px;
}

button {
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
}

.income-btn {
  background-color: #0f0;
  color: #000;
}

.income-btn:hover {
  background-color: #0c0;
}

.expense-btn {
  background-color: #f00;
  color: #fff;
}

.expense-btn:hover {
  background-color: #c00;
}

.modal {
  display: flex;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #222;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  color: #fff;
}

.modal-content h3 {
  margin-bottom: 20px;
  color: #fff;
}

.modal-content input {
  padding: 12px;
  width: 200px;
  font-size: 16px;
  margin: 10px 0 20px;
  border: 1px solid #444;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
}

.modal-content input:focus {
  outline: none;
  border-color: #0f0;
}

.modal-content button {
  background-color: #444;
  color: #fff;
  min-width: 80px;
}

.modal-content button:hover {
  background-color: #555;
}

.currency-switcher {
  position: absolute;
  right: 30px;
  top: 150px;
  text-align: right;
}

.currency-switcher div {
  margin-bottom: 8px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.currency-switcher div:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>