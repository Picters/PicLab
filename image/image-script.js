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
                canvas.style.display = 'block';
                console.log('Image loaded and ready for compression.');
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// Применение пикселизации и скачивание изображения
reduceQuality.addEventListener('click', function () {
    // Проверяем, загружено ли изображение
    if (canvas.width === 0 || canvas.height === 0) {
        alert('Please upload an image first.');
        return;
    }

    console.log('Starting image pixelation process');

    // Показываем прогресс-бар
    progressContainer.style.display = 'block';
    progressBar.value = 0;
    progressText.innerText = '0%';

    let progress = 0;

    // Эмуляция прогресса
    const interval = setInterval(() => {
        progress += 20; // Увеличиваем прогресс каждые 300 мс
        progressBar.value = progress;
        progressText.innerText = `${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);

            // Пикселизация: уменьшаем размер изображения до минимума и увеличиваем обратно
            const pixelationLevel = 0.05; // Уровень пикселизации: 5% от оригинального размера
            const smallWidth = Math.floor(canvas.width * pixelationLevel);
            const smallHeight = Math.floor(canvas.height * pixelationLevel);

            const smallCanvas = document.createElement('canvas');
            const smallCtx = smallCanvas.getContext('2d');
            smallCanvas.width = smallWidth;
            smallCanvas.height = smallHeight;

            // Сжимаем изображение до маленького размера
            smallCtx.drawImage(canvas, 0, 0, smallWidth, smallHeight);

            // Затем растягиваем его обратно до оригинального размера
            ctx.drawImage(smallCanvas, 0, 0, smallWidth, smallHeight, 0, 0, canvas.width, canvas.height);

            // Сохраняем пикселизированное изображение
            canvas.toBlob(function (blob) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'very-bad-quality-image.jpg';

                // Программный клик для скачивания изображения
                link.click();

                console.log('Image pixelated and download initiated.');

                // Освобождаем объект URL после скачивания
                URL.revokeObjectURL(link.href);

                // Скрываем прогресс-бар после завершения
                progressContainer.style.display = 'none';
            }, 'image/jpeg', 0.1); // Максимальное сжатие
        }
    }, 300); // Интервал обновления прогресс-бара
});
