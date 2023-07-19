import { Request, Response } from "express";
import ConnectionService from "../services/ConnectionService";
import RestResponse from "../representations/RestResponse";

export default class ConnectionController {
  async index(request: Request, response: Response) {
    const totalConnections = await ConnectionService.index();
    return RestResponse.Success(response, totalConnections);
  }

  async create(request: Request, response: Response) {
    const { user_id } = request.body;
    await ConnectionService.create(user_id);
    return RestResponse.Created(response);
  }
}
