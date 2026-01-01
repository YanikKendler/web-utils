/**
 * General Utility functions for various tasks
 */
export class wuGeneral {

    /**
     * selects all the text in a given element
     * @param element
     */
    static selectText(element: HTMLElement) {
        const range = document.createRange();
        range.selectNodeContents(element);
        const selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    /**
     * moves the cursor to the end of a given elements text content
     * @param element
     */
    static moveCursorToEnd(element: HTMLElement) {
        const range = document.createRange();
        const selection = window.getSelection();
        if (selection) {
            range.selectNodeContents(element);
            range.collapse(false); // Move cursor to the end
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    /**
     * moves the cursor to the start of a given elements text content
     * @param element
     */
    static moveCursorToStart(element: HTMLElement) {
        const range = document.createRange();
        const selection = window.getSelection();
        if (selection) {
            range.selectNodeContents(element);
            range.collapse(true); // Move cursor to the start
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    /**
     * returns the height of an element, taking into account the box-sizing property
     * @param elem any HTMLElement defaults to the body element
     */
    static smartHeight(elem: HTMLElement = document.querySelector("body")) {
        let styles = getComputedStyle(elem)
        if (styles.boxSizing == "border-box") {
            return elem.clientHeight
        } else {
            return elem.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom)
        }
    }

    /**
     * debounces a function - limits the rate at which a function can be called
     *
     * should be used like: const debouncedFunction = wuGeneral.debounce(myFunction);
     * if it's debounced inside a event binding the debounce wont work since the reference will be different
     *
     * @param func any function
     * @param timeout the minimum time between function calls, all others will be ignored
     * @returns a debounced version of the input function
     */
    static debounce(func: Function, timeout = 300) {
        let timer: number;
        return (...args: any[]) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
    }

    /**
     * creates an actual deep copy of an object - removing all references to the old object
     * @param obj
     * @param strategy whether to use json stringify and parse or the structured clone method
     */
    static deepCopy<T = any>(obj: T, strategy: 'json' | 'structured' = 'structured'): T {
        if (strategy == "json")
            return JSON.parse(JSON.stringify(obj)) as T
        else return structuredClone<T>(obj)
    }

    /**
     * Calls the callBack function after a set amount of clicks
     * @param callBack the function to be called
     * @param event the click event
     * @param n number of clicks required for the callback
     */
    static onNthClick(callBack: Function, event: MouseEvent, n: number = 2) {
        if (event.detail == n) {
            callBack()
        }
    }

    /**
     * moves an item in an array from one index to another
     * @param array
     * @param from
     * @param to
     */
    static arrayMove<T = any>(array: T[], from: number, to: number): T[] {
        const result = Array.from(array)
        const [moved] = result.splice(from, 1)
        result.splice(to, 0, moved)
        return result
    }
}