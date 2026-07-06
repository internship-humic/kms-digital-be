import BaseSeeder from "../../common/base_classes/base-seeder.js";

class ArticleSeeder extends BaseSeeder {
  constructor() {
    super();
  }

  async seed() {
    console.time("seed");

    const articles = [
      {
        id: "1",
        title: "Pentingnya Imunisasi Dasar Lengkap",
        description:
          "Kenali manfaat imunisasi dasar lengkap untuk melindungi anak dari penyakit berbahaya.",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Imunisasi merupakan salah satu cara terbaik untuk melindungi anak dari berbagai penyakit menular.",
                },
              ],
            },
          ],
        },
        cover_image:
          "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
        writer_name: "Dr. Andi Saputra",
        writer_identity: "Dokter Anak",
        type: "HEALTH",
      },
      {
        id: "2",
        title: "Menu MPASI Bergizi Seimbang",
        description:
          "Contoh menu MPASI bergizi untuk mendukung tumbuh kembang balita.",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "MPASI sebaiknya mengandung karbohidrat, protein, lemak, vitamin, dan mineral.",
                },
              ],
            },
          ],
        },
        cover_image:
          "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80",
        writer_name: "Nadia Putri, S.Gz",
        writer_identity: "Ahli Gizi",
        type: "NUTRITION",
      },
      {
        id: "3",
        title: "Kegiatan Posyandu Bulan Juli",
        description:
          "Dokumentasi kegiatan pemeriksaan balita dan penyuluhan kesehatan.",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Posyandu bulan Juli diikuti oleh lebih dari 100 balita.",
                },
              ],
            },
          ],
        },
        cover_image:
          "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
        writer_name: "Admin Posyandu",
        writer_identity: "Administrator",
        type: "ACTIVITY",
      },
      {
        id: "4",
        title: "Cara Mencegah Stunting Sejak Dini",
        description:
          "Pencegahan stunting dimulai sejak masa kehamilan hingga usia dua tahun.",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Pemenuhan gizi ibu hamil dan balita sangat penting untuk mencegah stunting.",
                },
              ],
            },
          ],
        },
        cover_image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
        writer_name: "Dr. Rina Amelia",
        writer_identity: "Dokter Umum",
        type: "HEALTH",
      },
      {
        id: "5",
        title: "Makanan Tinggi Protein untuk Balita",
        description:
          "Daftar makanan tinggi protein yang baik untuk pertumbuhan anak.",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Telur, ikan, ayam, tahu, dan tempe merupakan sumber protein yang baik.",
                },
              ],
            },
          ],
        },
        cover_image:
          "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80",
        writer_name: "Nadia Putri, S.Gz",
        writer_identity: "Ahli Gizi",
        type: "NUTRITION",
      },
      {
        id: "6",
        title: "Posyandu Mengadakan Lomba Balita Sehat",
        description:
          "Kegiatan lomba balita sehat dalam rangka meningkatkan kesadaran masyarakat.",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Lomba balita sehat diikuti oleh puluhan peserta dari berbagai desa.",
                },
              ],
            },
          ],
        },
        cover_image:
          "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80",
        writer_name: "Admin Posyandu",
        writer_identity: "Administrator",
        type: "ACTIVITY",
      },
    ];

    await this.db.article.createMany({
      data: articles,
      skipDuplicates: true,
    });

    this.log.info(`Articles seeded: ${articles.length}`);

    console.timeEnd("seed");
  }
}

BaseSeeder.run(async function ArticleSeed() {
  const seeder = new ArticleSeeder();
  await seeder.seed();
});

// Contoh penggunaan:
// npm run seed:article
