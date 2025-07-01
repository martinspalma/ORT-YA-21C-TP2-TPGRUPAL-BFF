import { v4 as uuidv4 } from 'uuid'

const ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
const tipos = ['piedra', 'papel', 'tijera']
//const CONT_I_PIEDRA = 0;
const CONT_I_TIJERA = 6;
const CONT_I_PAPEL = 12;

function generarCartas() {
  const cartas = []
  for (let i = 0; i < 9; i++) {
    const tipo = tipos[Math.floor(Math.random() * tipos.length)]
    let pos_id = Math.floor(Math.random() * 6);
    if(tipo == 'tijera') pos_id += CONT_I_TIJERA;
    if(tipo == 'papel') pos_id += CONT_I_PAPEL;
    cartas.push({id: ids[pos_id], tipo: tipo, pos_card: null})
    //cartas.push({ id: uuidv4(), tipo })
  }
  return cartas
}

export function repartirCartas(sala) {
  sala.jugadores.forEach(j => {
    j.cartas = generarCartas()
    j.ordenadas = false
  })
  sala.comenzado = false
}
