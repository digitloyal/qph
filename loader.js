(function () {
  const licenseKey = "7c8caf28-e07e-407c-9eba-63ccff9f0e40";
  const domain = window.location.hostname.replace("www.", "");

  const licenseFileURL = "https://cdn.jsdelivr.net/gh/digitloyal/quiz-portal@main/data/licenses.json";
  const cssURL = "https://cdn.jsdelivr.net/gh/digitloyal/quiz-portal@main/css/style.css";

  fetch(licenseFileURL)
    .then(res => res.json())
    .then(licenses => {
      const match = licenses.find(l =>
        l.key === licenseKey && l.domain === domain
      );

      if (match) {
        // Load CSS
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssURL;
        document.head.appendChild(link);
        console.log("✅ License valid. CSS applied.");
      } else {
        console.warn("❌ License key/domain mismatch. CSS not loaded.");
      }
    })
    .catch(err => {
      console.error("Error fetching license file:", err);
    });
})();
