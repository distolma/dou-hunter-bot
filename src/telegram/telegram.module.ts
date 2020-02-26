import { ModuleRef } from '@nestjs/core';
import { Module, OnModuleInit } from '@nestjs/common';
import { TelegrafModule, TelegrafService } from 'nestjs-telegraf';
import LocalSession from 'telegraf-session-local';
import { ConfigModule } from '@nestjs/config';
import telegramConfig from './telegram.config';
import { TelegrafConfigService } from './telegraf-config.service';
import { BotService } from './bot.service';

@Module({
  imports: [
    TelegrafModule.fromFactory({
      imports: [ConfigModule.forFeature(telegramConfig)],
      useClass: TelegrafConfigService,
    }),
  ],
  exports: [TelegrafModule],
  providers: [BotService]
})
export class TelegramModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly telegrafService: TelegrafService,
  ) {}

  public async onModuleInit() {
    this.telegrafService.init(this.moduleRef);

    this.telegrafService.bot.use(new LocalSession().middleware());

    if (process.env.NODE_ENV === 'production') {
      this.telegrafService.getMiddleware(`bot${process.env.BOT_TOKEN}`);
    } else {
      try {

        this.telegrafService.startPolling();
      } catch (error) {
        console.log(error)
      }
    }
  }
}
