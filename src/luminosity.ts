namespace LuminosityApp {
    function clearAnswer(): void {
        document.getElementById('calc-output-power')!.innerText = "";
        document.getElementById('calc-output-absolute-magnitude')!.innerText = "";
        document.getElementById('calc-output-apperant-magnitude')!.innerText = "";
        document.getElementById('calc-output-distance')!.innerText = "";
        document.getElementById('calc-output-visibility')!.innerText = "";
    }

    export function main() {
        function trySolve() {
            const distanceModulus = 5 * Math.log10(d / Converter.Parsec) - 5; // m - M

            if (!Number.isNaN(P)) {
                M = Converter.SolarBolometricMagnitude - 2.5 * Math.log10(P / Converter.SolarLuminiosity);
                m = M + distanceModulus;
            } else if (!Number.isNaN(M)) {
                P = Converter.SolarLuminiosity * Math.pow(10, (Converter.SolarBolometricMagnitude - M) / 2.5);
                m = M + distanceModulus;
            } else if (!Number.isNaN(m)) {
                M = m - distanceModulus;
                P = Converter.SolarLuminiosity * Math.pow(10, (Converter.SolarBolometricMagnitude - M) / 2.5);
            }
        }
        
        let P =     parseFloat((document.getElementById('calc-input-power-value') as HTMLInputElement).value) * 
                    parseFloat((document.getElementById('calc-input-power-unit') as HTMLInputElement).value);
        let M =     parseFloat((document.getElementById('calc-input-absolute-magnitude') as HTMLInputElement).value);
        let m =     parseFloat((document.getElementById('calc-input-apparent-magnitude') as HTMLInputElement).value);
        let d =     parseFloat((document.getElementById('calc-input-distance-value') as HTMLInputElement).value) * 
                    parseFloat((document.getElementById('calc-input-distance-unit') as HTMLInputElement).value);
        
        const inputCount = [P, M, m].filter(Boolean).length;
        const status = document.getElementById('status-report');
        if (!status)
            return;
        else if (inputCount < 1) {
            clearAnswer();
            return;
        }
        else if (inputCount != 1) {
            status.innerHTML = "You cannot specify this combination: you mostly only specify one of Power, Absolute Magnitude or Apparent Magnitude.";
            status.style.color = "var(--red-color)";
            status.style.fontWeight = "bold";
            clearAnswer();
            return;
        }
        if (!d || Number.isNaN(d)) {
            status.innerHTML = "Distance must be given.";
            status.style.color = "var(--red-color)";
            status.style.fontWeight = "bold";
            clearAnswer();
            return;
        }
        
        trySolve();
        
        let visibility;
        if (m <= -26.74)        visibility = "Appears brighter than the Sun."
        else if (m <= -12.74)   visibility = "Appears brighter than the Moon."
        else if (m <= -4)       visibility = "Visible during the day."
        else if (m <= 4)        visibility = "Visible to the unaided eye."
        else if (m <= 6)        visibility = "Barely visible to the unaided eye."
        else if (m <= 10)       visibility = "Visible using binoculars."
        else if (m <= 14)       visibility = "Visible using telescopes."
        else if (m <= 20)       visibility = "Visible to ground-based observatories."
        else if (m <= 30)       visibility = "Visible to space-based observatories."
        else                    visibility = "Virtually invisible."

        document.getElementById('calc-output-power')!.innerText               = Converter.fmtPower(P);
        document.getElementById('calc-output-absolute-magnitude')!.innerText  = M.toFixed(2);
        document.getElementById('calc-output-apperant-magnitude')!.innerText  = m.toFixed(2);
        document.getElementById('calc-output-distance')!.innerText            = Converter.fmtDistance(d);
        document.getElementById('calc-output-visibility')!.innerText          = visibility;
    }
}