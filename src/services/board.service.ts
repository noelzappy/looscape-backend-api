import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
import httpStatus from 'http-status';
import { BoardStatus, IBoard } from '@/interfaces/board.interface';
import BoardModel from '@/models/board.model';
import { CreateBoardDto, UpdateBoardDto } from '@/dtos/board.dto';
import { PaginatedData, QueryFilter } from '@/interfaces/misc.interface';
import BannerModel from '@/models/banner.model';

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

  /**
   * The function isBoardAvailable checks if a board is available for a specified date range by checking
   * if there are any active banners for that range.
   * @param {string} boardId - The boardId parameter is a string that represents the unique identifier of
   * a board. It is used to retrieve the board from the database.
   * @param {Date} startDate - The startDate parameter is the starting date of the date range for which
   * you want to check the availability of the board. It is of type Date, which represents a specific
   * point in time.
   * @param {Date} endDate - The `endDate` parameter is the end date of the date range for which you want
   * to check the availability of the board.
   * @returns a Promise that resolves to a boolean value indicating whether the board is available for
   * the specified date range.
   */
  public async isBoardAvailable(boardId: string, startDate: Date, endDate: Date): Promise<boolean> {
    const board = await BoardModel.findById(boardId);
    if (!board) throw new HttpException(httpStatus.NOT_FOUND, "Board doesn't exist");

    // TODO: Implement logic to check if board is available for the specified date range
    const isAvailable = true;
    // const boardBanners = await BannerModel.find({ board: boardId, status: { $ne: 'ENDED' } });

    /*
    check if board is available for the specified date range by checking if there are any banners that are active for the specified date range
    */

    return isAvailable;
  }
}
