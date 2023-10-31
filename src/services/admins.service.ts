import {Container, Service} from 'typedi';
import {HttpException} from '@exceptions/httpException';
import {IAdmin} from '@interfaces/admins.interface';
import {AdminModel} from '@models/admins.model';
import {EGuard} from "@interfaces/roles.interface";
import {RoleService} from "@services/roles.service";

@Service()
export class AdminService {
  public role = Container.get(RoleService);

  public async findAll(): Promise<IAdmin[]> {
    return AdminModel.find();
  }

  public async findById(adminId: string): Promise<IAdmin> {
    const findAdmin: IAdmin = await AdminModel.findOne({ _id: adminId });
    if (!findAdmin) throw new HttpException(409, "Admin doesn't exist");

    return findAdmin;
  }

  public async create(adminData: IAdmin): Promise<IAdmin> {
    const findAdmin: IAdmin = await AdminModel.findOne({ username: adminData.username });
    if (findAdmin) throw new HttpException(409, `This ${adminData.username} is already is use`);
    adminData.roles = await this.role.findByRoleNames(adminData.roles as Array<string>, EGuard.ADMIN);
    return await AdminModel.create(adminData);
  }

  public async update(adminId: string, adminData: IAdmin): Promise<IAdmin> {
    if (adminData.name) {
      const findAdmin: IAdmin = await AdminModel.findOne({ email: adminData.name });
      if (findAdmin && findAdmin._id != adminId) throw new HttpException(409, `This ${adminData.name} is already exists`);
    }

    adminData.roles = await this.role.findByRoleNames(adminData.roles as Array<string>, EGuard.ADMIN);
    const updateAdminById: IAdmin = await AdminModel.findByIdAndUpdate(adminId, adminData,{ new: true });
    if (!updateAdminById) throw new HttpException(409, "Admin doesn't exist");

    return updateAdminById;
  }

  public async delete(adminId: string): Promise<IAdmin> {
    const deleteAdminById: IAdmin = await AdminModel.findByIdAndDelete(adminId);
    if (!deleteAdminById) throw new HttpException(409, "Admin doesn't exist");

    return deleteAdminById;
  }
}
