import {wuText} from "./wuText"
import {wuConstants} from "./wuConstants"

/**
 * Could be a Date object, a date string or a timestamp in milliseconds
 */
export type CouldBeDate = Date | string | number

export type DateOrDuration = "Date" | "Duration"

export interface TimePieces {
    years: number,
    months: number,
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
    milliseconds: number
}

/**
 * Functions for working with dates and times
 */
export class wuTime{
    /**
     * validates a timestamp and returns a boolean indicating validity
     * @param timestamp date object, time string or timestamp in milliseconds
     */
    static validate(timestamp: CouldBeDate){
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
    static handleInvalid(timestamp: CouldBeDate, worker: (timestamp: Date) => string, alternative: string): string{
        if(!this.validate(timestamp))
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
     * @param nullHandling whether to throw an error or set to current time if null is passed in
     */
    static anyToDate(timestamp: CouldBeDate, nullHandling: "error" | "setToNow" = "error", treatAs: DateOrDuration = "Date"): Date | null {
        if(timestamp == null) {
            if(nullHandling == "setToNow")
                return new Date();
            else
                throw new Error("timestamp is null")
        }

        let date

        if(typeof timestamp == "string") {
            date = new Date(timestamp);
        }
        else if(typeof timestamp == "number") {
            date = new Date(timestamp);
        }
        else
            date = timestamp;

        if (treatAs === "Duration") {
            const durationDate = new Date(date.valueOf());

            durationDate.setTime(durationDate.getTime() + durationDate.getTimezoneOffset() * wuConstants.Time.msPerMinute)

            durationDate.setUTCFullYear(0)

            return durationDate;
        }

        return date
    }

    /**
     * Converts a timestamp to an object with the time split into its pieces
     * If you were to add all the pieces together you would get the original timestamp
     * To get the same date expressed in different length units use toAbsoluteTimePieces
     * @param timestamp Date object, time string or timestamp in milliseconds
     * @param treatAs whether the timestamp is a date (describes a point in time) or a duration (describes a length of time)
     */
    static toSplitPieces(timestamp: CouldBeDate, treatAs: DateOrDuration = "Date"): TimePieces {
        let timeDate = this.anyToDate(timestamp, "error", treatAs)
        let timeMilliseconds = timeDate.valueOf()

        return {
            years: timeDate.getFullYear(),
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
    static toAbsolutePieces(timestamp: CouldBeDate): TimePieces {
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
     * Converts a timestamp to a time duration string.
     * i.e. "5 minutes", "2 hours", "1 day", etc.
     * @param timestamp Date object, time string or timestamp in milliseconds
     * @param precision how many different units to show 3 would be "5 minutes, 2 seconds, 1 millisecond" 1 would be "5 minutes"
     * @param separator character that is inserted between the different units
     */
    static toDurationString(timestamp: CouldBeDate, precision: 1 | 2 | 3 = 2, separator: string = ", "): string {
        const pieces = this.toSplitPieces(timestamp, "Duration")

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
     * converts a time stamp into a human-readable relative time compared to now
     * a timestamp 5 hours into the future would return "5 hours, 23 minutes from now"
     * a timestamp 5 hours in the past would return "5 hours, 23 minutes ago"
     * @param timestamp Date object, time string or timestamp in milliseconds
     * @param precision how many different units to show 3 would be "5 minutes, 2 seconds, 1 millisecond" 1 would be "5 minutes"
     * @param separator character that is inserted between the different units
     */
    static toRelativeString(timestamp: CouldBeDate, precision: 1 | 2 | 3 = 2, separator: string = ", "){
        const date = this.anyToDate(timestamp)

        if(Date.now() > date.valueOf()){ //in the past
            return this.toDurationString(this.difference(timestamp, new Date()), precision, separator) + " ago"
        }
        else{// in the future
            return this.toDurationString(this.difference(new Date(), timestamp), precision, separator) + " from now"
        }
    }

    /**
     * Converts a timestamp to a string with date and time as numbers and a chosen separator.
     * @param timestamp Date object, time string or timestamp in milliseconds
     * @param options dateSeparator and timeSeparator
     */
    static toFullDateTimeString(
        timestamp: CouldBeDate,
        options: {dateSeparator?: string, timeSeparator?: string, dateTimeSeparator?: string, showMilliseconds?: boolean} = {dateSeparator: '.', timeSeparator: ':', dateTimeSeparator: " ", showMilliseconds: false}
    ){
        return this.toFullDateString(timestamp, {dateSeparator: options.dateSeparator}) + options.dateTimeSeparator +
            this.toFullTimeString(timestamp, {timeSeparator: options.timeSeparator, showMilliseconds: options.showMilliseconds})
    }

    /**
     * Converts a timestamp to a string with date as numbers and a chosen separator.
     * @param timestamp Date object, time string or timestamp in milliseconds
     * @param options dateSeparator
     */
    static toFullDateString(timestamp: CouldBeDate, options: {dateSeparator?: string} = {dateSeparator: '.'}) {
        const dateObject = this.anyToDate(timestamp)

        return wuText.pad<number>(dateObject.getDate(),2, "0") + options.dateSeparator +
            wuText.pad<number>(dateObject.getMonth() + 1,2, "0") + options.dateSeparator +
            dateObject.getFullYear().toString().substring(2,4)
    }

    /**
     * Converts a timestamp to a string representing the time as human-readable numbers like 08:12:34
     * @param timestamp
     * @param options
     */
    static toFullTimeString(
        timestamp: CouldBeDate,
        options: {timeSeparator?: string, showMilliseconds?: boolean, treatAs?: DateOrDuration} = {}
    ) {
        const {
            timeSeparator = ":",
            showMilliseconds = false,
            treatAs = "Date"
        } = options;

        const dateObject = this.anyToDate(timestamp, "error", treatAs)

        let result = wuText.pad<number>(dateObject.getHours(), 2, "0") +
            timeSeparator + wuText.pad<number>(dateObject.getMinutes(), 2, "0")

        if(showMilliseconds)
            result += timeSeparator + wuText.pad<number>(dateObject.getMilliseconds(), 2, "0")

        return result
    }

    /**
     * Calculates the difference between two timestamps in milliseconds
     * @param timestamp1 the earlier timestamp
     * @param timestamp2 the later timestamp
     */
    static difference(timestamp1: CouldBeDate, timestamp2: CouldBeDate): number {
        const date1 = this.anyToDate(timestamp1)
        const date2 = this.anyToDate(timestamp2)

        return date2.valueOf() - date1.valueOf()
    }

    static timezoneOffset(){
        return new Date().getTimezoneOffset() * wuConstants.Time.msPerMinute;
    }
}