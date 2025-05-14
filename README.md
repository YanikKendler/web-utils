# web-utils
A collection of utility classes and functions I have written over the years of creating websites. Now bundled together.

These cannot and are not indented to replace libraries specific to one task like time management or advanced color conversion. The web-utils library aims to provide simple solutions for common and simple tasks in a web project without needing to use many different more complex libraries.

All Methods have a JSDOC comment above them, so you can use the IDE to see what they do and how to use them.

To use the library, simply import the class you need and use the static methods provided.

```typescript
import { wuColor } from 'web-utils';

let accentColor = wuColor.generateRandomColor()
```

If you find a bug please open an issue on the GitHub repository. If you have a feature request, please open an issue or implement it yourself and create a pull request.

## wuGeneral

General utility functions for common tasks.

### Utility Functions

- `selectText(element: HTMLElement)`: Selects all the text in a given element.
- `moveCursorToEnd(element: HTMLElement)`: Moves the cursor to the end of a given element's text content.
- `smartHeight(elem: HTMLElement = document.querySelector("body"))`: Returns the height of an element, taking into account the box-sizing property.
- `debounce(func: Function, timeout = 300)`: Debounces a function, limiting the rate at which it can be called.
- `deepCopy(obj: any)`: Creates an actual deep copy of an object.
- `onNthClick(callBack: Function, event: MouseEvent, n: number = 2)`: Calls the callBack function after a set amount of clicks.

## wuColor

Functions for converting, manipulating and generating colors

The class supports hex, rgb and hsl colors. For hex and rgb, interfaces are provided that represent a json with r, g, b and h, s, l respectively.
All the functions accept the type `AnyColor` which can be a string, rgbColor or hslColor and will usually return a rgbColor.

### manipulate color

- `shiftHue(color: AnyColor, amount: number, wrap: boolean = false): rgbColor`
- `shiftSaturation(color: AnyColor, amount: number, wrap: boolean) = false: rgbColor`
- `shiftLightness(color: AnyColor, amount: number, wrap: boolean = false): rgbColor`
- `correctHslColor(hsl: hslColor): hslColor`: Corrects the given numbers in the input to the valid hsl range.
- `correctRgbColor(rgb: rgbColor): rgbColor`: Corrects the given numbers in the input to the valid rgb range.
- `correctHexColor(hex: string): string`: Corrects the given input to a valid hex value.
- `calculateLuminance(color: AnyColor): number`: Calculates the luminance of a color based on human perceived brightness.

### generate color

- `generateRandomColor(hueRange: number[], saturationRange: number[], lightnessRange: number[]): rgbColor`
- `calculateContrastColor(color: AnyColor): rgbColor`

### convert color

- `anyToRgb(color: AnyColor): rgbColor`
- `hexToRgb(hex: string): rgbColor`
- `hslToRgb(hsl: hslColor): rgbColor`
- `rgbToHex(rgb: rgbColor): string`
- `rgbToHSL(rgb: rgbColor): hslColor`
- `anyToString(color: AnyColor):string`

## wuAnimate

Functions for simple animations on HTML elements.

### Animation Functions

- `shake(elem: HTMLElement, duration: number = 200, shakes: number = 8)`: Shakes an element left to right and rotates it slightly.
- `pop(elem: HTMLElement, duration: number = 200, scale: number = 1.05)`: Simple pop animation that scales an element up to a given scale and back to 1.
- `bounce(elem: HTMLElement, duration: number = 200, maxHeight: number = 10, bounceCycles: number = 2)`: Bounces an element up and down a given number of times.
- `spin(elem: HTMLElement, duration: number = 300, spinDeg: number = 720, fill: FillMode = "forwards")`: Spins an element a given number of degrees.
- `collapse(elem: HTMLElement, duration: number = 200)`: Collapses an element to 0 height and opacity.
- `show(elem: HTMLElement, display: string = "block", duration: number = 200)`: Reveals an element by moving it up slightly and animating its opacity.
- `hide(elem: HTMLElement, duration: number = 200)`: Hides an element by moving it down slightly and animating its opacity.

## wuText

Functions for manipulating text.

### Text Manipulation Functions

- `padNumber(number: number, length: number = 2, padChar: string = '0')`: Pads a number to a specified length with a specified character.
- `padString(text: string, length: number = 2, padChar: string = ' ', side: "left" | "right" = "left")`: Pads a string to a specified length with a specified character.
- `roundNumber(num: number, digits:number)`: Rounds a number to a specified number of digits.
- `truncateText(text: string, maxLength: number = 15, suffix: string = '...', trim: boolean = true)`: Truncates a string to a specified length and adds a suffix.
- `numberToLetter(number: number, fontCase: "upper" |"lower" = "upper")`: Converts a number to a letter (A-Z or a-z).
- `wrapNumber(number: number, min: number, max: number)`: Wraps a number between a min and max value.
- `upperOrLowerTextRange(text: string, from: number, to: number, fontCase: "upper" | "lower" = "upper")`: Uppercases or Lowercases a given range of letters in a text.

## wuTime

Functions for converting and formatting timestamps.

A `TimePieces` interface is provided

### Time and Date Functions

- `anyToDate(timestamp: Date | string | number)`: Converts a Date object, string timestamp or timestamp as milliseconds to a Date object.
- `toTimePieces(timestamp: Date | string | number): TimePieces`: Converts a timestamp to an object with the time in different units.
- `toRelativeTimeString(timestamp: Date | string | number)`: Converts a timestamp to a relative time string (e.g., "5 minutes ago").
- `toTimeDurationString(timestamp: Date | string | number, precision: number = 2)`: Converts a timestamp to a time duration string (e.g., "5 minutes").
- `toFullDateTimeString(timestamp: Date | string | number, options: {dateSeparator: string, timeSeparator: string} = {dateSeparator: '.', timeSeparator: ':'})`: Converts a timestamp to a string with date and time as numbers.
- `toFullDateString(timestamp: Date | string | number, options: {dateSeparator: string} = {dateSeparator: '.'})`: Converts a timestamp to a string with date as numbers.

## wuConstants

A collection of constants that might prove useful in a web project, these will be added to over time as I encounter them.

- `Regex`: A collection of regex patterns for common tasks.
  - `anyThingButNumbers`
  - `empty`
  - `onlySpecialChars`
  - `onlyNumbersOrLetters`
  - `onlyNumbers`
  - `onlyLetters`
  - `email`
- `Time`: constants for time unit conversions.
- `ImperialUnits`: constants for imperial unit conversions.
- `ImperialToMetric`: constants for converting between imperial and metric units.
- `MetricToImperial`: constants for converting between metric and imperial units.
- `Trivia`: arbitrary trivia facts.