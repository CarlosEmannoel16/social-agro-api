import { Request, Response } from "express";

export interface ControllerInterface {
    handle(request: Request, response: Response): Promise<Response>
}