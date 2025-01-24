import { Database } from "../../database/Database.ts";
import { Visit } from "../entities/Visit.ts";

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

        const visit = new Visit(startDate, visitorID, taskList);

        await this.database.save(visit);

        return;
    }

    async getVisit(id: any) {
        const visit = await this.database.get(id);
        if (!visit) {
            throw new Error('visit not found');
        }

        return Visit.restore(visit);
    }

    async startVisit(id: number) {
        const visit = await this.getVisit(id);

        visit.start();

        await this.database.save(visit);

        return;
    }

    async completeVisit(id: number) {
        const visit = await this.getVisit(id);

        visit.complete();

        await this.database.save(visit);

        return;
    }

    async abandonVisit(id: number) {
        const visit = await this.getVisit(id);

        visit.abandon();

        await this.database.save(visit);

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