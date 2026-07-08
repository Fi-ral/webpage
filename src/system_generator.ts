// Originally written in pure JavaScript on Notepad++! Please excuse the horrible code.

namespace SystemGeneratorApp {
    const MinimumMass = 1e20;
    const EarthMass = 5.972e+24;
    const JupiterMass = 1.898e+27;
    const SolarMass = 1.9885e+30;
    const SolarLuminosity = 3.828e26;
    const SunRadius = 695700000;
    const AtomicMass = 1.6605e-27;
    const AtmosphericPressure = 101325;

    const StefanBoltzmann = 5.67e-8;
    const GraviationalConstant = 6.6744e-11;
    const IdealGasConstant = 8.314;
    const BoltzmannConstant = 1.380549e-23;

    enum LuminosityClass {
        SUBDWARF = "subdwarf",
        DWARF = "main-sequence star",
        SUBGIANT = "subgiant",
        GIANT = "giant"
    };
    enum GasTypes {
        HYDROGEN = "H",
        HELIUM = "He",
        ARGON = "Ar",
        XENON = "Xe",
        OXYGEN = "O2",
        NITROGEN = "N2",
        SULFUR_DIOXIDE = "SO2",
        CARBON_DIOXIDE = "CO2",
        METHANE = "CH4",
        AMMONIA = "NH3",
        WATER = "H2O",
    };

    class PlanetType {
        name: string;
        secondaryName: string;
        albedo: number;
        emissivity: number;
        density: number;
        maxMoons: number;
        tempRange: number[];
        massRange: number[];
        isGas: boolean;

        static planetTypes: PlanetType[] = [];
        
        constructor(name: string, secondaryName: string, albedo: number, emissivity: number, density: number, maxMoons: number, tempRange: number[], massRange: number[], isGas: boolean) {
            this.name = name;
            this.secondaryName = secondaryName;
            this.albedo = albedo;
            this.emissivity = emissivity;
            this.density = density;
            this.maxMoons = maxMoons;
            this.tempRange = tempRange;
            this.massRange = massRange;
            this.isGas = isGas;
            
            PlanetType.planetTypes.push(this);
        }
        
        static generate() {		
            new PlanetType(
                "Gas Supergiant",
                "Akali",
                0.60,
                1.00,
                1300,
                5,
                [50, 150], [400, 1000],
                true
            );
            new PlanetType(
                "Gas Supergiant",
                "Water",
                0.70,
                1.00,
                1200,
                5,
                [200, 300], [400, 1000],
                true
            );
            new PlanetType(
                "Gas Supergiant",
                "Cloudless",
                0.12,
                1.00,
                1000,
                5,
                [350, 800], [400, 1000],
                true
            );
            new PlanetType(
                "Gas Supergiant",
                "Hot",
                0.10,
                1.00,
                700,
                5,
                [900, 1200], [400, 1000],
                true
            );
            
            new PlanetType(
                "Gas Giant",
                "Ammonia",
                0.60,
                1.00,
                1100,
                4,
                [50, 150], [20, 250],
                true
            );
            new PlanetType(
                "Gas Giant",
                "Water",
                0.70,
                1.00,
                1000,
                4,
                [200, 300], [20, 250],
                true
            );
            new PlanetType(
                "Gas Giant",
                "Cloudless",
                0.12,
                1.00,
                700,
                4,
                [350, 800], [20, 250],
                true
            );
            new PlanetType(
                "Gas Giant",
                "Akali",
                0.10,
                1.00,
                550,
                4,
                [900, 1200], [20, 250],
                true
            );
            
            new PlanetType(
                "Gas Dwarf",
                "Ammonia",
                0.60,
                1.00,
                800,
                3,
                [50, 150], [8, 20],
                true
            );
            new PlanetType(
                "Gas Dwarf",
                "Water",
                0.70,
                1.00,
                750,
                3,
                [200, 300], [8, 20],
                true
            );
            new PlanetType(
                "Gas Dwarf",
                "Cloudless",
                0.12,
                1.00,
                500,
                3,
                [350, 800], [8, 20],
                true
            );
            new PlanetType(
                "Gas Dwarf",
                "Akali",
                0.10,
                1.00,
                250,
                3,
                [900, 1200], [8, 20],
                true
            );
            
            new PlanetType(
                "Ice Giant",
                "Volatiles",
                0.40,
                0.90,
                1600,
                4,
                [20, 100], [10, 50],
                true
            );
            new PlanetType(
                "Ice Dwarf",
                "Volatiles",
                0.40,
                0.90,
                2000,
                3,
                [20, 100], [3, 10],
                true
            );
            
            new PlanetType(
                "Superearth",
                "Icy",
                0.40,
                0.80,
                3500,
                2,
                [20, 100], [2.5, 6],
                false
            );
            new PlanetType(
                "Superearth",
                "Silicate",
                0.40,
                0.80,
                6000,
                2,
                [150, 500], [2.5, 6],
                false
            );
            new PlanetType(
                "Superearth",
                "Carbonic",
                0.20,
                1.00,
                4500,
                2,
                [500, 700], [2.5, 6],
                false
            );
            new PlanetType(
                "Superearth",
                "Metallic",
                0.50,
                1.00,
                8500,
                2,
                [900, 1200], [2.5, 6],
                false
            );
            new PlanetType(
                "Superearth",
                "Molten",
                0.40,
                1.00,
                7500,
                2,
                [1500, 2000], [2.5, 6],
                false
            );
            
            new PlanetType(
                "Rocky", 
                "Icy",
                0.50,
                1.00,
                3000,
                1,
                [20, 100], [0.3, 2],
                false
            );
            new PlanetType(
                "Rocky", 
                "Silicate",
                0.30,
                1.00,
                5000,
                1,
                [150, 400], [0.3, 2],
                false
            );
            new PlanetType(
                "Rocky",
                "Carbonic",
                0.20,
                1.00,
                4000,
                1,
                [500, 700], [0.3, 2],
                false
            );
            new PlanetType(
                "Rocky",
                "Metallic",
                0.50,
                1.00,
                7500,
                1,
                [900, 1200], [0.3, 2],
                false
            );
            new PlanetType(
                "Rocky",
                "Molten",
                0.40,
                1.00,
                7500,
                1,
                [1500, 2000], [0.3, 2],
                false
            );

            new PlanetType(
                "Rocky", 
                "Icy",
                0.50,
                1.00,
                2000,
                0,
                [20, 100], [0, 0.1],
                false
            );
            new PlanetType(
                "Rocky", 
                "Silicate",
                0.30,
                1.00,
                3000,
                0,
                [150, 400], [0, 0.1],
                false
            );
            new PlanetType(
                "Rocky",
                "Carbonic",
                0.20,
                1.00,
                2500,
                0,
                [500, 700], [0, 0.1],
                false
            );
            new PlanetType(
                "Rocky",
                "Metallic",
                0.50,
                1.00,
                5500,
                0,
                [900, 1200], [0, 0.1],
                false
            );
            new PlanetType(
                "Rocky",
                "Molten",
                0.40,
                1.00,
                5500,
                0,
                [1500, 2000], [0, 0.1],
                false
            );
        }
        
