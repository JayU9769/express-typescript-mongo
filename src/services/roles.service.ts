import {Service} from 'typedi';
import {HttpException} from '@exceptions/httpException';
import {EGuard, IRole} from '@interfaces/roles.interface';
import {RoleModel} from '@models/roles.model';

@Service()
export class RoleService {
  public async findAll(): Promise<IRole[]> {
    return RoleModel.find();
  }

  public async findById(roleId: string): Promise<IRole> {
    const findRole: IRole = await RoleModel.findOne({ _id: roleId });
    if (!findRole) throw new HttpException(409, "Role doesn't exist");

    return findRole;
  }

  public async create(roleData: IRole): Promise<IRole> {
    const findRole: IRole = await RoleModel.findOne({ name: roleData.name });
    if (findRole) throw new HttpException(409, `This ${roleData.name} is already exists`);
    return await RoleModel.create(roleData);
  }

  public async update(roleId: string, roleData: IRole): Promise<IRole> {
    if (roleData.name) {
      const findRole: IRole = await RoleModel.findOne({ email: roleData.name });
      if (findRole && findRole._id != roleId) throw new HttpException(409, `This ${roleData.name} is already exists`);
    }

    const updateRoleById: IRole = await RoleModel.findByIdAndUpdate(roleId, roleData,  { new: true });
    if (!updateRoleById) throw new HttpException(409, "Role doesn't exist");

    return updateRoleById;
  }

  public async delete(roleId: string): Promise<IRole> {
    const deleteRoleById: IRole = await RoleModel.findByIdAndDelete(roleId);
    if (!deleteRoleById) throw new HttpException(409, "Role doesn't exist");

    return deleteRoleById;
  }

  public async findByRoleNames(roles: string[], guard: EGuard = EGuard.WEB): Promise<IRole[]> {
    roles = roles.map(role => role.toLowerCase());
    const roleList: IRole[] = await RoleModel.find({
      guard: 'admin',
      name: { $in: roles }
    });
    console.log(roleList , roles);
    for (let i = 0; i < roles.length; i++) {
      const temp = roleList.filter((role) => role.name === roles[i])
      if (temp.length === 0) {
        throw new HttpException(409, `${roles[i]} role doesn't exist`);
      }
    }
    return roleList;
  }
}
