export function createEl(tag: string = 'div', ...classes: string[]): HTMLElement {
    const element = document.createElement(tag);

    if (classes.length) element.classList.add(...classes);

    return element;
}