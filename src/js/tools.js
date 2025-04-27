// Pixel Calculator
document.addEventListener('DOMContentLoaded', function() {
    // Pixel Calculator
    const pixelWidth = document.getElementById('pixelWidth');
    const pixelHeight = document.getElementById('pixelHeight');
    const calculatePixels = document.getElementById('calculatePixels');
    const resetPixels = document.getElementById('resetPixels');
    const pixelResult = document.getElementById('pixelResult');
    const pixelDecimal = document.getElementById('pixelDecimal');

    calculatePixels.addEventListener('click', function() {
        const width = parseInt(pixelWidth.value);
        const height = parseInt(pixelHeight.value);

        if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
            pixelResult.textContent = 'Please enter valid dimensions';
            pixelDecimal.textContent = '';
            return;
        }

        const ratio = calculateAspectRatio(width, height);
        pixelResult.textContent = `Aspect Ratio: ${ratio.numerator}:${ratio.denominator}`;
        pixelDecimal.textContent = `Decimal: ${(width / height).toFixed(4)}`;
    });

    resetPixels.addEventListener('click', function() {
        pixelWidth.value = '';
        pixelHeight.value = '';
        pixelResult.textContent = 'Aspect Ratio: -';
        pixelDecimal.textContent = 'Decimal: -';
    });

    // Batch Converter
    const batchInput = document.getElementById('batchInput');
    const convertBatch = document.getElementById('convertBatch');
    const clearBatch = document.getElementById('clearBatch');
    const batchOutput = document.getElementById('batchOutput');

    convertBatch.addEventListener('click', function() {
        const input = batchInput.value.trim();
        if (!input) {
            batchOutput.innerHTML = 'Please enter dimensions to convert';
            return;
        }

        const lines = input.split('\n');
        let output = '';

        lines.forEach(line => {
            const dimensions = line.trim().split('×');
            if (dimensions.length === 2) {
                const width = parseInt(dimensions[0]);
                const height = parseInt(dimensions[1]);

                if (!isNaN(width) && !isNaN(height) && width > 0 && height > 0) {
                    const ratio = calculateAspectRatio(width, height);
                    output += `${width}×${height} → ${ratio.numerator}:${ratio.denominator} (${(width / height).toFixed(4)})\n`;
                }
            }
        });

        batchOutput.innerHTML = output ? `<pre>${output}</pre>` : 'No valid dimensions found';
    });

    clearBatch.addEventListener('click', function() {
        batchInput.value = '';
        batchOutput.innerHTML = '';
    });

    // Helper function to calculate aspect ratio
    function calculateAspectRatio(width, height) {
        const gcd = findGCD(width, height);
        return {
            numerator: width / gcd,
            denominator: height / gcd
        };
    }

    // Helper function to find Greatest Common Divisor
    function findGCD(a, b) {
        return b === 0 ? a : findGCD(b, a % b);
    }
}); 