import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Admin } from '@interfaces/admins.interface';
import { AdminService } from '@services/admins.service';

export class AdminController {
  public admin = Container.get(AdminService);

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllData: Admin[] = await this.admin.findAll();

      res.status(200).json({ data: findAllData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminId: string = req.params.id;
      const findOneData: Admin = await this.admin.findById(adminId);

      res.status(200).json({ data: findOneData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminData: Admin = req.body;
      const createData: Admin = await this.admin.create(adminData);

      res.status(201).json({ data: createData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminId: string = req.params.id;
      const adminData: Admin = req.body;
      const updateAdminData: Admin = await this.admin.update(adminId, adminData);

      res.status(200).json({ data: updateAdminData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminId: string = req.params.id;
      const deleteAdminData: Admin = await this.admin.delete(adminId);

      res.status(200).json({ data: deleteAdminData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
