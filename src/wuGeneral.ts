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
     * returns the height of an element, taking into account the box-sizing property
     * @param elem any HTMLElement defaults to the body element
     */
    static smartHeight(elem: HTMLElement = document.querySelector("body")){
        let styles = getComputedStyle(elem)
        if(styles.boxSizing == "border-box"){
            return elem.clientHeight
        }
        else{
            return elem.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom)
        }
    }

    /**
     * debounces a function - limits the rate at which a function can be called
     * @param func any function
     * @param timeout the minimum time between function calls, all others will be ignored
     * @returns a debounced version of the input function
     */
    static debounce(func: Function, timeout = 300){
        let timer: number;
        return (...args: any[]) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    /**
     * creates an actual deep copy of an object - removing all references to the old object
     * @param obj
     */
    static deepCopy(obj: any){
        return JSON.parse(JSON.stringify(obj))
    }

    /**
     * Calls the callBack function after a set amount of clicks
     * @param callBack the function to be called
     * @param event the click event
     * @param n
     */
    static onNthClick(callBack: Function, event: MouseEvent, n: number = 2){
        if(event.detail == n){
            callBack()
        }
    }
}