const videoInput = document.getElementById('uploadVideo');
const fpsInput = document.getElementById('fps');
const qualitySelect = document.getElementById('quality');
const applyChanges = document.getElementById('applyChanges');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const progressContainer = document.getElementById('progress-container');

// Подключение FFmpeg
const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true });

videoInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        console.log('Video uploaded:', file.name);
    }
});

applyChanges.addEventListener('click', async function () {
    const fps = fpsInput.value;
    const quality = qualitySelect.value;

    if (!videoInput.files.length) {
        alert('Please upload a video file.');
        return;
    }

    const file = videoInput.files[0];
    const fileName = file.name;
    const outputFileName = 'output_' + fileName;

    // Показываем прогресс-бар
    progressContainer.style.display = 'block';
    progressBar.value = 0;
    progressText.innerText = '0%';

    // Загружаем FFmpeg.js
    await ffmpeg.load();

    // Загружаем видео в FFmpeg
    ffmpeg.FS('writeFile', fileName, await fetchFile(file));

    // Выполняем обработку видео: изменяем FPS и качество
    await ffmpeg.run(
        '-i', fileName,
        '-r', fps,              // Устанавливаем кадры в секунду (FPS)
        '-s', `${quality}p`,    // Устанавливаем качество видео (разрешение)
        outputFileName
    );

    // Извлекаем обработанное видео
    const data = ffmpeg.FS('readFile', outputFileName);

    // Создаем Blob из обработанного видео
    const videoBlob = new Blob([data.buffer], { type: 'video/mp4' });

    // Создаем ссылку для скачивания видео
    const link = document.createElement('a');
    link.href = URL.createObjectURL(videoBlob);
    link.download = outputFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Скрываем прогресс-бар после завершения
    progressContainer.style.display = 'none';
});
