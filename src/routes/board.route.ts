import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Auth } from '@/middlewares/auth.middleware';
import { BoardController } from '@/controllers/board.controller';
import { CreateBoardLocationDto, GetBoardsDto } from '@/dtos/board.dto';

export class BoardRoute implements Routes {
  public path = '/boards';
  public router = Router();
  public board = new BoardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, ValidationMiddleware(GetBoardsDto, 'query', true), this.board.getBoards);
    this.router.post(`${this.path}`, Auth('manageBoards'), this.board.createBoard);

    // board locations
    this.router.get(`${this.path}/locations`, this.board.getBoardLocations);
    this.router.get(`${this.path}/locations/:id`, this.board.getBoardLocation);
    this.router.post(`${this.path}/locations`, Auth('manageBoards'), ValidationMiddleware(CreateBoardLocationDto), this.board.createBoardLocation);
    this.router.put(
      `${this.path}/locations/:id`,
      Auth('manageBoards'),
      ValidationMiddleware(CreateBoardLocationDto, 'body', true),
      this.board.updateBoardLocation,
    );

    this.router.get(`${this.path}/:id`, this.board.getBoard);
    this.router.put(`${this.path}/:id`, Auth('manageBoards'), this.board.updateBoard);
  }
}
