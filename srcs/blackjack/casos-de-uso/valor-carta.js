/**
 *
 * @param {String} carta
 * @param {Number} puntos
 * @returns {Number}
 */
export const valorCarta = (carta, puntos) => {
  const valor = carta.substring(0, carta.length - 1);

  return (puntos += !isNaN(valor)
    ? valor * 1
    : valor === "A"
    ? puntos + 11 > 21
      ? 1
      : 11
    : 10);
};
