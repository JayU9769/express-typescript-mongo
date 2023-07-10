import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { RoleRoute } from '@routes/roles.route';
import { AdminRoute } from '@routes/admins.route';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(), new RoleRoute(), new AdminRoute()]);

app.listen();
