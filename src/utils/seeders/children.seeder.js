import Gender from "../../common/enums/gender.enum.js";
import BaseSeeder from "../../common/base_classes/base-seeder.js";

class ChildrenSeeder extends BaseSeeder {
  constructor() {
    super();
  }

  async seed() {
    console.time("seed");

    const parents = await this.db.parents.findMany({
      orderBy: {
        id: "asc",
      },
    });

    const children = [];

    let counter = 1;

    for (const parent of parents) {
      for (let i = 1; i <= 2; i++) {
        const gender = counter % 2 === 0 ? Gender.Female : Gender.Male;

        const birthDate = new Date();

        birthDate.setMonth(birthDate.getMonth() - counter * 3);

        children.push({
          id: `${counter}`,
          name: `Child ${counter}`,
          birth_date: birthDate,
          parent_id: parent.id,
          gender,
          address: parent.address,
          referral: false,
          supplement: false,
          education: false,
        });

        counter++;
      }
    }

    await this.db.childrens.createMany({
      data: children,
      skipDuplicates: true,
    });

    this.log.info(`Children seeded: ${children.length}`);

    console.timeEnd("seed");
  }
}

BaseSeeder.run(async function ChildrenSeed() {
  const seeder = new ChildrenSeeder();
  await seeder.seed();
});
