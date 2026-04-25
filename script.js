(function () {
  'use strict';

  var STORAGE_KEY = 'doorlab_consent';
  var consentBar = document.getElementById('consentBar');
  var acceptBtn = document.getElementById('consentAccept');
  var declineBtn = document.getElementById('consentDecline');

  var stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage blocked */ }

  function loadGA() {
    var id = window.GA_MEASUREMENT_ID;
    if (!id || id.indexOf('G-XXXXXX') === 0) return;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', id, { anonymize_ip: true });
  }

  if (stored === 'accepted') {
    loadGA();
  } else if (stored !== 'declined' && consentBar) {
    consentBar.hidden = false;
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch (e) {}
      if (consentBar) consentBar.hidden = true;
      loadGA();
    });
  }
  if (declineBtn) {
    declineBtn.addEventListener('click', function () {
      try { localStorage.setItem(STORAGE_KEY, 'declined'); } catch (e) {}
      if (consentBar) consentBar.hidden = true;
    });
  }
})();
