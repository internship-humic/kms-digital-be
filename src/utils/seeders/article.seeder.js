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
        title: "Pentingnya Imunisasi Dasar Lengkap untuk Bayi dan Balita",
        description:
          "Imunisasi dasar lengkap membantu melindungi anak dari berbagai penyakit berbahaya dan meningkatkan kekebalan tubuh sejak dini.",
        content: {
          type: "doc",
          content: [
            {
              type: "heading",
              attrs: {
                level: 1,
              },
              content: [
                {
                  type: "text",
                  text: "Mengapa Imunisasi Sangat Penting?",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Imunisasi merupakan salah satu upaya pencegahan penyakit yang paling efektif. Dengan memberikan vaksin sesuai jadwal, tubuh anak akan membentuk kekebalan terhadap penyakit tertentu sehingga risiko sakit berat dapat dikurangi.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Program imunisasi dasar telah terbukti menurunkan angka kesakitan dan kematian akibat penyakit menular seperti campak, polio, difteri, hepatitis B, dan tuberkulosis.",
                },
              ],
            },
            {
              type: "heading",
              attrs: {
                level: 2,
              },
              content: [
                {
                  type: "text",
                  text: "Manfaat Imunisasi",
                },
              ],
            },
            {
              type: "bulletList",
              content: [
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Melindungi anak dari penyakit berbahaya.",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Membantu membentuk kekebalan kelompok (herd immunity).",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Mengurangi biaya pengobatan akibat penyakit serius.",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "image",
              attrs: {
                src: "https://images.unsplash.com/photo-1584515933487-779824d29309",
                alt: "Dokter sedang memberikan imunisasi",
                title: "Proses imunisasi",
              },
            },
            {
              type: "heading",
              attrs: {
                level: 2,
              },
              content: [
                {
                  type: "text",
                  text: "Jadwal Imunisasi",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Orang tua sebaiknya mengikuti jadwal imunisasi yang telah ditetapkan oleh tenaga kesehatan. Jika ada jadwal yang terlewat, konsultasikan dengan dokter atau petugas kesehatan untuk mendapatkan imunisasi kejar.",
                },
              ],
            },
            {
              type: "blockquote",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Lebih baik mencegah daripada mengobati. Imunisasi adalah investasi kesehatan jangka panjang bagi anak.",
                    },
                  ],
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Pastikan anak berada dalam kondisi sehat saat menerima imunisasi dan selalu simpan buku KIA untuk memantau riwayat vaksinasi.",
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
        title: "Menerapkan Gizi Seimbang untuk Mendukung Tumbuh Kembang Balita",
        description:
          "Gizi seimbang sangat penting untuk mendukung pertumbuhan fisik, perkembangan otak, dan daya tahan tubuh balita.",
        content: {
          type: "doc",
          content: [
            {
              type: "heading",
              attrs: {
                level: 1,
              },
              content: [
                {
                  type: "text",
                  text: "Apa Itu Gizi Seimbang?",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Gizi seimbang adalah pola makan yang mengandung berbagai zat gizi dalam jumlah dan jenis yang sesuai dengan kebutuhan tubuh. Pada masa balita, pemenuhan gizi menjadi sangat penting karena merupakan periode emas pertumbuhan dan perkembangan.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Anak yang memperoleh asupan gizi yang baik cenderung memiliki daya tahan tubuh lebih kuat, pertumbuhan tinggi dan berat badan yang optimal, serta kemampuan belajar yang lebih baik.",
                },
              ],
            },
            {
              type: "image",
              attrs: {
                src: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
                alt: "Makanan sehat untuk balita",
                title: "Menu Gizi Seimbang",
              },
            },
            {
              type: "heading",
              attrs: {
                level: 2,
              },
              content: [
                {
                  type: "text",
                  text: "Komponen Gizi Seimbang",
                },
              ],
            },
            {
              type: "bulletList",
              content: [
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Karbohidrat sebagai sumber energi utama.",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Protein hewani dan nabati untuk pertumbuhan jaringan tubuh.",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Sayur dan buah sebagai sumber vitamin, mineral, dan serat.",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Lemak sehat untuk perkembangan otak dan penyerapan vitamin.",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Air putih yang cukup setiap hari agar tubuh tetap terhidrasi.",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "heading",
              attrs: {
                level: 2,
              },
              content: [
                {
                  type: "text",
                  text: "Contoh Menu Harian",
                },
              ],
            },
            {
              type: "orderedList",
              content: [
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Sarapan: Bubur ayam dengan telur rebus dan buah pisang.",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Makan siang: Nasi, ikan, tumis bayam, dan jeruk.",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Camilan: Yogurt tanpa gula atau potongan buah segar.",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Makan malam: Sup ayam dengan wortel, kentang, dan tahu.",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "blockquote",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Tidak ada satu jenis makanan yang dapat memenuhi seluruh kebutuhan gizi anak. Variasi makanan adalah kunci gizi seimbang.",
                    },
                  ],
                },
              ],
            },
            {
              type: "heading",
              attrs: {
                level: 2,
              },
              content: [
                {
                  type: "text",
                  text: "Tips untuk Orang Tua",
                },
              ],
            },
            {
              type: "bulletList",
              content: [
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Sajikan makanan dengan warna yang beragam agar lebih menarik.",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Batasi konsumsi makanan tinggi gula, garam, dan lemak jenuh.",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Ajak anak makan bersama keluarga untuk membangun kebiasaan makan yang baik.",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Lakukan pemantauan berat badan dan tinggi badan secara rutin di Posyandu.",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Dengan menerapkan pola makan bergizi seimbang sejak dini, orang tua dapat membantu anak tumbuh sehat, aktif, dan memiliki fondasi yang kuat untuk perkembangan di masa depan.",
                },
              ],
            },
          ],
        },
        cover_image:
          "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
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
