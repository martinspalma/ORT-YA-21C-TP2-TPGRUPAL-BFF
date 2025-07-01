import {faker} from "@faker-js/faker"

const get = _ => ({
    valor: faker.number.int({min: 0, max: 17}),
    tipo: faker.helpers.arrayElement(['piedra', 'papel', 'tijera'])
})
