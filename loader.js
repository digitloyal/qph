(function () {
  const LICENSE_URL = "https://raw.githack.com/digitloyal/qph/main/licenses.json";
  const CSS_URL = "https://raw.githack.com/digitloyal/qph/main/google";
  const CURRENT_DOMAIN = window.location.hostname;

  fetch(LICENSE_URL)
    .then(res => res.json())
    .then(data => {
      const isAllowed = data.some(entry => entry.domain === CURRENT_DOMAIN);
      if (isAllowed) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = CSS_URL;
        document.head.appendChild(link);
        console.log("✅ CSS loaded for", CURRENT_DOMAIN);
      } else {
        console.warn("⛔ Unauthorized domain. CSS not loaded:", CURRENT_DOMAIN);
      }
    })
    .catch(err => console.error("Error fetching license list:", err));
})();
