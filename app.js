const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

let balance = 0;
let energy = 1000;

const balanceEl = document.getElementById('balance-value');
const vortexEl = document.getElementById('vortex');

vortexEl.addEventListener('click', () => {
    if (energy <= 0) return;

    balance += 1;
    energy -= 1;
    balanceEl.textContent = balance;

    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
});
