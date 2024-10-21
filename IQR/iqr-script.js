const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const uploadImage = document.getElementById('uploadImage');
const contrastOption = document.getElementById('contrastOption');
const graphicsOption = document.getElementById('graphicsOption');
const applyChanges = document.getElementById('applyChanges');
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

// Применение изменений контраста и ухудшения качества
applyChanges.addEventListener('click', function () {
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

            // Применяем выбранные опции
            if (contrastOption.checked) {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = data[i + 1] = data[i + 2] = avg > 128 ? 255 : 0; // Увеличение контрастности
                }
                ctx.putImageData(imageData, 0, 0);
            }

            if (graphicsOption.checked) {
                const pixelationLevel = 0.03; // 3% от оригинального размера
                const smallWidth = Math.floor(canvas.width * pixelationLevel);
                const smallHeight = Math.floor(canvas.height * pixelationLevel);

                const smallCanvas = document.createElement('canvas');
                const smallCtx = smallCanvas.getContext('2d');
                smallCanvas.width = smallWidth;
                smallCanvas.height = smallHeight;

                smallCtx.drawImage(canvas, 0, 0, smallWidth, smallHeight);
                ctx.drawImage(smallCanvas, 0, 0, smallWidth, smallHeight, 0, 0, canvas.width, canvas.height);
            }

            canvas.toBlob(function (blob) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'modified-image.jpg';
                link.click();

                URL.revokeObjectURL(link.href);

                progressContainer.style.display = 'none';
            }, 'image/jpeg', 0.001); // Уменьшенное качество
        }
    }, 300);
});
