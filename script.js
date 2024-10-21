const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const uploadImage = document.getElementById('uploadImage');
const reduceQuality = document.getElementById('reduceQuality');
const qualitySelect = document.getElementById('quality');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const progressContainer = document.getElementById('progress-container');

// �������� �����������
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

// ���������� ��������� �������� � ���������� �����������
reduceQuality.addEventListener('click', function () {
    const quality = parseFloat(qualitySelect.value);

    // ���������, ���� �� ����������� �� ������
    if (canvas.width === 0 || canvas.height === 0) {
        alert('Please upload an image first.');
        return;
    }

    // ���������� ��������-���
    progressContainer.style.display = 'block';
    progressBar.value = 0;
    progressText.innerText = '0%';

    // ���������� setTimeout, ����� ������������ ������� ���������
    let progress = 0;
    const interval = setInterval(function () {
        progress += 20;
        progressBar.value = progress;
        progressText.innerText = `${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            
            // ����� �������� ������ 100%, �������� ������� ������
            canvas.toBlob(function (blob) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'reduced-quality-image.jpg';

                // ���������� ������� �� ������ ��� ����������
                link.click();

                // ����������� ������ URL ����� ����������
                URL.revokeObjectURL(link.href);

                // �������� ��������-��� ����� ����������
                progressContainer.style.display = 'none';
            }, 'image/jpeg', quality);
        }
    }, 300);  // �������� ���������� ��������-����
});
