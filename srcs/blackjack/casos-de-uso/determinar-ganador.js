/**
 *
 * @param {Number} puntosPC
 * @param {Array<Number>} puntosJugadores
 */
export const determinarGanador = (puntosPC, puntosJugadores) => {
  setTimeout(() => {
    const mensaje =
      puntosJugadores[0] === puntosJugadores[puntosPC]
        ? "Empate"
        : puntosJugadores[0] > 21 ||
          (puntosJugadores[0] < 21 &&
            puntosJugadores[0] < puntosJugadores[puntosPC] &&
            puntosJugadores[puntosPC] <= 21)
        ? "Perdiste"
        : "Ganaste";
    alert(mensaje);
  }, 100);
};
