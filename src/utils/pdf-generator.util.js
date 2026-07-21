import PDFDocument from "pdfkit";
import { growthChart } from "./kms-chart.util.js";
import BeratBadanLakiLaki from "../database/z-score/BeratBadanLakiLaki.json" with { type: "json" };
import BeratBadanPerempuan from "../database/z-score/BeratBadanPerempuan.json" with { type: "json" };
import PanjangBadanLakiLaki from "../database/z-score/PanjangBadanLakiLaki.json" with { type: "json" };
import PanjangBadanPerempuan from "../database/z-score/PanjangBadanPerempuan.json" with { type: "json" };
import LingkarKepalaLakiLaki from "../database/z-score/LingkarKepalaLakiLaki.json" with { type: "json" };
import LingkarKepalaPerempuan from "../database/z-score/LingkarKepalaPerempuan.json" with { type: "json" };

const colors = {
  primary: "#2563eb",
  primaryLight: "#dbeafe",
  textMain: "#191c1e",
  textSecondary: "#6b6b6b",
  iconMuted: "#434655",
  border: "#c3c6d7",
  bgLight: "#f8fafc",
  success: "#1db954",
  warning: "#f57c00",
  danger: "#ba1a1a",
};

const getInitials = (name) => {
  const names = name.trim().split(/\s+/);
  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  }
  return names[0] ? names[0][0].toUpperCase() : "B";
};

const formatDateId = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const formatAge = (birthDateStr, baseDateStr = new Date()) => {
  const birthDate = new Date(birthDateStr);
  const baseDate = new Date(baseDateStr);
  let months = (baseDate.getFullYear() - birthDate.getFullYear()) * 12;
  months -= birthDate.getMonth();
  months += baseDate.getMonth();

  if (baseDate.getDate() < birthDate.getDate()) {
    months--;
  }

  if (months < 0) return "0 Bulan";

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  let ageStr = "";
  if (years > 0) ageStr += `${years} Tahun `;
  if (remainingMonths > 0 || years === 0) ageStr += `${remainingMonths} Bulan`;
  return ageStr.trim();
};

const drawRowWithWrapping = (doc, y, columns, values, options = {}) => {
  const { isHeader = false, rowBg = null } = options;

  let maxHeight = isHeader ? 15 : 20;

  if (!isHeader) {
    columns.forEach((col, idx) => {
      const val = String(values[idx] ?? "-");
      const height = doc.heightOfString(val, { width: col.width - 6 });
      if (height > maxHeight) {
        maxHeight = height;
      }
    });
  }

  maxHeight += 8;

  if (rowBg) {
    doc.rect(40, y - 4, 515, maxHeight).fill(rowBg);
  }

  let x = 40;
  doc.fontSize(isHeader ? 9 : 8);
  doc.font(isHeader ? "Helvetica-Bold" : "Helvetica");
  doc.fillColor(isHeader ? "#ffffff" : colors.textMain);

  columns.forEach((col, idx) => {
    const val = String(values[idx] ?? "-");
    const align = col.align || "left";
    doc.text(val, x + 3, y, {
      width: col.width - 6,
      align: align,
    });
    x += col.width;
  });

  return maxHeight;
};