        static findClosest(mass: number, temp: number, filterOutGasPlanet = false) {
            const results = PlanetType.getTwoClosest(mass, temp, filterOutGasPlanet);
            return results ? results.best.type : null;
        }
        static findAndInterpolate(mass: number, temp: number, filterOutGasPlanet = false, distanceThreshold = 0.1): PlanetType {
            const candidates = PlanetType.getTwoClosest(mass, temp, filterOutGasPlanet);
            if (!candidates) 
                return null!;

            const { best, second } = candidates;

            if (best.distance <= distanceThreshold || !second) {
                return { ...best.type, customName: best.type.name } as PlanetType;
            }

            const totalDist = best.distance + second.distance;
            const t = totalDist === 0 ? 0.5 : best.distance / totalDist;
            
            const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

            if (best.type.isGas !== second.type.isGas)
                return best.type;

            return {
                name: `${best.type.name}`,
                secondaryName: best.type.secondaryName !== second.type.secondaryName && second.type.secondaryName != "" 
                            ?`${best.type.secondaryName}, ${second.type.secondaryName}` 
                            : best.type.secondaryName,
                isGas: best.type.isGas,
                albedo: lerp(best.type.albedo, second.type.albedo, t),
                emissivity: lerp(best.type.emissivity, second.type.emissivity, t),
                density: lerp(best.type.density, second.type.density, t),
                maxMoons: Math.round(lerp(best.type.maxMoons, second.type.maxMoons, t)),
                
                tempRange: [
                    lerp(best.type.tempRange[0], second.type.tempRange[0], t),
                    lerp(best.type.tempRange[1], second.type.tempRange[1], t)
                ],
                massRange: [
                    lerp(best.type.massRange[0], second.type.massRange[0], t),
                    lerp(best.type.massRange[1], second.type.massRange[1], t)
                ]
            };
        }
        static getTwoClosest(mass: number, temp: number, filterOutGasPlanet = false) {
            let list = [];
            if (filterOutGasPlanet)
                list = PlanetType.planetTypes.filter(function(x) { return !x.isGas} );
            else
                list = PlanetType.planetTypes;
            
            if (list.length === 0)
                return null;

            let scoredTypes = list.map(type => {
                const tempDist = PlanetType.getRangeDistance(temp, type.tempRange);
                const massDist = PlanetType.getRangeDistance(mass / EarthMass, type.massRange); 

                const normTempDist = tempDist / (type.tempRange[1] - type.tempRange[0] || 1);
                const normMassDist = massDist / (type.massRange[1] - type.massRange[0] || 1);

                const totalDistance = Math.sqrt(Math.pow(normTempDist, 2) + Math.pow(normMassDist, 2));
                return { type, distance: totalDistance };
            });

            scoredTypes.sort((a, b) => a.distance - b.distance);

            return {
                best: scoredTypes[0],
                second: scoredTypes[1] || null
            };
        }
        static getRangeDistance(value: number, range: number[]) {
            const [min, max] = range;
            if (value < min) 
                return min - value;
            if (value > max) 
                return value - max;
            return 0;
        }
    }


