const imageInput = document.getElementById('uploadImage');
const contrastOption = document.getElementById('contrastOption');
const graphicsOption = document.getElementById('graphicsOption');
const applyChanges = document.getElementById('applyChanges');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const progressContainer = document.getElementById('progress-container');
const canvas = document.getElementById('canvas');

imageInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        console.log('Image uploaded:', file.name);
    }
});

applyChanges.addEventListener('click', function () {
    if (!imageInput.files.length) {
        alert('Please upload an image file.');
        return;
    }

    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // Apply contrast adjustment if selected
            if (contrastOption.checked) {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    data[i] = Math.min(255, data[i] * 2);     // Red
                    data[i + 1] = Math.min(255, data[i + 1] * 2); // Green
                    data[i + 2] = Math.min(255, data[i + 2] * 2); // Blue
                }

                ctx.putImageData(imageData, 0, 0);
            }

            // Apply quality reduction if selected
            if (graphicsOption.checked) {
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(canvas, 0, 0, canvas.width / 10, canvas.height / 10);
                ctx.drawImage(canvas, 0, 0, canvas.width / 10, canvas.height / 10, 0, 0, canvas.width, canvas.height);
            }

            // Download processed image
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/jpeg');
            link.download = 'processed-image.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
    };

    reader.readAsDataURL(file);

    // Show progress bar
    progressContainer.style.display = 'block';
    progressBar.value = 0;
    progressText.innerText = '0%';

    let progress = 0;
    const interval = setInterval(() => {
        progress += 20;
        progressBar.value = progress;
        progressText.innerText = `${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            progressContainer.style.display = 'none';
        }
    }, 500);
});
