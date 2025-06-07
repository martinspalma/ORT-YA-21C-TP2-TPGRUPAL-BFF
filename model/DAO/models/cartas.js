import mongoose from 'mongoose'

const CartaSchema = new mongoose.Schema({
  id: { type: String },
  valor: { type: Number},
  imagen: { type: String },
  tipo: { 
    type: String, 
    enum: ['piedra', 'papel', 'tijera'] 
  }
}, { versionKey: false })

export const CartaModel = mongoose.model('carta', CartaSchema)
