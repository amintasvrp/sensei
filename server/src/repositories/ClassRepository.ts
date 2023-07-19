import db from "../database/connection";
import convertHourToMinutes from "../utils/TimeUtils";

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default {
  async index(subject: string, week_day: number, timeInMinutes: number) {
    const classes = await db("classes")
      .whereExists(function () {
        this.select("class_schedule.*")
          .from("class_schedule")
          .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
          .whereRaw("`class_schedule`.`week_day` = ??", [week_day])
          .whereRaw("`class_schedule`.`from` <= ??", [timeInMinutes])
          .whereRaw("`class_schedule`.`to` > ??", [timeInMinutes]);
      })
      .where("classes.subject", "=", subject)
      .join("users", "classes.user_id", "=", "users.id")
      .select(["classes.*", "users.*"]);
    return classes;
  },

  async create(
    name: string,
    avatar: string,
    whatsapp: string,
    bio: string,
    subject: string,
    cost: string,
    schedule: Array<ScheduleItem>
  ) {
    const trx = await db.transaction();

    try {
      const user_id = (
        await trx("users").insert({
          name,
          avatar,
          whatsapp,
          bio,
        })
      )[0];

      const class_id = (
        await trx("classes").insert({
          subject,
          cost,
          user_id,
        })
      )[0];

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => ({
        class_id,
        week_day: scheduleItem.week_day,
        from: convertHourToMinutes(scheduleItem.from),
        to: convertHourToMinutes(scheduleItem.to),
      }));

      await trx("class_schedule").insert(classSchedule);

      await trx.commit();

      return true;
    } catch (err) {
      console.log(err);

      await trx.rollback();

      return false;
    }
  },
};