    class Atmosphere {
        groundPressure: number;
        karmanLine: number;
        composition: Map<GasTypes, number>;

        constructor(groundPressure: number, karmanLine: number, composition: Map<GasTypes, number>) {
            this.groundPressure = groundPressure;
            this.karmanLine = karmanLine;
            this.composition = composition;
        }
        
        static getMolecularMass(particle: GasTypes) {
            switch (particle) {
                case GasTypes.HYDROGEN:			return 1;
                case GasTypes.HELIUM:			return 4;
                case GasTypes.ARGON:			return 39;
                case GasTypes.XENON:			return 131;
                case GasTypes.OXYGEN:			return 32;
                case GasTypes.NITROGEN:			return 28;
                case GasTypes.SULFUR_DIOXIDE:	return 64;
                case GasTypes.CARBON_DIOXIDE:	return 44;
                case GasTypes.METHANE:			return 16;
                case GasTypes.AMMONIA:			return 17;
                case GasTypes.WATER:			return 18;
            }
        }
        static canExistAsGas(particle: GasTypes, temperature: number, pressure: number) {
            const GasData = {
                [GasTypes.HYDROGEN]:       { Tb:  20.27, Hvap:   904 },
                [GasTypes.HELIUM]:         { Tb:   4.22, Hvap:    85 },
                [GasTypes.ARGON]:          { Tb:  87.30, Hvap:  6447 },
                [GasTypes.XENON]:          { Tb: 165.05, Hvap:    96 },
                [GasTypes.OXYGEN]:         { Tb:  90.19, Hvap:  6820 },
                [GasTypes.NITROGEN]:       { Tb:  77.35, Hvap:  5570 },
                [GasTypes.SULFUR_DIOXIDE]: { Tb: 263.00, Hvap: 24900 },
                [GasTypes.CARBON_DIOXIDE]: { Tb: 194.70, Hvap: 32300 },
                [GasTypes.METHANE]:        { Tb: 111.66, Hvap:  8170 },
                [GasTypes.AMMONIA]:        { Tb: 239.82, Hvap:  1369 },
                [GasTypes.WATER]:          { Tb: 373.15, Hvap: 40650 },
            };
            
            const data = GasData[particle];
            const lnP_ratio = Math.log(pressure / AtmosphericPressure);
            const requiredTemp = 1 / ((1 / data.Tb) - (IdealGasConstant / data.Hvap) * lnP_ratio);

            return temperature > requiredTemp;
        }
        static getAverageParticleMass(composition: Map<GasTypes, number>) {
            let sum = 0;
            Object.entries(composition).forEach(([name, percentage]) => {
                sum += Atmosphere.getMolecularMass(name as GasTypes) * percentage;
            });
            return sum * AtomicMass;
        }
        static getMeanVelocity(temperature: number, gas: GasTypes) {
            let particleMass = Atmosphere.getMolecularMass(gas);
            return ((8 * IdealGasConstant * temperature) / (Math.PI * particleMass/1000)) ** (1/2)
        }
        static canRegenerateOxygen(temperature: number, pressure: number) {
            return temperature > 250 && temperature < 330 && pressure > 0.1 * AtmosphericPressure && pressure < 4 * AtmosphericPressure;
        }
        
        static getValidAtmosphere(mass: number, radius: number, temperature: number, surfaceGravity: number, escapeVelocity: number) {
            let attempts = 0;
            let guessedWeight = 100;
            const maxIterations = 5;
            const tolerance = 1e-5;
                
            while (true) {
                attempts++;
                
                let atmosphereMass = 0;
                if (mass >= 1e26)
                    atmosphereMass = mass * 10 ** getRandom(-6, -4);
                else if (mass >= 1e25)
                    atmosphereMass = mass * 10 ** getRandom(-8, -4);
                else if (mass >= 1e24)
                    atmosphereMass = mass * 10 ** getRandom(-9, -5);
                else
                    atmosphereMass = mass * 10 ** getRandom(-12, -7);
                
                atmosphereMass *= guessedWeight / 100;
                
                const surfaceArea = 4 * Math.PI * radius ** 2;
                const groundPressure = atmosphereMass * surfaceGravity / surfaceArea;
                
                const candidateGases: Map<GasTypes, number> = new Map();
                Object.entries(GasTypes).forEach(gasEntry => { 
                    const gas = gasEntry[1];
                    const meanVelocity = Atmosphere.getMeanVelocity(temperature, gas);
                    
                    const factor = escapeVelocity / meanVelocity
                    
                    if (factor > 6 && Atmosphere.canExistAsGas(gas, temperature, groundPressure))
                        candidateGases.set(gas, factor);
                })
                
                if (Object.keys(candidateGases).length === 0)
                    return new Atmosphere(0, 0, new Map());
                
                let totalWeight = 0;
                const composition: Map<GasTypes, number> = new Map();
                for (const [gas, _] of candidateGases) {
                    let weight = 1.0;

                    if (Atmosphere.getMolecularMass(gas) <= 4) {
                        weight = mass > 5e25 ? 1000 * (gas === GasTypes.HYDROGEN ? 3 : 1) : 0.01; 
                    } 
                    else {
                        if (gas === GasTypes.CARBON_DIOXIDE) 
                            weight = 80.0; 
                        if (gas === GasTypes.NITROGEN) 
                            weight = 50.0;
                        if (gas === GasTypes.WATER) 
                            weight = 10.0;
                        if (gas === GasTypes.OXYGEN) 
                            weight = Atmosphere.canRegenerateOxygen(temperature, groundPressure) ? 10.0 : 0.1;
                        if (gas === GasTypes.XENON ||
                            gas === GasTypes.SULFUR_DIOXIDE) 
                            weight = 0.1;
                    }

                    composition.set(gas, weight);
                    totalWeight += weight;
                };
                
                const error = Math.abs(1 - totalWeight / guessedWeight);
                if (error > tolerance && !(attempts > maxIterations)) {
                    guessedWeight = totalWeight;
                    continue;
                }
                
                for (const [gas, _] of composition) {
                    composition.set(gas,  composition.get(gas)! / totalWeight);
                };
                
                const scaleHeight = BoltzmannConstant * temperature / (Atmosphere.getAverageParticleMass(composition) * surfaceGravity);
                const karmanLine = -scaleHeight * Math.log(1/groundPressure);
                
                console.assert(scaleHeight !== 0 && Number.isFinite(scaleHeight))
                
                return new Atmosphere(groundPressure, karmanLine, composition);
            }
        }

