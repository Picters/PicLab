// PicPuzzle Script - JavaScript for creating a puzzle

function createPuzzle() {
    const fileInput = document.getElementById('puzzleUpload');
    const puzzleContainer = document.getElementById('puzzleContainer');

    if (fileInput.files && fileInput.files[0]) {
        const img = new Image();
        img.onload = function() {
            puzzleContainer.innerHTML = '';
            const pieces = 16; // 4x4 grid
            const pieceWidth = img.width / 4;
            const pieceHeight = img.height / 4;

            for (let i = 0; i < pieces; i++) {
                const pieceCanvas = document.createElement('canvas');
                pieceCanvas.width = pieceWidth;
                pieceCanvas.height = pieceHeight;
                const pieceCtx = pieceCanvas.getContext('2d');

                const x = (i % 4) * pieceWidth;
                const y = Math.floor(i / 4) * pieceHeight;
                pieceCtx.drawImage(img, x, y, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);

                pieceCanvas.style.border = '1px solid #fff';
                pieceCanvas.style.margin = '5px';
                puzzleContainer.appendChild(pieceCanvas);
            }
        };
        img.src = URL.createObjectURL(fileInput.files[0]);
    }
}
