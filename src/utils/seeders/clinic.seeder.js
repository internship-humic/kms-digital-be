import BaseSeeder from "../../common/base_classes/base-seeder.js";

class ClinicSeeder extends BaseSeeder {
  constructor() {
    super();
  }

  async seed() {
    console.time("seed");
    const clinics = [
      {
        id: "1",
        name: "Klinik Harapan Sehat",
        address: "Jl. Sudirman No. 456, Bandung",
        village_id: "32.04.08.2001",
      },
      {
        id: "2",
        name: "Klinik Kita Sehat",
        address: "Jl Sudirman No. 456, Bandung",
        village_id: "32.04.08.2002",
      },
      {
        id: "3",
        name: "Klinik Sehat Selalu",
        address: "Jl. Sudirman No. 456, Bandung",
        village_id: "32.04.08.2003",
      },
      {
        id: "4",
        name: "Klinik Semangat Sehat",
        address: "Jl. Sudirman No. 456, Bandung",
        village_id: "32.04.08.2004",
      },
    ];

    await this.db.clinic.createMany({
      data: clinics,
      skipDuplicates: true,
    });

    this.log.info(`Clinics seeded: ${clinics.length}`);

    console.timeEnd("seed");
  }
}

BaseSeeder.run(async function ClinicSeed() {
  const seeder = new ClinicSeeder();
  await seeder.seed();
});

// Contoh penggunaan:
// npm run seed:clinic
