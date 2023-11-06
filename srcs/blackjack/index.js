import _ from "underscore";
import {
  crearDeck,
  dibujarCarta,
  pedirCarta,
  puntuacion,
  turnoPC,
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

  //Eventos
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta(deck);
    puntuacion(carta, 0, puntosJugadores, puntosHTML);
    dibujarCarta(carta, 0, cartaHTML);

    if (puntosJugadores[0] > 21) {
      turnoPC(0, puntosJugadores, deck, puntosHTML, cartaHTML);
    } else if (puntosJugadores[0] === 21) {
      turnoPC(puntosJugadores[0], puntosJugadores, deck, puntosHTML, cartaHTML);
    }
  }); //Una función que pasa por argumento de otra otra función es un Callback

  btnDetener.addEventListener("click", () => {
    turnoPC(puntosJugadores[0], puntosJugadores, deck, puntosHTML, cartaHTML);
  });

  btnNuevo.addEventListener("click", () => {
    inicializarJuego();
  });

  inicializarJuego();
})();