        toString() {
            if (this.groundPressure <= 1)
                return `None notable`;
            
            let notableGases = ``;
            Object.entries(this.composition)
            .sort((a, b) => b[1] - a[1])
            .forEach(([name, percentage]) => {
                if (percentage > 0.03) {
                    if (notableGases === "")
                        notableGases += `${name} (${(percentage * 100).toFixed(1)}%)`
                    else
                        notableGases += `, ${name} (${(percentage * 100).toFixed(1)}%)`
                }
            });
            
            return `\n  - Surface Pressure: ${Converter.fmtPressure(this.groundPressure)}\n`
                +`  - Karman Line: ${Converter.fmtDistance(this.karmanLine)}\n` 
                +`  - Composition: ${notableGases}`;
        }
    }



    class Body {
        mass: number;
        radius: number;
        temperature: number;

        constructor(mass: number, radius: number, temperature: number) {
            this.mass = mass;
            this.radius = radius;
            this.temperature = temperature;
        }
        
        toString() {
            return `Not Implemented`;
        }
    }

    class AsteroidBelt extends Body {
        semiMajorAxis: number;

        constructor(mass: number, temperature: number, semiMajorAxis: number) {
            super(mass, Number.NaN, temperature);
            this.semiMajorAxis = semiMajorAxis;
        }
        
        toString() {
            let type = "Frozen Asteroid Belt";
            if (this.temperature > 500)      type = "Metallic Asteroid Belt";
            else if (this.temperature > 250) type = "Silicate Asteroid Belt";
            
            return `<details><summary>${type}</summary><p>`
                +`- Radius: ${Converter.fmtDistance(this.semiMajorAxis)}`
                +`</p></details>`;
        }
    }

    class Star extends Body {
        luminosity: number;
        luminosityClass: LuminosityClass;
        seed: string;

        constructor(mass: number, luminosityClass: LuminosityClass, seed: string) {
            super(mass, Number.NaN, Number.NaN);
            
            this.radius = Star.getStarRadius(mass, luminosityClass, seed);
            this.luminosity = Star.getStarLuminosity(mass, luminosityClass, seed);
            this.temperature = this.getStarTemperature();
            
            this.luminosityClass = luminosityClass;
            this.seed = seed;
        }
        
        static getStarMassFromLuminosity(targetLuminosity: number, luminosityClass: LuminosityClass, seed: string) {    
            if (targetLuminosity <= 0 || !luminosityClass) 
                return Number.NaN;
            
            let lowMass = 13 * JupiterMass;
            let highMass = 250.1 * SolarMass; 
            let estimatedMass = Number.NaN;
            
            const maxIterations = 50;
            const tolerance = 1e-9;

            for (let i = 0; i < maxIterations; i++) {
                estimatedMass = (lowMass + highMass) / 2;
                
                let currentLuminosity = Star.getStarLuminosity(estimatedMass, luminosityClass, seed);
                if (Math.abs(currentLuminosity - targetLuminosity) / targetLuminosity < tolerance)
                    return estimatedMass;
                
                if (currentLuminosity < targetLuminosity)
                    lowMass = estimatedMass;
                else
                    highMass = estimatedMass;
            }

            return estimatedMass; 
        }
        static getStarLuminosity(mass: number, luminosityClass: LuminosityClass, seed: string) {
            let luminosity = 0;
            
            if (mass < 0.43 * SolarMass)
                luminosity = SolarLuminosity * 0.23 * (mass/SolarMass) ** 2.3;
            else if (mass < 2 * SolarMass)
                luminosity = SolarLuminosity * (mass/SolarMass) ** 4;
            else if (mass < 55 * SolarMass)
                luminosity = 1.4 * SolarLuminosity * (mass/SolarMass) ** 3.5;
            else
                luminosity = 32000 * SolarLuminosity * (mass/SolarMass);
            
            switch (luminosityClass) {
                case LuminosityClass.SUBDWARF:
                    return luminosity * 2.521 ** getRandomSeeded(seed, -2, -1.5);
                case LuminosityClass.DWARF:
                    return luminosity * getRandomSeeded(seed, 0.95, 1.05);
                case LuminosityClass.SUBGIANT:
                    return luminosity * getRandomSeeded(seed, 1.1, 2.5);
                case LuminosityClass.GIANT:
                    return luminosity * getRandomSeeded(seed, 10, 200);
                default:
                    return Number.NaN;
            }
        }
        static getStarBaseRadius(mass: number) {
            return SunRadius * (mass/SolarMass) ** 0.8;
        }
        static getStarRadius(mass: number, luminosityClass: LuminosityClass, seed: string) {
            let radius = Star.getStarBaseRadius(mass);
            
            switch (luminosityClass) {
                case LuminosityClass.SUBDWARF:
                    return radius * getRandomSeeded(seed, 0.8, 0.9);
                case LuminosityClass.DWARF:
                    return radius * getRandomSeeded(seed, 0.99, 1.01);
                case LuminosityClass.SUBGIANT:
                    return radius * getRandomSeeded(seed, 1.3, 2.0);
                case LuminosityClass.GIANT:
                    return radius * getRandomSeeded(seed, 10, 200);
                default:
                    return Number.NaN;
            }
        }
        
