const body = document.body;
const toggleButton = document.querySelector('.theme-toggle');
const toggleLabel = document.querySelector('.toggle-label');
const filterButtons = document.querySelectorAll('.filter-btn');
const destinationCards = document.querySelectorAll('.destination-card');

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const storedTheme = localStorage.getItem('travelwell-theme');

function applyTheme(theme) {
  const isDark = theme === 'dark';
  body.classList.toggle('dark-theme', isDark);
  toggleButton.setAttribute('aria-pressed', String(isDark));
  toggleLabel.textContent = isDark ? 'Light mode' : 'Dark mode';
}

function initializeTheme() {
  if (storedTheme) {
    applyTheme(storedTheme);
    return;
  }

  const initialTheme = prefersDark.matches ? 'dark' : 'light';
  applyTheme(initialTheme);
}

function toggleTheme() {
  const nextTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
  localStorage.setItem('travelwell-theme', nextTheme);
  applyTheme(nextTheme);
}

function filterDestinations(category) {
  destinationCards.forEach((card) => {
    const matches = category === 'all' || card.dataset.category.includes(category);
    card.hidden = !matches;
  });
}

if (toggleButton) {
  toggleButton.addEventListener('click', toggleTheme);
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const { filter } = button.dataset;

    filterButtons.forEach((btn) => {
      btn.classList.toggle('is-active', btn === button);
    });

    filterDestinations(filter);
  });
});

initializeTheme();

prefersDark.addEventListener('change', (event) => {
  if (!storedTheme) {
    applyTheme(event.matches ? 'dark' : 'light');
  }
});



















































