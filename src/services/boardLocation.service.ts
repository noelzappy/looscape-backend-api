import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
import httpStatus from 'http-status';
import { IBoardLocation } from '@/interfaces/board.interface';
import { CreateBoardLocationDto } from '@/dtos/board.dto';
import { PaginatedData, QueryFilter, QueryOptions } from '@/interfaces/misc.interface';
import { ObjectId } from 'mongoose';
import BoardLocationModel from '@/models/boardLocation.model';

@Service()
export class BoardLocationService {
  public async createBoardLocation(boardData: CreateBoardLocationDto): Promise<IBoardLocation> {
    return BoardLocationModel.create(boardData);
  }

  public async queryBoardLocations(filter: QueryFilter, options: QueryOptions): Promise<PaginatedData<IBoardLocation>> {
    const boardLocations = await BoardLocationModel.paginate(filter, options);
    return boardLocations;
  }

  public async findBoardLocationById(boardLocationId: string, skipCheckExist = false): Promise<IBoardLocation> {
    const boardLocation = await BoardLocationModel.findById(boardLocationId);
    if (!boardLocation && !skipCheckExist) throw new HttpException(httpStatus.NOT_FOUND, 'Board location not found');

    return boardLocation;
  }

  public async updateBoardLocation(boardLocationId: ObjectId, boardLocationData: CreateBoardLocationDto): Promise<IBoardLocation> {
    const boardLocation = await BoardLocationModel.findById(boardLocationId);

    if (!boardLocation) throw new HttpException(httpStatus.NOT_FOUND, 'Board location not found');

    Object.assign(boardLocation, boardLocationData);
    const updatedBoardLocation = await boardLocation.save();

    return updatedBoardLocation;
  }
}
