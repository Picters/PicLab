document.getElementById('createGifButton').addEventListener('click', function() {
    const files = document.getElementById('uploadImages').files;
    const fps = parseInt(document.getElementById('fps').value);

    if (files.length === 0) {
        alert('Please upload at least one image.');
        return;
    }

    // Initialize gif.js library to create a GIF
    const gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: 'https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js'
    });

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(event) {
            const img = new Image();
            img.src = event.target.result;

            img.onload = function() {
                gif.addFrame(img, { delay: 1000 / fps });
            };
        };

        reader.readAsDataURL(file);
    }

    gif.on('finished', function(blob) {
        const gifContainer = document.getElementById('gifContainer');
        gifContainer.innerHTML = ''; // Clear previous GIF if any

        const imgElement = document.createElement('img');
        imgElement.src = URL.createObjectURL(blob);
        gifContainer.appendChild(imgElement);
    });

    gif.render();
});
