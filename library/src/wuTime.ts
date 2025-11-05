import {wuText} from "./wuText"
import {wuConstants} from "./wuConstants"

export type CouldBeDate = Date | string | number

export interface TimePieces {
    years: number,
    months: number,
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
    milliseconds: number
}

export class wuTime{
    /**
     * validates a timestamp and returns a boolean indicating validity
     * @param timestamp date object, time string or timestamp in milliseconds
     */
    static validateTimestamp(timestamp: CouldBeDate){
        try{
            if(this.anyToDate(timestamp) as unknown as string == "Invalid Date")
                return false
        }
        catch (e) {
            return false
        }
        return true
    }

    /**
     * Validates a timestamp and returns an alternative string value if invalid
     * otherwise runs a worker function with the valid Date object
     * @param timestamp date object, time string or timestamp in milliseconds
     * @param worker function to run if the timestamp is valid
     * @param alternative string to return if the timestamp is invalid
     */
    static handleInvalidTimestamp(timestamp: CouldBeDate, worker: (timestamp: Date) => string, alternative: string): string{
        if(!this.validateTimestamp(timestamp))
            return alternative
        else{
            const dateObj = this.anyToDate(timestamp)
            return worker(dateObj)
        }
    }

    /**
     * Converts a timestamp to a Date object.
     * assumes either a valid timestamp as a string or as the number of milliseconds since the epoch
     * @param timestamp date object, time string or timestamp in milliseconds
     */
    static anyToDate(timestamp: CouldBeDate): Date | null {
        if(timestamp == null) {
            throw new Error("timestamp is null")
        }

        if(typeof timestamp == "string") {
            return new Date(timestamp);
        }
        else if(typeof timestamp == "number") {
            return new Date(timestamp);
        }
        else
            return timestamp;
    }


    /**
     * @deprecated use toSplitTimePieces or toAbsoluteTimePieces instead (this function maps to toSplitTimePieces)
     */
    static toTimePieces(timestamp: CouldBeDate): TimePieces {
        return this.toSplitTimePieces(timestamp)
    }

    /**
     * Converts a timestamp to an object with the time split into its pieces
     * If you were to add all the pieces together you would get the original timestamp
     * To get the same date expressed in different length units use toAbsoluteTimePieces
     * @param timestamp Date object, time string or timestamp in milliseconds
     * @param treatAs whether the timestamp is a date (describes a point in time) or a duration (describes a length of time)
     */
    static toSplitTimePieces(timestamp: CouldBeDate, treatAs: "Date" | "Duration" = "Date"): TimePieces {
        let timeDate = this.anyToDate(timestamp)
        let timeMilliseconds = timeDate.valueOf()

        //TODO getfullyear is problematic since it doesnt work for a date that is used as a counter
        return {
            years: treatAs == "Date" ? timeDate.getFullYear() : timeDate.getFullYear() - 1970,
            months: Math.floor(timeMilliseconds % wuConstants.Time.msPerYear / wuConstants.Time.msPerMonth),
            days: Math.floor(timeMilliseconds % wuConstants.Time.msPerMonth / wuConstants.Time.msPerDay),
            hours: timeDate.getHours(),
            minutes: timeDate.getMinutes(),
            seconds: timeDate.getSeconds(),
            milliseconds: timeDate.getMilliseconds()
        }
    }

    /**
     * Converts a timestamp to an object with the time expressed in different length units
     * Each piece represents the input timestamp expressed in a different length unit
     * To get the time split into its pieces use toSplitTimePieces
     * WARNING: this function treats every value as a "duration" and not a "date" so years are always counted from 1970
     * passing in a date in the year 2025 will return 56 years
     * @param timestamp
     */
    static toAbsoluteTimePieces(timestamp: CouldBeDate): TimePieces {
        let timeDate = this.anyToDate(timestamp)
        let timeMilliseconds = timeDate.valueOf()

        return {
            years: timeMilliseconds / wuConstants.Time.msPerYear,
            months: timeMilliseconds / wuConstants.Time.msPerMonth,
            days: timeMilliseconds / wuConstants.Time.msPerDay,
            hours: timeMilliseconds / wuConstants.Time.msPerHour,
            minutes: timeMilliseconds / wuConstants.Time.msPerMinute,
            seconds: timeMilliseconds / wuConstants.Time.msPerSecond,
            milliseconds: timeMilliseconds
        }
    }

