/**
 *
 * @param {String} carta
 * @param {Number} turno
 * @param {Array<Element>} cartaHTML
 */
export const dibujarCarta = (carta, turno, cartaHTML) => {
  const imgCarta = document.createElement("img");
  imgCarta.classList.add("carta");
  imgCarta.src = `assets/cartas/${carta}.png`;
  cartaHTML[turno].append(imgCarta);
};
