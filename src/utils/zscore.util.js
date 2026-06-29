import bbMale from "../database/z-score/BeratBadanLakiLaki.json" with { type: "json" };
import bbFemale from "../database/z-score/BeratBadanPerempuan.json" with { type: "json" };
import tbMale from "../database/z-score/PanjangBadanLakiLaki.json" with { type: "json" };
import tbFemale from "../database/z-score/PanjangBadanPerempuan.json" with { type: "json" };
import lkMale from "../database/z-score/LingkarKepalaLakiLaki.json" with { type: "json" };
import lkFemale from "../database/z-score/LingkarKepalaPerempuan.json" with { type: "json" };
import bbtbMale24 from "../database/z-score/BeratTinggiBadanLakiLaki24.json" with { type: "json" };
import bbtbMale60 from "../database/z-score/BeratTinggiBadanLakiLaki60.json" with { type: "json" };
import bbtbFemale24 from "../database/z-score/BeratTinggiBadanPerempuan24.json" with { type: "json" };
import bbtbFemale60 from "../database/z-score/BeratTinggiBadanPerempuan60.json" with { type: "json" };
import calculateAgeInMonths from "./age.util.js";
import Gender from "../common/enums/gender.enum.js";

function findByAge(dataset, age) {
  return dataset.find((item) => Number(item.bulan) === age);
}

function roundHeight(height) {
  const fraction = height - Math.floor(height);

  if (fraction === 0.5) {
    return height;
  }

  if (fraction < 0.5) {
    return Math.floor(height);
  }

  return Math.floor(height) + 0.5;
}

function findByHeight(dataset, height) {
  return dataset.find((item) => Number(item.pb) === roundHeight(height));
}

function interpolate(value, reference) {
  if (value == null || !reference) {
    return null;
  }

  const points = [
    [Number(reference.SD3neg), -3],
    [Number(reference.SD2neg), -2],
    [Number(reference.SD1neg), -1],
    [Number(reference.median), 0],
    [Number(reference.SD1pos), 1],
    [Number(reference.SD2pos), 2],
    [Number(reference.SD3pos), 3],
  ];

  if (value <= points[0][0]) {
    const width = points[1][0] - points[0][0];

    return -3 + (value - points[0][0]) / width;
  }

  if (value >= points[6][0]) {
    const width = points[6][0] - points[5][0];

    return 3 + (value - points[6][0]) / width;
  }

  for (let i = 0; i < points.length - 1; i++) {
    const [low, zLow] = points[i];
    const [high, zHigh] = points[i + 1];

    if (value >= low && value <= high) {
      return zLow + ((value - low) / (high - low)) * (zHigh - zLow);
    }
  }

  return null;
}

function getDataset(type, gender, age = null) {
  switch (type) {
    case "BB":
      return gender === Gender.Male ? bbMale : bbFemale;

    case "TB":
      return gender === Gender.Male ? tbMale : tbFemale;

    case "LK":
      return gender === Gender.Male ? lkMale : lkFemale;

    case "BBTB":
      if (age == null || age < 0 || age > 60) {
        return null;
      }

      if (gender === Gender.Male) {
        return age <= 24 ? bbtbMale24 : bbtbMale60;
      }

      return age <= 24 ? bbtbFemale24 : bbtbFemale60;

    default:
      return null;
  }
}

function calculateWeightForAge({ weight, gender, birthDate, measurementDate }) {
  const age = calculateAgeInMonths(birthDate, measurementDate);

  const dataset = getDataset("BB", gender);

  const reference = findByAge(dataset, age);

  return interpolate(weight, reference);
}

function calculateHeightForAge({ height, gender, birthDate, measurementDate }) {
  const age = calculateAgeInMonths(birthDate, measurementDate);

  const dataset = getDataset("TB", gender);

  const reference = findByAge(dataset, age);

  return interpolate(height, reference);
}

function calculateHeadCircumference({
  headCircumference,
  gender,
  birthDate,
  measurementDate,
}) {
  if (headCircumference == null) {
    return null;
  }

  const age = calculateAgeInMonths(birthDate, measurementDate);

  const dataset = getDataset("LK", gender);

  const reference = findByAge(dataset, age);

  return interpolate(headCircumference, reference);
}

function calculateWeightForHeight({
  weight,
  height,
  gender,
  birthDate,
  measurementDate,
}) {
  const age = calculateAgeInMonths(birthDate, measurementDate);

  const dataset = getDataset("BBTB", gender, age);

  if (!dataset) {
    return null;
  }

  const reference = findByHeight(dataset, height);

  return interpolate(weight, reference);
}

function calculateAllZScores({
  weight,
  height,
  headCircumference,
  gender,
  birthDate,
  measurementDate,
}) {
  return {
    zscore_bb: calculateWeightForAge({
      weight,
      gender,
      birthDate,
      measurementDate,
    }),
    zscore_tb: calculateHeightForAge({
      height,
      gender,
      birthDate,
      measurementDate,
    }),
    zscore_lk: calculateHeadCircumference({
      headCircumference,
      gender,
      birthDate,
      measurementDate,
    }),
    zscore_gizi: calculateWeightForHeight({
      weight,
      height,
      gender,
      birthDate,
      measurementDate,
    }),
  };
}

export {
  calculateWeightForAge,
  calculateHeightForAge,
  calculateHeadCircumference,
  calculateWeightForHeight,
  calculateAllZScores,
};
