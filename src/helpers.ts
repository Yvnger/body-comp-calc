export function createEl(tag: 'input', ...classes: string[]): HTMLInputElement;
export function createEl(tag: keyof HTMLElementTagNameMap, ...classes: string[]): HTMLElement;
export function createEl(tag: string = 'div', ...classes: string[]): HTMLElement {
    const element = document.createElement(tag);

    if (classes.length) element.classList.add(...classes);

    return element;
}