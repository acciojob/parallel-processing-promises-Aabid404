//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
// function to download single image
      function downloadImage(url) {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve(img);
          img.onerror = () => reject(`Failed to load image: ${url}`);
        });
      }

      // main function to download all images
      function downloadImages() {
        // reset UI
        output.innerHTML = "";
        errorDiv.textContent = "";
        loading.style.display = "block";

        Promise.all(images.map(imgObj => downloadImage(imgObj.url)))
          .then(imgElements => {
            // hide loading
            loading.style.display = "none";
            // display all images
            imgElements.forEach(img => output.appendChild(img));
          })
          .catch(err => {
            // hide loading
            loading.style.display = "none";
            // show error message
            errorDiv.textContent = err;
          });
      }

      // button click handler
      btn.addEventListener("click", downloadImages);