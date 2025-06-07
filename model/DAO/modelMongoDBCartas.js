import { CartaModel } from './models/carta.js'
import CnxMongoDB from "../DBMongo.js"

class ModelMongoDBCartas {


  async obtenerCartas() {
    if (!CnxMongoDB.connectionOK) throw new Error('ERROR CNX BASE DE DATOS!!!')

    const cartas = await CartaModel.find()
    return cartas
  }

  async obtenerCarta(id) {
    if (!CnxMongoDB.connectionOK) throw new Error('ERROR CNX BASE DE DATOS!!!')

    const carta = await CartaModel.findOne({ _id: id })
    return carta
  }

  async guardarCarta(carta) {
    if (!CnxMongoDB.connectionOK) throw new Error('ERROR CNX BASE DE DATOS!!!')

    const cartaModel = new CartaModel(carta)
    const guardado = await cartaModel.save()
    return guardado
  }

  async actualizarCarta(id, carta) {
    if (!CnxMongoDB.connectionOK) throw new Error('ERROR CNX BASE DE DATOS!!!')

    await CartaModel.updateOne({ _id: id }, { $set: carta })
    const actualizado = await this.obtenerCarta(id)
    return actualizado


  }

  async borrarCarta(id) {
    if (!CnxMongoDB.connectionOK) throw new Error('ERROR CNX BASE DE DATOS!!!')

    const borrado = await this.obtenerCarta(id)
    await CartaModel.deleteOne({ _id: id })
    return borrado

  }
}

export default ModelMongoDBCartas
