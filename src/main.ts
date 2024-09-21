import { Calculator } from './calculator.class';
import './scss/main.scss';

const rootElement = document.getElementById('app') as HTMLElement;

const calculator = new Calculator();

rootElement.append(calculator.create());