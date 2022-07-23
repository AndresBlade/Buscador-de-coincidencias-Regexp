export const formulario = document.forms[0];

export const inputsText = formulario.querySelectorAll('input[type="text"]');
export const inputsCheckbox = [
	...formulario.querySelectorAll('input[type="checkbox"]'),
];

const banderaG = document.querySelector('·bandera-g');
export const [inputPalabra, inputPatron] = inputsText;
