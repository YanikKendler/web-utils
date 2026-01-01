import {wuConstants} from "./wuConstants"

/**
 * Functions for working with strings in various ways
 */
export class wuText{
    /**
     * Pads a string to a specified length with a specified character
     * @param text
     * @param length default: 2
     * @param padChar default: ' '
     * @param side "default: 'left'
     */
    static pad<T extends number | string>(text: T, length: number = 2, padChar: string = ' ', side: "left" | "right" = "left"){
        let textString = String(text)
        return side == "left" ? textString.padStart(length, padChar) : textString.padEnd(length, padChar) as unknown as T
    }

    /**
     * Rounds a number to a specified number of digits
     * @param num
     * @param digits
     */
    static roundNumber(num: number, digits:number): string {
        return num.toFixed(digits);
    }

    /**
     * Clamps a number between a lower and upper bound
     * @param min
     * @param number
     * @param max
     */
    static clamp(min: number, number: number, max:number): number{
        return Math.min(Math.max(number,  min), max);
    }

    /**
     * Truncates a string to a specified length and adds a suffix if the string is longer than the specified length
     * @param text
     * @param maxLength number of characters to keep before truncating - default: 15
     * @param suffix the string to be added if the text needs to be truncated - default: '...'
     * @param trim whether or not to remove whitespace from the end of the string - default: true
     * @param buffer number of extra characters allowed before truncating that are not added to the maxLength when truncating
     *               (gets rid of truncating a single character that actually results in the longer string due to the suffix being added)
     *               - default: 2
     */
    static truncate(text: string, maxLength: number = 15, suffix: string = '...', trim: boolean = true, buffer: number = 2): string {
        if(!text) return ""
        if(text.length <= maxLength + buffer) return text
        else if(trim) return text.substring(0, maxLength).trim() + suffix
        else return text.substring(0, maxLength) + suffix
    }

    /**
     * Truncates the center of a string and adds a separator in between the pieces
     * @param text
     * @param startLength number of characters before the separator - default: 8
     * @param endLength number of characters after the separator - default: 8
     * @param separator the string to be added in the center - default: '...'
     * @param buffer number of extra characters allowed before truncating that are not added to the maxLength when truncating
     *               (gets rid of truncating a single character that actually results in the longer string due to the suffix being added)
     *               - default: 2
     * @return truncated string or null if the input text was null or empty
     */
    static truncateCenter(text: string, startLength: number = 8, endLength: number = 8, separator: string = '...', buffer: number = 2): string | null {
        if(!text) return null

        if(text.length <= startLength + endLength + buffer) return text
        return text.substring(0, startLength) + separator + text.substring(text.length - endLength, text.length)
    }

    /**
     * converts a number to a letter (A-Z) based on the number provided
     * numbers higher than 25 or lower than 0 will wrap around using wuText.wrapNumber
     * @example numberToLetter(0) returns 'A' and numberToLetter(25) returns 'Z'
     * @param number
     * @param fontCase
     * @return letter or null if the input number was undefined
     */
    static numberToLetter(number: number, fontCase: "upper" |"lower" = "upper"): string | null {
        if(number == undefined) return null

        number = this.wrapNumber(number, 0, 25)
        return fontCase == "lower" ? wuConstants.Alphabet.lower[number] : wuConstants.Alphabet.upper[number]
    }

    /**
     * Wraps a number between a min and max value
     * any number lower than minimum will start at the maximum value going backwards
     * any number higher than maximum will start at the minimum value going forwards
     * @example wrapNumber(3, 0, 2) returns 0 and wrapNumber(-1, 0, 2) returns 2
     * @param number
     * @param min
     * @param max
     * @return wrapped number or null if the input number was undefined
     */
    static wrapNumber(number: number, min: number, max: number): number | null {
        if(number == undefined) return null

        let optionCount = max - min + 1

        if(number < min) {
            let offset = (number - min) % optionCount
            return offset == 0 ? min : max + offset + 1
        }
        else if(number > max) return min + (number-min) % optionCount
        else return number
    }

    /**
     * Uppercases or Lowercases a given range of letters in a text
     * @param text String
     * @param from position
     * @param to position
     * @param fontCase "upper" or "lower"
     * @return modified string or null if the input text was null or empty
     */
    static upperOrLowerRange(text: string, from: number, to: number, fontCase: "upper" | "lower" = "upper"): string | null {
        if(!text) return null

        let start = text.substring(0, from)
        let middle = text.substring(from, to+1)
        let end = text.substring(to+1)

        if(fontCase == "upper")
            middle = middle.toUpperCase()
        else
            middle = middle.toLowerCase()

        return start + middle + end
    }

    /**
     * Converts a boolean value to "Yes" or "No"
     * @param value
     * @return "Yes" if true, "No" if false, null if undefined
     */
    static booleanToYesNo(value: boolean): string | null {
        if(!value) return null
        return value ? "Yes" : "No"
    }

    //alternative algorithm
    /*static wrapNumberRecursive(number: number, min: number, max: number): number {
        if(number < min) return this.wrapNumberRecursive(number + (max - min) + 1, min, max)
        else if(number > max) return this.wrapNumberRecursive(min + (number % max) -1, min, max)
        else return number
    }*/
}