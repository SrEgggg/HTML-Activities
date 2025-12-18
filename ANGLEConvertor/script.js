document.addEventListener('DOMContentLoaded', () => {
    const inputValue = document.getElementById('inputValue');
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    const resultValue = document.getElementById('resultValue');
    
    const PI = Math.PI;
    const DEG_TO_RAD = PI / 180;
    const GRAD_TO_RAD = PI / 200;
    
    //main conversion function
    function convertAngle() {
        let value = parseFloat(inputValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;
        
        if (inputValue.value === '' || isNaN(value)) {
             resultValue.textContent = '0.00000';
             resultValue.style.color = '#333';
             return;
        }

        let radians;
        switch (from) {
            case 'degrees':
                radians = value * DEG_TO_RAD;
                break;
            case 'radians':
                radians = value;
                break;
            case 'gradians':
                radians = value * GRAD_TO_RAD;
                break;
            default:
                radians = 0;
        }

        let result;
        switch (to) {
            case 'degrees':
                result = radians / DEG_TO_RAD;
                break;
            case 'radians':
                result = radians;
                break;
            case 'gradians':
                result = radians / GRAD_TO_RAD;
                break;
            default:
                result = 0;
        }

        resultValue.textContent = result.toFixed(5); 
        resultValue.style.color = '#008000';
    }
    

    function setupListeners() {
        inputValue.addEventListener('input', (e) => {
            let val = e.target.value;
            val = val.replace(/[^-0-9.]/g, ''); 
            
            let negativeCount = (val.match(/-/g) || []).length;
            if (negativeCount > 1 || (negativeCount === 1 && val.indexOf('-') !== 0)) {
                val = val.replace(/-/g, '');
                if (negativeCount === 1 && val.indexOf('-') === 0) {
                    val = '-' + val;
                } else if (val.length > 0) {
                    val = '-' + val;
                }
            }

            let parts = val.split('.');
            if (parts.length > 2) {
                val = parts[0] + '.' + parts.slice(1).join('');
            }

            //update the textbox
            e.target.value = val;

            //run conversion again
            convertAngle();
        });
        
        fromUnit.addEventListener('change', convertAngle);
        toUnit.addEventListener('change', convertAngle);
    }

    setupListeners();
    convertAngle(); 
});