import { expect } from "chai"
import supertest from "supertest"
import getUsuario from "./generador/usuario.js"

const request = supertest("http://localhost:8080")

// Test para cartas
describe("*** TEST DE CARTAS ***", ()=>{
    describe("GET", ()=>{
        it("Deberia retornar un status 200", async()=>{
            const response = await request.get('/api/cartas')
            expect(response.status).to.eql(200)
        })
    })

    
    // Tests para usuarios
    describe("*** TEST DE USUARIOS ***", ()=>{
        let usuarioCreado = null;

        it("Deberia crear un usuario (caso feliz)", async()=>{
            const usuario = getUsuario()
            const response = await request.post('/api/usuarios').send(usuario)
            expect([200,201]).to.include(response.status)
            expect(response.body).to.include.keys("usuario", "email")
            expect(response.body.usuario).to.eql(usuario.usuario)
            expect(response.body.email).to.eql(usuario.email)
            usuarioCreado = response.body; 
        })

        it("Deberia obtener el usuario creado (GET)", async()=>{
            const response = await request.get(`/api/usuarios/${usuarioCreado._id || usuarioCreado.id}`)
            expect(response.status).to.eql(200)
            expect(response.body).to.include.keys("usuario", "email")
            expect(response.body.email).to.eql(usuarioCreado.email)
        })

        it("Deberia modificar el usuario (PUT)", async()=>{
            const nuevoUsuario = "UsuarioModificado";
            const response = await request.put(`/api/usuarios/${usuarioCreado._id || usuarioCreado.id}`)
                .send({ usuario: nuevoUsuario })
            expect(response.status).to.eql(200)
            expect(response.body.usuario).to.eql(nuevoUsuario)
        })

        it("Deberia eliminar el usuario (DELETE)", async()=>{
            const response = await request.delete(`/api/usuarios/${usuarioCreado._id || usuarioCreado.id}`)
            expect([200,204]).to.include(response.status)
        })

        it("No deberia crear un usuario sin email (caso no feliz)", async()=>{
            const usuario = { usuario: "TestUser", password: "123456" }
            const response = await request.post('/api/usuarios').send(usuario)
            expect(response.status).to.not.eql(200)
        })

        it("No deberia crear un usuario con email invalido (caso no feliz)", async()=>{
            const usuario = { usuario: "TestUser", email: "noesunemail", password: "123456" }
            const response = await request.post('/api/usuarios').send(usuario)
            expect(response.status).to.not.eql(200)
        })
    })
})