        getBaseRadius() {
            return Star.getStarBaseRadius(this.mass);
        }
        getStarTemperature() {
            const denominator = 4 * Math.PI * (this.radius ** 2) * StefanBoltzmann;
            const temperature = (this.luminosity / denominator) ** (1/4);

            return temperature;
        }
        
        isLegal() {
            if (this.luminosityClass === LuminosityClass.SUBDWARF && this.temperature >= 7300)
                return false;
            if (this.luminosityClass === LuminosityClass.SUBGIANT && (this.temperature >= 10000 || this.temperature <= 2300))
                return false;
            
            return true;
        }
        
        toString() {
            let starClass = "T-class brown dwarf";
            if (this.temperature >= 33000)      starClass = `O-class ${this.luminosityClass}`
            else if (this.temperature >= 10000) starClass = `B-class ${this.luminosityClass}`
            else if (this.temperature >=  7300) starClass = `A-class ${this.luminosityClass}`
            else if (this.temperature >=  6000) starClass = `F-class ${this.luminosityClass}`
            else if (this.temperature >=  5300) starClass = `G-class ${this.luminosityClass}`
            else if (this.temperature >=  3900) starClass = `K-class ${this.luminosityClass}`
            else if (this.temperature >=  2300) starClass = `M-class ${this.luminosityClass}`
            else if (this.luminosityClass === LuminosityClass.GIANT) starClass = `M-class ${this.luminosityClass}`
            
            return `<details open><summary>${starClass}</summary><p>`
                +`- Mass: ${Converter.fmtMass(this.mass)}\n`
                +`- Luminosity: ${(this.luminosity/SolarLuminosity).toFixed(3)} Solar luminosities\n`
                +`- Radius: ${Converter.fmtDistance(this.radius)}\n`
                +`- Surface: ${Converter.fmtTemperature(this.temperature)}`
                +`</p></details>`;
        }
    }

    class Planet extends Body {
        semiMajorAxis: number;
        planetType: PlanetType;
        star: Star;
        moons: Moon[];
        atmosphere: any;

        constructor(mass: number, temperature: number, semiMajorAxis: number, planetType: PlanetType, star: Star) {
            super(mass, Number.NaN, temperature)
            this.semiMajorAxis = semiMajorAxis;
            this.planetType = planetType;
            this.star = star;
            this.moons = [];
            this.atmosphere = [];
            
            this.radius = this.calculatePlanetRadius()
        }
        
        static getPlanetTemperature(distance: number, albedo: number, emissivity: number, sun: Star) {
            return ((sun.luminosity * (1 - albedo)) / (16 * Math.PI * StefanBoltzmann * emissivity * distance ** 2)) ** (1/4)
        }
        static getPlanetMass(star: Star, semiMajorAxis: number) {
            function getPlanetMassFactor(star: Star, semiMajorAxis: number) {
                return clamp(1000 * star.radius / semiMajorAxis, 0, 1);
            }

            let mass = 0;
            let rng = getRandom(0, 20)
            
            if (rng <= 17)
                mass = 10 ** (3.3 * Math.random() + 23)
            else if (rng <= 19)
                mass = 10 ** (Math.random() + 25)
            else
                mass = 10 ** (2 * Math.random() + 26)
            
            mass = mass * getPlanetMassFactor(star, semiMajorAxis);
            return mass;
        }

