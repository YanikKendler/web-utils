import './styles/main.scss'

import {wuColor, wuAnimate, wuGeneral, wuText, wuConstants} from '../../dist/index.js'

/*
* testing web util text
 */

console.log(wuText.roundNumber(1.2, 20))
console.log(wuText.truncateText("This is a long text", 10))
console.log(wuText.truncateText("This is a long text", 10, "%8", false))
console.log(wuText.numberToLetter(15))
console.log(wuText.numberToLetter(25))
console.log(wuText.upperOrLowerTextRange("abadsfasdfasdfasdf", 0, 0, "upper"))
/*
* testing web util color
*/

let colorSwatches = []

let randomRGBColor = wuColor.generateRandomColor([0, 360], [50, 100], [50, 100])

colorSwatches.push({color: randomRGBColor, text: "Random rgb"})
colorSwatches.push({color: wuColor.calculateContrastColor(randomRGBColor), text: "contrast"})
colorSwatches.push({color: wuColor.shiftHue(randomRGBColor, 180, true), text: "shifted hue"})
colorSwatches.push({color: wuColor.shiftSaturation(randomRGBColor, 50), text: "shifted sat"})
colorSwatches.push({color: wuColor.shiftLightness(randomRGBColor, -20), text: "shifted lightness"})

renderColorSwatches()
function renderColorSwatches(){
    let swatches = ""
    colorSwatches.forEach((swatch) => {
        swatches += `
            <div class="color-swatch">
                <div class="swatch" style="background-color: ${wuColor.anyToString(swatch.color)};"></div>
                <div class="text">${swatch.text}</div>
            </div>`
    })

    document.querySelector(".colorSwatches").innerHTML = swatches
}

document.querySelector("#b1").addEventListener("dblclick", (e) => {
    wuGeneral.onNthClick(() => {
        console.log("Double clicked 1")
    }, e)
    console.log("Double clicked 1")
})

document.querySelector("#b2").addEventListener("click", (e) => {
    wuGeneral.onNthClick(() => {
        console.log("tripple clicked 2")
    }, e, 3)
})

document.querySelector("#b3").addEventListener("click", (e) => {
    console.log("Button clicked")
    wuGeneral.debounce(() => {
        console.log("Debounced")
    })()
})
