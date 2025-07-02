import { faker } from "@faker-js/faker"

const getUsuario = () => {
  let username = faker.internet.username().replace(/[^a-zA-Z0-9]/g, '').slice(0, 18);
  
  if (username.length < 5) {
    username += faker.string.numeric(5 - username.length);
  }
  return {
    usuario: username,
    email: faker.internet.email(),
    fechaNac: faker.date.past({ years: 20 }).toISOString().split('T')[0],
    contrasenia: "Aa1!test",
    wins: 0,
    losses: 0,
    draws: 0,
    pfp: faker.image.avatar()
  }
}

export default getUsuario