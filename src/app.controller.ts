import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { CreateNotificationBody } from './create-notification-body';
import { PrismaService } from './prisma.service';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.notification.findMany();
  }

  @Post()
  async create(
    @Body() { content, recipientId, category }: CreateNotificationBody,
  ) {
    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId,
      },
    });
  }
}