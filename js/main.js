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
// -- filtrage dynamique des freelances --
const boutonsFiltre = document.querySelectorAll('.btn-filtre');
const cartesFreelance = document.querySelectorAll('.carte-freelance-col');

boutonsFiltre.forEach(bouton => {
  bouton.addEventListener('click', () => {
    boutonsFiltre.forEach(b => b.classList.remove('actif'));
    bouton.classList.add('actif');

    const categorie = bouton.getAttribute('data-categorie');

    cartesFreelance.forEach(carte => {
      if (categorie === 'tous' || carte.getAttribute('data-categorie') === categorie) {
        carte.style.display = 'block';
      } else {
        carte.style.display = 'none';
      }
    });
  });
});

// -- validation formulaire de contact --
const boutonEnvoyer = document.getElementById('bouton-envoyer');

boutonEnvoyer?.addEventListener('click', () => {
  let valide = true;

  // nom
  const nom = document.getElementById('champ-nom');
  const erreurNom = document.getElementById('erreur-nom');
  if (!nom.value.trim() || nom.value.trim().length < 2) {
    erreurNom.textContent = 'Le nom doit contenir au moins 2 caractères.';
    nom.classList.add('invalide');
    valide = false;
  } else {
    erreurNom.textContent = '';
    nom.classList.remove('invalide');
  }

  // prénom
  const prenom = document.getElementById('champ-prenom');
  const erreurPrenom = document.getElementById('erreur-prenom');
  if (!prenom.value.trim() || prenom.value.trim().length < 2) {
    erreurPrenom.textContent = 'Le prénom doit contenir au moins 2 caractères.';
    prenom.classList.add('invalide');
    valide = false;
  } else {
    erreurPrenom.textContent = '';
    prenom.classList.remove('invalide');
  }

  // email
  const email = document.getElementById('champ-email');
  const erreurEmail = document.getElementById('erreur-email');
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email.value.trim())) {
    erreurEmail.textContent = 'Veuillez entrer un email valide.';
    email.classList.add('invalide');
    valide = false;
  } else {
    erreurEmail.textContent = '';
    email.classList.remove('invalide');
  }

  // sujet
  const sujet = document.getElementById('champ-sujet');
  const erreurSujet = document.getElementById('erreur-sujet');
  if (!sujet.value) {
    erreurSujet.textContent = 'Veuillez choisir un sujet.';
    sujet.classList.add('invalide');
    valide = false;
  } else {
    erreurSujet.textContent = '';
    sujet.classList.remove('invalide');
  }

  // message 20 caractères minimum
  const message = document.getElementById('champ-message');
  const erreurMessage = document.getElementById('erreur-message');
  if (!message.value.trim() || message.value.trim().length < 20) {
    erreurMessage.textContent = 'Le message doit contenir au moins 20 caractères.';
    message.classList.add('invalide');
    valide = false;
  } else {
    erreurMessage.textContent = '';
    message.classList.remove('invalide');
  }

  // si tout est bon
  if (valide) {
    document.getElementById('message-succes').style.display = 'flex';
    nom.value = '';
    prenom.value = '';
    email.value = '';
    sujet.value = '';
    message.value = '';
  }
});