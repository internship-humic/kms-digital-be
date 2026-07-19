export const growthChart = (
  doc,
  measurements,
  whoData,
  {
    x = 40,
    y = 330,
    width = 515,
    height = 230,
    title = "",
    unit = "",
    valueKey = "",
  } = {},
) => {
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 40;
  const paddingBottom = 35;

  const graphX = x + paddingLeft;
  const graphY = y + paddingTop;
  const graphWidth = width - paddingLeft - paddingRight;
  const graphHeight = height - paddingTop - paddingBottom;

  const chartData = whoData.map((item) => ({
    age: Number(item.bulan),
    sd3neg: item.SD3neg != null ? Number(item.SD3neg) : null,
    sd2neg: item.SD2neg != null ? Number(item.SD2neg) : null,
    sd1neg: item.SD1neg != null ? Number(item.SD1neg) : null,
    median: item.median != null ? Number(item.median) : null,
    sd1pos: item.SD1pos != null ? Number(item.SD1pos) : null,
    sd2pos: item.SD2pos != null ? Number(item.SD2pos) : null,
    sd3pos: item.SD3pos != null ? Number(item.SD3pos) : null,
  }));

  const maxAge = Math.max(...chartData.map((x) => x.age));

  const scaleX = (age) => graphX + (age / maxAge) * graphWidth;

  const minValue = Math.floor(
    Math.min(
      ...chartData
        .map((x) => x.sd3neg)
        .filter((v) => v != null && !Number.isNaN(v)),
    ),
  );

  const maxValue = Math.ceil(
    Math.max(
      ...chartData
        .map((x) => x.sd3pos)
        .filter((v) => v != null && !Number.isNaN(v)),
    ),
  );

  const scaleY = (value) =>
    graphY +
    graphHeight -
    ((value - minValue) / (maxValue - minValue)) * graphHeight;

  doc
    .roundedRect(x, y, width, height, 8)
    .fill("#ffffff")
    .strokeColor("#dcdcdc")
    .lineWidth(1)
    .stroke();

  doc
    .fillColor("#1B7F5C")
    .font("Helvetica-Bold")
    .fontSize(10)
    .text(title, x + 12, y + 8);

  doc.strokeColor("#888").lineWidth(0.5);

  doc
    .moveTo(graphX, graphY)
    .lineTo(graphX, graphY + graphHeight)
    .stroke();

  doc
    .moveTo(graphX, graphY + graphHeight)
    .lineTo(graphX + graphWidth, graphY + graphHeight)
    .stroke();

  const step = maxValue - minValue > 40 ? 5 : maxValue - minValue > 20 ? 2 : 1;

  for (let i = minValue; i <= maxValue; i += step) {
    const py = scaleY(i);

    doc
      .moveTo(graphX, py)
      .lineTo(graphX + graphWidth, py)
      .strokeColor("#efefef")
      .stroke();

    doc
      .fillColor("#666")
      .font("Helvetica")
      .fontSize(6)
      .text(i.toString(), graphX - 18, py - 3, {
        width: 15,
        align: "right",
      });
  }

  for (let i = 0; i <= maxAge; i += 6) {
    const px = scaleX(i);

    doc
      .moveTo(px, graphY)
      .lineTo(px, graphY + graphHeight)
      .strokeColor("#efefef")
      .stroke();

    doc
      .fillColor("#666")
      .fontSize(6)
      .text(i.toString(), px - 5, graphY + graphHeight + 5);
  }

  const drawCurve = (key, color, lineWidth = 1) => {
    doc.strokeColor(color).lineWidth(lineWidth);

    for (let i = 1; i < chartData.length; i++) {
      const prev = chartData[i - 1];
      const curr = chartData[i];

      if (
        prev[key] == null ||
        curr[key] == null ||
        Number.isNaN(prev[key]) ||
        Number.isNaN(curr[key])
      ) {
        continue;
      }

      doc
        .moveTo(scaleX(prev.age), scaleY(prev[key]))
        .lineTo(scaleX(curr.age), scaleY(curr[key]))
        .stroke();
    }
  };

  drawCurve("sd3neg", "#d32f2f");
  drawCurve("sd2neg", "#ef6c00");
  drawCurve("sd1neg", "#fbc02d");
  drawCurve("median", "#2e7d32", 1.5);
  drawCurve("sd1pos", "#fbc02d");
  drawCurve("sd2pos", "#ef6c00");
  drawCurve("sd3pos", "#d32f2f");

  const points = measurements
    .map((m) => ({
      age: Number(m.age_month),
      value: Number(m[valueKey]),
    }))
    .filter((m) => !Number.isNaN(m.age) && !Number.isNaN(m.value))
    .sort((a, b) => a.age - b.age);

  doc.strokeColor("#1565c0").lineWidth(2);

  points.forEach((point, index) => {
    const px = scaleX(point.age);
    const py = scaleY(point.value);

    if (index > 0) {
      const prev = points[index - 1];

      doc.moveTo(scaleX(prev.age), scaleY(prev.value)).lineTo(px, py).stroke();
    }

    doc
      .circle(px, py, 2.5)
      .fill("#1565c0")
      .strokeColor("#1565c0")
      .lineWidth(0.5)
      .stroke();
  });

  const labels = [
    {
      key: "sd3pos",
      text: "+3 SD",
      color: "#d32f2f",
    },
    {
      key: "sd2pos",
      text: "+2 SD",
      color: "#ef6c00",
    },
    {
      key: "sd1pos",
      text: "+1 SD",
      color: "#fbc02d",
    },
    {
      key: "median",
      text: "Median",
      color: "#2e7d32",
    },
    {
      key: "sd1neg",
      text: "-1 SD",
      color: "#fbc02d",
    },
    {
      key: "sd2neg",
      text: "-2 SD",
      color: "#ef6c00",
    },
    {
      key: "sd3neg",
      text: "-3 SD",
      color: "#d32f2f",
    },
  ];

  labels.forEach((label) => {
    const last = chartData[chartData.length - 1];

    if (last[label.key] == null || Number.isNaN(last[label.key])) {
      return;
    }

    doc
      .fillColor(label.color)
      .font("Helvetica")
      .fontSize(6)
      .text(label.text, graphX + graphWidth + 5, scaleY(last[label.key]) - 3);
  });

  doc
    .fillColor("#444")
    .font("Helvetica")
    .fontSize(7)
    .text(`${title} (${unit})`, graphX - 40, graphY - 12);

  doc
    .fillColor("#444")
    .font("Helvetica")
    .fontSize(7)
    .text(
      "Umur (bulan)",
      graphX + graphWidth / 2 - 22,
      graphY + graphHeight + 18,
    );
};