    /**
     * Converts a timestamp to a relative time string.
     * @deprecated use toTimeDurationString instead (maps to the exact same function)
    */
    static toRelativeTimeString(timestamp: CouldBeDate): string {
        return this.toTimeDurationString(timestamp) + " ago"
    }

    /**
     * Converts a timestamp to a time duration string.
     * i.e. "5 minutes", "2 hours", "1 day", etc.
     * @param timestamp Date object, time string or timestamp in milliseconds
     * @param precision how many different units to show 3 would be "5 minutes, 2 seconds, 1 millisecond" 1 would be "5 minutes"
     */
    static toTimeDurationString(timestamp: CouldBeDate, precision: 1 | 2 | 3 = 2): string {
        const timeDate = this.anyToDate(timestamp)
        const timeElapsed = new Date().valueOf() - timeDate.valueOf()
        const pieces = this.toSplitTimePieces(timestamp, "Duration")

        let result: string[]

        if (timeElapsed > wuConstants.Time.msPerYear) {
            result = [pieces.years + ' year(s)', pieces.months + ' month(s)', pieces.days + 'day(s)']
        }
        else if (timeElapsed > wuConstants.Time.msPerMonth) {
            result = [pieces.months + ' month(s)', pieces.days + ' day(s)', pieces.hours + ' hour(s)']
        }
        else if (timeElapsed > wuConstants.Time.msPerDay) {
            result = [pieces.days + ' day(s)', pieces.hours + ' hour(s)', pieces.minutes + ' minute(s)']
        }
        else if (timeElapsed > wuConstants.Time.msPerHour) {
            result = [pieces.hours + ' hour(s)', pieces.minutes + ' minute(s)', pieces.seconds + ' second(s)']
        }
        else if (timeElapsed > wuConstants.Time.msPerMinute) {
            result = [pieces.minutes + ' minute(s)', pieces.seconds + ' second(s)', pieces.milliseconds + ' millisecond(s)']
        }
        else if (timeElapsed > wuConstants.Time.msPerSecond) {
            result = [pieces.seconds + ' second(s)', pieces.milliseconds + ' millisecond(s)', ""]
        }
        else{
            result = [pieces.milliseconds + ' milliseconds', "", ""]
        }

        return result.slice(0, precision-1).join(" ")
    }

    /**
     * Converts a timestamp to a string with date and time as numbers and a chosen separator.
     * @param timestamp Date object, time string or timestamp in milliseconds
     * @param options dateSeparator and timeSeparator
     */
    static toFullDateTimeString(
        timestamp: CouldBeDate,
        options: {dateSeparator: string, timeSeparator: string, showMilliseconds: boolean} = {dateSeparator: '.', timeSeparator: ':', showMilliseconds: false}
    ){
        return this.toFullDateString(timestamp) + ' ' + this.toFullTimeString(timestamp)
    }

    /**
     * Converts a timestamp to a string with date as numbers and a chosen separator.
     * @param timestamp Date object, time string or timestamp in milliseconds
     * @param options dateSeparator
     */
    static toFullDateString(timestamp: CouldBeDate, options: {dateSeparator: string} = {dateSeparator: '.'}) {
        const dateObject = this.anyToDate(timestamp)

        return wuText.pad<number>(dateObject.getDate()) + options.dateSeparator +
            wuText.pad<number>(dateObject.getMonth() + 1) + options.dateSeparator +
            dateObject.getFullYear().toString().substring(2,4)
    }

    static toFullTimeString(timestamp: CouldBeDate, options: {timeSeparator: string, showMilliseconds: boolean} = {timeSeparator: ':', showMilliseconds: false}) {
        const dateObject = this.anyToDate(timestamp)

        let result = wuText.pad<number>(dateObject.getHours()) + options.timeSeparator + wuText.pad<number>(dateObject.getMinutes())

        if(options.showMilliseconds)
            result += options.timeSeparator + wuText.pad<number>(dateObject.getMilliseconds())

        return result
    }
}