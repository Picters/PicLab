const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const uploadImage = document.getElementById('uploadImage');
const reduceQuality = document.getElementById('reduceQuality');
const qualitySelect = document.getElementById('quality');
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
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// Применение ухудшения качества и скачивание изображения
reduceQuality.addEventListener('click', function () {
    const quality = parseFloat(qualitySelect.value);

    // Проверяем, есть ли изображение на холсте
    if (canvas.width === 0 || canvas.height === 0) {
        alert('Please upload an image first.');
        return;
    }

    // Показываем прогресс-бар
    progressContainer.style.display = 'block';
    progressBar.value = 0;
    progressText.innerText = '0%';

    // Используем setTimeout, чтобы симулировать процесс обработки
    let progress = 0;
    const interval = setInterval(function () {
        progress += 20;
        progressBar.value = progress;
        progressText.innerText = `${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            
            // Когда прогресс достиг 100%, начинаем процесс сжатия
            canvas.toBlob(function (blob) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'reduced-quality-image.jpg';

                // Программно кликаем по ссылке для скачивания
                link.click();

                // Освобождаем объект URL после скачивания
                URL.revokeObjectURL(link.href);

                // Скрываем прогресс-бар после завершения
                progressContainer.style.display = 'none';
            }, 'image/jpeg', quality);
        }
    }, 300);  // Интервал обновления прогресс-бара
});
