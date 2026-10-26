const tg = window.Telegram.WebApp;
if (tg) { tg.ready(); tg.expand(); }

const balanceEl = document.getElementById('balance-value');
const energyEl = document.getElementById('energy-value');
const energyFill = document.getElementById('energy-fill');
const vortexEl = document.getElementById('vortex');
const flashEl = document.getElementById('flash');
const mainContent = document.querySelector('.main-content');

const MAX_ENERGY = 1000;
let balance = parseInt(localStorage.getItem('acheron_balance')) || 0;
let energy = parseInt(localStorage.getItem('acheron_energy')) || MAX_ENERGY;

function updateUI() {
    balanceEl.textContent = balance;
    energyEl.textContent = Math.floor(energy);
    const percent = (energy / MAX_ENERGY) * 100;
    energyFill.style.width = percent + '%';

    if (energy <= 0) {
        vortexEl.style.opacity = '0.3';
        vortexEl.style.filter = 'grayscale(100%)';
    } else {
        vortexEl.style.opacity = '1';
        vortexEl.style.filter = 'grayscale(0%)';
    }
}

function saveData() {
    localStorage.setItem('acheron_balance', balance);
    localStorage.setItem('acheron_energy', energy);
}

setInterval(() => {
    if (energy < MAX_ENERGY) {
        energy += 1;
        updateUI();
        saveData();
    }
}, 1000);

vortexEl.addEventListener('click', (e) => {
    if (energy <= 0) return;

    balance += 1;
    energy -= 1;
    updateUI();
    saveData();

    flashEl.classList.add('active');
    setTimeout(() => flashEl.classList.remove('active'), 50);

    const floatingText = document.createElement('div');
    floatingText.className = 'floating-text';
    floatingText.textContent = '+1';
    
    const rect = mainContent.getBoundingClientRect();
    const x = e.clientX || (e.touches && e.touches[0].clientX) || (rect.width / 2);
    const y = e.clientY || (e.touches && e.touches[0].clientY) || (rect.height / 2);
    
    floatingText.style.left = (x - 10) + 'px';
    floatingText.style.top = (y - 40) + 'px';

    document.body.appendChild(floatingText);

    setTimeout(() => { floatingText.remove(); }, 800);

    if (tg && tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
});

const navButtons = document.querySelectorAll('.nav-btn');
const screens = document.querySelectorAll('.screen');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        navButtons.forEach(b => b.classList.remove('active'));
        screens.forEach(s => s.classList.remove('active-screen'));
        
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active-screen');
        
        if (tg && tg.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('medium');
        }
    });
});

updateUI();
