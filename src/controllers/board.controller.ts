import { Request, Response } from 'express';
import { Container } from 'typedi';
import httpStatus from 'http-status';
import { RequestWithUser } from '@/interfaces/auth.interface';
import catchAsync from '@/utils/catchAsync';
import _ from 'lodash';
import { BoardService } from '@/services/board.service';
import { CreateBoardDto, CreateBoardLocationDto, UpdateBoardDto } from '@/dtos/board.dto';
import { BoardLocationService } from '@/services/boardLocation.service';

export class BoardController {
  public board = Container.get(BoardService);
  public boardLocation = Container.get(BoardLocationService);

  public createBoard = catchAsync(async (req: RequestWithUser, res: Response) => {
    const boardData: CreateBoardDto = req.body;
    const createBoardData = await this.board.createBoard(boardData);

    res.status(httpStatus.CREATED).send(createBoardData);
  });

  public getBoards = catchAsync(async (req: Request, res: Response) => {
    const filter = _.pick(req.query, ['name', 'status', 'height', 'width', 'doubleSided']);
    const options = _.pick(req.query, ['sortBy', 'limit', 'page']);

    options['populate'] = 'location';

    const queryBoardsData = await this.board.queryBoards(filter, options);

    res.status(httpStatus.OK).json(queryBoardsData);
  });

  public getBoard = catchAsync(async (req: Request, res: Response) => {
    const board = await this.board.findBoardById(req.params.id);
    res.status(httpStatus.OK).send(board);
  });

  public updateBoard = catchAsync(async (req: Request, res: Response) => {
    const boardId: string = req.params.id;
    const boardData: UpdateBoardDto = req.body;
    const updateBoardData = await this.board.updateBoard(boardId, boardData);

    res.status(httpStatus.OK).send(updateBoardData);
  });

  public getBoardLocation = catchAsync(async (req: Request, res: Response) => {
    const boardId: string = req.params.id;
    const boardLocation = await this.boardLocation.findBoardLocationById(boardId);

    res.status(httpStatus.OK).send(boardLocation);
  });

  public getBoardLocations = catchAsync(async (req: Request, res: Response) => {
    const filter = _.pick(req.query, ['name', 'country', 'city', 'address', 'googlePlaceId']);
    const options = _.pick(req.query, ['sortBy', 'limit', 'page']);

    const boardLocations = await this.boardLocation.queryBoardLocations(filter, options);

    res.status(httpStatus.OK).send(boardLocations);
  });

  public createBoardLocation = catchAsync(async (req: Request, res: Response) => {
    const boardLocationData: CreateBoardLocationDto = req.body;
    const createBoardLocationData = await this.boardLocation.createBoardLocation(boardLocationData);

    res.status(httpStatus.CREATED).send(createBoardLocationData);
  });

  public updateBoardLocation = catchAsync(async (req: Request, res: Response) => {
    const boardLocationId: string = req.params.id;
    const boardLocationData: CreateBoardLocationDto = req.body;
    const updateBoardLocationData = await this.boardLocation.updateBoardLocation(boardLocationId, boardLocationData);

    res.status(httpStatus.OK).send(updateBoardLocationData);
  });
}
