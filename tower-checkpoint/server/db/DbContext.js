import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TowerEventSchema } from '../models/TowerEvent'
import { TicketSchema } from '../models/Ticket';
import { CommentSchema } from '../models/Comment'
class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  TowerEvents = mongoose.model('TowerEvent', TowerEventSchema)

  Tickets = mongoose.model('Tickets', TicketSchema)

  Comments = mongoose.model('Comments', CommentSchema)
}

export const dbContext = new DbContext()
