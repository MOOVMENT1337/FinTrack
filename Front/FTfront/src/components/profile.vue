<template>
  <main>
    <!-- === ПРОФИЛЬ === -->
    <section class="profile">
      <img src="../assets/icons/avatar.png" alt="Фото пользователя" class="avatar" />

      <div class="profile-info">
        <div>
          <strong>{{ user.username || 'USER' }}</strong>
          <span style="color: #0f0;">● На сайте</span>
        </div>
        <div id="incomeDisplay" :data-value="incomeTotal">Доходы: {{ incomeTotal }}₽</div>
        <div id="expenseDisplay" :data-value="expenseTotal">Расходы: {{ expenseTotal }}₽</div>
        <div>С {{ formatDate(user.registrationDate) }}</div>
      </div>

      <div class="profile-actions">
        <button class="edit-btn" @click="openEditProfileModal">Редактировать</button>
        <button class="logout-btn" @click="logout">Выйти</button>
      </div>
    </section>

    <!-- === ФИНАНСЫ === -->
    <div class="section-title">Мои финансы за этот месяц</div>
    <div id="balanceDisplay" :data-value="balance">Общий баланс: {{ balance }} ₽</div>
    <canvas id="financeChart" height="350"></canvas>

    <!-- === КНОПКИ ДОХОД/РАСХОД + ВАЛЮТА === -->
    <div class="buttons-row">
      <div class="buttons">
        <button class="income-btn" @click="showModal('income')">Доход</button>
        <button class="expense-btn" @click="showModal('expense')">Расход</button>
      </div>

      <div class="currency-switcher">
        <div class="dropdown" @click="toggleDropdown">
          {{ selectedCurrency.symbol }} {{ selectedCurrency.code }}
          <div class="dropdown-menu" v-show="dropdownVisible">
            <div
              v-for="currency in currencies"
              :key="currency.code"
              @click.stop="changeCurrency(currency)"
            >
              {{ currency.symbol }} {{ currency.code }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- === МОДАЛ ДОХОД/РАСХОД === -->
    <div id="modal" class="modal" v-show="modalVisible" @click.self="modalVisible = false">
      <div class="modal-content">
        <h3>{{ modalTitle }}</h3>
        <input type="number" v-model.number="amountInput" placeholder="Сумма" />
        <br />
        <button @click="submitAmount">OK</button>
      </div>
    </div>

    <!-- === МОДАЛ РЕДАКТИРОВАНИЯ ПРОФИЛЯ === -->
    <div id="editProfileModal" class="modal" v-show="editProfileVisible" @click.self="editProfileVisible = false">
      <div class="modal-content">
        <h3>Изменить профиль</h3>

        <label>
          Новый логин
          <input type="text" v-model.trim="usernameInput" placeholder="Username" />
        </label>

        <label>
          Новый пароль
          <input type="password" v-model.trim="passwordInput" placeholder="Password" />
        </label>

        <div class="modal-actions">
          <button @click="saveProfileChanges">Сохранить</button>
          <button @click="editProfileVisible = false">Отмена</button>
        </div>

        <p v-if="profileError" class="error">{{ profileError }}</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import Chart from 'chart.js/auto'

/* ---------- STORES & ROUTER ---------- */
const userStore = useUserStore()
const router = useRouter()

/* ---------- ГЛАВНЫЕ РЕФЫ ---------- */
const labels = ref<string[]>([])
const balance = ref(0)
const incomeTotal = ref(0)
const expenseTotal = ref(0)

const modalVisible = ref(false)
const currentType = ref<'income' | 'expense'>('income')
const amountInput = ref<number>(0)

/* ---------- ВАЛЮТА ---------- */
const dropdownVisible = ref(false)
const currencies = [
  { code: 'RUB', symbol: '₽', rate: 1 },
  { code: 'USD', symbol: '$', rate: 0.011 },
  { code: 'EUR', symbol: '€', rate: 0.01 },
] as const
const selectedCurrency = ref(currencies[0])

/* ---------- ИЗМЕНЕНИЕ ПРОФИЛЯ ---------- */
const editProfileVisible = ref(false)
const usernameInput = ref('')
const passwordInput = ref('')
const profileError = ref('')

/* ---------- COMPUTED ---------- */
const username = computed(() => userStore.username)
const registrationDate = ref('')

const user = computed(() => ({
  username: username.value,
  registrationDate: registrationDate.value,
}))

const modalTitle = computed(() =>
  currentType.value === 'income' ? 'Введите доход' : 'Введите расход',
)

/* ---------- ФОРМАТ ДАТ ---------- */
const formatDate = (date: string) => {
  if (!date) return 'Неизвестно'
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

/* ---------- API ---------- */
const loadUserData = async () => {
  try {
    // /api/user → возвращает объект с createdAt
    const res = await fetch('/auth/user', {
      headers: userStore.authHeader,
    })
    if (!res.ok) throw new Error('Ошибка загрузки данных пользователя')
    const data = await res.json()
    registrationDate.value = data.createdAt || ''
  } catch (error) {
    console.error(error)
    registrationDate.value = new Date().toISOString()
  }
}

/* ---------- ФИНАНСОВЫЙ ГРАФИК ---------- */
let financeChart: Chart<'bar'>

const updateChart = (amount: number, type: 'income' | 'expense') => {
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

  updateCurrencyDisplays()
}

/* ---------- ВАЛЮТНЫЕ ПЕРЕСЧЁТЫ ---------- */
const toggleDropdown = () => (dropdownVisible.value = !dropdownVisible.value)

const changeCurrency = (currency: typeof currencies[number]) => {
  selectedCurrency.value = currency
  dropdownVisible.value = false
  updateCurrencyDisplays()
}

/* ---------- МОДАЛ ДОХОД/РАСХОД ---------- */
const showModal = (type: 'income' | 'expense') => {
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

/* ---------- АНИМАЦИЯ ЦИФР ---------- */
const animateDisplay = (
  id: string,
  endValue: number,
  prefix = 'Общий баланс: ',
  suffix = ' ₽',
) => {
  const element = document.getElementById(id)
  if (!element) return

  const startValue = parseFloat(element.dataset.value || '0') || 0
  const duration = 800
  const startTime = performance.now()

  function update(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const currentValue = Math.floor(startValue + (endValue - startValue) * progress)
    element.textContent = `${prefix}${currentValue.toLocaleString()}${suffix}`
    element.dataset.value = currentValue.toString()
    if (progress < 1) requestAnimationFrame(update)
  }

  requestAnimationFrame(update)
}

const updateCurrencyDisplays = () => {
  animateDisplay(
    'balanceDisplay',
    balance.value * selectedCurrency.value.rate,
    'Общий баланс: ',
    ` ${selectedCurrency.value.symbol}`,
  )
  animateDisplay(
    'incomeDisplay',
    incomeTotal.value * selectedCurrency.value.rate,
    'Доходы: ',
    ` ${selectedCurrency.value.symbol}`,
  )
  animateDisplay(
    'expenseDisplay',
    expenseTotal.value * selectedCurrency.value.rate,
    'Расходы: ',
    ` ${selectedCurrency.value.symbol}`,
  )
}

/* ---------- РЕДАКТИРОВАНИЕ ПРОФИЛЯ ---------- */
const openEditProfileModal = () => {
  usernameInput.value = username.value
  passwordInput.value = ''
  profileError.value = ''
  editProfileVisible.value = true
}

const saveProfileChanges = async () => {
  profileError.value = ''

  const payload: Record<string, string> = {}
  if (usernameInput.value && usernameInput.value !== userStore.username) {
    payload.username = usernameInput.value
  }
  if (passwordInput.value) {
    if (passwordInput.value.length < 6) {
      profileError.value = 'Пароль должен содержать минимум 6 символов'
      return
    }
    payload.password = passwordInput.value
  }

  if (Object.keys(payload).length === 0) {
    editProfileVisible.value = false
    return
  }

  try {
    const res = await fetch('/auth/update', {
      method: 'POST',
      headers: { ...userStore.authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Ошибка сохранения профиля')

    const data = await res.json()

    // обновляем Pinia-store новым токеном и логином
    userStore.setUser({
      username: data.user.username,
      registrationDate: data.user.createdAt,
      token: data.access_token,
    })

    editProfileVisible.value = false
  } catch (e: any) {
    profileError.value = e.message || 'Не удалось сохранить изменения'
  }
}

/* ---------- ВЫХОД ---------- */
const logout = () => {
  userStore.logout()
  router.push('/auth/login')
}

/* ---------- onMounted ---------- */
onMounted(async () => {
  await userStore.fetchUserInfo();
  loadUserData();

  const canvas = document.getElementById('financeChart') as HTMLCanvasElement | null;
  if (!canvas) return;

  const context = canvas.getContext('2d');
  if (!context) return;

  financeChart = new Chart(context, {
    type: 'bar',
    data: {
      labels: labels.value,
      datasets: [
        {
          label: 'Баланс',
          data: [],
          backgroundColor: (ctx) =>
            (ctx.raw as number) >= 0 ? 'rgba(75, 192, 192, 0.6)' : 'rgba(255, 99, 132, 0.6)',
          borderColor: (ctx) =>
            (ctx.raw as number) >= 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: '#fff' },
          grid: { color: 'rgba(255,255,255,0.1)' },
        },
        x: {
          ticks: { color: '#fff' },
          grid: { color: 'rgba(255,255,255,0.1)' },
        },
      },
      plugins: {
        legend: { labels: { color: '#fff' } },
      },
    },
  });

  updateCurrencyDisplays();
});

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
  border-radius: 10px;
  margin-bottom: 20px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.6), 
              0 0 60px rgba(81, 92, 230, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
  color: #fff;
  z-index: 2;
  position: relative;
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

/* Обёртка для кнопок и селектора */
.buttons-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin: 20px 0;
}

/* Кнопки */
.buttons {
  display: flex;
  gap: 10px;
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

/* Модальное окно */
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

/* Выпадающий список валют */
.currency-switcher {
  user-select: none;
  cursor: pointer;
  text-align: right;
}

.currency-switcher .dropdown {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 8px 12px;
  border-radius: 5px;
  position: relative;
  color: #fff;
  white-space: nowrap;
}

.currency-switcher .dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: rgba(34, 34, 34, 0.9);
  border-radius: 5px;
  margin-top: 5px;
  z-index: 10;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  min-width: 100%;
}

.currency-switcher .dropdown-menu div {
  padding: 8px 12px;
  cursor: pointer;
}

.currency-switcher .dropdown-menu div:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.error {
  margin-top: 0.5rem;
  color: #ff6b6b;
}
.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.edit-btn,
.logout-btn {
  padding: 0.4rem 0.8rem;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}
</style>
