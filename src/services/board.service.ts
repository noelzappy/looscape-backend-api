import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
import httpStatus from 'http-status';
import { BoardStatus, IBoard } from '@/interfaces/board.interface';
import BoardModel from '@/models/board.model';
import { CreateBoardDto, UpdateBoardDto } from '@/dtos/board.dto';
import { PaginatedData, QueryFilter } from '@/interfaces/misc.interface';

@Service()
export class BoardService {
  public async createBoard(boardData: CreateBoardDto): Promise<IBoard> {
    return BoardModel.create(boardData);
  }

  public async queryBoards(filter: QueryFilter, options: any): Promise<PaginatedData<IBoard>> {
    const boards = await BoardModel.paginate(filter, options);
    return boards;
  }

  public async findBoardById(boardId: string, skipCheckExist = false): Promise<IBoard> {
    const board = await BoardModel.findById(boardId);
    if (!board && !skipCheckExist) throw new HttpException(httpStatus.NOT_FOUND, 'Board not found');

    return board;
  }

  public async updateBoard(boardId: string, boardData: UpdateBoardDto): Promise<IBoard> {
    const board = await BoardModel.findById(boardId);

    if (!board) throw new HttpException(httpStatus.NOT_FOUND, 'Bill board not found');

    Object.assign(board, boardData);
    const updatedBoard = await board.save();

    return updatedBoard;
  }

  public async deleteBoard(boardId: string): Promise<IBoard> {
    const board = await BoardModel.findById(boardId);
    if (!board) throw new HttpException(httpStatus.NOT_FOUND, "Board doesn't exist");

    Object.assign(board, {
      status: BoardStatus.DELETED,
    });

    const updatedBoard = await board.save();

    return updatedBoard;
  }
}
