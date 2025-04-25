let isRatioLocked = true; // Always locked to maintain ratio
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

// Navigation and Tab Switching
const sections = document.querySelectorAll('.content-section');
const navLinks = document.querySelectorAll('.nav-link');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

function updateDimensions() {
    // Calculate new dimensions based on ratio
    if (widthInput.value) {
        pixelWidth = parseInt(widthInput.value);
        pixelHeight = Math.round(pixelWidth * (ratioHeight / ratioWidth));
        heightInput.value = pixelHeight;
    } else if (heightInput.value) {
        pixelHeight = parseInt(heightInput.value);
        pixelWidth = Math.round(pixelHeight * (ratioWidth / ratioHeight));
        widthInput.value = pixelWidth;
    }

    // Update display
    updateDisplay();
}

function updateRatio() {
    const newRatioWidth = parseInt(ratioWidthInput.value) || 16;
    const newRatioHeight = parseInt(ratioHeightInput.value) || 9;

    if (newRatioWidth > 0 && newRatioHeight > 0) {
        ratioWidth = newRatioWidth;
        ratioHeight = newRatioHeight;

        // Update dimensions based on new ratio
        if (widthInput.value) {
            pixelWidth = parseInt(widthInput.value);
            pixelHeight = Math.round(pixelWidth * (ratioHeight / ratioWidth));
            heightInput.value = pixelHeight;
        } else if (heightInput.value) {
            pixelHeight = parseInt(heightInput.value);
            pixelWidth = Math.round(pixelHeight * (ratioWidth / ratioHeight));
            widthInput.value = pixelWidth;
        }

        updateDisplay();
    }
}

function updateDisplay() {
    // Update ratio display
    resultElement.textContent = `Ratio: ${ratioWidth}:${ratioHeight}`;
    decimalElement.textContent = `Decimal: ${(ratioWidth / ratioHeight).toFixed(3)}:1`;

    // Update preview
    const maxWidth = 400;
    const maxHeight = 300;
    const scale = Math.min(maxWidth / pixelWidth, maxHeight / pixelHeight);
    
    aspectPreview.style.width = `${pixelWidth * scale}px`;
    aspectPreview.style.height = `${pixelHeight * scale}px`;
    aspectPreview.style.opacity = '1';
}

// Event Listeners
widthInput.addEventListener('input', updateDimensions);
heightInput.addEventListener('input', updateDimensions);
ratioWidthInput.addEventListener('input', () => {
    if (ratioWidthInput.value && ratioHeightInput.value) {
        updateRatio();
    }
});
ratioHeightInput.addEventListener('input', () => {
    if (ratioWidthInput.value && ratioHeightInput.value) {
        updateRatio();
    }
});

// Preset ratio buttons
document.querySelectorAll('.preset').forEach(button => {
    button.addEventListener('click', () => {
        const [presetWidth, presetHeight] = button.dataset.ratio.split(':').map(Number);
        ratioWidthInput.value = presetWidth;
        ratioHeightInput.value = presetHeight;
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

// Initialize
updateDisplay();

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