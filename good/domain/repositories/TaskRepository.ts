import { Database } from "../../database/Database.ts";

export class TaskService {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    async createTask(name: string, visitID: number) {
        const visitExist = await this.database.get(visitID);
        if (!visitExist) {
            throw new Error('visitID not found');
        }

        if (visitExist.status !== 'OPEN') {
            throw new Error('Task can only be created if visit status is OPEN');
        }

        await this.database.save({
            name,
            visitID,
            completed: false,
        });

        return;
    }

    async deleteTask(id: number) {
        const task = await this.database.get(id);
        if (!task) {
            throw new Error('task not found');
        }

        if (task.visit.status !== 'OPEN') {
            throw new Error('Task can only be deleted if visit status is OPEN');
        }

        if (task.visit.taskList.length === 1) {
            throw new Error('Cannot delete the last task in a visit');
        }

        await this.database.delete(id);

        return;
    }

    async completeTask(id: number) {
        const task = await this.database.get(id);
        if (!task) {
            throw new Error('task not found');
        }

        if (task.visit.status !== 'IN_PROGRESS') {
            throw new Error('Task can only be completed if visit status is IN_PROGRESS');
        }

        this.database.save({
            ...task,
            completed: true,
        });

        return;
    }
}