//Vacía un elemento html

export function limpiarHTML(elemento) {
	console.log(elemento);
	while (elemento.firstChild) {
		elemento.firstChild.remove();
	}
}
