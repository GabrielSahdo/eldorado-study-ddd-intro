import { TaskService } from "../services/TaskService.ts";

export class TaskController {
    private taskService: TaskService;

    constructor(taskService: TaskService) {
        this.taskService = taskService;
    }

    async createTask(req: any, res: any) {
        await this.taskService.createTask(req.body.name, req.body.visitID);
        res.json('Task created');
        return;
    }

    async deleteTask(req: any, res: any) {
        await this.taskService.deleteTask(+req.params.id);
        res.json('Task deleted');
        return;
    }

    async completeTask(req: any, res: any) {
        await this.taskService.completeTask(+req.params.id);
        res.json('Task completed');
        return;
    }
}