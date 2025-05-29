<template>
  <main>
    <section class="profile">
      <img src="../assets/icons/avatar.png" alt="Фото пользователя" class="avatar" />
      <div class="profile-info">
        <div><strong>USER</strong> <span style="color: #0f0;">● На сайте</span></div>
        <div id="incomeDisplay" :data-value="incomeTotal">Доходы: 0₽</div>
        <div id="expenseDisplay" :data-value="expenseTotal">Расходы: 0₽</div>
        <div>С {{ formatDate(user.registrationDate) }}</div>
      </div>
    </section>

    <div class="section-title">Мои финансы за этот месяц</div>
    <div id="balanceDisplay" :data-value="balance">Общий баланс: 0 ₽</div>

    <canvas id="financeChart" height="350"></canvas>

    <div class="buttons">
      <button class="income-btn" @click="showModal('income')">Доход</button>
      <button class="expense-btn" @click="showModal('expense')">Расход</button>
    </div>

    <div class="currency-switcher">
      <div>₽ RUB</div>
      <div>$ EUR</div>
      <div>€ USD</div>
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
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const labels = ref([])
const balance = ref(0)
const incomeTotal = ref(0)
const expenseTotal = ref(0)
const currentType = ref('')
const amountInput = ref(0)
const modalVisible = ref(false)

const modalTitle = computed(() =>
  currentType.value === 'income' ? 'Введите доход' : 'Введите расход'
)

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
  if (!isNaN(amountInput.value)) {
    updateChart(amountInput.value, currentType.value)
    modalVisible.value = false
  }
}

const animateDisplay = (id, endValue, prefix = 'Общий баланс: ', suffix = ' ₽') => {
  const element = document.getElementById(id)
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
  const ctx = document.getElementById('financeChart').getContext('2d')
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
        }
      }]
    },
    options: {
      scales: { y: { beginAtZero: true } },
      plugins: {
        legend: {
          labels: { color: '#fff' }
        }
      }
    }
  })
})
</script>

<style scoped>

main {
  padding: 20px;
  background: url('@/assets/images/swfv.jpg') no-repeat;
}

.profile {
  display: flex;
  align-items: center;
  padding: 20px 30px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
  border: 2px solid #933;
}

.section-title {
  text-align: center;
  font-size: 24px;
  margin: 20px 0 10px;
}

#balanceDisplay {
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
  color: #0f0;
}

canvas {
  display: block;
  margin: 0 auto;
  max-width: 800px;
  background-color: #222;
  padding: 10px;
  border-radius: 10px;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  margin: 0 10px;
  cursor: pointer;
}

.income-btn {
  background-color: #0f0;
  color: #000;
}

.expense-btn {
  background-color: #f00;
  color: #fff;
}

.modal {
  display: flex;
  position: fixed;
  z-index: 10;
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
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 0 10px #fff;
}

.modal-content input {
  padding: 10px;
  width: 200px;
  font-size: 16px;
  margin: 10px 0;
}

.modal-content button {
  background-color: #444;
  color: #fff;
}

.currency-switcher {
  position: absolute;
  right: 30px;
  top: 150px;
  text-align: right;
}

.currency-switcher div {
  margin-bottom: 5px;
  cursor: pointer;
}
</style>
