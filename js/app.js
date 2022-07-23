import { UI } from './classes/UI.js';
import { formulario } from './selectores.js';

const ui = new UI();

const procesarEntrada = ui.procesarEntrada.bind(ui);

//Event Listeners

eventListeners();

function eventListeners() {
	//Cuando el DOM se carga
	document.addEventListener('DOMContentLoaded', e => {
		ui.crearHTMLExpresion();
	});

	//Cuando subimos nuestra entrada

	// formulario.addEventListener('input', procesarEntrada);
	formulario.addEventListener('submit', procesarEntrada);
}
