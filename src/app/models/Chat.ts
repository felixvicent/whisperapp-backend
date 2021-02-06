import { Model } from 'sequelize';

import database from '../../database';
import User from './User';

class Chat extends Model {
  public id: number;

  public userId: number;

  public recipientId: string;
}

Chat.init({}, { sequelize: database.connection });

Chat.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Chat.belongsTo(User, { foreignKey: 'recipient_id', as: 'recipient' });

export default Chat;
