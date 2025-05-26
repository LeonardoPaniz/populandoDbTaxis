import { cp } from "fs";
import prisma from "../src/config/db.js";
import { faker } from "@faker-js/faker";

const totalPopulation = 10000;
async function main() {
  const clientes = [];
  const taxis = [];
  const cliidSet = new Set(); 

  for (let i = 0; i < totalPopulation; i++) {
    console.log(`🔄 Criando Cliente e Taxi: ${i+1}/${totalPopulation}`);

    let cliid;
    // Gera um cliid único
    do {
      cliid = faker.string.alphanumeric(4).toUpperCase();
    } while (cliidSet.has(cliid));
    cliidSet.add(cliid);

    const cliente = await prisma.cliente.create({
      data: {
        cliid,
        nome: faker.person.fullName(),
        cpf: faker.string.numeric(11),
      },
    });

    const taxi = await prisma.taxi.create({
      data: {
        placa: faker.vehicle.vrm(),
        marca: faker.vehicle.manufacturer(),
        modelo: faker.vehicle.model(),
        anofab: faker.date.past().getFullYear(),
        licenca: faker.string.alphanumeric(8).toUpperCase(),
      },
    });

    clientes.push(cliente.cliid);
    taxis.push(taxi.placa);
  }

  console.log("🚕 Populando corridas...");

  for (let i = 0; i < totalPopulation; i++) {
    console.log(`🧾 Criando Corrida: ${i + 1}/${totalPopulation}`);

    const cliid = faker.helpers.arrayElement(clientes);
    const placa = faker.helpers.arrayElement(taxis);

    await prisma.corrida.create({
      data: {
        cliid,
        placa,
        datapedido: faker.date.past({ years: 2 }),
        valor: Number(faker.commerce.price({ min: 10, max: 500 })),
      },
    });
  }
}

main()
  .then(async () => {
    console.log("✅ População concluída.");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
