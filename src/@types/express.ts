import { Request } from "express";
import { IncomingHttpHeaders } from "http";

export interface CustomRequest extends Request {
  userId: string;
  headers: IncomingHttpHeaders & {
    customHeader: string;
  };
}
 