import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Role } from '@interfaces/roles.interface';
import { RoleModel } from '@models/roles.model';

@Service()
export class RoleService {
  public async findAll(): Promise<Role[]> {
    return RoleModel.find();
  }

  public async findById(roleId: string): Promise<Role> {
    const findRole: Role = await RoleModel.findOne({ _id: roleId });
    if (!findRole) throw new HttpException(409, "Role doesn't exist");

    return findRole;
  }

  public async create(roleData: Role): Promise<Role> {
    const findRole: Role = await RoleModel.findOne({ name: roleData.name });
    if (findRole) throw new HttpException(409, `This ${roleData.name} is already exists`);
    return await RoleModel.create(roleData);
  }

  public async update(roleId: string, roleData: Role): Promise<Role> {
    if (roleData.name) {
      const findRole: Role = await RoleModel.findOne({ email: roleData.name });
      if (findRole && findRole._id != roleId) throw new HttpException(409, `This ${roleData.name} is already exists`);
    }

    const updateRoleById: Role = await RoleModel.findByIdAndUpdate(roleId, roleData);
    if (!updateRoleById) throw new HttpException(409, "Role doesn't exist");

    return updateRoleById;
  }

  public async delete(roleId: string): Promise<Role> {
    const deleteRoleById: Role = await RoleModel.findByIdAndDelete(roleId);
    if (!deleteRoleById) throw new HttpException(409, "Role doesn't exist");

    return deleteRoleById;
  }
}
