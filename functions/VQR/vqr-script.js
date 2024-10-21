const videoInput = document.getElementById('uploadVideo');
const fpsInput = document.getElementById('fps');
const qualitySelect = document.getElementById('quality');
const applyChanges = document.getElementById('applyChanges');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const progressContainer = document.getElementById('progress-container');

// ����������� FFmpeg
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

    // ���������� ��������-���
    progressContainer.style.display = 'block';
    progressBar.value = 0;
    progressText.innerText = '0%';

    // ��������� FFmpeg.js
    await ffmpeg.load();

    // ��������� ����� � FFmpeg
    ffmpeg.FS('writeFile', fileName, await fetchFile(file));

    // ��������� ��������� �����: �������� FPS � ��������
    await ffmpeg.run(
        '-i', fileName,
        '-r', fps,              // ������������� ����� � ������� (FPS)
        '-s', `${quality}p`,    // ������������� �������� ����� (����������)
        outputFileName
    );

    // ��������� ������������ �����
    const data = ffmpeg.FS('readFile', outputFileName);

    // ������� Blob �� ������������� �����
    const videoBlob = new Blob([data.buffer], { type: 'video/mp4' });

    // ������� ������ ��� ���������� �����
    const link = document.createElement('a');
    link.href = URL.createObjectURL(videoBlob);
    link.download = outputFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // �������� ��������-��� ����� ����������
    progressContainer.style.display = 'none';
});
