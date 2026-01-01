import {
    CouldBeDate,
    DateStringOptions,
    DateTimeStringOptions,
    RelativeStringOptions,
    TimePieces,
    TimeStringOptions
} from "./wuTime"
import {wuConstants} from "./wuConstants"
import {wuText} from "./wuText"

export interface DurationStringOptions {
    precision: 1 | 2 | 3,
    separator: string
}

export class wuDuration {
    /**
     * Converts a duration to an object with the time split into its pieces
     * If you were to add all the pieces together you would get the original duration
     * To get the same date expressed in different length units use toAbsoluteTimePieces
     * @param duration Date object, time string or duration in milliseconds
     */
    static toSplitPieces(duration: number): TimePieces {
        let years = duration / wuConstants.Time.msPerYear
        let months = duration % wuConstants.Time.msPerYear / wuConstants.Time.msPerMonth
        let days = duration % wuConstants.Time.msPerMonth / wuConstants.Time.msPerDay
        let hours = duration % wuConstants.Time.msPerDay / wuConstants.Time.msPerHour
        let minutes = duration % wuConstants.Time.msPerHour / wuConstants.Time.msPerMinute
        let seconds = duration % wuConstants.Time.msPerMinute / wuConstants.Time.msPerSecond
        let milliseconds = duration % wuConstants.Time.msPerSecond

        return {
            years: Math.floor(years),
            months: Math.floor(months),
            days: Math.floor(days),
            hours: Math.floor(hours),
            minutes: Math.floor(minutes),
            seconds: Math.floor(seconds),
            milliseconds: Math.floor(milliseconds)
        }
    }

    /**
     * Converts a duration to an object with the time expressed in different length units
     * Each piece represents the input duration expressed in a different length unit
     * To get the time split into its pieces use toSplitTimePieces
     * @param duration
     */
    static toAbsolutePieces(duration: number): TimePieces {
        return {
            years: duration / wuConstants.Time.msPerYear,
            months: duration / wuConstants.Time.msPerMonth,
            days: duration / wuConstants.Time.msPerDay,
            hours: duration / wuConstants.Time.msPerHour,
            minutes: duration / wuConstants.Time.msPerMinute,
            seconds: duration / wuConstants.Time.msPerSecond,
            milliseconds: duration
        }
    }

    /**
     * Converts a duration to a time duration string.
     * i.e. "5 minutes", "2 hours", "1 day", etc.
     * @param duration Date object, time string or duration in milliseconds
     * @param options precision and separator
     */
    static toDurationString(duration: number, options: DurationStringOptions): string {
        const {
            precision = 2,
            separator = ", "
        } = options;

        const pieces = this.toSplitPieces(duration)

        let result: string[]

        if (pieces.years > 1) {
            result = [pieces.years + ' year(s)', pieces.months + ' month(s)', pieces.days + 'day(s)']
        }
        else if (pieces.months > 0) {
            result = [pieces.months + ' month(s)', pieces.days + ' day(s)', pieces.hours + ' hour(s)']
        }
        else if (pieces.days > 0) {
            result = [pieces.days + ' day(s)', pieces.hours + ' hour(s)', pieces.minutes + ' minute(s)']
        }
        else if (pieces.hours > 0) {
            result = [pieces.hours + ' hour(s)', pieces.minutes + ' minute(s)', pieces.seconds + ' second(s)']
        }
        else if (pieces.minutes > 0) {
            result = [pieces.minutes + ' minute(s)', pieces.seconds + ' second(s)', pieces.milliseconds + ' millisecond(s)']
        }
        else if (pieces.seconds > 0) {
            result = [pieces.seconds + ' second(s)', pieces.milliseconds + ' millisecond(s)', ""]
        }
        else{
            result = [pieces.milliseconds + ' milliseconds', "", ""]
        }

        return result.slice(0, precision).join(separator)
    }

    /**
     * Converts a duration to a string with date and time as numbers and a chosen separator.
     * @param duration Date object, time string or duration in milliseconds
     * @param options dateSeparator and timeSeparator
     */
    static toDateTimeString(
        duration: number,
        options: DateTimeStringOptions = {}
    ){
        const {dateTimeSeparator = " "} = options

        return this.toDateString(duration, {dateSeparator: options.dateSeparator, yearDigits: options.yearDigits})
            + dateTimeSeparator +
            this.toTimeString(duration, {timeSeparator: options.timeSeparator, showMilliseconds: options.showMilliseconds})
    }

    /**
     * Converts a duration to a string with date as numbers and a chosen separator.
     * @param duration Date object, time string or duration in milliseconds
     * @param options dateSeparator
     */
    static toDateString(
        duration: number,
        options: DateStringOptions = {}
    ) {
        const {
            dateSeparator = '.',
            yearDigits = 2
        } = options

        const pieces = this.toSplitPieces(duration)

        let years = pieces.years.toString()

        if(yearDigits == 2 && years.length > 2)
            years = years.substring(2,4)

        return wuText.pad<number>(pieces.days,2, "0") + dateSeparator +
            wuText.pad<number>(pieces.months + 1,2, "0") + dateSeparator +
            wuText.pad<string>(years, 2, "0")

    }

    /**
     * Converts a duration to a string representing the time as human-readable numbers like 08:12:34
     * @param duration
     * @param options
     */
    static toTimeString(
        duration: number,
        options: TimeStringOptions = {}
    ) {
        const {
            timeSeparator = ":",
            showMilliseconds = false,
        } = options

        const pieces = this.toSplitPieces(duration)

        let result = wuText.pad<number>(pieces.hours, 2, "0") +
            timeSeparator + wuText.pad<number>(pieces.minutes, 2, "0")

        if(showMilliseconds)
            result += timeSeparator + wuText.pad<number>(pieces.seconds, 2, "0")

        return result
    }

    /**
     * Calculates the difference between two durations in milliseconds
     * @param duration1 the earlier duration
     * @param duration2 the later duration
     */
    static difference(duration1: number, duration2: number): number {
        return duration2 - duration1;
    }
}