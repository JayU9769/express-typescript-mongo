import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { IRole } from '@interfaces/roles.interface';
import { RoleService } from '@services/roles.service';

export class RoleController {
  public role = Container.get(RoleService);

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllData: IRole[] = await this.role.findAll();

      res.status(200).json({ data: findAllData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId: string = req.params.id;
      const findOneData: IRole = await this.role.findById(roleId);

      res.status(200).json({ data: findOneData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleData: IRole = req.body;
      const createData: IRole = await this.role.create(roleData);

      res.status(201).json({ data: createData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId: string = req.params.id;
      const roleData: IRole = req.body;
      const updateRoleData: IRole = await this.role.update(roleId, roleData);

      res.status(200).json({ data: updateRoleData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId: string = req.params.id;
      const deleteRoleData: IRole = await this.role.delete(roleId);

      res.status(200).json({ data: deleteRoleData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
