// PicEncrypt Script - JavaScript for encrypting images

function encryptImage() {
    const fileInput = document.getElementById('encryptUpload');
    const encryptionKey = document.getElementById('encryptionKey').value;
    const encryptedOutput = document.getElementById('encryptedOutput');

    if (fileInput.files && fileInput.files[0] && encryptionKey) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const encrypted = btoa(event.target.result + encryptionKey);
            encryptedOutput.textContent = encrypted;
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        alert('Please provide an image and an encryption key.');
    }
}
