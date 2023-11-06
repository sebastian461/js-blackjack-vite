import _ from "underscore";
import {
  crearDeck,
  determinarGanador,
  pedirCarta,
  puntuacion,
  dibujarCarta,
} from "./casos-de-uso";

(() => {
  /* 
    C = trebol
    D = diamante
    H = corazón
    S = rombo
  */

  let deck = [],
    puntosJugadores = [];

  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  //Referencias HTML
  const btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    btnNuevo = document.querySelector("#btnNuevo");

  const puntosHTML = document.querySelectorAll("small"),
    cartaHTML = document.querySelectorAll(".div-cartas");

  //Barajear deck
  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck(tipos, especiales);
    cartaHTML.forEach((c) => (c.innerHTML = ""));
    puntosHTML.forEach((p) => (p.innerText = 0));
    btnDetener.disabled = false;
    btnPedir.disabled = false;
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) puntosJugadores.push(0);
  };

  //turno PC
  const turnoPC = (puntosMinimos) => {
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

  //Eventos
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta(deck);
    puntuacion(carta, 0, puntosJugadores, puntosHTML);
    dibujarCarta(carta, 0, cartaHTML);

    if (puntosJugadores[0] > 21) {
      turnoPC(0);
    } else if (puntosJugadores[0] === 21) {
      turnoPC(puntosJugadores[0]);
    }
  }); //Una función que pasa por argumento de otra otra función es un Callback

  btnDetener.addEventListener("click", () => {
    turnoPC(puntosJugadores[0]);
  });

  btnNuevo.addEventListener("click", () => {
    inicializarJuego();
  });

  inicializarJuego();
})();
