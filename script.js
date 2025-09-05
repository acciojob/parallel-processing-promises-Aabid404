 const imageUrls = [
      "https://picsum.photos/200/300?random=1",
      "https://picsum.photos/200/300?random=2",
      "https://picsum.photos/200/300?random=3",
      "https://invalid-url-to-test-error.jpg" // ❌ Example broken URL
    ];

    // Single image downloader returning a Promise
    function downloadImage(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;

        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      });
    }

    // Main function using Promise.all
    async function downloadImages(urls) {
      const loadingDiv = document.getElementById("loading");
      const errorDiv = document.getElementById("error");
      const outputDiv = document.getElementById("output");

      // Reset UI
      loadingDiv.style.display = "block";
      errorDiv.textContent = "";
      outputDiv.innerHTML = "";

      try {
        const images = await Promise.all(urls.map(downloadImage));

        // Hide loader
        loadingDiv.style.display = "none";

        // Display images
        images.forEach(img => outputDiv.appendChild(img));
      } catch (err) {
        // Hide loader
        loadingDiv.style.display = "none";

        // Show error
        errorDiv.textContent = err.message;
      }
    }

    // Trigger download
    downloadImages(imageUrls);