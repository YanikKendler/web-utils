export declare class wuText {
    /**
     * Pads a number to a specified length with a specified character
     * @param number
     * @param length default: 2
     * @param padChar default: '0'
     */
    static padNumber(number: number, length?: number, padChar?: string): string;
    /**
     * Pads a string to a specified length with a specified character
     * @param text
     * @param length default: 2
     * @param padChar default: ' '
     */
    static padString(text: string, length?: number, padChar?: string): string;
    /**
     * Rounds a number to a specified number of digits
     * @param num
     * @param digits
     */
    static roundNumber(num: number, digits: number): string;
    /**
     * Truncates a string to a specified length and adds a suffix if the string is longer than the specified length
     * @param text
     * @param maxLength
     * @param suffix the string to be added if the text needs to be truncated - default: '...'
     * @param trim whether or not to remove whitespace from the end of the string - default: true
     */
    static truncateText(text: string, maxLength?: number, suffix?: string, trim?: boolean): string;
    /**
     * converts a number to a letter (A-Z) based on the number provided
     * numbers higher than 25 or lower than 0 will wrap around using wuText.wrapNumber
     * @example numberToLetter(0) returns 'A' and numberToLetter(25) returns 'Z'
     * @param number
     * @param fontCase
     */
    static numberToLetter(number: number, fontCase?: "upper" | "lower"): string;
    /**
     * Wraps a number between a min and max value
     * any number lower than minimum will start at the maximum value going backwards
     * any number higher than maximum will start at the minimum value going forwards
     * @example wrapNumber(3, 0, 2) returns 0 and wrapNumber(-1, 0, 2) returns 2
     * @param number
     * @param min
     * @param max
     */
    static wrapNumber(number: number, min: number, max: number): number;
    /**
     * Uppercases or Lowercases a given range of letters in a text
     * @param text String
     * @param from position
     * @param to position
     * @param fontCase "upper" or "lower"
     */
    static upperOrLowerTextRange(text: string, from: number, to: number, fontCase?: "upper" | "lower"): string;
}
