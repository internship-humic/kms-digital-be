import fs from "fs/promises";
import axios from "axios";
import "dotenv/config";

const BASE_URL = "https://api.binderbyte.com/wilayah";
const API_KEY = process.env.BINDERBYTE_API_KEY;

const http = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

async function get(path, params = {}) {
  const { data } = await http.get(path, { params });
  return Array.isArray(data?.value) ? data.value : [];
}

async function generate() {
  const provinces = (await get("/provinsi")).map((p) => ({
    id: String(p.id),
    name: String(p.name),
  }));

  const regencies = [];
  const districts = [];
  const villages = [];

  for (const province of provinces) {
    const rows = await get("/kabupaten", {
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

  for (const regency of regencies) {
    const rows = await get("/kecamatan", {
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

  for (const district of districts) {
    const rows = await get("/kelurahan", {
      id_kecamatan: district.id,
    });

    villages.push(
      ...rows.map((v) => ({
        id: String(v.id),
        name: String(v.name),
        district_id: String(v.id_kecamatan),
      })),
    );
  }

  await fs.writeFile(
    "./src/database/regions.json",
    JSON.stringify(
      {
        provinces,
        regencies,
        districts,
        villages,
      },
      null,
      2,
    ),
  );

  console.log("regions.json created");
}

generate();
