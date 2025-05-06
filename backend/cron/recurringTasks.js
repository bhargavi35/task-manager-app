// cron/recurringTasks.js
const cron = require('node-cron');
const Task = require('../models/Task');

function setupRecurringTaskJob() {
    //   cron.schedule('*/30 * * * * *', async () => {
    cron.schedule('0 0 * * *', async () => {
        // console.log('⏰ Cron job running...');

        const tasks = await Task.find({ recurrence: { $ne: 'none' } });
        // console.log('Found recurring tasks:', tasks.length);

        for (const task of tasks) {
            let nextDueDate = new Date();

            if (task.recurrence === 'daily') {
                nextDueDate.setDate(nextDueDate.getDate() + 1);
            } else if (task.recurrence === 'weekly') {
                nextDueDate.setDate(nextDueDate.getDate() + 7);
            } else if (task.recurrence === 'monthly') {
                nextDueDate.setMonth(nextDueDate.getMonth() + 1);
            }

            const cloned = {
                ...task.toObject(),
                _id: undefined,
                dueDate: nextDueDate,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const newTask = await Task.create(cloned);
            // console.log(`✅ Recurring task created: ${newTask.title}`);
        }
    });
}

module.exports = setupRecurringTaskJob;
