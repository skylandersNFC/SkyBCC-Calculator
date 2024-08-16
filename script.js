document.getElementById('bcc-form').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateBCC();
});

function calculateBCC() {
    const uidInput = document.getElementById('uid').value;
    const resultElement = document.getElementById('result');
    const bccValueElement = document.getElementById('bcc-value');
    const bccNumberElement = document.getElementById('bcc-number');

    if (!/^[0-9A-Fa-f]{8}$/.test(uidInput)) {
        bccNumberElement.textContent = 'Invalid UID format. Please enter 8 hexadecimal characters.';
        resultElement.style.display = 'block';
        return;
    }

    // Convert the UID string to an array of bytes
    const uidBytes = [];
    for (let i = 0; i < 8; i += 2) {
        uidBytes.push(parseInt(uidInput.substring(i, i + 2), 16));
    }

    // Calculate BCC (XOR of all bytes)
    let bcc = uidBytes.reduce((acc, byte) => acc ^ byte, 0);

    // Convert BCC to hexadecimal format
    const bccHex = bcc.toString(16).toUpperCase().padStart(2, '0');

    // Display the result
    bccNumberElement.textContent = bccHex;
    resultElement.style.display = 'block';
}
