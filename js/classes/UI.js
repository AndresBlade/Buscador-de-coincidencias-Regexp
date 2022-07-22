import { formulario, inputPalabra } from '../selectores.js';
import { limpiarHTML } from '../funciones.js';

export class UI {
	procesarEntrada(e) {
		e.preventDefault();
		const palabra = inputPalabra.value;
		const regex = /a/gi;
		const soloEspacios = !/\S/.test(palabra);
		const coincidencias = [...palabra.matchAll(regex)];

		soloEspacios
			? this.mostrarMensaje(
					'La palabra debe contener más que solo espacios en blanco',
					'error'
			  )
			: this.crearHTMLExpresion(coincidencias);
	}
	//Crear una coincidencia e insertarla
	crearHTMLExpresion(coincidencias) {
		const resultadoFormulario = formulario.querySelector(
			'#procesador__resultados ul'
		);

		limpiarHTML(resultadoFormulario);

		coincidencias.forEach(coincidencia => {
			const li = document.createElement('li');
			li.textContent = `Coincide "${coincidencia[0]}" [${coincidencia.index}]`;
			resultadoFormulario.append(li);
		});
	}

	//Muestra un mensaje y elimina el anterior si existe
	mostrarMensaje(mensaje, tipo = 'error') {
		const resultadoFormulario = formulario.querySelector(
			'#procesador__resultados ul'
		);

		limpiarHTML(resultadoFormulario);
		const div = document.createElement('div');
		const siguienteHermano = formulario.nextElementSibling;
		div.textContent = mensaje;
		div.classList.add('mensaje', `mensaje--${tipo}`);
		console.log(siguienteHermano);
		siguienteHermano
			? siguienteHermano.replaceWith(div)
			: formulario.after(div);
		setTimeout(() => {
			div.remove();
		}, 3000);
	}
}
