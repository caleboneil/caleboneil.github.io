(function () {
  'use strict';

  var STORAGE_KEY = 'doorlab_consent';
  var consentBar = document.getElementById('consentBar');
  var acceptBtn = document.getElementById('consentAccept');
  var declineBtn = document.getElementById('consentDecline');

  var stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage blocked */ }

  function updateConsent(granted) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied'
    });
  }

  if (stored !== 'accepted' && stored !== 'declined' && consentBar) {
    consentBar.hidden = false;
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch (e) {}
      if (consentBar) consentBar.hidden = true;
      updateConsent(true);
    });
  }
  if (declineBtn) {
    declineBtn.addEventListener('click', function () {
      try { localStorage.setItem(STORAGE_KEY, 'declined'); } catch (e) {}
      if (consentBar) consentBar.hidden = true;
      updateConsent(false);
    });
  }
})();
