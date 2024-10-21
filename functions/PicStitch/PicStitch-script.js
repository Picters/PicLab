// PicStitch Script - JavaScript for creating a collage

function createCollage() {
    const fileInput = document.getElementById('stitchUpload');
    const collageCanvas = document.getElementById('collageCanvas');
    const ctx = collageCanvas.getContext('2d');

    if (fileInput.files.length > 0) {
        const images = [];
        for (let i = 0; i < fileInput.files.length; i++) {
            const img = new Image();
            img.src = URL.createObjectURL(fileInput.files[i]);
            images.push(img);
        }

        Promise.all(images.map(img => new Promise(resolve => {
            img.onload = () => resolve();
        }))).then(() => {
            const rows = 2;
            const cols = Math.ceil(images.length / rows);
            const pieceWidth = collageCanvas.width / cols;
            const pieceHeight = collageCanvas.height / rows;

            ctx.clearRect(0, 0, collageCanvas.width, collageCanvas.height);
            images.forEach((img, index) => {
                const x = (index % cols) * pieceWidth;
                const y = Math.floor(index / cols) * pieceHeight;
                ctx.drawImage(img, 0, 0, img.width, img.height, x, y, pieceWidth, pieceHeight);
            });
        });
    } else {
        alert('Please upload at least one image to create a collage.');
    }
}