export const generateChildReport = (stream, child, measurements, clinic) => {
  const doc = new PDFDocument({ size: "A4", margin: 40 });
  doc.pipe(stream);

  doc.rect(40, 40, 515, 6).fill(colors.primary);

  doc.fillColor(colors.primary);
  doc.font("Helvetica-Bold").fontSize(22);
  doc.text("KMS Digital", 40, 60);

  doc.fillColor(colors.textSecondary);
  doc.font("Helvetica").fontSize(9);
  doc.text("Pantau tumbuh kembang anak sesuai standar WHO", 40, 85);

  const currentDateStr = formatDateId(new Date());
  doc.text(`Tanggal Cetak: ${currentDateStr}`, 410, 65, { align: "right" });

  doc
    .moveTo(40, 100)
    .lineTo(555, 100)
    .strokeColor(colors.border)
    .lineWidth(0.5)
    .stroke();

  const cardY = 115;
  const cardH = 80;

  doc.roundedRect(40, cardY, 515, cardH, 8).fill("#ffffff");
  doc
    .roundedRect(40, cardY, 515, cardH, 8)
    .strokeColor(colors.border)
    .lineWidth(1)
    .stroke();

  const circleX = 75;
  const circleY = cardY + 40;
  const circleR = 25;
  doc.circle(circleX, circleY, circleR).fill(colors.primaryLight);
  doc
    .circle(circleX, circleY, circleR)
    .strokeColor(colors.border)
    .lineWidth(0.5)
    .stroke();

  doc.fillColor(colors.primary);
  doc.font("Helvetica-Bold").fontSize(20);
  const initials = getInitials(child.name);
  doc.text(initials, circleX - 15, circleY - 7, { width: 30, align: "center" });

  doc.fillColor(colors.textMain);
  doc.font("Helvetica-Bold").fontSize(15);
  doc.text(child.name, 115, cardY + 22, { width: 300 });

  const genderText = child.gender === "MALE" ? "Laki-Laki" : "Perempuan";
  const ageText = formatAge(child.birth_date);
  doc.fillColor(colors.textSecondary);
  doc.font("Helvetica").fontSize(10);
  doc.text(`${genderText}  \u2022  ${ageText}`, 115, cardY + 44);

  let statusText = "NORMAL";
  let statusColor = colors.success;
  let statusLabel = "Sesuai Track";

  if (child.status === "LOWRISK" || child.status === "LOW_RISK") {
    statusText = "LOW RISK";
    statusColor = colors.warning;
    statusLabel = "Risiko Rendah";
  } else if (child.status === "HIGHRISK" || child.status === "HIGH_RISK") {
    statusText = "HIGH RISK";
    statusColor = colors.danger;
    statusLabel = "Risiko Tinggi";
  }

  const badgeW = 90;
  const badgeH = 22;
  const badgeX = 450;
  const badgeY = cardY + 29;

  doc.roundedRect(badgeX, badgeY, badgeW, badgeH, 11).fill(statusColor);
  doc.fillColor("#ffffff");
  doc.font("Helvetica-Bold").fontSize(8);
  doc.text(statusText, badgeX, badgeY + 7, { width: badgeW, align: "center" });

  const gridY = 210;
  const gridH = 85;
  const gridW = 250;

  const latest = measurements[0] || null;
  const prev = measurements[1] || null;

  doc.roundedRect(40, gridY, gridW, gridH, 8).fill("#ffffff");
  doc
    .roundedRect(40, gridY, gridW, gridH, 8)
    .strokeColor(colors.border)
    .lineWidth(1)
    .stroke();

  doc.fillColor(colors.iconMuted);
  doc.font("Helvetica-Bold").fontSize(9);
  doc.text("Pengukuran Terakhir", 52, gridY + 12);

  if (latest) {
    doc.fillColor(colors.textMain);
    doc.font("Helvetica-Bold").fontSize(20);
    const weight = `${latest.body_weight}`;

    doc.text(weight, 52, gridY + 25);

    doc.text("kg", 52 + doc.widthOfString(weight) + 5, gridY + 25);

    let trendStr = "+0.0 kg";
    if (prev) {
      const diff = latest.body_weight - prev.body_weight;
      trendStr = diff > 0 ? `+${diff.toFixed(1)} kg` : `${diff.toFixed(1)} kg`;
    }

    doc.fillColor(colors.primary);
    doc.font("Helvetica-Bold").fontSize(9);
    doc.text(`Trend: ${trendStr}`, 52, gridY + 62);
  } else {
    doc.fillColor(colors.textSecondary);
    doc.font("Helvetica").fontSize(11);
    doc.text("Belum ada data", 52, gridY + 35);
  }

  const box2X = 305;
  doc.roundedRect(box2X, gridY, gridW, gridH, 8).fill("#ffffff");
  doc
    .roundedRect(box2X, gridY, gridW, gridH, 8)
    .strokeColor(colors.border)
    .lineWidth(1)
    .stroke();

  doc.fillColor(colors.iconMuted);
  doc.font("Helvetica-Bold").fontSize(9);
  doc.text("Status Terkini", box2X + 12, gridY + 12);

  doc.circle(box2X + 18, gridY + 38, 5).fill(statusColor);

  doc.fillColor(statusColor);
  doc.font("Helvetica-Bold").fontSize(13);
  doc.text(statusLabel, box2X + 30, gridY + 32);

  doc.fillColor(colors.textSecondary);
  doc.font("Helvetica").fontSize(8);

  let interventionText = "Tidak ada intervensi aktif";
  if (child.intervention?.is_intervented) {
    const list = [];
    if (child.intervention.referral) list.push("Rujukan");
    if (child.intervention.supplement) list.push("Suplemen");
    if (child.intervention.education) list.push("Edukasi");
    interventionText = `Intervensi: ${list.join(", ") || "Terpantau"}`;
  }
  doc.text(interventionText, box2X + 12, gridY + 62, { width: gridW - 24 });

  doc.fillColor(colors.primary);
  doc.font("Helvetica-Bold").fontSize(13);
  doc.text("Grafik Pertumbuhan", 40, 315);

  const whoWeight =
    child.gender === "MALE" ? BeratBadanLakiLaki : BeratBadanPerempuan;

  const whoHeight =
    child.gender === "MALE" ? PanjangBadanLakiLaki : PanjangBadanPerempuan;

  const whoHead =
    child.gender === "MALE" ? LingkarKepalaLakiLaki : LingkarKepalaPerempuan;

  growthChart(doc, measurements, whoWeight, {
    x: 40,
    y: 340,
    width: 515,
    height: 210,
    title: "Berat Badan Menurut Umur",
    unit: "kg",
    valueKey: "body_weight",
  });

  doc.addPage();

  growthChart(doc, measurements, whoHeight, {
    x: 40,
    y: 90,
    width: 515,
    height: 210,
    title: "Tinggi Badan Menurut Umur",
    unit: "cm",
    valueKey: "body_height",
  });

  growthChart(doc, measurements, whoHead, {
    x: 40,
    y: 330,
    width: 515,
    height: 210,
    title: "Lingkar Kepala Menurut Umur",
    unit: "cm",
    valueKey: "head_circumference",
  });

  doc.addPage();

  doc.rect(40, 40, 515, 6).fill(colors.primary);

  doc.fillColor(colors.primary);
  doc.font("Helvetica-Bold").fontSize(13);
  doc.text("Riwayat Pengukuran", 40, 60);

  const tableCols = [
    { title: "Umur", width: 55, align: "center" },
    { title: "Tanggal", width: 75, align: "left" },
    { title: "Berat (kg)", width: 60, align: "right" },
    { title: "Tinggi (cm)", width: 60, align: "right" },
    { title: "LK (cm)", width: 55, align: "right" },
    { title: "Metrik Z-Score", width: 110, align: "center" },
    { title: "Status/Keterangan", width: 100, align: "left" },
  ];

  let tableY = 85;
  drawRowWithWrapping(
    doc,
    tableY,
    tableCols,
    tableCols.map((c) => c.title),
    {
      isHeader: true,
      rowBg: colors.primary,
    },
  );

  tableY += 23;

  if (measurements.length === 0) {
    doc.fillColor(colors.textSecondary);
    doc.font("Helvetica-Oblique").fontSize(9);
    doc.text("Tidak ada riwayat pengukuran", 40, tableY + 10, {
      align: "center",
      width: 515,
    });
  } else {
    measurements.forEach((m, idx) => {
      if (tableY > 740) {
        doc.addPage();

        doc.rect(40, 40, 515, 6).fill(colors.primary);

        tableY = 60;
        drawRowWithWrapping(
          doc,
          tableY,
          tableCols,
          tableCols.map((c) => c.title),
          {
            isHeader: true,
            rowBg: colors.primary,
          },
        );
        tableY += 23;
      }

      const rowBg = idx % 2 === 1 ? colors.bgLight : "#ffffff";

      const ageLabel = `${m.age_month} Bulan`;
      const dateLabel = formatDateId(m.measurement_date);
      const weightLabel = m.body_weight ? m.body_weight.toFixed(1) : "-";
      const heightLabel = m.body_height ? m.body_height.toFixed(1) : "-";
      const headLabel = m.head_circumference
        ? m.head_circumference.toFixed(1)
        : "-";

      const zBB = m.zscore_bb ? m.zscore_bb.toFixed(1) : "-";
      const zTB = m.zscore_tb ? m.zscore_tb.toFixed(1) : "-";
      const zGizi = m.zscore_gizi ? m.zscore_gizi.toFixed(1) : "-";
      const zScoreLabel = `BB: ${zBB} | TB: ${zTB} | Gz: ${zGizi}`;

      const descLabel = m.description || "-";

      const rowHeight = drawRowWithWrapping(
        doc,
        tableY,
        tableCols,
        [
          ageLabel,
          dateLabel,
          weightLabel,
          heightLabel,
          headLabel,
          zScoreLabel,
          descLabel,
        ],
        {
          isHeader: false,
          rowBg: rowBg,
        },
      );

      doc
        .moveTo(40, tableY + rowHeight - 4)
        .lineTo(555, tableY + rowHeight - 4)
        .strokeColor(colors.border)
        .lineWidth(0.3)
        .stroke();

      tableY += rowHeight;
    });
  }

  const footerY = 800;
  doc.fontSize(7).fillColor(colors.textSecondary);
  doc.text(
    "Laporan ini diunduh secara otomatis dari sistem Posyandu JagaCilik.",
    40,
    footerY,
    { align: "center", width: 515 },
  );

  doc.end();
};

