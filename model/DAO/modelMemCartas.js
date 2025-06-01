class ModelMemCartas {
  #cartas

  constructor() {
    this.#cartas = [
      { id: '1', valor: 5, imagen: 'espada.png' },
      { id: '2', valor: 10, imagen: 'escudo.png' },
      { id: '3', valor: 8, imagen: 'hechizo.png' }
    ]
  }

  obtenerCarta = async (id) => {
    const cartaBuscada = this.#cartas.find(c => c.id === id)
    return cartaBuscada || {}
  }

  obtenerCartas = async () => {
    return this.#cartas
  }

  guardarCarta = async (carta) => {
    carta.id = String(parseInt(this.#cartas[this.#cartas.length - 1]?.id || 0) + 1)
    this.#cartas.push(carta)
    return carta
  }

  actualizarCarta = async (id, datos) => {
    const index = this.#cartas.findIndex(c => c.id === id)

    if (index !== -1) {
      const cartaAnterior = this.#cartas[index]
      const cartaActualizada = { ...cartaAnterior, ...datos }
      this.#cartas.splice(index, 1, cartaActualizada)
      return cartaActualizada
    } else {
      throw new Error('No se pudo actualizar: carta no encontrada')
    }
  }

  borrarCarta = async (id) => {
    const index = this.#cartas.findIndex(c => c.id === id)

    if (index !== -1) {
      const cartaEliminada = this.#cartas.splice(index, 1)[0]
      return cartaEliminada
    } else {
      throw new Error('No se pudo eliminar: carta no encontrada')
    }
  }
}

export default ModelMemCartas