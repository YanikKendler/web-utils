export class wuConstants{
    static readonly Regex = {
        anyThingButNumbers: /\D/,
        empty: /^\s*$/,
        onlySpecialChars: /^[^a-zA-Z0-9]*$/,
        onlyNumbersOrLetters: /^[a-zA-Z0-9]*$/,
        onlyNumbers: /^[0-9]*$/,
        onlyLetters: /^[a-zA-Z]*$/,
        email: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/
    }

    static readonly Time = {
        msPerSecond: 1000,
        msPerMinute: 1000 * 60,
        msPerHour:   1000 * 60 * 60,
        msPerDay:    1000 * 60 * 60 * 24,
        msPerMonth:  1000 * 60 * 60 * 24 * 30,
        msPerYear:   1000 * 60 * 60 * 24 * 30 * 12
    }

    static readonly ImperialUnits = {
        length: {
            inchesPerTwip: 1/1440,
            inchesPerMil: 1/1000,
            inchesPerPoint: 1/72,
            inchesPerPica: 1/6,
            inchesPerFoot: 12,
            inchesPerYard: 36,
            inchesPerMile: 5280,
            inchesPerLeague: 15840,
        },
        weight: {
            poundsPerGrain: 1/7000,
            poundsPerDram: 1/256,
            poundsPerOunce: 1/16,
            poundsPerShortHundredWeight: 100,
            poundsPerLongHundredWeight: 112,
            poundsPerShortTon: 2000,
            poundsPerLongTon: 2240,
        },
        volume: {
            gallonsPerBarrel: 31.5,
            gallonsPerBushel: 8,
            gallonsPerFluidOunce: 128,
            gallonsPerPint: 8,
            gallonsPerQuart: 4,
            gallonsPerCup: 16,
            gallonsPerTeaspoon: 768,
            gallonsPerTablespoon: 256,
        },
    }

    static readonly ImperialToMetric = {
        millimetersPerInch: 25.4,
        gramsPerPound: 453.59237,
        litersPerGallon: 3.78541,
    }

    static readonly MetricToImperial = {
        inchesPerMillimeter: 1/wuConstants.ImperialToMetric.millimetersPerInch,
        poundsPerGram: 1/wuConstants.ImperialToMetric.gramsPerPound,
    }

    static readonly Trivia = {
        unMemberCount: 193,
        whoMemberCount: 194,
        isoMemberCount: 249,
        octopusHeartCount: 3, // :D
        octopusBloodColor: "blue", // :DD
    }
}