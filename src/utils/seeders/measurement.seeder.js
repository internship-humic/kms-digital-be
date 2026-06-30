import BaseSeeder from "../../common/base_classes/base-seeder.js";
import calculateAgeInMonths from "../../utils/age.util.js";
import { calculateAllZScores } from "../../utils/zscore.util.js";
import { calculateRiskStatus } from "../../utils/risk-status.util.js";

class MeasurementSeeder extends BaseSeeder {
  constructor() {
    super();
  }

  async seed() {
    console.time("seed");

    const childrens = await this.db.childrens.findMany({
      include: {
        parent: {
          select: {
            clinic_id: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    const measurements = [];
    const statuses = [];

    for (const children of childrens) {
      const firstDate = new Date(children.birth_date);

      const secondDate = new Date(children.birth_date);
      secondDate.setMonth(secondDate.getMonth() + 6);

      const firstAge = calculateAgeInMonths(children.birth_date, firstDate);

      const secondAge = calculateAgeInMonths(children.birth_date, secondDate);

      const firstWeight = this.generateWeight(firstAge);
      const firstHeight = this.generateHeight(firstAge);
      const firstHead = this.generateHeadCircumference(firstAge);

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
        clinic_id: children.parent.clinic_id,
        measurement_date: firstDate,
        age_month: firstAge,
        description: "Pengukuran saat lahir",
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
        clinic_id: children.parent.clinic_id,
        measurement_date: secondDate,
        age_month: secondAge,
        description: "Pengukuran rutin",
        body_weight: secondWeight,
        body_height: secondHeight,
        head_circumference: secondHead,
        zscore_bb: secondZScore.zscore_bb,
        zscore_tb: secondZScore.zscore_tb,
        zscore_lk: secondZScore.zscore_lk,
        zscore_gizi: secondZScore.zscore_gizi,
      });

      statuses.push({
        id: children.id,
        status: calculateRiskStatus(secondZScore),
      });
    }

    await this.db.$transaction(async (tx) => {
      await tx.measurements.createMany({
        data: measurements,
        skipDuplicates: true,
      });

      for (const item of statuses) {
        await tx.childrens.update({
          where: {
            id: item.id,
          },
          data: {
            status: item.status,
          },
        });
      }
    });

    this.log.info(`Measurements seeded: ${measurements.length}`);

    console.timeEnd("seed");
  }

  generateWeight(ageMonth) {
    const base = ageMonth <= 0 ? 3.2 : 3.2 + ageMonth * 0.45;
    return Number((base + (Math.random() - 0.5) * 0.6).toFixed(1));
  }

  generateHeight(ageMonth) {
    const base = ageMonth <= 0 ? 49 : 49 + ageMonth * 1.2;
    return Number((base + (Math.random() - 0.5) * 1.5).toFixed(1));
  }

  generateHeadCircumference(ageMonth) {
    const base = ageMonth <= 0 ? 34 : 34 + ageMonth * 0.35;
    return Number((base + (Math.random() - 0.5) * 0.8).toFixed(1));
  }
}

BaseSeeder.run(async function MeasurementSeed() {
  const seeder = new MeasurementSeeder();
  await seeder.seed();
});
