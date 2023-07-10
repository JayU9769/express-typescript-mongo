import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Admin } from '@interfaces/admins.interface';
import { AdminModel } from '@models/admins.model';

@Service()
export class AdminService {
  public async findAll(): Promise<Admin[]> {
    return AdminModel.find();
  }

  public async findById(adminId: string): Promise<Admin> {
    const findAdmin: Admin = await AdminModel.findOne({ _id: adminId });
    if (!findAdmin) throw new HttpException(409, "Admin doesn't exist");

    return findAdmin;
  }

  public async create(adminData: Admin): Promise<Admin> {
    const findAdmin: Admin = await AdminModel.findOne({ username: adminData.username });
    if (findAdmin) throw new HttpException(409, `This ${adminData.username} is already is use`);
    return await AdminModel.create(adminData);
  }

  public async update(adminId: string, adminData: Admin): Promise<Admin> {
    if (adminData.name) {
      const findAdmin: Admin = await AdminModel.findOne({ email: adminData.name });
      if (findAdmin && findAdmin._id != adminId) throw new HttpException(409, `This ${adminData.name} is already exists`);
    }

    const updateAdminById: Admin = await AdminModel.findByIdAndUpdate(adminId, adminData);
    if (!updateAdminById) throw new HttpException(409, "Admin doesn't exist");

    return updateAdminById;
  }

  public async delete(adminId: string): Promise<Admin> {
    const deleteAdminById: Admin = await AdminModel.findByIdAndDelete(adminId);
    if (!deleteAdminById) throw new HttpException(409, "Admin doesn't exist");

    return deleteAdminById;
  }
}
