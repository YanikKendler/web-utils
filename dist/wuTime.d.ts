export declare class wuTime {
    /**
     * Converts a timestamp to a relative time string.
     * ie. "5 minutes ago", "2 hours ago", "1 day ago", etc.
     * @param timestamp Date object, time string or timestamp in milliseconds
     */
    static toRelativeTimeString(timestamp: Date | string | number): string;
    /**
     * Converts a timestamp to a time duration string.
     * ie. "5 minutes", "2 hours", "1 day", etc.
     * @param timestamp Date object, time string or timestamp in milliseconds
     * @param precision how many different units to show 3 would be "5 minutes, 2 seconds, 1 millisecond" 1 would be "5 minutes"
     */
    static toTimeDurationString(timestamp: Date | string | number, precision?: number): string;
    /**
     * Converts a timestamp to an object with the time in different units.
     * @param timestamp Date object, time string or timestamp in milliseconds
     */
    static toTimePieces(timestamp: Date | string | number): {
        years: number;
        months: number;
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        milliseconds: number;
    };
    /**
     * Converts a timestamp to a string with date and time as numbers and a chosen separator.
     * @param timestamp Date object, time string or timestamp in milliseconds
     * @param options dateSeparator and timeSeparator
     */
    static toFullDateTimeString(timestamp: Date | string | number, options?: {
        dateSeparator: string;
        timeSeparator: string;
    }): string;
    /**
     * Converts a timestamp to a string with date as numbers and a chosen separator.
     * @param timestamp Date object, time string or timestamp in milliseconds
     * @param options dateSeparator
     */
    static toFullDateString(timestamp: Date | string | number, options?: {
        dateSeparator: string;
    }): string;
    /**
     * Converts a timestamp to a Date object.
     * assumes either a valid timestamp as a string or as the number of milliseconds since the epoch
     * @param timestamp
     */
    static anyToDate(timestamp: Date | string | number): Date;
}
