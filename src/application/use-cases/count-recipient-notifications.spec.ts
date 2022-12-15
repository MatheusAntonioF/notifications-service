import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('teste'),
        recipientId: 'example-recipient-id',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('teste'),
        recipientId: 'example-recipient-id',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('teste'),
        recipientId: 'fake-recipient-id',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'example-recipient-id',
    });

    expect(count).toEqual(2);
  });
});
