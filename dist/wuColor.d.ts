export type AnyColor = string | rgbColor | hslColor;
export interface rgbColor {
    r: number;
    g: number;
    b: number;
}
export interface hslColor {
    h: number;
    s: number;
    l: number;
}
/**
 * Functions for converting, manipulating and generating colors
 *
 * The class supports hex, rgb and hsl colors. For hex and rgb, interfaces are provided that represent a json with r, g, b and h, s, l respectively
 * All the functions accept the type "anyColor" which can be a string, rgbColor or hslColor and will return a rgbColor
 */
export declare class wuColor {
    /**
     * shifts the hue of a given color by a given amount
     * enter a negative number to decrease the hue
     * this function works in hsl so the maximum hue is 360 and the minimum is 0
     *
     * @param color any color
     * @param amount any number
     * @param wrap whether to wrap the hue around once the maximum is reached (361 -> 0 and -1 -> 360, -2 -> 359 etc.)
     */
    static shiftHue(color: AnyColor, amount: number, wrap?: boolean): rgbColor;
    /**
     * shifts the saturation of a given color by a given amount
     * enter a negative number to decrease the saturation
     * this function works in hsl so the maximum saturation is 100 and the minimum is 0
     *
     * @param color
     * @param amount
     * @param wrap whether to wrap the saturation around once the maximum is reached (101 -> 0 and -1 -> 100)
     */
    static shiftSaturation(color: AnyColor, amount: number, wrap?: boolean): rgbColor;
    /**
     * shifts the lightness of a given color by a given amount
     * enter a negative number to decrease the lightness
     * this function works in hsl so the maximum lightness is 100 and the minimum is 0
     *
     * @param color any color
     * @param amount any number
     * @param wrap whether to wrap the lightness around once the maximum is reached (101 -> 0 and -1 -> 100)
     */
    static shiftLightness(color: AnyColor, amount: number, wrap?: boolean): rgbColor;
    /**
     * returns black or white depending on which color would have the best contrast to the given color
     * @param color
     */
    static calculateContrastColor(color: AnyColor): rgbColor;
    /**
     * calculates the luminance of a given color this is different from the lightness in hsl as it takes into account how the human eye perceives brightness
     * @param color
     */
    static calculateLuminance(color: AnyColor): number;
    /**
     * generates a random color within the given ranges, each range is a array with a minimum and maximum value
     * if only a single value is supplied it will be used as a fixed value
     * if no value is supplied the full range will be used
     * @param hueRange
     * @param saturationRange
     * @param lightnessRange
     */
    static generateRandomColor(hueRange: number[], saturationRange: number[], lightnessRange: number[]): rgbColor;
    /**
     * Corrects the values of an hsl color to be within the valid range
     * if for example a hue would be negative or above 360 it will be corrected to be within the range
     */
    static correctHslColor(hsl: hslColor): hslColor;
    /**
     * Corrects the values of an rgb color to be within the valid range
     * if any part is below 0 or above 255 it will be corrected to be within the range
     */
    static correctRgbColor(rgb: rgbColor): rgbColor;
    /**
     * Corrects the values of a hex color to be within the valid range
     * if the color is below 000000 or above FFFFFF it will be corrected to be within the range
     * @param hex
     */
    static correctHexColor(hex: string): string;
    static anyToRgb(color: AnyColor): rgbColor;
    static hexToRgb(hex: string): rgbColor;
    static hslToRgb(hsl: hslColor): rgbColor;
    static rgbToHsl(rgb: rgbColor): hslColor;
    static rgbToHex(rgb: rgbColor): string;
    static anyToString(color: AnyColor): string;
}
