import prisma from '../utils/prisma';
import { Logger } from '../utils/logger';

const logger = new Logger('NotificationService');

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  metadata?: any;
  read: boolean;
  createdAt: Date;
}

export class NotificationService {
  async createNotification(
    userId: string,
    type: string,
    title: string,
    message: string,
    metadata?: any
  ): Promise<Notification> {
    try {
      logger.info('Creating notification', { userId, type, title });

      const notification = await prisma.notification.create({
        data: {
          userId,
          type,
          title,
          message,
          metadata,
          read: false
        }
      });

      return notification;
    } catch (error) {
      logger.error('Error creating notification:', error);
      throw error;
    }
  }

  async markAsRead(id: string): Promise<Notification> {
    try {
      const notification = await prisma.notification.update({
        where: { id },
        data: { read: true }
      });

      return notification;
    } catch (error) {
      logger.error('Error marking notification as read:', error);
      throw error;
    }
  }

  async getUserNotifications(userId: string, unreadOnly = false): Promise<Notification[]> {
    try {
      const notifications = await prisma.notification.findMany({
        where: {
          userId,
          ...(unreadOnly ? { read: false } : {})
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return notifications;
    } catch (error) {
      logger.error('Error fetching user notifications:', error);
      throw error;
    }
  }

  async deleteNotification(id: string): Promise<void> {
    try {
      await prisma.notification.delete({
        where: { id }
      });
    } catch (error) {
      logger.error('Error deleting notification:', error);
      throw error;
    }
  }
}

export const notificationService = new NotificationService();
