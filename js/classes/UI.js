import {
	formulario,
	inputPalabra,
	inputPatron,
	inputsCheckbox,
} from '../selectores.js';
import { limpiarHTML } from '../funciones.js';

export class UI {
	procesarEntrada(e) {
		e.preventDefault();
		const palabra = inputPalabra.value;
		const regexString = inputPatron.value;

		//Obtiene los checkbox de bandera que han sido seleccionados y extrae su valor en texto
		const banderas = inputsCheckbox
			.filter(checkbox => checkbox.checked)
			.map(checkbox => checkbox.value)
			.join('');
		const soloEspacios = !/\S/.test(palabra) || !/\S/.test(regexString);

		if (soloEspacios) {
			this.mostrarMensaje(
				'La palabra debe contener más que solo espacios en blanco',
				'error'
			);
			// this.crearHTMLExpresion();
			return;
		}

		const regex = new RegExp(regexString, banderas);
		const procesador = new Procesador(palabra, banderas, regex);

		this.crearHTMLExpresion(procesador.buscarCoincidecias());
	}

	//Crear una coincidencia e insertarla
	crearHTMLExpresion(coincidencias) {
		const resultadoFormulario = formulario.querySelector(
			'#procesador__resultados'
		);

		limpiarHTML(resultadoFormulario);

		if (!coincidencias) {
			const p = document.createElement('p');
			p.textContent = 'No hay resultados';
			p.classList.add('procesador__resultado');
			resultadoFormulario.append(p);
			return;
		}

		const listadoCoincidencias = document.createElement('ul');

		coincidencias.forEach(coincidencia => {
			const li = document.createElement('li');
			li.textContent = `Coincide "${coincidencia[0]}" [${coincidencia.index}]`;
			listadoCoincidencias.append(li);
		});

		resultadoFormulario.append(listadoCoincidencias);
	}

	//Muestra un mensaje y elimina el anterior si existe
	mostrarMensaje(mensaje, tipo = 'error') {
		const resultadoFormulario = formulario.querySelector(
			'#procesador__resultados'
		);

		const div = document.createElement('div');
		const siguienteHermano = formulario.nextElementSibling;
		div.textContent = mensaje;
		div.classList.add('mensaje', `mensaje--${tipo}`);
		siguienteHermano
			? siguienteHermano.replaceWith(div)
			: formulario.after(div);
		setTimeout(() => {
			div.remove();
		}, 3000);
	}
}

export class Procesador {
	constructor(palabra, banderas, regex) {
		this.palabra = palabra;
		this.regex = regex;
		this.banderas = banderas;
	}

	buscarCoincidecias() {
		let matches = this.palabra.match(this.regex);

		if (!matches) {
			return; //No hay coincidencias
		}
		if (this.banderas.includes('g')) {
			matches = this.palabra.matchAll(this.regex);
			return [...matches];
		}

		return [matches];
	}
}
