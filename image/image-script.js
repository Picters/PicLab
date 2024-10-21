const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const uploadImage = document.getElementById('uploadImage');
const reduceQuality = document.getElementById('reduceQuality');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const progressContainer = document.getElementById('progress-container');

// Загрузка изображения
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
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// Применение пикселизации и скачивание изображения
reduceQuality.addEventListener('click', function () {
    if (canvas.width === 0 || canvas.height === 0) {
        alert('Please upload an image first.');
        return;
    }

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

            // Увеличиваем пикселизацию (уменьшаем картинку до 3% от оригинала)
            const pixelationLevel = 0.03; // 3% от оригинального размера
            const smallWidth = Math.floor(canvas.width * pixelationLevel);
            const smallHeight = Math.floor(canvas.height * pixelationLevel);

            const smallCanvas = document.createElement('canvas');
            const smallCtx = smallCanvas.getContext('2d');
            smallCanvas.width = smallWidth;
            smallCanvas.height = smallHeight;

            // Сжимаем изображение до минимума
            smallCtx.drawImage(canvas, 0, 0, smallWidth, smallHeight);

            // Затем растягиваем обратно, создавая пиксельный эффект
            ctx.drawImage(smallCanvas, 0, 0, smallWidth, smallHeight, 0, 0, canvas.width, canvas.height);

            // Сохраняем пикселизированное изображение с качеством 0.001
            canvas.toBlob(function (blob) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'extremely-bad-quality-image.jpg';
                link.click();

                URL.revokeObjectURL(link.href);

                progressContainer.style.display = 'none';
            }, 'image/jpeg', 0.001); // Качество установлено на 0.001 для сильного ухудшения
        }
    }, 300);
});
