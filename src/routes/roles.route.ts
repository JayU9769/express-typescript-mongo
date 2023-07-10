import { Router } from 'express';
import { RoleController } from '@controllers/roles.controller';
import { CreateRoleDto } from '@dtos/roles.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class RoleRoute implements Routes {
  public path = '/roles';
  public router = Router();
  public role = new RoleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.role.getAll);
    this.router.get(`${this.path}/:id`, this.role.getById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateRoleDto), this.role.create);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(CreateRoleDto, false, true), this.role.update);
    this.router.delete(`${this.path}/:id`, this.role.delete);
  }
}
