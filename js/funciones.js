//Vacía un elemento html

export function limpiarHTML(elemento) {
	while (elemento.firstChild) {
		elemento.firstChild.remove();
	}
}
