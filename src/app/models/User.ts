import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

import database from '../../database';

class User extends Model {
  public id: number;

  public name: string;

  public password: string;

  public passwordHash: string;

  public async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }
}

User.init(
  {
    name: Sequelize.STRING,
    password: Sequelize.VIRTUAL,
    passwordHash: Sequelize.STRING,
  },
  { sequelize: database.connection }
);

User.addHook('beforeSave', async (user: User) => {
  if (user.password) {
    user.passwordHash = await bcrypt.hash(user.password, 8);
  }
});

export default User;
