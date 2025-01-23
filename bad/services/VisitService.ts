import { Database } from "../database/Database.ts";

export class VisitService {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    async createVisit(startDate: Date, visitorID: number, taskList: any[]) {
        const userExist = await this.database.get(visitorID);
        if (!userExist) {
            throw new Error('visitorID not found');
        }

        if (startDate < new Date()) {
            throw new Error('startDate must be in the future');
        }

        if (taskList.length === 0) {
            throw new Error('taskList cannot be empty');
        }

        await this.database.save({
            startDate,
            visitorID,
            status: 'OPEN',
            taskList: taskList.map((task: any) => ({
                name: task.name,
                completed: false,
            })),
        });

        return;
    }

    async getVisit(id: any) {
        const visit = await this.database.get(id);

        return {}
    }

    async startVisit(id: number) {
        const visit = await this.database.get(id);
        if (!visit) {
            throw new Error('visit not found');
        }

        if (visit.startDate > new Date()) {
            throw new Error('Visit cannot be started before startDate');
        }

        if (visit.status !== 'OPEN') {
            throw new Error('Visit can only be started if status is OPEN');
        }

        await this.database.save({
            ...visit,
            status: 'IN_PROGRESS',
        });

        return;
    }

    async completeVisit(id: number) {
        const visit = await this.database.get(id);
        if (!visit) {
            throw new Error('visit not found');
        }

        if (visit.status !== 'IN_PROGRESS') {
            throw new Error('Visit can only be completed if status is IN_PROGRESS');
        }

        if (visit.taskList.some((task: any) => !task.completed)) {
            throw new Error('Visit cannot be completed if all tasks are not completed');
        }

        await this.database.save({
            ...visit,
            status: 'COMPLETED',
        });

        return;
    }

    async abandonVisit(id: number) {
        const visit = await this.database.get(id);
        if (!visit) {
            throw new Error('visit not found');
        }

        if (visit.status !== 'OPEN') {
            throw new Error('Visit can only be abandoned if status is OPEN');
        }

        await this.database.save({
            ...visit,
            status: 'ABANDONED',
        });

        return;
    }

    async deleteVisit(id: number) {
        const visit = await this.database.get(id);
        if (!visit) {
            throw new Error('visit not found');
        }

        if (visit.status !== 'ABANDONED') {
            throw new Error('Visit can only be deleted if status is ABANDONED');
        }

        await this.database.delete(id);

        return;
    }
}