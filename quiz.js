(async function() {
    const authorizedDomain = "quiz.taiyaarikaro.com";
    const cssURL = "https://raw.githack.com/digitloyal/qph/main/style.css";
    const licenseURL = "https://api.jsonsilo.com/public/ac77e4f9-305a-4ab9-92a3-6f523901b165";

    const currentDomain = window.location.hostname;

    // Step 1: Check domain
    if (currentDomain !== authorizedDomain) {
        console.warn("❌ Unauthorized domain. CSS not loaded.");
        return;
    }

    try {
        // Step 2: Fetch license data
        const response = await fetch(licenseURL);
        const licenseData = await response.json();

        // Step 3: Validate license
        if (licenseData?.allowed_domains?.includes(currentDomain)) {
            // Step 4: Inject class to activate CSS
            document.documentElement.classList.add('license-verified');

            // Step 5: Inject the CSS
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = cssURL;
            document.head.appendChild(link);

            console.log("✅ License verified. CSS loaded.");
        } else {
            console.warn("❌ License verification failed.");
        }
    } catch (error) {
        console.error("❌ License fetch error:", error);
    }
})();