        getRocheLimit(other: Planet) {
            return 2.44 * this.radius * (this.planetType.density / other.planetType.density) ** (1/3);
        }
        getHillRadius(_: Planet|null) {
            return this.semiMajorAxis * (this.mass / (3 * this.star.mass)) ** (1/3)
        }
        getHillRadiusLower(_: Planet|null) {
            return 0.6 * this.getHillRadius(_);
        }
        getMutualHillRadius(other: Planet) {
            if (other === null)
                return 0;
            if (this.star !== other.star)
                return Number.NaN;
            
            const df = (this.semiMajorAxis + other.semiMajorAxis) / 2
            const mf = ((this.mass + other.mass) / (3 * this.star.mass)) ** (1/3)
            
            return df * mf
        }
        isSafeOrbit(other: Planet|null) {
            if (other === null)
                return true;
            
            const mutualHillRadius = this.getMutualHillRadius(other);
            const distance = Math.abs(this.semiMajorAxis - other.semiMajorAxis);
            
            const mul = distance / mutualHillRadius;
            
            return mul >= 10;
        }

        calculatePlanetRadius() {
            const volume = this.mass / this.planetType.density;
            const radius = ((3 * volume) / (4 * Math.PI)) ** (1/3);
            
            return radius;
        }
        
        insetSymbol() {
            return "";
        }

        getSurfaceGravity() {
            return GraviationalConstant * this.mass / (this.radius**2);
        }
        getEscapeVelocity() {
            return (2 * GraviationalConstant * this.mass / this.radius) ** (1/2)
        }

        toString() {
            const tempString = Converter.fmtTemperature(Math.round(this.temperature));
            const massString = Converter.fmtMass(this.mass);
            const radiusString = Converter.fmtDistance(this.radius);
            const distanceString = Converter.fmtDistance(this.semiMajorAxis);
            
            const surfaceGravityString = Converter.fmtAcceleration(this.getSurfaceGravity());
            
            const nameStringA = this.planetType.secondaryName !== "" ? this.planetType.secondaryName : "";
            const nameStringB = nameStringA !== "" ? ` (${nameStringA})` : "";
            
            if (this.planetType.isGas)
                return `<details><summary>${this.insetSymbol()}${this.planetType.name}</summary><p>`
                    +`- Cloud Cover: ${nameStringA}\n`
                    +`- Mass: ${massString}\n`
                    +`- Radius: ${radiusString}\n`
                    +`- Temperature: ${tempString}\n`
                    +`- Semi-Major Axis: ${distanceString}`
                    +`</p></details>`;
            else
                return `<details><summary>${this.insetSymbol()}${this.planetType.name}${nameStringB}</summary><p>`
                    +`- Mass: ${massString}\n`
                    +`- Radius: ${radiusString}\n`
                    +`- Temperature: ${tempString}\n`
                    +`- Atmosphere: ${this.atmosphere.toString()}\n`
                    +`- Surface Gravity: ${surfaceGravityString}\n`
                    +`- Semi-Major Axis: ${distanceString}`
                    +`</p></details>`;
            
        }
    }

    class Moon extends Planet {
        getHillRadiusLower(planet: Planet) {
            return 0.3 * this.getHillRadius(planet);
        }
        getHillRadius(planet: Planet) {
            return this.semiMajorAxis * (this.mass / (3 * planet.mass)) ** (1/3)
        }
        
        insetSymbol() {
            return "-> ";
        }
    }


    function clamp(n: number, min: number, max: number) {
        return Math.min(Math.max(n, min), max)
    }

    function getRandom(min: number, max: number) {
    return Math.random() * (max - min) + min;
    }
    function getRandomSeeded(seed: string, min: number, max: number) {
    return cyrb128ToFloat(seed) * (max - min) + min;
    }
    function getRandomString(lengthMin=6, lengthMax=12) {
        return Math.random().toString(36).substring(lengthMin, lengthMax)
    }

    function cyrb128(str: string) {
        let h1 = 1779033703, h2 = 3024734485, h3 = 3362453659, h4 = 502494325;
        for (let i = 0, k; i < str.length; i++) {
            k = str.charCodeAt(i);
            h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
            h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
            h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
            h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
        }
        h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
        h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
        h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
        h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
        return [(h1^h2^h3^h4)>>>0, (h2^h1)>>>0, (h3^h1)>>>0, (h4^h1)>>>0];
    }
    function cyrb128ToFloat(str: string) {
        const hash = cyrb128(str);
        return hash[0] / 4294967296;
    }


