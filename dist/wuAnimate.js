"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wuAnimate = void 0;
const wuGeneral_1 = require("./wuGeneral");
class wuAnimate {
    /**
     * Shakes an element left to right and rotates it slightly
     * @param elem
     * @param duration how long the whole animation should take
     * @param shakes how many times the element should shake
     */
    static shake(elem, duration = 200, shakes = 8) {
        const shakeKeyframeBase = [
            { transform: 'translateX(-5px)', rotate: '-2deg' },
            { transform: 'translateX(5px)', rotate: '0deg' },
            { transform: 'translateX(-5px)', rotate: '2deg' },
            { transform: 'translateX(5px)', rotate: '0deg' },
        ];
        let shakeKeyframes = [{ transform: 'translateX(0)', rotate: '0' }];
        for (let i = 0; i < shakes; i++) {
            shakeKeyframes.push(shakeKeyframeBase[i % shakeKeyframeBase.length]);
        }
        shakeKeyframes.push({ transform: 'translateX(0)', rotate: '0' });
        elem.animate(shakeKeyframes, {
            duration: duration,
            easing: 'ease-in-out',
        });
    }
    /**
     * Simple pop animation that scales an element up to a given scale and back to 1
     * @param elem
     * @param duration how long the whole animation should take
     * @param scale how much the element should scale up
     */
    static pop(elem, duration = 200, scale = 1.05) {
        elem.animate([
            { transform: 'scale(1)' },
            { transform: `scale(${scale})` },
            { transform: 'scale(1)' },
        ], {
            duration: duration,
            easing: 'ease-in-out',
        });
    }
    /**
     * Bounces an element up and down a given number of times starting with the given max height and decreasing from there
     * @param elem
     * @param duration how long the whole animation should take
     * @param maxHeight in pixels how high the element should bounce on the first bounce
     * @param bounceCycles how many times the element should bounce
     */
    static bounce(elem, duration = 200, maxHeight = 10, bounceCycles = 2) {
        const bounceKeyframeBase = (height) => [
            { transform: 'translateY(0px)' },
            { transform: `translateY(-${height}px)` },
            { transform: 'translateY(0px)' },
        ];
        let bounceKeyframes = [];
        for (let i = 0; i < bounceCycles; i++) {
            bounceKeyframes.push(...bounceKeyframeBase(maxHeight / i + 1));
        }
        elem.animate(bounceKeyframes, {
            duration: duration,
            easing: 'ease-in-out',
        });
    }
    /**
     * Spins an element a given number of degrees
     * @param elem
     * @param duration how long the whole animation should take
     * @param spinDeg in degrees how much the element should spin
     * @param fill css animation fill mode
     */
    static spin(elem, duration = 300, spinDeg = 720, fill = "forwards") {
        elem.animate([
            { rotate: '0deg' },
            { rotate: `${spinDeg}deg` },
        ], {
            duration: duration,
            easing: 'ease-in-out',
            fill: fill,
        });
    }
    /**
     * Collapses an element to 0 height and opacity
     * @param elem
     * @param duration
     */
    static collapse(elem, duration = 200) {
        elem.style.overflow = "hidden";
        elem.animate([
            { opacity: 1, height: wuGeneral_1.wuGeneral.smartHeight(elem) + "px" },
            { opacity: 0, height: "0px" },
        ], {
            duration: duration,
            easing: 'ease-in-out',
            fill: "forwards",
        });
    }
    /**
     * Reveals an element by moving it up slightly and animating its opacity, then sets its display value
     * @param elem
     * @param display css display value
     * @param duration
     */
    static show(elem, display = "block", duration = 200) {
        if (elem.dataset.visibility == "visible")
            return;
        elem.dataset.visibility = "showing";
        elem.style.opacity = "0";
        elem.style.display = display;
        setTimeout(() => {
            elem.animate([
                { opacity: 0, transform: "translateY(5px)" },
                { opacity: 1, transform: "translateY(0)" },
            ], {
                duration: duration,
                easing: 'ease-in-out',
                fill: "forwards",
            });
        });
        setTimeout(() => {
            elem.style.opacity = "1";
            elem.style.display = display;
            elem.dataset.visibility = "visible";
        }, duration);
    }
    /**
     * Hides an element by moving it down slightly and animating its opacity, then sets its display value to none
     * @param elem
     * @param duration
     */
    static hide(elem, duration = 200) {
        if (elem.dataset.visibility == "hidden")
            return;
        elem.dataset.visibility = "hiding";
        elem.animate([
            { opacity: 1, transform: "translateY(0)" },
            { opacity: 0, transform: "translateY(5px)" },
        ], {
            duration: duration,
            easing: 'ease-in-out',
            fill: "forwards",
        });
        setTimeout(() => {
            if (elem.dataset.visibility == "hiding") {
                elem.style.display = "none";
                elem.dataset.visibility = "hidden";
            }
        }, duration);
    }
}
exports.wuAnimate = wuAnimate;
