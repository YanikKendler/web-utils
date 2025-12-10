# API 
 
<a name="root"></a> 
 
## Classes

<dl>
<dt><a href="#wuAnimate">wuAnimate</a></dt>
<dd><p>Functions for animating HTML DOM elements for simple UI enhancements</p>
</dd>
<dt><a href="#wuColor">wuColor</a></dt>
<dd><p>Functions for converting, manipulating and generating colors</p>
<p>The class supports hex, rgb and hsl colors. For hex and rgb, interfaces are provided that represent a json with r, g, b and h, s, l respectively
All the functions accept the type &quot;anyColor&quot; which can be a string, rgbColor or hslColor and will return a rgbColor</p>
</dd>
<dt><a href="#wuGeneral">wuGeneral</a></dt>
<dd><p>General Utility functions for various tasks</p>
</dd>
<dt><a href="#wuText">wuText</a></dt>
<dd><p>Functions for working with strings in various ways</p>
</dd>
<dt><a href="#wuTime">wuTime</a></dt>
<dd><p>Functions for working with dates and times</p>
</dd>
</dl>

<a name="wuAnimate"></a>

## wuAnimate
Functions for animating HTML DOM elements for simple UI enhancements

**Kind**: global class  

* [wuAnimate](#wuAnimate)
    * [.shake(elem, duration, shakes)](#wuAnimate.shake)
    * [.pop(elem, duration, scale)](#wuAnimate.pop)
    * [.bounce(elem, duration, maxHeight, bounceCycles)](#wuAnimate.bounce)
    * [.spin(elem, duration, spinDeg, fill)](#wuAnimate.spin)
    * [.collapse(elem, duration)](#wuAnimate.collapse)
    * [.show(elem, display, duration)](#wuAnimate.show)
    * [.hide(elem, duration)](#wuAnimate.hide)

<a name="wuAnimate.shake"></a>

### wuAnimate.shake(elem, duration, shakes)
Shakes an element left to right and rotates it slightly

**Kind**: static method of [<code>wuAnimate</code>](#wuAnimate)  

| Param | Default | Description |
| --- | --- | --- |
| elem |  |  |
| duration | <code>200</code> | how long the whole animation should take |
| shakes | <code>8</code> | how many times the element should shake |

<a name="wuAnimate.pop"></a>

### wuAnimate.pop(elem, duration, scale)
Simple pop animation that scales an element up to a given scale and back to 1

**Kind**: static method of [<code>wuAnimate</code>](#wuAnimate)  

| Param | Default | Description |
| --- | --- | --- |
| elem |  |  |
| duration | <code>200</code> | how long the whole animation should take |
| scale | <code>1.05</code> | how much the element should scale up |

<a name="wuAnimate.bounce"></a>

### wuAnimate.bounce(elem, duration, maxHeight, bounceCycles)
Bounces an element up and down a given number of times starting with the given max height and decreasing from there

**Kind**: static method of [<code>wuAnimate</code>](#wuAnimate)  

| Param | Default | Description |
| --- | --- | --- |
| elem |  |  |
| duration | <code>200</code> | how long the whole animation should take |
| maxHeight | <code>10</code> | in pixels how high the element should bounce on the first bounce |
| bounceCycles | <code>2</code> | how many times the element should bounce |

<a name="wuAnimate.spin"></a>

### wuAnimate.spin(elem, duration, spinDeg, fill)
Spins an element a given number of degrees

**Kind**: static method of [<code>wuAnimate</code>](#wuAnimate)  

| Param | Default | Description |
| --- | --- | --- |
| elem |  |  |
| duration | <code>300</code> | how long the whole animation should take |
| spinDeg | <code>720</code> | in degrees how much the element should spin |
| fill | <code>forwards</code> | css animation fill mode |

<a name="wuAnimate.collapse"></a>

### wuAnimate.collapse(elem, duration)
Collapses an element to 0 height and opacity

**Kind**: static method of [<code>wuAnimate</code>](#wuAnimate)  

| Param | Default |
| --- | --- |
| elem |  | 
| duration | <code>200</code> | 

<a name="wuAnimate.show"></a>

### wuAnimate.show(elem, display, duration)
Reveals an element by moving it up slightly and animating its opacity, then sets its display value

**Kind**: static method of [<code>wuAnimate</code>](#wuAnimate)  

| Param | Default | Description |
| --- | --- | --- |
| elem |  |  |
| display | <code>block</code> | css display value |
| duration | <code>200</code> |  |

<a name="wuAnimate.hide"></a>

### wuAnimate.hide(elem, duration)
Hides an element by moving it down slightly and animating its opacity, then sets its display value to none

**Kind**: static method of [<code>wuAnimate</code>](#wuAnimate)  

| Param | Default |
| --- | --- |
| elem |  | 
| duration | <code>200</code> | 

<a name="wuColor"></a>

## wuColor
Functions for converting, manipulating and generating colors

The class supports hex, rgb and hsl colors. For hex and rgb, interfaces are provided that represent a json with r, g, b and h, s, l respectively
All the functions accept the type "anyColor" which can be a string, rgbColor or hslColor and will return a rgbColor

**Kind**: global class  

* [wuColor](#wuColor)
    * [.shiftHue(color, amount, wrap)](#wuColor.shiftHue)
    * [.shiftSaturation(color, amount, wrap)](#wuColor.shiftSaturation)
    * [.shiftLightness(color, amount, wrap)](#wuColor.shiftLightness)
    * [.calculateContrastColor(color)](#wuColor.calculateContrastColor)
    * [.calculateLuminance(color)](#wuColor.calculateLuminance)
    * [.random(hueRange, saturationRange, lightnessRange)](#wuColor.random)
    * [.correctHslColor()](#wuColor.correctHslColor)
    * [.correctRgbColor()](#wuColor.correctRgbColor)
    * [.correctHexColor(hex)](#wuColor.correctHexColor)

<a name="wuColor.shiftHue"></a>

### wuColor.shiftHue(color, amount, wrap)
shifts the hue of a given color by a given amount
enter a negative number to decrease the hue
this function works in hsl so the maximum hue is 360 and the minimum is 0

**Kind**: static method of [<code>wuColor</code>](#wuColor)  

| Param | Default | Description |
| --- | --- | --- |
| color |  | any color |
| amount |  | any number |
| wrap | <code>false</code> | whether to wrap the hue around once the maximum is reached (361 -> 0 and -1 -> 360, -2 -> 359 etc.) |

<a name="wuColor.shiftSaturation"></a>

### wuColor.shiftSaturation(color, amount, wrap)
shifts the saturation of a given color by a given amount
enter a negative number to decrease the saturation
this function works in hsl so the maximum saturation is 100 and the minimum is 0

**Kind**: static method of [<code>wuColor</code>](#wuColor)  

| Param | Default | Description |
| --- | --- | --- |
| color |  |  |
| amount |  |  |
| wrap | <code>false</code> | whether to wrap the saturation around once the maximum is reached (101 -> 0 and -1 -> 100) |

<a name="wuColor.shiftLightness"></a>

### wuColor.shiftLightness(color, amount, wrap)
shifts the lightness of a given color by a given amount
enter a negative number to decrease the lightness
this function works in hsl so the maximum lightness is 100 and the minimum is 0

**Kind**: static method of [<code>wuColor</code>](#wuColor)  

| Param | Default | Description |
| --- | --- | --- |
| color |  | any color |
| amount |  | any number |
| wrap | <code>false</code> | whether to wrap the lightness around once the maximum is reached (101 -> 0 and -1 -> 100) |

<a name="wuColor.calculateContrastColor"></a>

### wuColor.calculateContrastColor(color)
returns black or white depending on which color would have the best contrast to the given color

**Kind**: static method of [<code>wuColor</code>](#wuColor)  

| Param |
| --- |
| color | 

<a name="wuColor.calculateLuminance"></a>

### wuColor.calculateLuminance(color)
calculates the luminance of a given color this is different from the lightness in hsl as it takes into account how the human eye perceives brightness

**Kind**: static method of [<code>wuColor</code>](#wuColor)  

| Param |
| --- |
| color | 

<a name="wuColor.random"></a>

### wuColor.random(hueRange, saturationRange, lightnessRange)
generates a random color within the given ranges, each range is a array with a minimum and maximum value
if only a single value is supplied it will be used as a fixed value
if no value is supplied the full range will be used

**Kind**: static method of [<code>wuColor</code>](#wuColor)  

| Param |
| --- |
| hueRange | 
| saturationRange | 
| lightnessRange | 

<a name="wuColor.correctHslColor"></a>

### wuColor.correctHslColor()
Corrects the values of an hsl color to be within the valid range
if for example a hue would be negative or above 360 it will be corrected to be within the range

**Kind**: static method of [<code>wuColor</code>](#wuColor)  
<a name="wuColor.correctRgbColor"></a>

### wuColor.correctRgbColor()
Corrects the values of an rgb color to be within the valid range
if any part is below 0 or above 255 it will be corrected to be within the range

**Kind**: static method of [<code>wuColor</code>](#wuColor)  
<a name="wuColor.correctHexColor"></a>

### wuColor.correctHexColor(hex)
Corrects the values of a hex color to be within the valid range
if the color is below 000000 or above FFFFFF it will be corrected to be within the range

**Kind**: static method of [<code>wuColor</code>](#wuColor)  

| Param |
| --- |
| hex | 

<a name="wuGeneral"></a>

## wuGeneral
General Utility functions for various tasks

**Kind**: global class  

* [wuGeneral](#wuGeneral)
    * [.selectText(element)](#wuGeneral.selectText)
    * [.moveCursorToEnd(element)](#wuGeneral.moveCursorToEnd)
    * [.smartHeight(elem)](#wuGeneral.smartHeight)
    * [.debounce(func, timeout)](#wuGeneral.debounce) ⇒
    * [.deepCopy(obj, strategy)](#wuGeneral.deepCopy)
    * [.onNthClick(callBack, event, n)](#wuGeneral.onNthClick)

<a name="wuGeneral.selectText"></a>

### wuGeneral.selectText(element)
selects all the text in a given element

**Kind**: static method of [<code>wuGeneral</code>](#wuGeneral)  

| Param |
| --- |
| element | 

<a name="wuGeneral.moveCursorToEnd"></a>

### wuGeneral.moveCursorToEnd(element)
moves the cursor to the end of a given elements text content

**Kind**: static method of [<code>wuGeneral</code>](#wuGeneral)  

| Param |
| --- |
| element | 

<a name="wuGeneral.smartHeight"></a>

### wuGeneral.smartHeight(elem)
returns the height of an element, taking into account the box-sizing property

**Kind**: static method of [<code>wuGeneral</code>](#wuGeneral)  

| Param | Description |
| --- | --- |
| elem | any HTMLElement defaults to the body element |

<a name="wuGeneral.debounce"></a>

### wuGeneral.debounce(func, timeout) ⇒
debounces a function - limits the rate at which a function can be called

should be used like: const debouncedFunction = wuGeneral.debounce(myFunction);
if it's debounced inside a event binding the debounce wont work since the reference will be different

**Kind**: static method of [<code>wuGeneral</code>](#wuGeneral)  
**Returns**: a debounced version of the input function  

| Param | Default | Description |
| --- | --- | --- |
| func |  | any function |
| timeout | <code>300</code> | the minimum time between function calls, all others will be ignored |

<a name="wuGeneral.deepCopy"></a>

### wuGeneral.deepCopy(obj, strategy)
creates an actual deep copy of an object - removing all references to the old object

**Kind**: static method of [<code>wuGeneral</code>](#wuGeneral)  

| Param | Default | Description |
| --- | --- | --- |
| obj |  |  |
| strategy | <code>structured</code> | whether to use json stringify and parse or the structured clone method |

<a name="wuGeneral.onNthClick"></a>

### wuGeneral.onNthClick(callBack, event, n)
Calls the callBack function after a set amount of clicks

**Kind**: static method of [<code>wuGeneral</code>](#wuGeneral)  

| Param | Default | Description |
| --- | --- | --- |
| callBack |  | the function to be called |
| event |  | the click event |
| n | <code>2</code> | number of clicks required for the callback |

<a name="wuText"></a>

## wuText
Functions for working with strings in various ways

**Kind**: global class  

* [wuText](#wuText)
    * [.pad(text, length, padChar, side)](#wuText.pad)
    * [.roundNumber(num, digits)](#wuText.roundNumber)
    * [.clamp(min, number, max)](#wuText.clamp)
    * [.truncate(text, maxLength, suffix, trim, buffer)](#wuText.truncate)
    * [.truncateCenter(text, startLength, endLength, separator, buffer)](#wuText.truncateCenter)
    * [.numberToLetter(number, fontCase)](#wuText.numberToLetter)
    * [.wrapNumber(number, min, max)](#wuText.wrapNumber)
    * [.upperOrLowerRange(text, from, to, fontCase)](#wuText.upperOrLowerRange)
    * [.booleanToYesNo(value)](#wuText.booleanToYesNo)

<a name="wuText.pad"></a>

### wuText.pad(text, length, padChar, side)
Pads a string to a specified length with a specified character

**Kind**: static method of [<code>wuText</code>](#wuText)  

| Param | Default | Description |
| --- | --- | --- |
| text |  |  |
| length | <code>2</code> | default: 2 |
| padChar | <code> </code> | default: ' ' |
| side | <code>left</code> | "default: 'left' |

<a name="wuText.roundNumber"></a>

### wuText.roundNumber(num, digits)
Rounds a number to a specified number of digits

**Kind**: static method of [<code>wuText</code>](#wuText)  

| Param |
| --- |
| num | 
| digits | 

<a name="wuText.clamp"></a>

### wuText.clamp(min, number, max)
Clamps a number between a lower and upper bound

**Kind**: static method of [<code>wuText</code>](#wuText)  

| Param |
| --- |
| min | 
| number | 
| max | 

<a name="wuText.truncate"></a>

### wuText.truncate(text, maxLength, suffix, trim, buffer)
Truncates a string to a specified length and adds a suffix if the string is longer than the specified length

**Kind**: static method of [<code>wuText</code>](#wuText)  

| Param | Default | Description |
| --- | --- | --- |
| text |  |  |
| maxLength | <code>15</code> | number of characters to keep before truncating - default: 15 |
| suffix | <code>...</code> | the string to be added if the text needs to be truncated - default: '...' |
| trim | <code>true</code> | whether or not to remove whitespace from the end of the string - default: true |
| buffer | <code>2</code> | number of extra characters allowed before truncating that are not added to the maxLength when truncating               (gets rid of truncating a single character that actually results in the longer string due to the suffix being added)               - default: 2 |

<a name="wuText.truncateCenter"></a>

### wuText.truncateCenter(text, startLength, endLength, separator, buffer)
Truncates the center of a string and adds a separator in between the pieces

**Kind**: static method of [<code>wuText</code>](#wuText)  

| Param | Default | Description |
| --- | --- | --- |
| text |  |  |
| startLength | <code>8</code> | number of characters before the separator - default: 8 |
| endLength | <code>8</code> | number of characters after the separator - default: 8 |
| separator | <code>...</code> | the string to be added in the center - default: '...' |
| buffer | <code>2</code> | number of extra characters allowed before truncating that are not added to the maxLength when truncating               (gets rid of truncating a single character that actually results in the longer string due to the suffix being added)               - default: 2 |

<a name="wuText.numberToLetter"></a>

### wuText.numberToLetter(number, fontCase)
converts a number to a letter (A-Z) based on the number provided
numbers higher than 25 or lower than 0 will wrap around using wuText.wrapNumber

**Kind**: static method of [<code>wuText</code>](#wuText)  

| Param | Default |
| --- | --- |
| number |  | 
| fontCase | <code>upper</code> | 

**Example**  
```js
numberToLetter(0) returns 'A' and numberToLetter(25) returns 'Z'
```
<a name="wuText.wrapNumber"></a>

### wuText.wrapNumber(number, min, max)
Wraps a number between a min and max value
any number lower than minimum will start at the maximum value going backwards
any number higher than maximum will start at the minimum value going forwards

**Kind**: static method of [<code>wuText</code>](#wuText)  

| Param |
| --- |
| number | 
| min | 
| max | 

**Example**  
```js
wrapNumber(3, 0, 2) returns 0 and wrapNumber(-1, 0, 2) returns 2
```
<a name="wuText.upperOrLowerRange"></a>

### wuText.upperOrLowerRange(text, from, to, fontCase)
Uppercases or Lowercases a given range of letters in a text

**Kind**: static method of [<code>wuText</code>](#wuText)  

| Param | Default | Description |
| --- | --- | --- |
| text |  | String |
| from |  | position |
| to |  | position |
| fontCase | <code>upper</code> | "upper" or "lower" |

<a name="wuText.booleanToYesNo"></a>

### wuText.booleanToYesNo(value)
Converts a boolean value to "Yes" or "No"

**Kind**: static method of [<code>wuText</code>](#wuText)  

| Param |
| --- |
| value | 

<a name="wuTime"></a>

## wuTime
Functions for working with dates and times

**Kind**: global class  

* [wuTime](#wuTime)
    * [.validate(timestamp)](#wuTime.validate)
    * [.handleInvalid(timestamp, worker, alternative)](#wuTime.handleInvalid)
    * [.anyToDate(timestamp, nullHandling)](#wuTime.anyToDate)
    * [.toSplitPieces(timestamp)](#wuTime.toSplitPieces)
    * [.toRelativeString(timestamp, precision, separator)](#wuTime.toRelativeString)
    * [.toFullDateTimeString(timestamp, options)](#wuTime.toFullDateTimeString)
    * [.toFullDateString(timestamp, options)](#wuTime.toFullDateString)
    * [.toFullTimeString(timestamp, options)](#wuTime.toFullTimeString)
    * [.difference(timestamp1, timestamp2)](#wuTime.difference)

<a name="wuTime.validate"></a>

### wuTime.validate(timestamp)
validates a timestamp and returns a boolean indicating validity

**Kind**: static method of [<code>wuTime</code>](#wuTime)  

| Param | Description |
| --- | --- |
| timestamp | date object, time string or timestamp in milliseconds |

<a name="wuTime.handleInvalid"></a>

### wuTime.handleInvalid(timestamp, worker, alternative)
Validates a timestamp and returns an alternative string value if invalid
otherwise runs a worker function with the valid Date object

**Kind**: static method of [<code>wuTime</code>](#wuTime)  

| Param | Description |
| --- | --- |
| timestamp | date object, time string or timestamp in milliseconds |
| worker | function to run if the timestamp is valid |
| alternative | string to return if the timestamp is invalid |

<a name="wuTime.anyToDate"></a>

### wuTime.anyToDate(timestamp, nullHandling)
Converts a timestamp to a Date object.
assumes either a valid timestamp as a string or as the number of milliseconds since the epoch

**Kind**: static method of [<code>wuTime</code>](#wuTime)  

| Param | Default | Description |
| --- | --- | --- |
| timestamp |  | date object, time string or timestamp in milliseconds |
| nullHandling | <code>error</code> | whether to throw an error or set to current time if null is passed in |

<a name="wuTime.toSplitPieces"></a>

### wuTime.toSplitPieces(timestamp)
Converts a timestamp to an object with the time split into its pieces
If you were to add all the pieces together you would get the original timestamp
To get the same date expressed in different length units use toAbsoluteTimePieces

**Kind**: static method of [<code>wuTime</code>](#wuTime)  

| Param | Description |
| --- | --- |
| timestamp | Date object, time string or timestamp in milliseconds |

<a name="wuTime.toRelativeString"></a>

### wuTime.toRelativeString(timestamp, precision, separator)
converts a time stamp into a human-readable relative time compared to now
a timestamp 5 hours into the future would return "5 hours, 23 minutes from now"
a timestamp 5 hours in the past would return "5 hours, 23 minutes ago"

**Kind**: static method of [<code>wuTime</code>](#wuTime)  

| Param | Default | Description |
| --- | --- | --- |
| timestamp |  | Date object, time string or timestamp in milliseconds |
| precision | <code>2</code> | how many different units to show 3 would be "5 minutes, 2 seconds, 1 millisecond" 1 would be "5 minutes" |
| separator | <code>, </code> | character that is inserted between the different units |

<a name="wuTime.toFullDateTimeString"></a>

### wuTime.toFullDateTimeString(timestamp, options)
Converts a timestamp to a string with date and time as numbers and a chosen separator.

**Kind**: static method of [<code>wuTime</code>](#wuTime)  

| Param | Description |
| --- | --- |
| timestamp | Date object, time string or timestamp in milliseconds |
| options | dateSeparator and timeSeparator |

<a name="wuTime.toFullDateString"></a>

### wuTime.toFullDateString(timestamp, options)
Converts a timestamp to a string with date as numbers and a chosen separator.

**Kind**: static method of [<code>wuTime</code>](#wuTime)  

| Param | Description |
| --- | --- |
| timestamp | Date object, time string or timestamp in milliseconds |
| options | dateSeparator |

<a name="wuTime.toFullTimeString"></a>

### wuTime.toFullTimeString(timestamp, options)
Converts a timestamp to a string representing the time as human-readable numbers like 08:12:34

**Kind**: static method of [<code>wuTime</code>](#wuTime)  

| Param |
| --- |
| timestamp | 
| options | 

<a name="wuTime.difference"></a>

### wuTime.difference(timestamp1, timestamp2)
Calculates the difference between two timestamps in milliseconds

**Kind**: static method of [<code>wuTime</code>](#wuTime)  

| Param | Description |
| --- | --- |
| timestamp1 | the earlier timestamp |
| timestamp2 | the later timestamp |

