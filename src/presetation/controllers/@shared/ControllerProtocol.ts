import { Request, Response } from "express";

export interface ControllerProtocol {
    handle(request: Request, response: Response): Promise<Response>
}