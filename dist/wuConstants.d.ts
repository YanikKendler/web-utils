export declare class wuConstants {
    static readonly Regex: {
        anyThingButNumbers: RegExp;
        empty: RegExp;
        onlySpecialChars: RegExp;
        onlyNumbersOrLetters: RegExp;
        onlyNumbers: RegExp;
        onlyLetters: RegExp;
    };
    static readonly Time: {
        msPerSecond: number;
        msPerMinute: number;
        msPerHour: number;
        msPerDay: number;
        msPerMonth: number;
        msPerYear: number;
    };
    static readonly ImperialUnits: {
        length: {
            inchesPerTwip: number;
            inchesPerMil: number;
            inchesPerPoint: number;
            inchesPerPica: number;
            inchesPerFoot: number;
            inchesPerYard: number;
            inchesPerMile: number;
            inchesPerLeague: number;
        };
        weight: {
            poundsPerGrain: number;
            poundsPerDram: number;
            poundsPerOunce: number;
            poundsPerShortHundredWeight: number;
            poundsPerLongHundredWeight: number;
            poundsPerShortTon: number;
            poundsPerLongTon: number;
        };
        volume: {
            gallonsPerBarrel: number;
            gallonsPerBushel: number;
            gallonsPerFluidOunce: number;
            gallonsPerPint: number;
            gallonsPerQuart: number;
            gallonsPerCup: number;
            gallonsPerTeaspoon: number;
            gallonsPerTablespoon: number;
        };
    };
    static readonly ImperialToMetric: {
        millimetersPerInch: number;
        gramsPerPound: number;
        litersPerGallon: number;
    };
    static readonly MetricToImperial: {
        inchesPerMillimeter: number;
        poundsPerGram: number;
    };
    static readonly Trivia: {
        unMemberCount: number;
        whoMemberCount: number;
        isoMemberCount: number;
    };
}
