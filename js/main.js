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
// -- compteurs animés au scroll --
const compteurs = document.querySelectorAll('.chiffre-anime');

function animerCompteur(el) {
  const cible = parseInt(el.getAttribute('data-cible'));
  const duree = 2000;
  const pas = Math.ceil(cible / (duree / 16));
  let valeur = 0;

  const intervalle = setInterval(() => {
    valeur += pas;
    if (valeur >= cible) {
      valeur = cible;
      clearInterval(intervalle);
    }
    el.textContent = valeur.toLocaleString('fr-FR');
  }, 16);
}

const observateurCompteurs = new IntersectionObserver((entrees) => {
  entrees.forEach(entree => {
    if (entree.isIntersecting) {
      animerCompteur(entree.target);
      observateurCompteurs.unobserve(entree.target);
    }
  });
}, { threshold: 0.5 });

compteurs.forEach(c => observateurCompteurs.observe(c));

// -- animations fade-in au scroll --
const elementsFadeIn = document.querySelectorAll(
  '.carte-bento, .carte-categorie, .carte-freelance, .carte-membre, .carte-plan, .carte-valeur'
);

elementsFadeIn.forEach(el => el.classList.add('fade-in'));

const observateurFade = new IntersectionObserver((entrees) => {
  entrees.forEach(entree => {
    if (entree.isIntersecting) {
      entree.target.classList.add('visible');
      observateurFade.unobserve(entree.target);
    }
  });
}, { threshold: 0.15 });

elementsFadeIn.forEach(el => observateurFade.observe(el));