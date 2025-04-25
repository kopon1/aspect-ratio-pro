let isRatioLocked = true; // Start with ratio locked
let ratioWidth = 16;
let ratioHeight = 9;
let pixelWidth = 1920;
let pixelHeight = 1080;

const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const ratioWidthInput = document.getElementById('customWidth');
const ratioHeightInput = document.getElementById('customHeight');
const resultElement = document.getElementById('result');
const simplifiedElement = document.getElementById('simplified');
const decimalElement = document.getElementById('decimal');
const aspectPreview = document.getElementById('aspectPreview');
const resetButton = document.getElementById('resetValues');
const lockButton = document.getElementById('lockRatio');
const swapButton = document.getElementById('swapDimensions');

// Navigation and Tab Switching
const sections = document.querySelectorAll('.content-section');
const navLinks = document.querySelectorAll('.nav-link');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Add status message elements
const widthStatus = document.getElementById('widthStatus');
const heightStatus = document.getElementById('heightStatus');
const ratioStatus = document.getElementById('ratioStatus');
const presetStatus = document.getElementById('presetStatus');
const customRatioStatus = document.getElementById('customRatioStatus');

function updateDimensions() {
    // Get current values
    const widthValue = parseInt(widthInput.value) || 0;
    const heightValue = parseInt(heightInput.value) || 0;

    if (!isRatioLocked) {
        // If ratio is unlocked, just update the display
        pixelWidth = widthValue;
        pixelHeight = heightValue;
        updateDisplay();
        return;
}

    // If ratio is locked, calculate based on which input was changed
    if (widthValue !== pixelWidth) {
        // Width was changed
        pixelWidth = widthValue;
        pixelHeight = Math.round(pixelWidth * (ratioHeight / ratioWidth));
        heightInput.value = pixelHeight;
    } else if (heightValue !== pixelHeight) {
        // Height was changed
        pixelHeight = heightValue;
        pixelWidth = Math.round(pixelHeight * (ratioWidth / ratioHeight));
        widthInput.value = pixelWidth;
    }

    updateDisplay();
    updateStatusMessages();
}

