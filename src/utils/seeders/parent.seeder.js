import bcrypt from "bcrypt";
import BaseSeeder from "../../common/base_classes/base-seeder.js";

class ParentsSeeder extends BaseSeeder {
  constructor() {
    super();
  }

  async seed() {
    console.time("seed");

    const clinics = await this.db.clinic.findMany({
      orderBy: {
        id: "asc",
      },
    });

    const parents = [];
    let counter = 1;

    for (const clinic of clinics) {
      for (let i = 1; i <= 2; i++) {
        parents.push({
          id: `${counter}`,
          name: `Parent ${counter}`,
          email: `parent${counter}@gmail.com`,
          password: await bcrypt.hash("password123", 10),
          address: `Jl. Mawar No. ${counter}, Bandung`,
          clinic_id: clinic.id,
          phone_number: `081234567${String(counter).padStart(3, "0")}`,
        });

        counter++;
      }
    }

    await this.db.parents.createMany({
      data: parents,
      skipDuplicates: true,
    });

    this.log.info(`Parents seeded: ${parents.length}`);

    console.timeEnd("seed");
  }
}

BaseSeeder.run(async function ParentsSeed() {
  const seeder = new ParentsSeeder();
  await seeder.seed();
});
