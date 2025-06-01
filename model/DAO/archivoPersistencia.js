import fs from 'fs'

class ArchivoPersistencia {
    #ruta

    constructor(ruta) {
        this.#ruta = ruta
    }

    leer = async () => {
        try {
            return JSON.parse(await fs.promises.readFile(this.#ruta, 'utf-8'))
        } catch {
            return []
        }
    }

    escribir = async (data) => {
        await fs.promises.writeFile(this.#ruta, JSON.stringify(data, null, '\t'))
    }
}

export default ArchivoPersistencia