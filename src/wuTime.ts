import {wuText} from "./wuText"
import {wuConstants} from "./wuConstants"

export class wuTime{
    /**
     * Converts a timestamp to a relative time string.
     * ie. "5 minutes ago", "2 hours ago", "1 day ago", etc.
     * @param timestamp Date object, time string or timestamp in milliseconds
     */
    static toRelativeTimeString(timestamp: Date | string | number): string {
        if(timestamp == null) return "unknown";

        let timeDate = this.anyToDate(timestamp);
        let timeElapsed = new Date().valueOf() - timeDate.valueOf();

        if (timeElapsed < wuConstants.Time.msPerMinute) {
            return Math.floor(timeElapsed / 1000) + ' seconds ago';
        }
        else if (timeElapsed < wuConstants.Time.msPerHour) {
            return Math.floor(timeElapsed / wuConstants.Time.msPerMinute) + ' minutes ago';
        }
        else if (timeElapsed < wuConstants.Time.msPerDay) {
            return Math.floor(timeElapsed / wuConstants.Time.msPerHour) + ' hours ago';
        }
        else if (timeElapsed < wuConstants.Time.msPerMonth) {
            return Math.floor(timeElapsed / wuConstants.Time.msPerDay) + ' days ago';
        }
        else if (timeElapsed < wuConstants.Time.msPerYear) {
            return Math.floor(timeElapsed / wuConstants.Time.msPerMonth) + ' months ago';
        }
        else {
            return Math.floor(timeElapsed / wuConstants.Time.msPerYear) + ' years ago';
        }
    }

    /**
     * Converts a timestamp to a time duration string.
     * ie. "5 minutes", "2 hours", "1 day", etc.
     * @param timestamp Date object, time string or timestamp in milliseconds
     * @param precision how many different units to show 3 would be "5 minutes, 2 seconds, 1 millisecond" 1 would be "5 minutes"
     */
    static toTimeDurationString(timestamp: Date | string | number, precision: number = 2): string {
        if (timestamp == null) return "unknown";

        const pieces = this.toTimePieces(timestamp)

        let result: string[] = []

        if (pieces.years > 0) {
            result = [pieces.years + ' years', pieces.months + ' months', pieces.days + ' days']
        }
        else if (pieces.months > 0) {
            result = [pieces.months + ' months', pieces.days + ' days', pieces.hours + ' hours']
        }
        else if (pieces.days > 0) {
            result = [pieces.days + ' days', pieces.hours + ' hours', pieces.minutes + ' minutes']
        }
        else if (pieces.hours > 0) {
            result = [pieces.hours + ' hours', pieces.minutes + ' minutes', pieces.seconds + ' seconds']
        }
        else if (pieces.minutes > 0) {
            result = [pieces.minutes + ' minutes', pieces.seconds + ' seconds', pieces.milliseconds + ' milliseconds']
        }
        else if (pieces.seconds > 0) {
            result = [pieces.seconds + ' seconds', pieces.milliseconds + ' milliseconds', ""]
        }
        else{
            result = [pieces.milliseconds + ' milliseconds', "", ""]
        }

        return result.slice(0, precision-1).join(" ")
    }

    /**
     * Converts a timestamp to an object with the time in different units.
     * @param timestamp Date object, time string or timestamp in milliseconds
     */
    static toTimePieces(timestamp: Date | string | number) {
        let timeDate = this.anyToDate(timestamp);
        let timeMilliseconds = timeDate.valueOf();

        return {
            years: timeDate.getFullYear(),
            months: timeMilliseconds % wuConstants.Time.msPerYear / wuConstants.Time.msPerMonth,
            days: timeMilliseconds % wuConstants.Time.msPerMonth / wuConstants.Time.msPerDay,
            hours: timeDate.getHours(),
            minutes: timeDate.getMinutes(),
            seconds: timeDate.getSeconds(),
            milliseconds: timeDate.getMilliseconds()
        }
    }

    /**
     * Converts a timestamp to a string with date and time as numbers and a chosen separator.
     * @param timestamp Date object, time string or timestamp in milliseconds
     * @param options dateSeparator and timeSeparator
     */
    static toFullDateTimeString(timestamp: Date | string | number, options: {dateSeparator: string, timeSeparator: string} = {dateSeparator: '.', timeSeparator: ':'}){
        if (timestamp == null) return "unknown";

        timestamp = this.anyToDate(timestamp);

        return wuText.padNumber(timestamp.getDate()) + options.dateSeparator +
            wuText.padNumber(timestamp.getMonth() + 1) + options.dateSeparator +
            timestamp.getFullYear().toString().substring(2,4) + ' ' +

            wuText.padNumber(timestamp.getHours()) + options.timeSeparator +
            wuText.padNumber(timestamp.getMinutes())
    }

    /**
     * Converts a timestamp to a string with date as numbers and a chosen separator.
     * @param timestamp Date object, time string or timestamp in milliseconds
     * @param options dateSeparator
     */
    static toFullDateString(timestamp: Date | string | number, options: {dateSeparator: string} = {dateSeparator: '.'}) {
        if (timestamp == null) return "unknown";

        timestamp = this.anyToDate(timestamp);

        return wuText.padNumber(timestamp.getDate()) + options.dateSeparator +
            wuText.padNumber(timestamp.getMonth() + 1) + options.dateSeparator +
            timestamp.getFullYear().toString().substring(2,4)
    }

    /**
     * Converts a timestamp to a Date object.
     * assumes either a valid timestamp as a string or as the number of milliseconds since the epoch
     * @param timestamp
     */
    static anyToDate(timestamp: Date | string | number){
        if(timestamp == null) return new Date(0);
        if(typeof timestamp == "string") {
            return new Date(timestamp);
        }
        else if(typeof timestamp == "number") {
            return new Date(timestamp);
        }
        else
            return timestamp;
    }
}