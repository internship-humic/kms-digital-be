import "dotenv/config";
import axios from "axios";
import BaseSeeder from "../../common/base_classes/base-seeder.js";

class RegionSeeder extends BaseSeeder {
  constructor() {
    super();

    this.BASE_URL = "https://api.binderbyte.com/wilayah";

    this.API_KEY = process.env.BINDERBYTE_API_KEY || "";

    if (!this.API_KEY) {
      throw new Error(
        "No Binderbyte API key provided. Set BINDERBYTE_API_KEY in .env",
      );
    }

    this.http = axios.create({
      baseURL: this.BASE_URL,
      params: {
        api_key: this.API_KEY,
      },
    });
  }

  async get(path, params = {}) {
    const { data } = await this.http.get(path, { params });
    return Array.isArray(data?.value) ? data.value : [];
  }

  async seed() {
    console.time("seed");

    const provinces = (await this.get("/provinsi")).map((p) => ({
      id: String(p.id),
      name: String(p.name),
    }));

    await this.db.province.createMany({
      data: provinces,
      skipDuplicates: true,
    });

    this.log.info(`Provinces seeded: ${provinces.length}`);

    const regencies = [];

    for (const province of provinces) {
      const rows = await this.get("/kabupaten", {
        id_provinsi: province.id,
      });

      regencies.push(
        ...rows.map((r) => ({
          id: String(r.id),
          name: String(r.name),
          province_id: String(r.id_provinsi),
        })),
      );
    }

    await this.db.regency.createMany({
      data: regencies,
      skipDuplicates: true,
    });

    this.log.info(`Regencies seeded: ${regencies.length}`);

    const districts = [];

    for (const regency of regencies) {
      const rows = await this.get("/kecamatan", {
        id_kabupaten: regency.id,
      });

      districts.push(
        ...rows.map((d) => ({
          id: String(d.id),
          name: String(d.name),
          regency_id: String(d.id_kabupaten),
        })),
      );
    }

    await this.db.district.createMany({
      data: districts,
      skipDuplicates: true,
    });

    this.log.info(`Districts seeded: ${districts.length}`);

    let totalVillages = 0;

    for (const district of districts) {
      const rows = await this.get("/kelurahan", {
        id_kecamatan: district.id,
      });

      const villages = rows.map((v) => ({
        id: String(v.id),
        name: String(v.name),
        district_id: String(v.id_kecamatan),
      }));

      await this.db.village.createMany({
        data: villages,
        skipDuplicates: true,
      });

      totalVillages += villages.length;
    }

    this.log.info(`Villages seeded: ${totalVillages}`);

    console.timeEnd("seed");
  }
}

BaseSeeder.run(async function RegionSeed() {
  const seeder = new RegionSeeder();

  try {
    await seeder.seed();
  } finally {
    await seeder.db.$disconnect();
  }
});

// Contoh penggunaan:
// npm run seed:region
