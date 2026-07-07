import BaseSeeder from "../../common/base_classes/base-seeder.js";
import Roles from "../../common/enums/user-roles.enum.js";

class NotificationSeeder extends BaseSeeder {
  constructor() {
    super();
  }

  async seed() {
    console.time("seed");

    const parents = await this.db.parents.findMany({ take: 5 });
    const cadres = await this.db.cadre.findMany({ take: 5 });

    if (parents.length === 0 && cadres.length === 0) {
      this.log.warn(
        "No parents or cadres found in the database. Please run other seeders first.",
      );
      return;
    }

    const notifications = [];

    for (const parent of parents) {
      notifications.push(
        {
          recipient_id: parent.id,
          recipient_role: Roles.Parents,
          title: "Status Gizi Anak",
          message: `Halo ${parent.name}, pengukuran bulanan anak Anda telah diperbarui. Silakan cek detailnya.`,
          category: "MEASUREMENT",
          is_read: false,
        },
        {
          recipient_id: parent.id,
          recipient_role: Roles.Parents,
          title: "Jadwal Posyandu Bulan Ini",
          message:
            "Jangan lupa hadir ke Posyandu minggu depan pada tanggal 15 Juli 2026.",
          category: "SCHEDULE",
          is_read: true,
        },
        {
          recipient_id: parent.id,
          recipient_role: Roles.Parents,
          title: "Artikel Kesehatan Baru",
          message:
            "Baca artikel terbaru kami mengenai MPASI bergizi untuk tumbuh kembang anak.",
          category: "ARTICLE",
          is_read: false,
        },
      );
    }

    for (const cadre of cadres) {
      notifications.push(
        {
          recipient_id: cadre.id,
          recipient_role: Roles.Cadre,
          title: "Jadwal Posyandu Rutin",
          message: `Halo ${cadre.name}, jadwal pelaksanaan posyandu bulan ini telah ditentukan. Silakan lakukan persiapan.`,
          category: "SCHEDULE",
          is_read: false,
        },
        {
          recipient_id: cadre.id,
          recipient_role: Roles.Cadre,
          title: "Pengumuman Akun",
          message:
            "Akun kader Anda telah aktif sepenuhnya di platform JagaCilik.",
          category: "ACCOUNT",
          is_read: true,
        },
      );
    }

    let seededCount = 0;
    for (const notif of notifications) {
      await this.db.notification.create({
        data: notif,
      });
      seededCount++;
    }

    this.log.info(`Notifications seeded: ${seededCount}`);
    console.timeEnd("seed");
  }
}

BaseSeeder.run(async function NotificationSeed() {
  const seeder = new NotificationSeeder();
  await seeder.seed();
});
