// PicMirror Script - JavaScript for mirroring effect

function applyMirror() {
    const fileInput = document.getElementById('mirrorUpload');
    const canvas = document.getElementById('mirrorCanvas');
    const ctx = canvas.getContext('2d');

    if (fileInput.files && fileInput.files[0]) {
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.translate(img.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(img, 0, 0);
        };
        img.src = URL.createObjectURL(fileInput.files[0]);
    }
}
