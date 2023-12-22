import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
import httpStatus from 'http-status';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';
import { PaginatedData, QueryFilter } from '@/interfaces/misc.interface';

@Service()
export class UserService {
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await UserModel.find();
    return users;
  }

  public async queryUsers(filter: QueryFilter, options: any): Promise<PaginatedData<User>> {
    const users = await UserModel.paginate(filter, options);
    return users;
  }

  public async findUserById(userId: string, skipCheckExist = false): Promise<User> {
    const findUser: User = await UserModel.findOne({ _id: userId });
    if (!findUser && !skipCheckExist) throw new HttpException(httpStatus.NOT_FOUND, 'User not found');

    return findUser;
  }

  public async findUserByEmail(email: string, skipCheckExist = false): Promise<User> {
    const findUser: User = await UserModel.findOne({ email: email });

    if (!findUser && !skipCheckExist) throw new HttpException(httpStatus.NOT_FOUND, 'User not found');

    return findUser;
  }

  public async createUser(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ email: userData.email });
    if (findUser) throw new HttpException(httpStatus.CONFLICT, `This email ${userData.email} already exists`);
    return await UserModel.create(userData);
  }

  public async updateUser(userId: string, userData: User): Promise<User> {
    const user = await UserModel.findById(userId);

    if (!user) throw new HttpException(httpStatus.NOT_FOUND, 'User not found');

    Object.assign(user, userData);

    const updatedUser = await user.save();

    return updatedUser;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await UserModel.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

    return deleteUserById;
  }
}
