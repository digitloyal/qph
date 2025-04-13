(function () {
  // सुनिश्चित करें कि यह license key आपकी licenses.json में दिए गए key से मेल खाता है
  const licenseKey = "iJZc8v7CUUtkpLg0piEun46cSC3Es2U2cH7T24PTZtqijFgYAA";
  // domain को lowercase और बिना www के प्राप्त करें
  const domain = window.location.hostname.replace("www.", "").toLowerCase();
  console.log("Detected Domain:", domain);

  const licenseFileURL = "https://cdn.jsdelivr.net/gh/digitloyal/qph@main/licenses.json";
  const cssURL = "https://cdn.jsdelivr.net/gh/digitloyal/qph@main/style.css";

  console.log("Fetching license file from:", licenseFileURL);

  fetch(licenseFileURL)
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to fetch licenses.json. Status: " + res.status);
      }
      return res.json();
    })
    .then(licenses => {
      console.log("Fetched licenses:", licenses);
      // Check if any license matches the provided licenseKey and domain
      const isValid = licenses.some(item => {
        const match = (item.key === licenseKey && item.domain === domain);
        console.log("Checking license entry:", item, "Match result:", match);
        return match;
      });

      if (isValid) {
        console.log("✅ License validated. Loading CSS from:", cssURL);
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssURL;
        document.head.appendChild(link);
      } else {
        console.error("❌ License validation failed. License key or domain mismatch.");
      }
    })
    .catch(error => {
      console.error("Error fetching license file:", error);
    });
})();
