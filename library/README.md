# web-utils
A collection of utility classes and functions I have written over the years of creating websites. Now bundled together.

These cannot and are not indented to replace libraries specific to one task like time management or advanced color conversion. The web-utils library aims to provide simple solutions for common and simple tasks in a web project without needing to use many different more complex libraries.

1. every method is JSDOC documented
2. fully typed with TypeScript
3. no dependencies
4. small size (55kb unpacked)
5. open source

If you find a bug please open an issue on the GitHub repository. If you have a feature request, please open an issue or implement it yourself and create a pull request.

## Usage

Install via npm

```bash
npm install @yanikkendler/web-utils
```

Import the class you need and use the static methods provided.

```typescript
import { wuColor } from '@yanikkendler/web-utils';

const accentColor = wuColor.random()
```

## Overview

Available utility classes:

- wuGeneral: General utility functions like debouncing a function or interacting with the DOM
- wuAnimate: perform simple animations on dom elements like shake, pop, collapse
- wuColor: color related functions like converting between color formats, generating random colors, adjusting brightness
- wuTime: functions that ease working with dates, like converting them to readable strings
- wuDuration: functions that ease working with durations, like displaying them as relative time or calculating differences
- wuText: eases working with strings like truncating, changing the case, padding
- wuConstants: A collection of useful constants like Regex presets, unit conversions, Trivia

Documentation of all available functions - auto generated from JSDOC comments
[./API.md](https://github.com/YanikKendler/web-utils/blob/main/library/API.md)

## Breaking in v1.4.2 / v1.4.3
Error handling was standardized across the library. All methods that previously threw errors now return null instead.

Options were standardized to always be passed as an object instead of function params.

Other breaking changes:
- wuTime.validate() was removed
- wuTime.anyToDate was changed to always return null on invalid input and no longer accepts a second param
- wuTime.toFullDateString was renamed to wuTime.toDateString
- wuTime.toFullDateTimeString was renamed to wuTime.toDateTimeString
- wuDuration.toFullDateString was renamed to wuDuration.toDateString
- wuDuration.toFullDateTimeString was renamed to wuDuration.toDateTimeString

## Breaking in v1.4.0
WuTime was heavily reworked and split into wuTime and wuDuration to separate concerns.

Full list of breaking changes:
- wuTime no longer supports the "treatAs" option
- wuTime.toAbsolutePieces was removed
- wuTime.toDurationString was removed

See the documentation for wuDuration for the new methods to work with durations.

## Breaking in v1.2.0 

All around the library, names were shortened and unified. For example `wuColor.generateRandomColor` was renamed to `wuColor.random`.

Full list of breaking changes:
- wuColor: generateRandomColor renamed to random
**wuText**
- padString and padNumber were deleted in favor of pad<T>
- truncateText was renamed to truncate
- upperOrLowerTextRange was renamed to upperOrLowerRange
**wuTime**
- toTimepieces was split into toSplitPieces and toAbsolutePieces
- toRelativeTimeString was renamed to toTimeDurationString