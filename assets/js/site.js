(function () {
  const year = new Date().getFullYear();
  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.textContent = `© ${year} Gaute Torsvik`;
  }
})();
