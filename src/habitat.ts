namespace HabitatApp {
    const MATERIALS = [
        { name: "Structural Steel", specStrength: 50 },
        { name: "Titanium Alloy",   specStrength: 200 },
        { name: "Carbon Fiber",     specStrength: 2500 },
        { name: "Zylon Fiber",      specStrength: 3500 },
        { name: "Carbon Nanotubes", specStrength: 50000 },
        { name: "L-Shell Si",       specStrength: 300000 }, // 99eV/1.12eV * (146pm/22pm)^2 * 6/4 * 48kN*m/kg ~= 280MN*m/kg
        { name: "Magmatter",        specStrength: 100000000 },
        { name: "Scrith",			specStrength: 1500000000 },
        { name: "None known",       specStrength: Infinity }
    ];

    function clearAnswer(): void {
        document.getElementById('calc-output-radius')!.innerText = "";
        document.getElementById('calc-output-width')!.innerText = "";
        document.getElementById('calc-output-surface-gravity')!.innerText = "";
        document.getElementById('calc-output-angular-velocity')!.innerText = "";
        document.getElementById('calc-output-tangential-velocity')!.innerText = "";
        document.getElementById('calc-output-rotational-period')!.innerText = "";
        document.getElementById('calc-output-surface-area')!.innerText = "";
        document.getElementById('calc-output-specific-strength')!.innerText = "";
        document.getElementById('calc-output-required-material')!.innerText = "";
        document.getElementById('calc-output-recommended-material')!.innerText = "";
    }

    export function main() {
        function trySolve() {
            if (isNaN(r)) {
                if (!isNaN(g) && !isNaN(omega))
                    r = g / Math.pow(omega, 2);
                else if (!isNaN(v) && !isNaN(omega))
                    r = v / omega;
                else if (!isNaN(g) && !isNaN(v))
                    r = Math.pow(v, 2) / g;
            }
            if (isNaN(g)) {
                if (!isNaN(omega) && !isNaN(r))
                    g = Math.pow(omega, 2) * r;
                else if (!isNaN(v) && !isNaN(r))
                    g = Math.pow(v, 2) / r;
            }
            if (isNaN(omega)) {
                if (!isNaN(T))
                    omega = (2 * Math.PI) / T;
                else if (!isNaN(g) && !isNaN(r))
                    omega = Math.sqrt(g / r);
                else if (!isNaN(v) && !isNaN(r))
                    omega = v / r;
            }
            if (isNaN(v)) {
                if (!isNaN(omega) && !isNaN(r))
                    v = omega * r;
                else if (!isNaN(g) && !isNaN(r))
                    v = Math.sqrt(g * r);
            }
            if (isNaN(T)) {
                if (!isNaN(omega))
                    T = (2 * Math.PI) / omega;
            }
        }
        
        let r =     parseFloat((document.getElementById('calc-input-radius-value') as HTMLInputElement).value) * 
                    parseFloat((document.getElementById('calc-input-radius-unit') as HTMLInputElement).value);
        let w =     parseFloat((document.getElementById('calc-input-width-value') as HTMLInputElement).value) * 
                    parseFloat((document.getElementById('calc-input-width-unit') as HTMLInputElement).value);
        let g =     parseFloat((document.getElementById('calc-input-surface-gravity-value') as HTMLInputElement).value) * 
                    parseFloat((document.getElementById('calc-input-surface-gravity-unit') as HTMLInputElement).value);
        let T =     parseFloat((document.getElementById('calc-input-rotational-period-value') as HTMLInputElement).value) * 
                    parseFloat((document.getElementById('calc-input-rotational-period-unit') as HTMLInputElement).value);
        let omega = parseFloat((document.getElementById('calc-input-angular-velocity-value') as HTMLInputElement).value) * 
                    parseFloat((document.getElementById('calc-input-angular-velocity-unit') as HTMLInputElement).value);
        let v =     parseFloat((document.getElementById('calc-input-tangential-velocity-value') as HTMLInputElement).value) * 
                    parseFloat((document.getElementById('calc-input-tangential-velocity-unit') as HTMLInputElement).value);
        
        const inputCount = [r, g, T, omega, v].filter(Boolean).length;
        const status = document.getElementById('status-report');
        if (!status)
            return;
        if (inputCount <= 1)
            return;
        if (inputCount !== 2) {
            status.innerHTML = "You cannot specify this combination: exactly two of the marked parameters must be filled.";
            status.style.color = "var(--red-color)";
            status.style.fontWeight = "bold";
            clearAnswer();
            return;
        }
        if (!isNaN(T) && !isNaN(omega)) {
            status.innerHTML = "You cannot specify this combination: either the rotational period or angular velocity must be empty.";
            status.style.color = "var(--red-color)";
            status.style.fontWeight = "bold";
            clearAnswer();
            return;
        }
        else {
            status.innerHTML = "";
            status.style.color = "";
            status.style.fontWeight = "";
        }
        
        for (let i = 0; i < 3; i++) {
            trySolve();
        }
        
        const surfaceArea = 2 * Math.PI * r * w;
        const requiredSpecificStrength = Math.pow(v, 2); 
        
        let minimumMaterial = "";
        let recommendedMaterial = "";
        for (let mat of MATERIALS) {
            if ((requiredSpecificStrength / 1000) < mat.specStrength) {
                minimumMaterial = mat.name;
                break;
            }
        }
        for (let mat of MATERIALS) {
            if ((2 * requiredSpecificStrength / 1000) < mat.specStrength) {
                recommendedMaterial = mat.name;
                break;
            }
        }
        
        document.getElementById('calc-output-radius')!.innerText              = Converter.fmtDistance(r);
        document.getElementById('calc-output-width')!.innerText               = Converter.fmtDistance(w);
        document.getElementById('calc-output-surface-gravity')!.innerText     = Converter.fmtGravity(g);
        document.getElementById('calc-output-angular-velocity')!.innerText    = Converter.fmtAngularVelocity(omega);
        document.getElementById('calc-output-tangential-velocity')!.innerText = Converter.fmtVelocity(v);
        document.getElementById('calc-output-rotational-period')!.innerText   = Converter.fmtPeriod(T);
        document.getElementById('calc-output-surface-area')!.innerText        = Converter.fmtArea(surfaceArea);
        document.getElementById('calc-output-specific-strength')!.innerText   = Converter.fmtSpecificStrength(requiredSpecificStrength);
        document.getElementById('calc-output-required-material')!.innerText   = minimumMaterial;
        document.getElementById('calc-output-recommended-material')!.innerText = recommendedMaterial;
    }
}