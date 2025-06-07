import { v4 as uuidv4 } from 'uuid'

const tipos = ['piedra', 'papel', 'tijera']

export function generarCartas() {
  const cartas = []
  for (let i = 0; i < 9; i++) {
    const tipo = tipos[Math.floor(Math.random() * tipos.length)]
    cartas.push({ id: uuidv4(), tipo })
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
