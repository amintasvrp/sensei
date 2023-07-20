import { Request, Response } from "express";

import RestResponse from "../representations/RestResponse";
import ClassServices from "../services/ClassServices";

export default class ClassController {
  async index(request: Request, response: Response) {
    const { subject, week_day, time } = <
      { subject: string; week_day: string; time: string }
    >request.query;

    if (!week_day || !subject || !time) {
      return RestResponse.MissingFieldsError(response);
    }

    return RestResponse.Success(
      response,
      await ClassServices.index(subject, week_day, time)
    );
  }

  async create(request: Request, response: Response) {
    if (await ClassServices.create(request.body)) {
      return RestResponse.Created(response);
    } else {
      return RestResponse.UnexpectedError(response);
    }
  }
}
