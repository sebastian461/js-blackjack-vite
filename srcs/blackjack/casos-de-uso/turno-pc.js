import { determinarGanador } from "./determinar-ganador";
import { dibujarCarta } from "./dibujar-carta";
import { pedirCarta } from "./pedir-carta";
import { puntuacion } from "./puntuacion";

/**
 *
 * @param {Number} puntosMinimos
 * @param {Array<Number>} puntosJugadores
 * @param {Array<String>} deck
 * @param {Array<Element>} puntosHTML
 * @param {Array<Element>} cartaHTML
 */
export const turnoPC = (
  puntosMinimos,
  puntosJugadores,
  deck,
  puntosHTML,
  cartaHTML
) => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  const puntosPC = puntosJugadores.length - 1;
  do {
    const carta = pedirCarta(deck);
    puntuacion(carta, puntosPC, puntosJugadores, puntosHTML);
    dibujarCarta(carta, puntosPC, cartaHTML);
    if (puntosJugadores[puntosPC] === 21) break;
  } while (puntosMinimos >= puntosJugadores[puntosPC]);

  determinarGanador(puntosPC, puntosJugadores);
};
