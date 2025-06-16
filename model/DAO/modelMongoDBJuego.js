import { SalaModel } from './models/sala.js'

class ModelMongoDBJuego {
  constructor(id = 'sala-unica') {
    this.id = id
  }

  async cargarSala() {
    const sala = await SalaModel.findById(this.id)
    return sala || null
  }

  async guardarSala(sala) {
    sala._id = this.id  // asegurar el ID único
    await SalaModel.findByIdAndUpdate(this.id, sala, { upsert: true })
  }
}

export default ModelMongoDBJuego
