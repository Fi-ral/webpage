interface RadiatorType {
    name: string;
    minTempK: number;   // operating range in Kelvin
    maxTempK: number;
    minFlux: number;    // W/m² — filters obviously undersized designs
    maxFlux: number;
}

namespace RadiatorApp {
    const STEFAN_BOLTZMANN = 5.670374419e-8; // W m^-2 K^-4
    const TYPES: RadiatorType[] = [
        {
            name: "Heat Pipe Radiator (Ammonia/Water)",
            minTempK: 150, maxTempK: 400,
            minFlux: 50,   maxFlux: 800
        },
        {
            name: "Heat Pipe Radiator (Al/Ammonia)",
            minTempK: 200, maxTempK: 450,
            minFlux: 50,   maxFlux: 600
        },
        {
            name: "Heat Pipe Radiator (Ti/Water)",
            minTempK: 400, maxTempK: 600,
            minFlux: 300,  maxFlux: 4000
        },
        {
            name: "Heat Pipe Radiator (Steel/K)",
            minTempK: 700, maxTempK: 1100,
            minFlux: 3000, maxFlux: 120000
        },
        {
            name: "Liquid Droplet Radiator",
            minTempK: 400, maxTempK: 900,
            minFlux: 500,  maxFlux: 60000
        },
        {
            name: "Dusty Plasma Radiator",
            minTempK: 1000, maxTempK: 3000,
            minFlux: 500000,maxFlux: 5000000
        },
        {
            name: "Carbon-Carbon Composite Panel",
            minTempK: 500, maxTempK: 1400,
            minFlux: 1000, maxFlux: 200000
        },
        {
            name: "Refractory Metal Radiator",
            minTempK: 900, maxTempK: 2200,
            minFlux: 10000,maxFlux: 1300000
        },
    ];

    function parseTemperature(raw: number, unit: string): number {
        switch (unit) {
            case "°C": return raw + 273.15;
            case "°F": return (raw + 459.67) * (5 / 9);
            default:   return raw * parseFloat(unit);
        }
    }
    function clearAnswer(): void {
        document.getElementById('calc-output-power')!.innerText = "";
        document.getElementById('calc-output-surface-area')!.innerText = "";
        document.getElementById("calc-output-temperature")!.innerText = "";
        document.getElementById('calc-output-flux')!.innerText = "";
        document.getElementById('calc-output-required-type')!.innerText = "";
    }

    export function main() {
        function trySolve(): void {
            if (isNaN(P) && !isNaN(A) && !isNaN(T)) {
                P = STEFAN_BOLTZMANN * A * Math.pow(T, 4);
            } 
            else if (isNaN(A) && !isNaN(P) && !isNaN(T)) {
                A = P / (STEFAN_BOLTZMANN * Math.pow(T, 4));
            } 
            else if (isNaN(T) && !isNaN(P) && !isNaN(A)) {
                T = Math.pow(P / (STEFAN_BOLTZMANN * A), 0.25);
            }
        }
        
        const tempRaw  = parseFloat(
            (document.getElementById("calc-input-temperature-value") as HTMLInputElement).value
        );
        const tempUnit = (document.getElementById("calc-input-temperature-unit") as HTMLSelectElement).value;

        let P = parseFloat((document.getElementById("calc-input-power-value")        as HTMLInputElement).value)
              * parseFloat((document.getElementById("calc-input-power-unit")         as HTMLSelectElement).value);
        let A = parseFloat((document.getElementById("calc-input-surface-area-value") as HTMLInputElement).value)
              * parseFloat((document.getElementById("calc-input-surface-area-unit")  as HTMLSelectElement).value);
        let T = isNaN(tempRaw) ? NaN : parseTemperature(tempRaw, tempUnit);
        
        const inputCount = [P, A, T].filter(Boolean).length;
        const status = document.getElementById('status-report');
        if (!status)
            return;
        else if (inputCount <= 1)
            return;
        else if (inputCount !== 2) {
            status.innerHTML = "You cannot specify this combination: exactly two of the marked parameters must be filled.";
            status.style.color = "var(--red-color)";
            status.style.fontWeight = "bold";
            clearAnswer();
            return;
        }
        else if (T <= 2.73) {
            status.innerHTML = "You cannot have a temperature smaller than the CMBR (2.73K).";
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
        
        let recommendedType = "";
        const fluxWpm2 = P / A;
        const matches = TYPES.filter(t =>
            T    >= t.minTempK && T    <= t.maxTempK &&
            fluxWpm2 >= t.minFlux  && fluxWpm2 <= t.maxFlux
        );

        if (matches.length === 0) {
            recommendedType = "None Known";
        } 
        else {
            recommendedType = matches.map(t => `${t.name}`).join("\n");
        }

        document.getElementById("calc-output-power")!.innerText               = Converter.fmtPower(P);
        document.getElementById("calc-output-surface-area")!.innerText        = Converter.fmtArea(A);
        document.getElementById("calc-output-flux")!.innerText                = Converter.fmtFlux(fluxWpm2);
        document.getElementById("calc-output-temperature")!.innerText         = Converter.fmtTemperature(T);
        document.getElementById('calc-output-required-type')!.innerText       = recommendedType;
    }
}