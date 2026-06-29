import BaseSeeder from "../../common/base_classes/base-seeder.js";
import calculateAgeInMonths from "../../utils/age.util.js";
import { calculateAllZScores } from "../../utils/zscore.util.js";

class MeasurementSeeder extends BaseSeeder {
  constructor() {
    super();
  }

  async seed() {
    console.time("seed");

    const childrens = await this.db.childrens.findMany({
      orderBy: {
        id: "asc",
      },
    });

    const measurements = [];

    for (const children of childrens) {
      const firstDate = new Date(children.birth_date);

      const secondDate = new Date(children.birth_date);
      secondDate.setMonth(secondDate.getMonth() + 6);

      const firstWeight = this.generateWeight(0);
      const firstHeight = this.generateHeight(0);
      const firstHead = this.generateHeadCircumference(0);

      const secondAge = calculateAgeInMonths(children.birth_date, secondDate);

      const secondWeight = this.generateWeight(secondAge);
      const secondHeight = this.generateHeight(secondAge);
      const secondHead = this.generateHeadCircumference(secondAge);

      const firstZScore = calculateAllZScores({
        weight: firstWeight,
        height: firstHeight,
        headCircumference: firstHead,
        gender: children.gender,
        birthDate: children.birth_date,
        measurementDate: firstDate,
      });

      const secondZScore = calculateAllZScores({
        weight: secondWeight,
        height: secondHeight,
        headCircumference: secondHead,
        gender: children.gender,
        birthDate: children.birth_date,
        measurementDate: secondDate,
      });

      measurements.push({
        children_id: children.id,
        measurement_date: firstDate,

        age_month: calculateAgeInMonths(children.birth_date, firstDate),

        body_weight: firstWeight,
        body_height: firstHeight,
        head_circumference: firstHead,

        zscore_bb: firstZScore.zscore_bb,
        zscore_tb: firstZScore.zscore_tb,
        zscore_lk: firstZScore.zscore_lk,
        zscore_gizi: firstZScore.zscore_gizi,
      });

      measurements.push({
        children_id: children.id,
        measurement_date: secondDate,

        age_month: secondAge,

        body_weight: secondWeight,
        body_height: secondHeight,
        head_circumference: secondHead,

        zscore_bb: secondZScore.zscore_bb,
        zscore_tb: secondZScore.zscore_tb,
        zscore_lk: secondZScore.zscore_lk,
        zscore_gizi: secondZScore.zscore_gizi,
      });
    }

    await this.db.measurements.createMany({
      data: measurements,
      skipDuplicates: true,
    });

    this.log.info(`Measurements seeded: ${measurements.length}`);

    console.timeEnd("seed");
  }

  generateWeight(ageMonth) {
    if (ageMonth <= 0) return 3.2;

    return Number((3.2 + ageMonth * 0.45).toFixed(1));
  }

  generateHeight(ageMonth) {
    if (ageMonth <= 0) return 49;

    return Number((49 + ageMonth * 1.2).toFixed(1));
  }

  generateHeadCircumference(ageMonth) {
    if (ageMonth <= 0) return 34;

    return Number((34 + ageMonth * 0.35).toFixed(1));
  }
}

BaseSeeder.run(async function MeasurementSeed() {
  const seeder = new MeasurementSeeder();
  await seeder.seed();
});
