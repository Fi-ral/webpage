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

    export function fmtGravity(ms2: number): string {
        return `${ms2.toFixed(3)} m/s^2 (${(ms2 / 9.81).toFixed(3)} G)`;
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

    export function fmtPeriod(secs: number): string {
        const abs = Math.abs(secs);
        if (abs >= 86400)
            return `${(secs / 86400).toFixed(3)} days`;
        if (abs >= 3600)
            return `${(secs / 3600).toFixed(3)} h`;
        if (abs >= 60)
            return `${(secs / 60).toFixed(3)} min`;
        return `${secs.toFixed(2)} s`;
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