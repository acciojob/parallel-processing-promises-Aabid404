const imageUrls = [
      "https://picsum.photos/200/300",
      "https://picsum.photos/250/300",
      "https://picsum.photos/300/300",
      "https://invalid-url.com/fail.jpg" // This will trigger error
    ];

    // Function to download a single image
    function downloadImage(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load image: ${url}`);
      });
    }

    // Main function to download all images
    async function downloadImages() {
      const loadingDiv = document.getElementById("loading");
      const errorDiv = document.getElementById("error");
      const outputDiv = document.getElementById("output");

      // Reset states
      loadingDiv.style.display = "block";
      errorDiv.textContent = "";
      outputDiv.innerHTML = "";

      try {
        const images = await Promise.all(imageUrls.map(downloadImage));
        // Hide loader
        loadingDiv.style.display = "none";

        // Append all images
        images.forEach(img => outputDiv.appendChild(img));
      } catch (err) {
        // Hide loader
        loadingDiv.style.display = "none";
        // Show error
        errorDiv.textContent = err;
      }
    }

    // Start downloading on page load
    window.onload = downloadImages;