/* Navbar partagée — une seule source pour toutes les pages.
   Inclusion :  <script src="CHEMIN/nav.js"></script>
   Le chemin relatif jusqu'à la racine est déduit automatiquement du src
   (nav.js → "", ../nav.js → "../", ../../nav.js → "../../"), donc le même
   fichier fonctionne à n'importe quelle profondeur de dossier. */
(function () {
  var me = document.currentScript;
  var src = me ? me.getAttribute('src') : 'nav.js';
  var root = src.replace(/nav\.js(\?.*)?$/, '');        // ex : "../../"
  var home = root === '' ? '' : root + 'index.html';    // "" sur la home → ancres locales

  function link(id) { return home + '#' + id; }

  function build() {
    if (document.querySelector('header.site-nav')) return;
    var h = document.createElement('header');
    h.className = 'site-nav';
    h.innerHTML =
      '<a href="' + link('hero') + '" data-hover class="brand nav-reveal">' +
        '<img src="' + root + 'uploads/logo_LG.png" alt="LG — Lucien Gendre"></a>' +
      '<nav>' +
        '<a href="' + link('projets') + '" data-hover class="nav-link nav-reveal nav-desktop">Projets</a>' +
        '<a href="' + link('services') + '" data-hover class="nav-link nav-reveal nav-desktop">Compétences</a>' +
        '<a href="' + link('apropos') + '" data-hover class="nav-link nav-reveal nav-desktop">À propos</a>' +
        '<a href="' + link('contact') + '" data-hover class="nav-cta nav-reveal">Contact →</a>' +
      '</nav>';
    document.body.insertBefore(h, document.body.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
