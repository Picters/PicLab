const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const uploadImage = document.getElementById('uploadImage');
const reduceQuality = document.getElementById('reduceQuality');
const qualitySelect = document.getElementById('quality');

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

    // Получаем данные изображения с нужным качеством
    canvas.toBlob(function (blob) {
        // Создаем ссылку для скачивания изображения
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'reduced-quality-image.jpg';

        // Программно кликаем по ссылке для скачивания
        link.click();

        // Освобождаем объект URL после скачивания
        URL.revokeObjectURL(link.href);
    }, 'image/jpeg', quality);
});
