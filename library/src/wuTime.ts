import {wuText} from "./wuText"
import {wuConstants} from "./wuConstants"
import {wuDuration} from "./wuDuration"

/**
 * Could be a Date object, a date string or a timestamp in milliseconds
 */
export type CouldBeDate = Date | string | number
export type CouldBeDateOrNull = Date | string | number | null | undefined

export interface TimePieces {
    years: number,
    months: number,
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
    milliseconds: number
}

export interface RelativeStringOptions {
    precision?: 1 | 2 | 3,
    separator?: string
}

export interface DateStringOptions {
    dateSeparator?: string,
    yearDigits?: 2 | 4
}

export interface TimeStringOptions {
    timeSeparator?: string,
    showMilliseconds?: boolean
}

export interface DateTimeStringOptions extends DateStringOptions, TimeStringOptions{
    dateTimeSeparator?: string
}

/**
 * Functions for working with dates and times
 */
export class wuTime{
    /**
     * Validates a timestamp and returns an alternative string value if invalid
     * otherwise runs a worker function with the valid Date object
     * @param timestamp date object, time string or timestamp in milliseconds
     * @param worker function to run if the timestamp is valid
     * @param alternative string to return if the timestamp is invalid
     * @returns either the alternative or the result of the worker function
     */
    static handleInvalid(timestamp: CouldBeDateOrNull, worker: (timestamp: Date) => string, alternative: string): string{
        const date = this.anyToDate(timestamp)

        if(!date)
            return alternative

        return worker(date)
    }

    /**
     * Converts a timestamp to a Date object.
     * assumes either a valid timestamp as a string or as the number of milliseconds since the epoch
     * @param timestamp date object, time string or timestamp in milliseconds
     * @returns Date object or null if the timestamp is invalid
     */
    static anyToDate(timestamp: CouldBeDateOrNull): Date | null {
        if (timestamp === null || timestamp === undefined) {
            return null;
        }

        // If it's already a Date object, just return it
        if (timestamp instanceof Date) {
            return isNaN(timestamp.getTime()) ? null : timestamp;
        }

        // Attempt to construct a new date from string or number
        const date = new Date(timestamp);

        // Check if the resulting date is actually valid
        return isNaN(date.getTime()) ? null : date;
    }

    /**
     * Converts a timestamp to an object with the time split into its pieces
     * If you were to add all the pieces together you would get the original timestamp
     * To get the same date expressed in different length units use toAbsoluteTimePieces
     * @param timestamp Date object, time string or timestamp in milliseconds
     * @returns TimePieces object or null if the timestamp is invalid
     */
    static toSplitPieces(timestamp: CouldBeDateOrNull): TimePieces | null {
        let date = this.anyToDate(timestamp)

        if(!date)
            return null

        return {
            years: date.getFullYear(),
            months: date.getMonth() + 1,
            days: date.getDate(),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
            milliseconds: date.getMilliseconds()
        }
    }

    /**
     * converts a time stamp into a human-readable relative time compared to now
     * a timestamp 5 hours into the future would return "5 hours, 23 minutes from now"
     * a timestamp 5 hours in the past would return "5 hours, 23 minutes ago"
     * @param timestamp Date object, time string or timestamp in milliseconds
     * @param options precision and separator
     * @returns result string or null if the timestamp is invalid
     */
    static toRelativeString(
        timestamp: CouldBeDateOrNull,
        options: RelativeStringOptions = {}
    ): string | null {
        const date = this.anyToDate(timestamp)

        if(!date)
            return null

        const {
            precision = 2,
            separator = ", "
        } = options;


        if(Date.now() > date.valueOf()){ //in the past
            return wuDuration.toDurationString(this.difference(timestamp, new Date()), {precision, separator}) + " ago"
        }
        else{// in the future
            return wuDuration.toDurationString(this.difference(new Date(), timestamp), {precision, separator}) + " from now"
        }
    }

    /**
     * Converts a timestamp to a string with date and time as numbers and a chosen separator.
     * @param timestamp Date object, time string or timestamp in milliseconds
     * @param options dateSeparator and timeSeparator
     * @return result string or null if the timestamp is invalid
     */
    static toDateTimeString(
        timestamp: CouldBeDateOrNull,
        options: DateTimeStringOptions = {}
    ): string | null{
        if(!this.anyToDate(timestamp))
            return null

        const {dateTimeSeparator = " "} = options

        return this.toDateString(timestamp, {dateSeparator: options.dateSeparator, yearDigits: options.yearDigits})
            + dateTimeSeparator +
            this.toTimeString(timestamp, {timeSeparator: options.timeSeparator, showMilliseconds: options.showMilliseconds})
    }

    /**
     * Converts a timestamp to a string with date as numbers and a chosen separator.
     * @param timestamp Date object, time string or timestamp in milliseconds
     * @param options dateSeparator
     * @return result string or null if the timestamp is invalid
     */
    static toDateString(
        timestamp: CouldBeDateOrNull,
        options:  DateStringOptions = {}
    ): string | null {
        const date = this.anyToDate(timestamp)

        if(!date)
            return null

        const {
            dateSeparator = '.',
            yearDigits = 2
        } = options

        let years = date.getFullYear().toString()

        if(yearDigits == 2 && years.length > 2)
            years = years.substring(2,4)

        return wuText.pad<number>(date.getDate(),2, "0") + dateSeparator +
            wuText.pad<number>(date.getMonth() + 1,2, "0") + dateSeparator +
            wuText.pad<string>(years, 2, "0")
    }

    /**
     * Converts a timestamp to a string representing the time as human-readable numbers like 08:12:34
     * @param timestamp
     * @param options
     * @return result string or null if the timestamp is invalid
     */
    static toTimeString(
        timestamp: CouldBeDateOrNull,
        options: TimeStringOptions = {}
    ): string | null {
        const dateObject = this.anyToDate(timestamp)

        if(!dateObject)
            return null

        const {
            timeSeparator = ":",
            showMilliseconds = false
        } = options


        let result = wuText.pad<number>(dateObject.getHours(), 2, "0") +
            timeSeparator + wuText.pad<number>(dateObject.getMinutes(), 2, "0")

        if(showMilliseconds)
            result += timeSeparator + wuText.pad<number>(dateObject.getSeconds(), 2, "0")

        return result
    }

    /**
     * Calculates the difference between two timestamps in milliseconds
     * @param timestamp1 the earlier timestamp
     * @param timestamp2 the later timestamp
     * @return difference in milliseconds or null if either timestamp is invalid
     */
    static difference(
        timestamp1: CouldBeDateOrNull,
        timestamp2: CouldBeDateOrNull
    ): number | null{
        const date1 = this.anyToDate(timestamp1)
        const date2 = this.anyToDate(timestamp2)

        if(!date1 || !date2)
            return null

        return date2.valueOf() - date1.valueOf()
    }

    static timezoneOffset(){
        return new Date().getTimezoneOffset() * wuConstants.Time.msPerMinute;
    }
}