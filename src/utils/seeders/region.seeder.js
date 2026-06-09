import fs from "fs/promises";
import BaseSeeder from "../../common/base_classes/base-seeder.js";

class RegionSeeder extends BaseSeeder {
  async seed() {
    const raw = await fs.readFile("./src/database/data/regions.json", "utf-8");

    const { provinces, regencies, districts, villages } = JSON.parse(raw);

    await this.db.province.createMany({
      data: provinces,
      skipDuplicates: true,
    });

    await this.db.regency.createMany({
      data: regencies,
      skipDuplicates: true,
    });

    await this.db.district.createMany({
      data: districts,
      skipDuplicates: true,
    });

    await this.db.village.createMany({
      data: villages,
      skipDuplicates: true,
    });

    this.log.info("Region seeded successfully");
  }
}

BaseSeeder.run(async function RegionSeed() {
  const seeder = new RegionSeeder();
  await seeder.seed();
});

// Contoh penggunaan:
// npm run seed:region
