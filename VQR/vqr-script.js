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
        // ��������� ������������ �����
        console.log('Video uploaded:', file.name);
    }
});

applyChanges.addEventListener('click', function () {
    const fps = fpsInput.value;
    const quality = qualitySelect.value;

    if (!videoInput.files.length) {
        alert('Please upload a video file.');
        return;
    }

    console.log('Applying changes:', { fps, quality });

    // ���������� ��������-���
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

            // ������ ��������� ����� ������ ���� �����
            alert(`Video processed with FPS: ${fps} and Quality: ${quality}p`);

            // ���������� �������� �����
            const link = document.createElement('a');
            link.href = 'path/to/your/video.mp4'; // ����� ������� ���� � �������� �����
            link.download = 'modifed.mp4'; // �������� ��� ������������ �����
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // �������� ��������-��� ����� ����������
            progressContainer.style.display = 'none';
        }
    }, 500);
});
