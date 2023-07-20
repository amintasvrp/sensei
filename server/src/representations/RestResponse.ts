import { Response } from "express";

const MISSING_FIELS_ERROR_MESSAGE = "Missing fields to proceed this operation";
const UNEXPECTED_ERROR_MESSAGE = "Unexpected error while creating new class";

export default {
  MissingFieldsError(response: Response) {
    return response.status(400).json({
      error: MISSING_FIELS_ERROR_MESSAGE,
    });
  },
  UnexpectedError(response: Response) {
    return response.status(400).json({
      error: UNEXPECTED_ERROR_MESSAGE,
    });
  },
  Created(response: Response, body?: any) {
    return this.Success(response, body);
  },
  Success(response: Response, body?: any) {
    return response.status(200).json(body);
  },
};
