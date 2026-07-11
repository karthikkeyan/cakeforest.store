// Theme switching: Forest Canopy (day) / Neon Bazaar (night)
// Day: 6am–8pm  |  Night: 8pm–6am
function getActiveTheme() {
  const hour = new Date().getHours();
  return (hour >= 6 && hour < 20) ? 'day' : 'night';
}

document.addEventListener('DOMContentLoaded', () => {
  const theme = getActiveTheme();
  document.documentElement.dataset.theme = theme;
});
