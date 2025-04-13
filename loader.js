(function() {
  const licenseKey = "quiz.taiyaarikaro.com";
  const licenseURL = "https://github.com/digitloyal/qph/blob/main/licenses.json";
  const cssURL = "https://github.com/digitloyal/qph/blob/main/style.css";

  fetch(licenseURL)
    .then(response => response.json())
    .then(data => {
      const validDomains = data.map(entry => entry.key);
      if (validDomains.includes(licenseKey)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssURL;
        document.head.appendChild(link);
      } else {
        console.error("License verification failed.");
      }
    })
    .catch(error => {
      console.error("Error fetching license data:", error);
    });
})();
