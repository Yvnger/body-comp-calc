import { createEl } from "./helpers";

export class Calculator {
    constructor() {

    }

    create() {
        const wrap = createEl('div', 'calc__wrap');

        const sexMale = createEl('button', 'calc__cell');
        sexMale.textContent = "Мужчина";
        const sexFemale = createEl('button', 'calc__cell');
        sexFemale.textContent = "Женщина";

        wrap.append(sexMale, sexFemale);

        return wrap;
    }
}