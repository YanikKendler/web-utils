export declare class wuAnimate {
    /**
     * Shakes an element left to right and rotates it slightly
     * @param elem
     * @param duration how long the whole animation should take
     * @param shakes how many times the element should shake
     */
    static shake(elem: HTMLElement, duration?: number, shakes?: number): void;
    /**
     * Simple pop animation that scales an element up to a given scale and back to 1
     * @param elem
     * @param duration how long the whole animation should take
     * @param scale how much the element should scale up
     */
    static pop(elem: HTMLElement, duration?: number, scale?: number): void;
    /**
     * Bounces an element up and down a given number of times starting with the given max height and decreasing from there
     * @param elem
     * @param duration how long the whole animation should take
     * @param maxHeight in pixels how high the element should bounce on the first bounce
     * @param bounceCycles how many times the element should bounce
     */
    static bounce(elem: HTMLElement, duration?: number, maxHeight?: number, bounceCycles?: number): void;
    /**
     * Spins an element a given number of degrees
     * @param elem
     * @param duration how long the whole animation should take
     * @param spinDeg in degrees how much the element should spin
     * @param fill css animation fill mode
     */
    static spin(elem: HTMLElement, duration?: number, spinDeg?: number, fill?: FillMode): void;
    /**
     * Collapses an element to 0 height and opacity
     * @param elem
     * @param duration
     */
    static collapse(elem: HTMLElement, duration?: number): void;
    /**
     * Reveals an element by moving it up slightly and animating its opacity, then sets its display value
     * @param elem
     * @param display css display value
     * @param duration
     */
    static show(elem: HTMLElement, display?: string, duration?: number): void;
    /**
     * Hides an element by moving it down slightly and animating its opacity, then sets its display value to none
     * @param elem
     * @param duration
     */
    static hide(elem: HTMLElement, duration?: number): void;
}
