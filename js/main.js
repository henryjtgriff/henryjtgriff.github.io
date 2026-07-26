document.querySelectorAll('.yr').forEach(function(e){ e.textContent = new Date().getFullYear(); });

var navToggle = document.querySelector('.nav-toggle');
var siteNav = document.querySelector('.site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', function(){
    var isOpen = siteNav.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  siteNav.querySelectorAll('.nav-links a').forEach(function(link){
    link.addEventListener('click', function(){
      siteNav.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
