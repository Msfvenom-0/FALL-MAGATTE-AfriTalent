// AfriTalent — main.js
// Magatte Fall

// -- année courante dans le footer --
document.querySelectorAll('#annee-courante').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// -- light mode avec localStorage --
// le site est dark par défaut, le bouton active le light mode
const boutonTheme = document.getElementById('bouton-theme');
const iconeTheme = boutonTheme?.querySelector('i');

if (localStorage.getItem('theme') === 'clair') {
  document.body.classList.add('mode-clair');
  if (iconeTheme) iconeTheme.classList.replace('bi-moon-fill', 'bi-sun-fill');
}

boutonTheme?.addEventListener('click', () => {
  document.body.classList.toggle('mode-clair');
  const estClair = document.body.classList.contains('mode-clair');
  localStorage.setItem('theme', estClair ? 'clair' : 'sombre');
  if (iconeTheme) {
    iconeTheme.classList.toggle('bi-moon-fill', estClair);
    iconeTheme.classList.toggle('bi-sun-fill', !estClair);
  }
});

// -- navbar qui change au scroll --
const barreNav = document.getElementById('barre-nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    barreNav?.classList.add('scrolled');
  } else {
    barreNav?.classList.remove('scrolled');
  }
});

// -- bouton retour en haut --
const boutonHaut = document.getElementById('bouton-haut');

window.addEventListener('scroll', () => {
  if (boutonHaut) {
    boutonHaut.style.display = window.scrollY > 400 ? 'flex' : 'none';
  }
});

boutonHaut?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});