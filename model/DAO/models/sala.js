import mongoose from 'mongoose'

const SalaSchema = new mongoose.Schema({
  _id: { type: String, default: 'sala-unica' }, 
  jugadores: { type: [Object], default: [] },
  comenzado: { type: Boolean, default: false },
  ronda: { type: Number, default: 1 },
  finalizada: { type: Boolean, default: false },
  resultado: { type: Object, default: null },
  estado: { type: String, default: 'esperando-orden' }
}, { versionKey: false })

export const SalaModel = mongoose.model('sala', SalaSchema)

