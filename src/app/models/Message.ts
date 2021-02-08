import Sequelize, { Model } from 'sequelize';

import database from '../../database';
import Chat from './Chat';

class Message extends Model {
  public id: number;

  public chatId: number;

  public text: string;
}

Message.init(
  {
    text: Sequelize.STRING,
  },
  { sequelize: database.connection }
);

Message.belongsTo(Chat, { foreignKey: 'chat_id', as: 'chat' });

export default Message;