export const generateClinicReport = (
  stream,
  clinic,
  cadreName,
  childrenList,
) => {
  const doc = new PDFDocument({ size: "A4", margin: 40 });
  doc.pipe(stream);

  doc.rect(40, 40, 515, 6).fill(colors.primary);

  doc.fillColor(colors.primary);
  doc.font("Helvetica-Bold").fontSize(20);
  doc.text("LAPORAN DATA BALITA POSYANDU", 40, 60);

  const currentDateStr = formatDateId(new Date());
  doc.fillColor(colors.textSecondary);
  doc.font("Helvetica").fontSize(9);
  doc.text(`Tanggal Cetak: ${currentDateStr}`, 410, 62, { align: "right" });
  doc.text(`Kader: ${cadreName}`, 410, 75, { align: "right" });

  doc.fillColor(colors.textMain);
  doc.font("Helvetica-Bold").fontSize(11);
  doc.text(`Posyandu/Klinik: ${clinic.name}`, 40, 95);
  doc.font("Helvetica").fontSize(9);
  doc.text(`Alamat: ${clinic.address || "-"}`, 40, 110);

  doc
    .moveTo(40, 128)
    .lineTo(555, 128)
    .strokeColor(colors.border)
    .lineWidth(0.5)
    .stroke();

  const totalKids = childrenList.length;
  const normalKids = childrenList.filter(
    (k) => k.status === "NORMAL" || !k.status,
  ).length;
  const lowRiskKids = childrenList.filter(
    (k) => k.status === "LOWRISK" || k.status === "LOW_RISK",
  ).length;
  const highRiskKids = childrenList.filter(
    (k) => k.status === "HIGHRISK" || k.status === "HIGH_RISK",
  ).length;

  doc.fillColor(colors.textMain);
  doc.font("Helvetica-Bold").fontSize(10);
  doc.text(`Ringkasan Status:`, 40, 140);
  doc.font("Helvetica").fontSize(9);
  doc.text(
    `Total Balita: ${totalKids}  \u2022  Normal: ${normalKids}  \u2022  Risiko Rendah: ${lowRiskKids}  \u2022  Risiko Tinggi: ${highRiskKids}`,
    40,
    155,
  );

  const tableCols = [
    { title: "No", width: 25, align: "center" },
    { title: "Nama Balita", width: 110, align: "left" },
    { title: "JK", width: 30, align: "center" },
    { title: "Tanggal Lahir", width: 70, align: "left" },
    { title: "Umur", width: 70, align: "left" },
    { title: "Orang Tua", width: 110, align: "left" },
    { title: "Status Gizi", width: 100, align: "left" },
  ];

  let tableY = 180;
  drawRowWithWrapping(
    doc,
    tableY,
    tableCols,
    tableCols.map((c) => c.title),
    {
      isHeader: true,
      rowBg: colors.primary,
    },
  );

  tableY += 23;

  if (childrenList.length === 0) {
    doc.fillColor(colors.textSecondary);
    doc.font("Helvetica-Oblique").fontSize(9);
    doc.text("Tidak ada data balita di klinik ini.", 40, tableY + 15, {
      align: "center",
      width: 515,
    });
  } else {
    childrenList.forEach((item, idx) => {
      if (tableY > 740) {
        doc.addPage();
        doc.rect(40, 40, 515, 6).fill(colors.primary);
        tableY = 60;
        drawRowWithWrapping(
          doc,
          tableY,
          tableCols,
          tableCols.map((c) => c.title),
          {
            isHeader: true,
            rowBg: colors.primary,
          },
        );
        tableY += 23;
      }

      const rowBg = idx % 2 === 1 ? colors.bgLight : "#ffffff";

      const no = String(idx + 1);
      const name = item.name;
      const gender = item.gender === "MALE" ? "L" : "P";
      const dob = formatDateId(item.birth_date);
      const age = formatAge(item.birth_date);
      const parentName = item.parent?.name || "-";

      let statusLabel = "Normal";
      if (item.status === "LOWRISK" || item.status === "LOW_RISK") {
        statusLabel = "Risiko Rendah";
      } else if (item.status === "HIGHRISK" || item.status === "HIGH_RISK") {
        statusLabel = "Risiko Tinggi";
      }

      const rowHeight = drawRowWithWrapping(
        doc,
        tableY,
        tableCols,
        [no, name, gender, dob, age, parentName, statusLabel],
        {
          isHeader: false,
          rowBg: rowBg,
        },
      );

      doc
        .moveTo(40, tableY + rowHeight - 4)
        .lineTo(555, tableY + rowHeight - 4)
        .strokeColor(colors.border)
        .lineWidth(0.3)
        .stroke();

      tableY += rowHeight;
    });
  }

  const footerY = 800;
  doc.fontSize(7).fillColor(colors.textSecondary);
  doc.text(
    "Laporan Data Balita Posyandu JagaCilik - Bersama Mencegah Stunting.",
    40,
    footerY,
    { align: "center", width: 515 },
  );

  doc.end();
};
