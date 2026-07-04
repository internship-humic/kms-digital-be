import bcrypt from "bcryptjs";
import BaseSeeder from "../../common/base_classes/base-seeder.js";

class CadreSeeder extends BaseSeeder {
  constructor() {
    super();
  }

  async seed() {
    console.time("seed");

    const clinics = await this.db.clinic.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const password = await bcrypt.hash("Cadre123", 10);

    let total = 0;

    for (const clinic of clinics) {
      const cadres = [
        {
          name: `${clinic.name} Cadre 1`,
          email: `cadre1_clinic${clinic.id}@gmail.com`,
          password,
          clinic_id: clinic.id,
        },
        {
          name: `${clinic.name} Cadre 2`,
          email: `cadre2_clinic${clinic.id}@gmail.com`,
          password,
          clinic_id: clinic.id,
        },
      ];

      for (const cadre of cadres) {
        const exists = await this.db.cadre.findUnique({
          where: {
            email: cadre.email,
          },
        });

        if (!exists) {
          await this.db.cadre.create({
            data: cadre,
          });

          total++;
        }
      }
    }

    this.log.info(`Cadres seeded: ${total}`);

    console.timeEnd("seed");
  }
}

BaseSeeder.run(async function CadreSeed() {
  const seeder = new CadreSeeder();
  await seeder.seed();
});

// Contoh penggunaan:
// npm run seed:cadre
