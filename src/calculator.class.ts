import { createEl } from "./helpers";

interface CellArgs {
    long?: boolean;
    label: string;
    slug: string;
    defaultValue: number;
    control: string;
}

interface Cell {
    cell: HTMLElement;
    value: HTMLElement;
    isActive: (bool: boolean) => void;
}

interface SexArgs {
    label: string;
    slug: 'male' | 'female';
}

interface Sex {
    sex: HTMLButtonElement;
    isActive: (bool: boolean) => void;
}

export class Calculator {
    _sex: 'male' | 'female';
    _height: number;
    _weight: number;
    _waist: number;
    _hips: number;
    _neck: number;
    _currentSexElement: Sex | null;

    constructor() {
        this._sex = 'male';
        this._height = 180;
        this._weight = 80;
        this._waist = 80;
        this._hips = 80;
        this._neck = 80;
        this._currentSexElement = null;
    }

    showValues() {
        console.clear();
        console.table([{
            'Пол': this.sex,
            'Текущий пол': this.currentSexElement,
        }]);

        console.table([{
            'Рост': this.height,
            'Вес': this.weight,
            'Талия': this.waist,
            'Бедра': this.hips,
            'Шея': this.neck,
        }]);
    }

    get sex() {
        return this._sex;
    }

    set sex(value: 'male' | 'female') {
        this._sex = value;
    }

    get currentSexElement() {
        return this._currentSexElement;
    }

    set currentSexElement(element) {
        this._currentSexElement = element;
    }

    get height() {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }

    get weight() {
        return this._weight;
    }

    set weight(value: number) {
        this._weight = value;
    }

    get waist() {
        return this._waist;
    }

    set waist(value: number) {
        this._waist = value;
    }

    get hips() {
        return this._hips;
    }

    set hips(value: number) {
        this._hips = value;
    }

    get neck() {
        return this._neck;
    }

    set neck(value: number) {
        this._neck = value;
    }

    create() {
        const calc = createEl('form', 'calculator');

        const sexSelection = this.createSexSelection();

        const height = this.createCell({
            long: true,
            label: 'Рост',
            slug: 'height',
            defaultValue: this.height,
            control: 'range',
        });

        const cellGrid: HTMLElement = createEl('div', 'calculator__cell-grid');

        const weight = this.createCell({
            label: 'Вес',
            slug: 'weight',
            defaultValue: this.weight,
            control: 'button'
        });

        const waist = this.createCell({
            label: 'Талия',
            slug: 'waist',
            defaultValue: this.waist,
            control: 'button'
        })

        const hips = this.createCell({
            label: 'Бёдра',
            slug: 'hips',
            defaultValue: this.hips,
            control: 'button'
        })

        hips.isActive(false);

        const neck = this.createCell({
            label: 'Шея',
            slug: 'neck',
            defaultValue: this.neck,
            control: 'button'
        })

        const submit: HTMLElement = createEl('button', 'btn');
        submit.textContent = 'Посчитать показатели';

        // Events
        calc.addEventListener('submit', event => event.preventDefault());

        // Appends
        calc.append(sexSelection, height.cell, cellGrid, submit);
        cellGrid.append(weight.cell, waist.cell, hips.cell, neck.cell);

        return calc;
    }

    changeSex(element: Sex, slug: 'male' | 'female') {
        if (this._currentSexElement) {
            this._currentSexElement.isActive(false);
        }
    
        this._currentSexElement = element;
        this._currentSexElement.isActive(true);
        this.sex = slug;
    
        this.showValues();
    }
    
    createSexSelection() : HTMLElement {
        const wrap = createEl('div', 'calculator__sex');

        const sexMale = this.createSexButton({
            'label': 'Мужчина',
            'slug': 'male'
        });

        const sexFemale = this.createSexButton({
            'label': 'Женщина',
            'slug': 'female'
        });

        wrap.append(sexMale.sex, sexFemale.sex);

        return wrap;
    }

    createSexButton(args: SexArgs): Sex {
        const sexActiveClass: string = 'calculator__sex-btn--active';
    
        const sex: HTMLButtonElement = document.createElement('button');
        sex.classList.add('calculator__sex-btn');
        sex.textContent = args.label;
    
        const sexObject = {
            sex,
            isActive(bool: boolean) {
                if (bool) {
                    sex.classList.add(sexActiveClass);
                } else {
                    sex.classList.remove(sexActiveClass);
                }
            }
        };
    
        sex.addEventListener('click', () => this.changeSex(sexObject, args.slug));
    
        return sexObject;
    }

    createCell(args: CellArgs): Cell {
        /**
         * Создает ячейку калькулятора.
         * 
         * @param {CellArgs} args - Аргументы для ячейки.
         * @param {boolean} [args.long] - Опциональное свойство для длинной ячейки.
         * @param {string} args.label - Метка для ячейки.
         * @param {string} args.slug - Slug для ячейки.
         * @param {number} args.value - Значение ячейки.
         * @param {control} args.control - Элемент управления
         * @returns {HTMLDivElement} Элемент ячейки.
         */

        // Modifiers
        const longClass: string = 'calculator__cell--long';
        const inactiveClass: string = 'calculator__cell--inactive';

        const cell: HTMLElement = createEl('div', 'calculator__cell');

        if (args.long) cell.classList.add(longClass);

        const label: HTMLSpanElement = createEl('span', 'calculator__cell-label');
        label.textContent = args.label;

        const value: HTMLSpanElement = createEl('span', 'calculator__cell-value');
        value.textContent = args.defaultValue.toString();

        const controlsWrap = createEl('div', 'calculator__cell-controls');
        let increment: HTMLButtonElement | null = null;
        let decrement: HTMLButtonElement | null = null;

        if (args.control === 'range') {
            const range: HTMLInputElement = this.createControlRange(args.defaultValue);
            range.addEventListener('input', () => {
                // this.updateValue(args.slug as string, range.value);
                // value.textContent = range.value; // Обновляем значение сразу
            });
            controlsWrap.append(range);
        } else if (args.control === 'button') {
            increment = this.createControlButton('increment', () => this.updateValue(args.slug as any, 'increment', value));
            decrement = this.createControlButton('decrement', () => this.updateValue(args.slug as any, 'decrement', value));
            controlsWrap.append(increment, decrement);
        }

        cell.append(label, value, controlsWrap);

        return {
            cell,
            value,
            isActive(bool: boolean) {
                if (!bool) {
                    cell.classList.add(inactiveClass)

                    if (increment && decrement) {
                        increment.disabled = true;
                        decrement.disabled = true;
                    }
                };
            }
        };
    }

    updateValue(variable: 'height' | 'weight' | 'waist' | 'hips' | 'neck', action: 'increment' | 'decrement', valueElement: HTMLSpanElement) {
        const incrementValue = 1;

        if (action === 'increment') {
            this[variable] += incrementValue;
        } else if (action === 'decrement') {
            this[variable] -= incrementValue;
        }

        valueElement.textContent = this[variable].toString();

        this.showValues();
    }

    createControlButton(action: 'increment' | 'decrement', callback: () => void) : HTMLButtonElement {
        const button = document.createElement('button');
        button.classList.add('calculator__cell-btn');
        button.textContent = action === 'increment' ? '+' : '-';
        button.addEventListener('click', callback);

        return button;
    }

    createControlRange(value: number) {
        const range: HTMLInputElement = createEl('input', 'calculator__cell-range');
        range.setAttribute('type', 'range');
        range.min = '135';
        range.max = '225';
        range.value = value.toString();

        return range;
    }
}