    function generateMoon(semiMajorAxis: number, lastMoon: Moon|null, planet: Planet) {
        let attempts = 0;

        while (true) {
            attempts++;
            if (attempts >= 100)
                return null;
            
            let rng = Math.random();
            let mass = planet.mass * 10 ** ((planet.mass > JupiterMass ? -5 : -4) * rng - 2);

            if (mass < MinimumMass)
                continue;

            let temperature = Planet.getPlanetTemperature(planet.semiMajorAxis, 0.3, 1, planet.star);
            let planetType = PlanetType.findAndInterpolate(mass, temperature, true);
            
            let candiate = new Moon(mass, temperature, semiMajorAxis, planetType, planet.star);
        
            let atmosphere = Atmosphere.getValidAtmosphere(mass, candiate.radius, temperature, candiate.getSurfaceGravity(), candiate.getEscapeVelocity());
            let finalTemperature = Planet.getPlanetTemperature(planet.semiMajorAxis, planetType.albedo, planetType.emissivity, planet.star);
            finalTemperature = getRandom(0.95, 1.05) * temperature;
                
            candiate.atmosphere = atmosphere;
            candiate.temperature = finalTemperature;
                    
            if (candiate.isSafeOrbit(lastMoon))
                return candiate;
        }
    }
    function generatePlanet(semiMajorAxis: number, lastPlanet: Planet|null, star: Star, generateMoons: boolean) {
        let attempts = 0;
        
        while (true) {
            attempts++;
            
            let mass = Planet.getPlanetMass(star, semiMajorAxis);
            let temperature = Planet.getPlanetTemperature(semiMajorAxis, 0.3, 1, star);
            
            if (attempts >= 100)
                return new AsteroidBelt(mass, temperature, semiMajorAxis);
            
            let planetType = PlanetType.findAndInterpolate(mass,temperature, mass < EarthMass * 8);
            
            let candiate = new Planet(mass, temperature, semiMajorAxis, planetType, star);
        
            if (!planetType.isGas) {
                let atmosphere = Atmosphere.getValidAtmosphere(mass, candiate.radius, temperature, candiate.getSurfaceGravity(), candiate.getEscapeVelocity());
                
                let finalTemperature = Planet.getPlanetTemperature(semiMajorAxis, planetType.albedo, planetType.emissivity, star);
                finalTemperature = getRandom(0.95, 1.05) * temperature;
                
                candiate.temperature = finalTemperature;
                candiate.atmosphere = atmosphere;
            }
            else {
                let finalTemperature = getRandom(0.95, 1.05) * temperature;
                
                candiate.temperature = finalTemperature;
                candiate.atmosphere = null;
            }
            

            if (!candiate.isSafeOrbit(lastPlanet))
                continue;
            if (!generateMoons)
                return candiate;
            
            let lastMoon: Moon = null!;
            let moonCount = Math.floor(getRandom(0, Math.floor(candiate.planetType.maxMoons+1)));
            let moonSemiMajorAxis = 0;
            for (let i = 0; i < moonCount; i++) {
                if (candiate.moons[0])
                    moonSemiMajorAxis = candiate.moons[0].semiMajorAxis * 3 * (0.4 + 0.3 * 2 ** (i-1));
                else
                    moonSemiMajorAxis = candiate.radius * getRandom(10, 30);
                
                moonSemiMajorAxis = moonSemiMajorAxis * getRandom(0.95, 1.05);
            
                let moon = generateMoon(moonSemiMajorAxis, lastMoon, candiate);
                if (moon === null)
                    continue;
                if (moonSemiMajorAxis > candiate.getHillRadiusLower(null))
                    break;
                if (moonSemiMajorAxis < candiate.getRocheLimit(moon))
                    continue;
                
                candiate.moons.push(moon);
                lastMoon = moon;
            }
            
            return candiate;
        }
    }

    function generateSystem(star: Star, planetCount: number, firstPlanetDistance: number) {			
        let planets: (Planet|AsteroidBelt)[] = [];
        let lastPlanet: Planet|null = null;
        let semiMajorAxis = 0;
        for (let i = 0; i < planetCount; i++) {
            if (i !== 0)
                semiMajorAxis = planets[0].semiMajorAxis * 3 * (0.4 + 0.3 * 2 ** (i-1));
            else if (!Number.isNaN(firstPlanetDistance))
                semiMajorAxis = firstPlanetDistance
            else
                semiMajorAxis = star.getBaseRadius() * getRandom(20, 100);
            
            semiMajorAxis = semiMajorAxis * getRandom(0.9, 1.1);

            if (semiMajorAxis >= star.getBaseRadius() * 50000)
                break;
            
            let newPlanet = generatePlanet(semiMajorAxis, lastPlanet, star, true);
            planets.push(newPlanet);
            
            if (isNaN(newPlanet.radius))
                continue;
            lastPlanet = newPlanet as Planet;
        }
        
        planets = planets.filter(planet => planet.semiMajorAxis >= star.radius)
        return planets;
    }

    function displayResult(star: Star, planets: Planet[]) {
        const resultField = document.getElementById("result")!;
        let result = "";
        
        result += star.toString() + "\n\n";
        console.debug(star)
        
        planets.forEach(planet => {
            console.debug(planet)		
            result += `${planet.toString()}\n`;
            
            if (!Object.hasOwn(planet, "moons"))
                return;
                
            planet.moons.forEach(moon => {
                console.debug(moon)		
                result += `\t${moon.toString()}\n`;
            });
        })
        
        requestAnimationFrame(() => {
            resultField.innerHTML = result;
        });
    }
    function showText(string: string, error = false) {
        const resultField = document.getElementById("result")!;
            
        requestAnimationFrame(() => {
            if (!error) {
                console.log(string);
                resultField.textContent = string;
                resultField.style.fontWeight = "";
                resultField.style.color = "";
            } else {
                console.warn(string);
                resultField.textContent = string;
                resultField.style.fontWeight = "bold";
                resultField.style.color = "var(--red-color)";
            }
        });
    }

