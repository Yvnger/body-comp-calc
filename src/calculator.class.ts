import { createEl } from "./helpers";

interface CellArgs {
    long?: boolean;
    label: string;
    defaultValue: number;
    control: string;
}

export class Calculator {
    _sex: 'male' | 'female';
    _height: number;
    _weight: number;
    _waist: number;
    _hips: number;
    _neck: number;

    constructor() {
        this._sex = 'male';
        this._height = 180;
        this._weight = 80;
        this._waist = 80;
        this._hips = 80;
        this._neck = 80;
    }

    get sex() {
        return this._sex;
    }

    set sex(value: 'male' | 'female') {
        this._sex = value;
    }

    get height() {
        return this._height;
    }

    set height(value : number) {
        this._height = value;
    }
    
    get weight() {
        return this._weight;
    }

    set weight(value : number) {
        this._weight = value;
    }

    get waist() {
        return this._waist;
    }

    set waist(value : number) {
        this._waist = value;
    }

    get hips() {
        return this._hips;
    }

    set hips(value : number) {
        this._hips = value;
    }

    get neck() {
        return this._neck;
    }

    set neck(value : number) {
        this._neck = value;
    }

    create() {
        const calc = createEl('div', 'calculator');

        const sexWrap = createEl('div', 'calculator__sex');

        const sexMale = createEl('button', 'calculator__sex-btn');
        sexMale.textContent = 'Мужчина';
        const sexFemale = createEl('button', 'calculator__sex-btn');
        sexFemale.textContent = 'Женщина';

        sexWrap.append(sexMale, sexFemale);

        const height = this.createCell({
            long: true,
            label: 'Рост',
            defaultValue: this.height,
            control: 'range',
        });

        const cellGrid : HTMLElement = createEl('div', 'calculator__cell-grid');

        const weight : HTMLElement = this.createCell({
            label: 'Вес',
            defaultValue: this.weight,
            control: 'button'
        });

        const waist : HTMLElement = this.createCell({
            label: 'Талия',
            defaultValue: this.waist,
            control: 'button'
        })

        const hips : HTMLElement = this.createCell({
            label: 'Бёдра',
            defaultValue: this.hips,
            control: 'button'
        })

        const neck : HTMLElement = this.createCell({
            label: 'Шея',
            defaultValue: this.neck,
            control: 'button'
        })
        
        const submit : HTMLElement = createEl('button', 'btn');
        submit.textContent = 'Посчитать показатели';

        // Appends
        calc.append(sexWrap, height, cellGrid, submit);
        cellGrid.append(weight, waist, hips, neck);

        return calc;
    }

    /**
     * Создает ячейку калькулятора.
     * 
     * @param {CellArgs} args - Аргументы для ячейки.
     * @param {boolean} [args.long] - Опциональное свойство для длинной ячейки.
     * @param {string} args.label - Метка для ячейки.
     * @param {number} args.value - Значение ячейки.
     * @param {control} args.control - Элемент управления
     * @returns {HTMLDivElement} Элемент ячейки.
     */
    createCell(args: CellArgs) {
        // Modified
        const longClass: string = 'calculator__cell--long';
        const inactiveClass: string = 'calculator__cell--inactive';

        const cell: HTMLElement = createEl('div', 'calculator__cell');

        if (args.long) {
            cell.classList.add(longClass);
        }

        const label: HTMLSpanElement = createEl('span', 'calculator__cell-label');
        label.textContent = args.label;

        const value: HTMLSpanElement = createEl('span', 'calculator__cell-value');
        value.textContent = args.defaultValue.toString();

        const controlsWrap = createEl('div', 'calculator__cell-controls');
        
        if (args.control === 'range') {
            const range : HTMLInputElement = this.createControlRange(this.height);

            controlsWrap.append(range);
        } else if (args.control === 'button') {
            const increment : HTMLElement = this.createControlButton('increment', this.increment);
            const decrement : HTMLElement = this.createControlButton('decrement', this.decrement);

            controlsWrap.append(increment, decrement);
        }

        cell.append(label, value, controlsWrap);
        
        return cell;
    }

    increment() {
        console.log('Прибавлено');
    }

    decrement() {
        console.log('Убавлено');
    }

    createControlButton(action: 'increment' | 'decrement', callback: () => void) {
        const button = createEl('button', 'calculator__cell-btn');
        
        if (action === 'increment') {
            button.textContent = '+'
        } else if (action === 'decrement') {
            button.textContent = '-';
        }

        button.addEventListener('click', () => callback());

        return button;
    }

    createControlRange(value : number) {
        const range : HTMLInputElement = createEl('input', 'calculator__cell-range');
        range.setAttribute('type', 'range');
        range.min = '135';
        range.max = '225'; 
        range.setAttribute('value', value.toString())    

        return range;
    }
}