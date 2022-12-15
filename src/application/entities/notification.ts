import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/Replace';
import { Content } from './content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(
    props: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = { ...props, createdAt: props.createdAt ?? new Date() };
  }

  get id() {
    return this._id;
  }

  get recipientId(): string {
    return this.props.recipientId;
  }

  set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  get content(): Content {
    return this.props.content;
  }

  set content(content: Content) {
    this.props.content = content;
  }

  get category(): string {
    return this.props.category;
  }

  set category(category: string) {
    this.props.category = category;
  }

  get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  read() {
    this.props.readAt = new Date();
  }

  unread() {
    this.props.readAt = null;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  cancel(): void {
    this.props.canceledAt = new Date();
  }
}