// Helper function to calculate greatest common divisor
function calculateGCD(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function updateRatio() {
    const newWidth = parseFloat(ratioWidthInput.value) || 1;
    const newHeight = parseFloat(ratioHeightInput.value) || 1;
    
    if (newWidth > 0 && newHeight > 0) {
        // Set the ratio directly
        ratioWidth = newWidth;
        ratioHeight = newHeight;
        
        // If ratio is locked, update dimensions based on the new ratio
        if (isRatioLocked) {
            if (widthInput.value) {
                const width = parseFloat(widthInput.value);
                // Calculate height using precise ratio
                const height = (width * ratioHeight) / ratioWidth;
                heightInput.value = height.toFixed(2);
            } else if (heightInput.value) {
                const height = parseFloat(heightInput.value);
                // Calculate width using precise ratio
                const width = (height * ratioWidth) / ratioHeight;
                widthInput.value = width.toFixed(2);
            }
        }
        
        updateDisplay();
        updateStatusMessages();
    }
}

function toggleRatioLock() {
    isRatioLocked = !isRatioLocked;
    
    if (isRatioLocked) {
        lockButton.innerHTML = '<i class="fas fa-lock"></i> Ratio Locked';
        lockButton.classList.add('active');
    } else {
        lockButton.innerHTML = '<i class="fas fa-lock-open"></i> Ratio Unlocked';
        lockButton.classList.remove('active');
    }
    
    updateStatusMessages();
}

function swapDimensions() {
    const tempWidth = widthInput.value;
    const tempHeight = heightInput.value;
    
    widthInput.value = tempHeight;
    heightInput.value = tempWidth;
        
    // Update the pixel values
    pixelWidth = parseInt(widthInput.value) || 0;
    pixelHeight = parseInt(heightInput.value) || 0;
    
    updateDisplay();
}

function resetCalculator() {
    // Reset inputs
    widthInput.value = '';
    heightInput.value = '';
    ratioWidthInput.value = '';
    ratioHeightInput.value = '';
    
    // Reset variables
    ratioWidth = 16;
    ratioHeight = 9;
    pixelWidth = 1920;
    pixelHeight = 1080;
    isRatioLocked = true;
    
    // Update UI
    lockButton.innerHTML = '<i class="fas fa-lock"></i> Ratio Locked';
    lockButton.classList.add('active');
    
    // Update display
    updateDisplay();
}

function updateDisplay() {
    const width = parseFloat(widthInput.value);
    const height = parseFloat(heightInput.value);
    
    if (!isNaN(width) && !isNaN(height) && width > 0 && height > 0) {
        // Calculate the actual ratio using GCD
        const gcd = calculateGCD(Math.round(width), Math.round(height));
        const ratioW = Math.round(width / gcd);
        const ratioH = Math.round(height / gcd);
        
        // Update the result display
        resultElement.textContent = `Aspect Ratio: ${ratioW}:${ratioH}`;
        decimalElement.textContent = `Decimal: ${(width/height).toFixed(3)}:1`;
        
        // Update the preview
        const maxWidth = 400;
        const maxHeight = 300;
        const scale = Math.min(maxWidth / width, maxHeight / height);
        
        aspectPreview.style.width = `${width * scale}px`;
        aspectPreview.style.height = `${height * scale}px`;
        aspectPreview.style.opacity = '1';
    } else {
        resultElement.textContent = 'Aspect Ratio: -';
        decimalElement.textContent = 'Decimal: -';
        aspectPreview.style.opacity = '0';
    }
}

function updateStatusMessages() {
    // Update width status
    if (widthInput.value) {
        widthStatus.textContent = `Width: ${widthInput.value}px`;
        widthStatus.className = 'status-message success';
    } else {
        widthStatus.textContent = 'Enter width to calculate height';
        widthStatus.className = 'status-message info';
    }

    // Update height status
    if (heightInput.value) {
        heightStatus.textContent = `Height: ${heightInput.value}px`;
        heightStatus.className = 'status-message success';
    } else {
        heightStatus.textContent = 'Enter height to calculate width';
        heightStatus.className = 'status-message info';
    }

    // Update ratio status
    if (isRatioLocked) {
        ratioStatus.textContent = 'Ratio is locked - dimensions will maintain proportion';
        ratioStatus.className = 'status-message info';
    } else {
        ratioStatus.textContent = 'Ratio is unlocked - dimensions can be set independently';
        ratioStatus.className = 'status-message warning';
    }

    // Update custom ratio status
    if (ratioWidthInput.value && ratioHeightInput.value) {
        customRatioStatus.textContent = `Custom Aspect Ratio: ${ratioWidthInput.value}:${ratioHeightInput.value}`;
        customRatioStatus.className = 'status-message success';
        } else {
        customRatioStatus.textContent = 'Enter custom ratio values';
        customRatioStatus.className = 'status-message info';
        }

    // Update preset status
    if (ratioWidthInput.value && ratioHeightInput.value) {
        presetStatus.textContent = 'Click a ratio to update custom ratio';
        presetStatus.className = 'status-message info';
    } else {
        presetStatus.textContent = 'Click a ratio to set custom ratio';
        presetStatus.className = 'status-message info';
    }
}

// Event Listeners
widthInput.addEventListener('input', () => {
    if (isRatioLocked && ratioWidthInput.value && ratioHeightInput.value) {
        const width = parseFloat(widthInput.value) || 0;
        if (width > 0) {
            const ratioW = parseFloat(ratioWidthInput.value);
            const ratioH = parseFloat(ratioHeightInput.value);
            const height = (width * ratioH) / ratioW;
            heightInput.value = height.toFixed(2);
        }
    }
    updateDisplay();
    updateStatusMessages();
});

heightInput.addEventListener('input', () => {
    if (isRatioLocked && ratioWidthInput.value && ratioHeightInput.value) {
        const height = parseFloat(heightInput.value) || 0;
        if (height > 0) {
            const ratioW = parseFloat(ratioWidthInput.value);
            const ratioH = parseFloat(ratioHeightInput.value);
            const width = (height * ratioW) / ratioH;
            widthInput.value = width.toFixed(2);
        }
    }
    updateDisplay();
    updateStatusMessages();
});

ratioWidthInput.addEventListener('input', () => {
    updateRatio();
    if (isRatioLocked && widthInput.value) {
        const width = parseFloat(widthInput.value);
        const ratioW = parseFloat(ratioWidthInput.value);
        const ratioH = parseFloat(ratioHeightInput.value);
        const height = (width * ratioH) / ratioW;
        heightInput.value = height.toFixed(2);
    }
    updateDisplay();
    updateStatusMessages();
});

ratioHeightInput.addEventListener('input', () => {
    updateRatio();
    if (isRatioLocked && heightInput.value) {
        const height = parseFloat(heightInput.value);
        const ratioW = parseFloat(ratioWidthInput.value);
        const ratioH = parseFloat(ratioHeightInput.value);
        const width = (height * ratioW) / ratioH;
        widthInput.value = width.toFixed(2);
    }
    updateDisplay();
    updateStatusMessages();
});

resetButton.addEventListener('click', resetCalculator);
lockButton.addEventListener('click', toggleRatioLock);
swapButton.addEventListener('click', swapDimensions);

// Preset ratio buttons
document.querySelectorAll('.preset').forEach(button => {
    button.addEventListener('click', () => {
        const [w, h] = button.dataset.ratio.split(':').map(Number);
        
        // ONLY update the custom ratio inputs
        ratioWidthInput.value = w;
        ratioHeightInput.value = h;
        
        // Update preset status
        presetStatus.textContent = `Selected ratio: ${w}:${h}`;
        presetStatus.className = 'status-message success';
        
        // Trigger the custom ratio update
        updateRatio();
    });
});

// Navigation event listeners
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = e.target.getAttribute('href').substring(1);
        showSection(sectionId);
        history.pushState(null, '', `#${sectionId}`);
    });
});

// Tab switching event listeners
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        showTab(tabId);
        });
});

// Handle initial state based on URL hash
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showSection(hash);
        } else {
        showSection('calculator-section');
    }
    // Set initial state of ratio lock button
    lockButton.innerHTML = '<i class="fas fa-lock"></i> Ratio Locked';
    lockButton.classList.add('active');
    updateDisplay();
    updateStatusMessages();
});

// Handle browser back/forward
window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showSection(hash);
    } else {
        showSection('calculator-section');
    }
});

function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');

    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
            }
        });
}

function showTab(tabId) {
    tabContents.forEach(content => {
            content.classList.add('hidden');
});
    document.getElementById(tabId).classList.remove('hidden');
    
    // Update active tab button
    tabButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-tab') === tabId) {
            button.classList.add('active');
            }
    });
}