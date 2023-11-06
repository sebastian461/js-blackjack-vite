import { valorCarta } from "./valor-carta";

/**
 *
 * @param {String} carta
 * @param {Number} turno
 * @param {Array<Number>} puntosJugadores
 * @param {Array<Element>} puntosHTML
 */
export const puntuacion = (carta, turno, puntosJugadores, puntosHTML) => {
  puntosJugadores[turno] = valorCarta(carta, puntosJugadores[turno]);
  puntosHTML[turno].innerText = puntosJugadores[turno];
};
