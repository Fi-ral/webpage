namespace FTLWaveApp {
    function clearAnswer(): void {
        document.getElementById('calc-output-time')!.innerText = "";
        document.getElementById('calc-output-frequency')!.innerText = "";
        document.getElementById('calc-output-quadrupole-moment')!.innerText = "";
        document.getElementById('calc-output-wave-strain')!.innerText = "";
        document.getElementById('calc-output-wave-width')!.innerText = "";
        document.getElementById('calc-output-peak-power')!.innerText = "";
        document.getElementById('calc-output-displaced-mass-energy')!.innerText = "";
        document.getElementById('calc-output-wave-energy')!.innerText = "";
        document.getElementById('calc-output-flash-energy')!.innerText = "";
    }

    export function main() {
        let m =     parseFloat((document.getElementById('calc-input-mass-value') as HTMLInputElement).value) * 
                    parseFloat((document.getElementById('calc-input-mass-unit') as HTMLInputElement).value);
        let l =     parseFloat((document.getElementById('calc-input-length-value') as HTMLInputElement).value) * 
                    parseFloat((document.getElementById('calc-input-length-unit') as HTMLInputElement).value);
        let v =     parseFloat((document.getElementById('calc-input-velocity-value') as HTMLInputElement).value) * 
                    parseFloat((document.getElementById('calc-input-velocity-unit') as HTMLInputElement).value);
        let B =     parseFloat((document.getElementById('calc-input-magnetic-field-strength-value') as HTMLInputElement).value) * 
                    parseFloat((document.getElementById('calc-input-magnetic-field-strength-unit') as HTMLInputElement).value);
        let L =     parseFloat((document.getElementById('calc-input-magnetic-field-length-value') as HTMLInputElement).value) * 
                    parseFloat((document.getElementById('calc-input-magnetic-field-length-unit') as HTMLInputElement).value);
        
        const inputCount = [m, l, v].filter(Boolean).length;
        const status = document.getElementById('status-report');
        if (!status)
            return;
        else if (inputCount !== 3) {
            clearAnswer();
            return;
        }
        else {
            status.innerHTML = "";
            status.style.color = "";
            status.style.fontWeight = "";
        }

        let t = l / v;
        let f = 1 / t;

        let I = 1/2 * m * l ** 2;
        let I_dt2 = I / (t ** 2);
        let I_dt3 = I / (t ** 3);

        let u = (B**2) / (2 * Converter.VacuumPermeability);
        let conversionFactor = Math.min((8 * Math.PI * Converter.GraviationalConstant * u * L**2) / (Converter.SpeedOfLight**4), 1)

        let P = (Converter.GraviationalConstant * I_dt3**2) / (5 * Converter.SpeedOfLight ** 5);
        let E_m = m * Converter.SpeedOfLight ** 2;
        let E_w = P * t;
        let E_gf = conversionFactor * E_w;
        let waveStrain = (2 * Converter.GraviationalConstant * I_dt2) / (Converter.SpeedOfLight ** 4);
        let waveWidth = l / Converter.SpeedOfLight;

        document.getElementById('calc-output-time')!.innerText                  = Converter.fmtTime(t);
        document.getElementById('calc-output-frequency')!.innerText             = Converter.fmtFrequency(f)
        document.getElementById('calc-output-quadrupole-moment')!.innerText     = I.toExponential(3) + " kg*m^2";
        document.getElementById('calc-output-wave-strain')!.innerText           = waveStrain.toExponential(3) + " 1/m";
        document.getElementById('calc-output-wave-width')!.innerText            = Converter.fmtDistance(waveWidth);
        document.getElementById('calc-output-peak-power')!.innerText            = Converter.fmtPower(P);
        document.getElementById('calc-output-displaced-mass-energy')!.innerText = Converter.fmtEnergy(E_m);
        document.getElementById('calc-output-wave-energy')!.innerText           = Converter.fmtEnergy(E_w);

        if (!Number.isNaN(E_gf) && E_gf !== 0)
            document.getElementById('calc-output-flash-energy')!.innerText      = Converter.fmtEnergy(E_gf);
        else
            document.getElementById('calc-output-flash-energy')!.innerText      = "";
    }
}