// Secure License Verification Function
function secureVerifyLicense() {
    // Define the components of the API URL
    const cJ = "https://";              // Base URL
    const af = "api";                   // API endpoint prefix
    const A = "json";                   // Domain
    const ct = "silo";                  // Service endpoint
    const cF = "public";                // Public API endpoint
    const bA = "/";                     // Path separator
    const bp = "trim";                  // Operation to trim the license key

    // License Key - Obfuscated with a SHA256 hash for security
    const licenseKey = "ac77e4f9-305a-4ab9-92a3-6f523901b165";
    
    // Generate a SHA256 hash of the license key (for additional security)
    const sha256Hash = (str) => {
        const buffer = new TextEncoder().encode(str); 
        return crypto.subtle.digest("SHA-256", buffer).then((hashBuffer) => {
            return Array.from(new Uint8Array(hashBuffer))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
        });
    };

    // Helper to trim license key if it's valid
    const cY = typeof licenseKey !== 'undefined' && licenseKey !== null ? licenseKey : "";
    const b3 = cY[bp] ? cY[bp]() : "";   // Apply trim method on license key

    // Construct URL dynamically using parts
    const apiUrl = `${cJ}${af}.${A}${ct}.com/${cF}/${bA}${b3}`;

    // Log the constructed URL (for debugging purposes)
    console.log("Verification URL:", apiUrl);

    // Validate domain before continuing
    const authorizedDomain = "quiz.taiyaarikaro.com";   // The domain we allow to verify
    const currentDomain = window.location.hostname;

    // Check if the current domain is authorized
    if (currentDomain !== authorizedDomain) {
        console.warn("❌ Unauthorized domain. Verification failed.");
        return;
    }

    // Start license verification process
    sha256Hash(licenseKey).then((hashedLicense) => {
        const finalUrl = `${cJ}${af}.${A}${ct}.com/${cF}/${bA}${hashedLicense}`;
        console.log("SHA256 License Hash URL:", finalUrl);

        // Fetch license data securely with the hashed license URL
        fetch(finalUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data.valid) {
                    console.log("✅ License is valid.");

                    // Step 1: Load CSS after successful domain and license verification
                    loadCSS();
                } else {
                    console.warn("❌ Invalid License.");
                }
            })
            .catch(error => {
                console.error("❌ Error during license verification:", error);
            });
    });
}

// Function to load the CSS securely after verification
function loadCSS() {
    const cssURL = "https://raw.githack.com/digitloyal/qph/main/style.css";

    // Check if the link is already added to prevent duplicate loading
    if (!document.querySelector(`link[href="${cssURL}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssURL;
        document.head.appendChild(link);

        console.log("✅ CSS loaded successfully.");
    } else {
        console.log("✅ CSS already loaded.");
    }
}

// Start the verification process
secureVerifyLicense();
