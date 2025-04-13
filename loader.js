(function () {
  const licenseKey = "iJZc8v7CUUtkpLg0piEun46cSC3Es2U2cH7T24PTZtqijFgYAA";
  const domain = window.location.hostname.replace("www.", "").toLowerCase();
  
  const licenseURL = "https://github.com/digitloyal/qph/blob/main/licenses.json";
  const cssURL = "https://github.com/digitloyal/qph/blob/main/style.css";

  fetch(licenseFileURL)
    .then(res => res.json())
    .then(licenses => {
      // Check for a matching license with correct key and domain
      const isValid = licenses.some(
        item => item.key === licenseKey && item.domain === domain
      );

      if (isValid) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssURL;
        document.head.appendChild(link);
        console.log("✅ License matched. CSS applied.");
      } else {
        console.warn("❌ License or domain mismatch. CSS not loaded.");
      }
    })
    .catch(error => console.error("Error loading license:", error));
})();
