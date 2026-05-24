namespace Converter {
    export function fmtDistance(meters: number): string {
        const abs = Math.abs(meters);
        if (abs >= 149_597_870_700)
            return `${(meters / 149_597_870_700).toFixed(1)} AU`;
        if (abs >= 299_792_458)
            return `${(meters / 299_792_458).toFixed(2)} ls`;
        if (abs >= 1e8)
            return `${(meters / 1e3).toFixed(0)} km`;
        if (abs >= 1e3)
            return `${(meters / 1e3).toFixed(3)} km`;
        return `${meters.toFixed(1)} m`;
    }

    export function fmtArea(sqMeters: number): string {
        const abs = Math.abs(sqMeters);
        if (abs >= 510_100_000_000_000) 
            return `${(sqMeters / 510_100_000_000_000).toFixed(3)} Earth Surfaces`;
        if (abs >= 1e6)
            return `${(sqMeters / 1e6).toFixed(3)} km^2`;
        return `${sqMeters.toFixed(1)} m^2`;
    }

    export function fmtVolume(cubMeters: number): string {
        const abs = Math.abs(cubMeters);
        if (abs >= 1e9)
            return `${(cubMeters / 1e9).toFixed(3)} km^3`;
        if (abs >= 1e3)
            return `${(cubMeters / 1e3).toFixed(3)} m³`;
        return `${cubMeters.toFixed(1)} m³`;
    }

    export function fmtAngularVelocity(rads: number): string {
        const rpm = rads * 60 / (2 * Math.PI);
        return `${rads.toFixed(5)} rad/s (${rpm.toFixed(3)} rpm)`;
    }

    export function fmtVelocity(ms: number): string {
        const abs = Math.abs(ms);
        if (abs >= 299_792_458 * 0.01)
            return`${(ms / 299_792_458).toFixed(3)} c`
        if (abs >= 1000)
            return`${(ms / 1000).toFixed(3)} km/s`
        return `${ms.toFixed(2)} m/s`;
    }

    export function fmtAcceleration(ms2: number): string {
        return `${ms2.toFixed(3)} m/s^2 (${(ms2 / 9.81).toFixed(3)} G)`;
    }

    export function fmtTime(secs: number): string {
        const abs = Math.abs(secs);
        if (abs >= 86400)
            return `${(secs / 86400).toFixed(3)} days`;
        if (abs >= 3600)
            return `${(secs / 3600).toFixed(3)} h`;
        if (abs >= 60)
            return `${(secs / 60).toFixed(3)} min`;
        return `${secs.toFixed(2)} s`;
    }

    export function fmtPower(watts: number): string {
        const abs = Math.abs(watts);
        if (abs >= 1e16)
            return `${watts.toExponential()}, approx. K${((Math.log10(abs) - 6) / 10).toFixed(1)}`;
        if (abs >= 1e15)
            return `${(watts / 1e15).toFixed(3)} PW`;
        if (abs >= 1e12)
            return `${(watts / 1e12).toFixed(3)} TW`;
        if (abs >= 1e9)
            return `${(watts / 1e9).toFixed(3)} GW`;
        if (abs >= 1e6)
            return `${(watts / 1e6).toFixed(3)} MW`;
        if (abs >= 1e3)
            return `${(watts / 1e3).toFixed(3)} kW`;
        return `${watts.toFixed(2)} W`;
    }

    export function fmtTemperature(kelvin: number): string {
        const abs = Math.abs(kelvin);
        
        if (abs >= 1e9)
            return `${(abs * 8.617e-5 / 1e6).toFixed(3)} MeV`;
        if (abs >= 1e6)
            return `${(abs * 8.617e-5 / 1e3).toFixed(3)} keV`;
        
        const celsius = kelvin - 273.15;
        return `${kelvin.toFixed(1)} K (${celsius.toFixed(1)} °C)`;
    }

    export function fmtFlux(Wpm2: number): string {
        const abs = Math.abs(Wpm2);

        if (abs >= 1e9)
            return `${(Wpm2 / 1e9).toFixed(3)} GW/m^3`;
        if (abs >= 1e6)
            return `${(Wpm2 / 1e6).toFixed(3)} MW/m^3`;
        if (abs >= 1e3)
            return `${(Wpm2 / 1e3).toFixed(3)} kW/m^3`;
        if (abs >= 1)
            return `${(Wpm2).toFixed(3)} W/m^3`;
        if (abs >= 1e-3)
            return `${(Wpm2 / 1e-3).toFixed(3)} mW/m^3`;
        return `${(Wpm2 / 1e-6).toFixed(3)} uW/m^2`;
    }

    export function fmtSpecificStrength(nmkg: number): string {
        const abs = Math.abs(nmkg);
        if (abs >= 1e6)
            return `${(nmkg / 1e6).toFixed(3)} MN*m/kg`;
        if (abs >= 1e3)
            return `${(nmkg / 1e3).toFixed(3)} kN*m/kg`;
        return `${nmkg.toFixed(0)} N*m/kg`;
    }
}