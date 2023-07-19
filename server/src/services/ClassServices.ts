import convertHourToMinutes from "../utils/TimeUtils";
import ClassRepository from "../repositories/ClassRepository";

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

interface CreateRequest {
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  subject: string;
  cost: string;
  schedule: Array<ScheduleItem>;
}

export default {
  async index(subject: string, week_day: string, time: string) {
    return ClassRepository.index(
      subject,
      Number(week_day),
      convertHourToMinutes(time)
    );
  },

  async create({
    name,
    avatar,
    whatsapp,
    bio,
    subject,
    cost,
    schedule,
  }: CreateRequest) {
    return ClassRepository.create(
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    );
  },
};
