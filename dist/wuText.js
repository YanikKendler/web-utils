"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wuText = void 0;
class wuText {
    /**
     * Pads a number to a specified length with a specified character (adds to the front)
     * @param number
     * @param length default: 2
     * @param padChar default: '0'
     */
    static padNumber(number, length = 2, padChar = '0') {
        return this.padString(number.toString(), length, padChar);
    }
    /**
     * Pads a string to a specified length with a specified character
     * @param text
     * @param length default: 2
     * @param padChar default: ' '
     * @param side
     */
    static padString(text, length = 2, padChar = ' ', side = "left") {
        return side == "left" ? text.padStart(length, padChar) : text.padEnd(length, padChar);
    }
    /**
     * Rounds a number to a specified number of digits
     * @param num
     * @param digits
     */
    static roundNumber(num, digits) {
        return num.toFixed(digits);
    }
    /**
     * Truncates a string to a specified length and adds a suffix if the string is longer than the specified length
     * @param text
     * @param maxLength
     * @param suffix the string to be added if the text needs to be truncated - default: '...'
     * @param trim whether or not to remove whitespace from the end of the string - default: true
     */
    static truncateText(text, maxLength = 15, suffix = '...', trim = true) {
        if (text.length <= maxLength)
            return text;
        else if (trim)
            return text.substring(0, maxLength).trim() + suffix;
        else
            return text.substring(0, maxLength) + suffix;
    }
    /**
     * converts a number to a letter (A-Z) based on the number provided
     * numbers higher than 25 or lower than 0 will wrap around using wuText.wrapNumber
     * @example numberToLetter(0) returns 'A' and numberToLetter(25) returns 'Z'
     * @param number
     * @param fontCase
     */
    static numberToLetter(number, fontCase = "upper") {
        number = this.wrapNumber(number, 0, 25);
        const lettersUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lettersLower = 'abcdefghijklmnopqrstuvwxyz';
        return fontCase == "lower" ? lettersLower[number] : lettersUpper[number];
    }
    /**
     * Wraps a number between a min and max value
     * any number lower than minimum will start at the maximum value going backwards
     * any number higher than maximum will start at the minimum value going forwards
     * @example wrapNumber(3, 0, 2) returns 0 and wrapNumber(-1, 0, 2) returns 2
     * @param number
     * @param min
     * @param max
     */
    static wrapNumber(number, min, max) {
        let optionCount = max - min + 1;
        if (number < min) {
            let offset = (number - min) % optionCount;
            return offset == 0 ? min : max + offset + 1;
        }
        else if (number > max)
            return min + (number - min) % optionCount;
        else
            return number;
    }
    /**
     * Uppercases or Lowercases a given range of letters in a text
     * @param text String
     * @param from position
     * @param to position
     * @param fontCase "upper" or "lower"
     */
    static upperOrLowerTextRange(text, from, to, fontCase = "upper") {
        let start = text.substring(0, from);
        let middle = text.substring(from, to + 1);
        let end = text.substring(to + 1);
        if (fontCase == "upper")
            middle = middle.toUpperCase();
        else
            middle = middle.toLowerCase();
        return start + middle + end;
    }
}
exports.wuText = wuText;
