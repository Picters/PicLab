function applyMirror() {
    const fileInput = document.getElementById('mirrorUpload');
    const canvas = document.getElementById('mirrorCanvas');
    const ctx = canvas.getContext('2d');

    if (fileInput.files && fileInput.files[0]) {
        const img = new Image();
        img.onload = function() {
            // Устанавливаем небольшой размер окна
            const scaleFactor = 0.3; // Коэффициент уменьшения размера (30%)
            canvas.width = img.width * scaleFactor;
            canvas.height = img.height * scaleFactor;
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(img, 0, 0, img.width * scaleFactor, img.height * scaleFactor);
        };
        img.src = URL.createObjectURL(fileInput.files[0]);
    }
}
