import { Router } from 'express';
import { AdminController } from '@controllers/admins.controller';
import { CreateAdminDto, UpdateAdminDto } from '@dtos/admins.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class AdminRoute implements Routes {
  public path = '/admins';
  public router = Router();
  public admin = new AdminController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.admin.getAll);
    this.router.get(`${this.path}/:id`, this.admin.getById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateAdminDto), this.admin.create);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(UpdateAdminDto, false, true), this.admin.update);
    this.router.delete(`${this.path}/:id`, this.admin.delete);
  }
}
