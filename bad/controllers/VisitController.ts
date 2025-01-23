import { VisitService } from "../services/VisitService.ts";

export class VisitController {
    private visitService: VisitService;

    constructor(visitService: VisitService) {
        this.visitService = visitService;
    }

    async createVisit(req: any, res: any) {
        await this.visitService.createVisit(
            new Date(req.body.startDate),
            req.body.visitorID,
            req.body.taskList,
        );
        res.json('Visit created');
        return;
    }

    async getVisit(req: any, res: any): Promise<void> {
        const visit = await this.visitService.getVisit(req.params.id);
        res.json(visit);
        return;
    }

    async startVisit(req: any, res: any) {
        await this.visitService.startVisit(+req.params.id);
        res.json('Visit started');
        return;
    }

    async completeVisit(req: any, res: any) {
        await this.visitService.completeVisit(+req.params.id);
        res.json('Visit completed');
        return;
    }

    async abandonVisit(req: any, res: any) {
        await this.visitService.abandonVisit(+req.params.id);
        res.json('Visit abandoned');
        return;
    }

    async deleteVisit(req: any, res: any) {
        await this.visitService.deleteVisit(+req.params.id);
        res.json('Visit deleted');
        return;
    }
}