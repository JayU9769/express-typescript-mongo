import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { IAdmin } from '@interfaces/admins.interface';
import { AdminService } from '@services/admins.service';

export class AdminController {
  public admin = Container.get(AdminService);

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllData: IAdmin[] = await this.admin.findAll();

      res.status(200).json({ data: findAllData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminId: string = req.params.id;
      const findOneData: IAdmin = await this.admin.findById(adminId);

      res.status(200).json({ data: findOneData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminData: IAdmin = req.body;
      const createData: IAdmin = await this.admin.create(adminData);

      res.status(201).json({ data: createData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminId: string = req.params.id;
      const adminData: IAdmin = req.body;
      const updateAdminData: IAdmin = await this.admin.update(adminId, adminData);

      res.status(200).json({ data: updateAdminData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminId: string = req.params.id;
      const deleteAdminData: IAdmin = await this.admin.delete(adminId);

      res.status(200).json({ data: deleteAdminData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
