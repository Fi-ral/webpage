namespace EngineApp {
    function clearAnswer(): void {
        document.getElementById('calc-output-power')!.innerText = "";
        document.getElementById('calc-output-exhaust-velocity')!.innerText = "";
        document.getElementById('calc-output-specific-impulse')!.innerText = "";
        document.getElementById('calc-output-massflow-rate')!.innerText = "";
        document.getElementById('calc-output-acceleration')!.innerText = "";
    }

    export function main() {
        function trySolve() {
            const g0 = 9.81;

            if (isNaN(v_e) && !isNaN(I_sp)) {
                v_e = I_sp * g0;
            }
            if (isNaN(I_sp) && !isNaN(v_e)) {
                I_sp = v_e / g0;
            }

            if (isNaN(P) && !isNaN(dm) && !isNaN(v_e)) {
                P = 0.5 * dm * Math.pow(v_e, 2);
            }
            if (isNaN(dm) && !isNaN(P) && !isNaN(v_e) && v_e !== 0) {
                dm = (2 * P) / Math.pow(v_e, 2);
            }
            if (isNaN(v_e) && !isNaN(P) && !isNaN(dm) && dm !== 0) {
                v_e = Math.sqrt((2 * P) / dm);
            }

            if (isNaN(F) && !isNaN(dm) && !isNaN(v_e)) {
                F = dm * v_e;
            }
            if (isNaN(dm) && !isNaN(F) && !isNaN(v_e) && v_e !== 0) {
                dm = F / v_e;
            }
            if (isNaN(v_e) && !isNaN(F) && !isNaN(dm) && dm !== 0) {
                v_e = F / dm;
            }

            if (isNaN(P) && !isNaN(F) && !isNaN(v_e)) {
                P = 0.5 * F * v_e;
            }
            if (isNaN(F) && !isNaN(P) && !isNaN(v_e) && v_e !== 0) {
                F = (2 * P) / v_e;
            }
            if (isNaN(v_e) && !isNaN(P) && !isNaN(F) && F !== 0) {
                v_e = (2 * P) / F;
            }
        }
        
        let F =     parseFloat((document.getElementById('calc-input-thrust-value') as HTMLInputElement).value) * 
                    parseFloat((document.getElementById('calc-input-thrust-unit') as HTMLInputElement).value);
        let P =     parseFloat((document.getElementById('calc-input-power-value') as HTMLInputElement).value) * 
                    parseFloat((document.getElementById('calc-input-power-unit') as HTMLInputElement).value);
        let v_e =   parseFloat((document.getElementById('calc-input-exhaust-velocity-value') as HTMLInputElement).value) * 
                    parseFloat((document.getElementById('calc-input-exhaust-velocity-unit') as HTMLInputElement).value);
        let I_sp =  parseFloat((document.getElementById('calc-input-specific-impulse-value') as HTMLInputElement).value) * 
                    parseFloat((document.getElementById('calc-input-specific-impulse-unit') as HTMLInputElement).value);
        let dm =    parseFloat((document.getElementById('calc-input-massflow-rate-value') as HTMLInputElement).value) * 
                    parseFloat((document.getElementById('calc-input-massflow-rate-unit') as HTMLInputElement).value);
        
        const inputCount = [F, P, v_e, I_sp, dm].filter(Boolean).length;
        const status = document.getElementById('status-report');
        if (!status)
            return;
        else if (inputCount <= 1) {
            clearAnswer();
            return;
        }
        else if (inputCount !== 2) {
            status.innerHTML = "You cannot specify this combination: exactly two of the marked parameters must be filled.";
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
        
        document.getElementById('calc-output-thrust')!.innerText              = Converter.fmtThrust(F);
        document.getElementById('calc-output-power')!.innerText               = Converter.fmtPower(P);
        document.getElementById('calc-output-exhaust-velocity')!.innerText    = Converter.fmtVelocity(v_e);
        document.getElementById('calc-output-specific-impulse')!.innerText    = `${I_sp.toFixed(0)}s`;
        document.getElementById('calc-output-massflow-rate')!.innerText       = Converter.fmtMassflow(dm);
    }
}