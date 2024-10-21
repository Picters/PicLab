const videoInput = document.getElementById('uploadVideo');
const fpsInput = document.getElementById('fps');
const qualitySelect = document.getElementById('quality');
const applyChanges = document.getElementById('applyChanges');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const progressContainer = document.getElementById('progress-container');

videoInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        // Здесь вы можете обработать загруженное видео
        console.log('Видео загружено:', file.name);
    }
});

applyChanges.addEventListener('click', function () {
    const fps = fpsInput.value;
    const quality = qualitySelect.value;

    if (!videoInput.files.length) {
        alert('Пожалуйста, выберите видео файл.');
        return;
    }

    console.log('Применение изменений:', { fps, quality });

    // Показываем прогресс-бар
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

            // Здесь должна быть логика обработки видео с выбранными параметрами
            alert('Видео обработано с FPS: ' + fps + ' и качеством: ' + quality + 'p');

            // Скрываем прогресс-бар
            progressContainer.style.display = 'none';
        }
    }, 500);
});
