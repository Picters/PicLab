const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const uploadImage = document.getElementById('uploadImage');
const reduceQuality = document.getElementById('reduceQuality');
const qualitySelect = document.getElementById('quality');

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

reduceQuality.addEventListener('click', function () {
    const quality = parseFloat(qualitySelect.value);
    const imgData = canvas.toDataURL('image/jpeg', quality);
    
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'reduced-quality-image.jpg';
    link.click();
});
