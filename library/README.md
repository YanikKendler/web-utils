# web-utils
A collection of utility classes and functions I have written over the years of creating websites. Now bundled together.

These cannot and are not indented to replace libraries specific to one task like time management or advanced color conversion. The web-utils library aims to provide simple solutions for common and simple tasks in a web project without needing to use many different more complex libraries.

All Methods have a JSDOC comment above them, so you can use the IDE to see what they do and how to use them.

To use the library, simply import the class you need and use the static methods provided.

```typescript
import { wuColor } from '@yanikkendler/web-utils';

let accentColor = wuColor.random()
```

If you find a bug please open an issue on the GitHub repository. If you have a feature request, please open an issue or implement it yourself and create a pull request.

The library offers six classes that each have multiple utility functions

- wuGeneral: General utility functions like debouncing a function or interacting with the DOM
- wuAnimate: perform simple animations on dom elements like shake, pop, collapse
- wuColor: color related functions like converting between color formats, generating random colors, adjusting brightness
- wuTime: functions that ease working with dates, like converting them to readable strings, calculating differences between dates
- wuText: eases working with strings like truncating, changing the case, padding
- wuConstants: A collection of useful constants like Regex presets, unit conversions, Trivia

Documentation of all available functions - auto generated from JSDOC comments
[./API.md](./API.md)