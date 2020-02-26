import { Injectable } from '@nestjs/common'
import { TelegramActionHandler } from 'nestjs-telegraf'
import { ContextMessageUpdate } from 'telegraf'

@Injectable()
export class BotService {
  @TelegramActionHandler({ onStart: true })
  async onStart(ctx: ContextMessageUpdate) {
    await ctx.reply('/start command reply')
  }
}
