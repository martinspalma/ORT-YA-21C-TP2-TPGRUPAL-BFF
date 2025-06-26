import fs from 'fs/promises'

class JuegoPersistenciaArchivo {
  constructor(rutaArchivo = './data/sala.out') {
    this.rutaArchivo = rutaArchivo
  }

  async cargarSala() {
    try {
      const data = await fs.readFile(this.rutaArchivo, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      if (error.code === 'ENOENT') return null
      throw error
    }
  }

  async guardarSala(sala) {
    await fs.writeFile(this.rutaArchivo, JSON.stringify(sala, null, 2))
  }
}

export default JuegoPersistenciaArchivo