    function getInput() {
        const starMass            = parseFloat((document.getElementById('calc-input-star-mass-value') as HTMLInputElement).value) * 
                                    parseFloat((document.getElementById('calc-input-star-mass-unit') as HTMLInputElement).value);
        const starLuminosity      = parseFloat((document.getElementById('calc-input-star-luminosity-value') as HTMLInputElement).value) * 
                                    parseFloat((document.getElementById('calc-input-star-luminosity-unit') as HTMLInputElement).value);
        const firstPlanetDistance = parseFloat((document.getElementById('calc-input-innermost-planet-value') as HTMLInputElement).value) * 
                                    parseFloat((document.getElementById('calc-input-innermost-planet-unit') as HTMLInputElement).value);
                          
        const planetCount         = parseFloat((document.getElementById("calc-input-planet-attempts-value") as HTMLInputElement).value);
        const starClass           = (document.getElementById("calc-input-star-class-value") as HTMLInputElement).value as LuminosityClass;
        
        if (starMass && starLuminosity) {
            showText("You cannot specify both the star's luminosity and mass!", true)
            return [false];
        }
        
        const seed = getRandomString();
        const finalMass = !Number.isNaN(starMass) ? starMass : Star.getStarMassFromLuminosity(starLuminosity, starClass, seed);
        
        const star = new Star(finalMass, starClass, seed);
        
        if (!finalMass || !planetCount) {
            showText("You need to specify both the star's mass/luminosity and the amount of planets it has!", true)
            return [false];
        }
        if (finalMass <= JupiterMass * 13) {
            showText("The star is too light to ignite fusion!", true);
            return [false];
        }
        if (finalMass >= SolarMass * 250) {
            showText("The star is too heavy to exist!", true);
            return [false];
        }
        if (planetCount < 0) {
            showText("You cannot generate a negative amount of planets!", true);
            return [false];
        }
        if (!star.isLegal()) {
            showText("This star cannot exist! Mass, luminosity and/or luminosity class cannot exist in this configuration (or you are close to the limit and were unlucky).", true);
            return [false];
        }
        
        return [true, star, planetCount, firstPlanetDistance];
    }

    export function search() {
        const maxAttempts         =  (document.getElementById("calc-input-search-param-infinite-search") as HTMLInputElement).checked ? Number.POSITIVE_INFINITY : 1000;
        const permittedError      =  parseFloat((document.getElementById("calc-input-search-param-error-value") as HTMLInputElement).value)
                                  *  parseFloat((document.getElementById("calc-input-search-param-error-unit") as HTMLInputElement).value);
        const searchedMass        =  parseFloat((document.getElementById("calc-input-search-param-mass-value") as HTMLInputElement).value)
                                  *  parseFloat((document.getElementById("calc-input-search-param-mass-unit") as HTMLInputElement).value);
        const searchedRadius      =  parseFloat((document.getElementById("calc-input-search-param-radius-value") as HTMLInputElement).value)
                                  *  parseFloat((document.getElementById("calc-input-search-param-radius-unit") as HTMLInputElement).value);
        const searchedTemperature =  parseFloat((document.getElementById("calc-input-search-param-temperature-value") as HTMLInputElement).value)
                                  *  parseFloat((document.getElementById("calc-input-search-param-temperature-unit") as HTMLInputElement).value);
        const searchedPressure    =  parseFloat((document.getElementById("calc-input-search-param-pressure-value") as HTMLInputElement).value)
                                  *  parseFloat((document.getElementById("calc-input-search-param-pressure-unit") as HTMLInputElement).value);

        function isInErrorBounds(actual: number, expected: number, tolerance: number) {
        return Math.abs(actual - expected) / Math.abs(expected) <= tolerance;
        }
        function isValid(planet: Planet) {
            const isValidMass     	 = !Number.isNaN(searchedMass) ? isInErrorBounds(planet.mass, searchedMass, permittedError) : true
            const isValidRadius   	 = !Number.isNaN(searchedRadius) ? isInErrorBounds(planet.radius, searchedRadius, permittedError) : true
            const isValidTemperature = !Number.isNaN(searchedTemperature) ? isInErrorBounds(planet.temperature, searchedTemperature, permittedError) : true
            const isValidPressure    = !Number.isNaN(searchedPressure) ? isInErrorBounds(planet.atmosphere?.groundPressure, searchedPressure, permittedError) : true
            
            return isValidMass && isValidRadius && isValidTemperature && isValidPressure;
        }
        
        console.clear();
        showText("Searching..")
        
        const [valid, star, planetCount, firstPlanetDistance] = getInput();
        if (!valid)
            return;
        
        let attempts = 0;	
        while (true) {
            attempts++;
            if (attempts >= maxAttempts) {
                showText("Could not find a system with the given parameters.", true);
                break;
            }
            
            if (attempts % 1000 === 0)
                console.log(`Attempts: ${attempts/1000}k`)
        
            const planets = generateSystem(star as Star, planetCount as number, firstPlanetDistance as number);
            
            if (planets.some(planet => (isValid(planet as Planet)))) {
                displayResult(star as Star, planets as Planet[]);
                console.log(`Searched ${attempts} systems`);
                break;
            }
        }
    }

    PlanetType.generate();
}