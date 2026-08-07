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

(function(){
  var modal = document.getElementById('checkoutModal');
  var form = document.getElementById('checkoutForm');
  if (!modal || !form) return;

  var STORAGE_KEY = 'bb_checkout_details';
  var pendingForm = null;

  function setHiddenField(targetForm, name, value){
    var input = targetForm.querySelector('input[name="' + name + '"]');
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      targetForm.appendChild(input);
    }
    input.value = value;
  }

  function openModal(targetForm){
    pendingForm = targetForm;
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        var data = JSON.parse(saved);
        Object.keys(data).forEach(function(key){
          if (form.elements[key]) form.elements[key].value = data[key];
        });
      } catch (e) {}
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var firstField = form.elements.fullName;
    if (firstField) firstField.focus();
  }

  function closeModal(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    pendingForm = null;
  }

  document.querySelectorAll('.buy-cell form').forEach(function(buyForm){
    buyForm.addEventListener('submit', function(e){
      e.preventDefault();
      openModal(buyForm);
    });
  });

  modal.querySelectorAll('[data-checkout-close]').forEach(function(el){
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if (!pendingForm) return;
    if (!form.reportValidity()) return;

    var data = {
      fullName: form.elements.fullName.value.trim(),
      email: form.elements.email.value.trim(),
      address1: form.elements.address1.value.trim(),
      address2: form.elements.address2.value.trim(),
      city: form.elements.city.value.trim(),
      postcode: form.elements.postcode.value.trim()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    var nameParts = data.fullName.split(/\s+/);
    var firstName = nameParts.shift() || '';
    var lastName = nameParts.join(' ');

    setHiddenField(pendingForm, 'first_name', firstName);
    setHiddenField(pendingForm, 'last_name', lastName);
    setHiddenField(pendingForm, 'email', data.email);
    setHiddenField(pendingForm, 'address1', data.address1);
    setHiddenField(pendingForm, 'address2', data.address2);
    setHiddenField(pendingForm, 'city', data.city);
    setHiddenField(pendingForm, 'zip', data.postcode);
    setHiddenField(pendingForm, 'country', 'GB');

    var noShipping = pendingForm.querySelector('input[name="no_shipping"]');
    if (noShipping) noShipping.value = '2';

    var targetForm = pendingForm;
    closeModal();
    targetForm.submit();
  });
})();
