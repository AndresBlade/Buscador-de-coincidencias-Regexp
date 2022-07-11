//Variables
const formulario = document.forms[0];

const inputs = formulario.querySelectorAll('input');

const [inputPalabra] = inputs;

//Event Listeners

eventListeners();

function eventListeners() {
	//Cuando el DOM se carga
	document.addEventListener('DOMContentLoaded', e => {
		console.log('cargado');
	});

	//Cuando subimos nuestra entrada

	formulario.addEventListener('submit', procesarEntrada);
}

//Funciones

function procesarEntrada(e) {
	e.preventDefault();
	const palabra = inputPalabra.value;
	const soloEspacios = !/\S/.test(palabra);
	const regex = /.a/gi;
	const coincidencias = [...palabra.matchAll(regex)];

	soloEspacios
		? mostrarMensaje(
				'La palabra debe contener más que solo espacios en blanco',
				'error'
		  )
		: crearHTMLExpresion(coincidencias);
}

function mostrarMensaje(mensaje, tipo = 'error') {
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

function crearHTMLExpresion(coincidencias) {
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

function limpiarHTML(elemento) {
	while (elemento.firstChild) {
		elemento.firstChild.remove();
	}
}
