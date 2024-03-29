const express = require('express');
const NotificationRouter = express.Router();

const NotificationsPatchByTitleController = require('../../Controller/NotificationsController/NotificationsPatchByTitleController');
const NotificationsGetController = require('../../Controller/NotificationsController/NotificationsGetByTitleController');
const NotificationsGetByCourseIdController = require('../../Controller/NotificationsController/NotificationsGetByCourseIdController');
const NotificationsGetByEmailController = require('../../Controller/NotificationsController/NotificationsGetByEmailController');
const NotificationsPatchByIdController = require('../../Controller/NotificationsController/NotificationsPatchByIdController');





NotificationRouter.get('/notification', NotificationsGetController);
NotificationRouter.get('/notification/update/:email', NotificationsGetByEmailController);
NotificationRouter.get('/notifications/:courseId', NotificationsGetByCourseIdController);
NotificationRouter.patch('/notification/update/:id', NotificationsPatchByIdController);
NotificationRouter.patch('/notification', NotificationsPatchByTitleController);

module.exports = NotificationRouter;