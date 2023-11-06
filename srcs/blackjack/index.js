import _ from "underscore";
import { crearDeck } from "./casos-de-uso/crear-deck";
import { pedirCarta } from "./casos-de-uso/pedir-carta";

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

  //Obtiene el valor de la carta extraida
  const valorCarta = (carta, puntos) => {
    const valor = carta.substring(0, carta.length - 1);

    return (puntos += !isNaN(valor)
      ? valor * 1
      : valor === "A"
      ? puntos + 11 > 21
        ? 1
        : 11
      : 10);
  };

  const puntuacion = (carta, turno) => {
    puntosJugadores[turno] = valorCarta(carta, puntosJugadores[turno]);
    puntosHTML[turno].innerText = puntosJugadores[turno];
  };

  const dibujarCarta = (carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.classList.add("carta");
    imgCarta.src = `assets/cartas/${carta}.png`;
    cartaHTML[turno].append(imgCarta);
  };

  const determinarGanador = (puntosPC) => {
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

  //turno PC
  const turnoPC = (puntosMinimos) => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    const puntosPC = puntosJugadores.length - 1;
    do {
      const carta = pedirCarta(deck);
      puntuacion(carta, puntosPC);
      dibujarCarta(carta, puntosPC);
      if (puntosJugadores[puntosPC] === 21) break;
    } while (puntosMinimos >= puntosJugadores[puntosPC]);

    determinarGanador(puntosPC);
  };

  //Eventos
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta(deck);
    console.log(deck);
    puntuacion(carta, 0);
    dibujarCarta(carta, 0);

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
