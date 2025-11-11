import './styles/main.css'
import {wuGeneral, wuText, wuColor, wuTime} from "@yanikkendler/web-utils"

/*
* testing web util time
*/

console.log("valid", wuTime.validate("2023-10-10T10:10:10Z"))
console.log("valid", wuTime.validate(846))
console.log("valid", wuTime.validate(new Date()))
console.log("invalid", wuTime.validate(48516515159985151651656))
console.log("invalid", wuTime.validate())

console.log(wuTime.handleInvalid(1534, () => "adf", "invalid"))
console.log(wuTime.handleInvalid(461656516565461594165516451534, () => "adf", "invalid"))

console.log(wuTime.toSplitPieces(new Date()))
console.log(wuTime.toSplitPieces(234234232323, "Duration"))

console.log(wuTime.toAbsolutePieces(new Date()))
console.log(wuTime.toAbsolutePieces(234234232323, "Duration"))

console.log(wuTime.toDurationString(wuTime.difference(new Date(12312), new Date(234234)), 3))

/*
* testing web util text
 */

console.log("WU TEXT")

console.log(wuText.roundNumber(1.2, 20))
console.log(wuText.truncate("This is a long text", 10))
console.log(wuText.truncate("This is a long text", 10, "%8", false))
console.log(wuText.numberToLetter(15))
console.log(wuText.numberToLetter(25))
console.log(wuText.upperOrLowerRange("abadsfasdfasdfasdf", 0, 0, "upper"))
console.log(wuText.truncateCenter("hallo freunde das hier ist mein super cooler text", 5, 4, ".+."))
console.log(wuText.truncateCenter("hallo", 2, 2, "+++", 1))

/*
* testing web util color
*/

let colorSwatches = []

let randomRGBColor = wuColor.random([0, 360], [50, 100], [50, 100])

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
    console.log("Double clicked 1")
})

document.querySelector("#b2").addEventListener("click", (e) => {
    wuGeneral.onNthClick(() => {
        console.log("tripple clicked 2")
    }, e, 3)
})

const debouncedFunc = wuGeneral.debounce(() => {
    console.log("Debounced")
})

document.querySelector("#b3").addEventListener("click", (e) => {
    console.log("Button clicked")
    debouncedFunc()
})
