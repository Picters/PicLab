const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const uploadImage = document.getElementById('uploadImage');
const reduceQuality = document.getElementById('reduceQuality');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const progressContainer = document.getElementById('progress-container');

// ”бираем отображение изображени€ после загрузки
uploadImage.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                console.log('Image loaded, but not displayed.');
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// ѕрименение пикселизации и скачивание изображени€
reduceQuality.addEventListener('click', function () {
    if (canvas.width === 0 || canvas.height === 0) {
        alert('Please upload an image first.');
        return;
    }

    console.log('Starting image pixelation process');

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

            const pixelationLevel = 0.05; 
            const smallWidth = Math.floor(canvas.width * pixelationLevel);
            const smallHeight = Math.floor(canvas.height * pixelationLevel);

            const smallCanvas = document.createElement('canvas');
            const smallCtx = smallCanvas.getContext('2d');
            smallCanvas.width = smallWidth;
            smallCanvas.height = smallHeight;

            smallCtx.drawImage(canvas, 0, 0, smallWidth, smallHeight);
            ctx.drawImage(smallCanvas, 0, 0, smallWidth, smallHeight, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(function (blob) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'very-bad-quality-image.jpg';
                link.click();

                console.log('Image pixelated and download initiated.');

                URL.revokeObjectURL(link.href);

                progressContainer.style.display = 'none';
            }, 'image/jpeg', 0.1);
        }
    }, 300);
});
