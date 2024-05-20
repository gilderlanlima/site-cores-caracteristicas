function createSquare(container, color1, color2, hasStripe, index) {
    const squareContainer = document.createElement('div');
    squareContainer.classList.add('container');

    const canvasContainer = document.createElement('div');
    canvasContainer.classList.add('canvas-container');
    squareContainer.appendChild(canvasContainer);

    const canvas = document.createElement('canvas');
    canvas.classList.add('square-canvas');
    canvas.width = 30;
    canvas.height = 30;
    canvasContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Preenche a metade superior com a primeira cor
    ctx.fillStyle = color1;
    ctx.fillRect(0, 0, canvas.width, canvas.height / 2);

    // Preenche a metade inferior com a segunda cor
    ctx.fillStyle = color2;
    ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

    if (hasStripe) {
        // Desenha uma faixa preta diagonal média
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.2, canvas.height);
        ctx.lineTo(canvas.width * 0.8, 0);
        ctx.lineTo(canvas.width, 0);
        ctx.lineTo(canvas.width * 0.4, canvas.height);
        ctx.closePath();
        ctx.fill();
    }

    const downloadContainer = document.createElement('div');
    downloadContainer.classList.add('download-container');
    squareContainer.appendChild(downloadContainer);

    const webpBtn = document.createElement('button');
    webpBtn.innerText = 'WebP';
    webpBtn.addEventListener('click', () => {
        const webpURL = canvas.toDataURL('image/webp');
        downloadImage(webpURL, `square_${index + 1}.webp`);
    });
    downloadContainer.appendChild(webpBtn);

    const jpegBtn = document.createElement('button');
    jpegBtn.innerText = 'JPEG';
    jpegBtn.addEventListener('click', () => {
        const jpegURL = canvas.toDataURL('image/jpeg');
        downloadImage(jpegURL, `square_${index + 1}.jpeg`);
    });
    downloadContainer.appendChild(jpegBtn);

    container.appendChild(squareContainer);
}

document.getElementById('generate-btn').addEventListener('click', () => {
    const color1 = document.getElementById('color1').value;
    const color2 = document.getElementById('color2').value;

    const primaryContainer = document.getElementById('primary-squares-container');
    primaryContainer.innerHTML = '';

    const secondaryContainer = document.getElementById('secondary-squares-container');
    secondaryContainer.innerHTML = '';

    // Cria os dois quadrados com as cores escolhidas, um com faixa e outro sem
    createSquare(primaryContainer, color1, color2, true, 0);
    createSquare(primaryContainer, color1, color2, false, 1);

    // Cria os outros 28 quadrados com cores variadas
    for (let i = 0; i < 28; i++) {
        const randomColor1 = getRandomColor();
        const randomColor2 = getRandomColor();
        createSquare(secondaryContainer, randomColor1, randomColor2, Math.random() < 0.5, i + 2);
    }
});

// Função para fazer o download da imagem
function downloadImage(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Gera uma cor aleatória
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
