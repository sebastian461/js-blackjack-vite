import _ from "underscore";

/* Está es la sintaxis para especificar a JS los tipos de datos de una función */
/**
 *
 * @param {array<string>} tiposDeCarta
 * @param {Array<string>} tiposEspeciales
 * @returns {Array<string>}
 */
export const crearDeck = (tiposDeCarta, tiposEspeciales) => {
  //inserción de las cartas normales

  if (!tiposDeCarta || tiposDeCarta.length === 0)
    throw Error("tiposDeCarta debe ser un arreglo de strings");

  if (!tiposEspeciales || tiposEspeciales.length === 0)
    throw Error("tiposEspeciales debe ser un arreglo de strings");

  const deck = [];
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tiposDeCarta) {
      deck.push(`${i}${tipo}`);
    }
  }

  //inserción de cartas especiales
  for (let tipo of tiposDeCarta) {
    for (let especial of tiposEspeciales) {
      deck.push(`${especial}${tipo}`);
    }
  }

  return _.shuffle(deck);
};
