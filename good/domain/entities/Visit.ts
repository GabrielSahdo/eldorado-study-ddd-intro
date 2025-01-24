import { Task } from "./Task";

export enum VISIT_STATUS {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    CLOSED = 'CLOSED',
    ABANDONED = 'ABANDONED',
}

export class Visit {
    private _id: string;
    private _taskList: Task[];
    private _startDate: Date;
    private _visitorID: number;
    private _status: VISIT_STATUS;

    constructor(startDate: Date, visitorID: number, taskList: Task[]) {
        this._id = crypto.randomUUID();
        this._startDate = startDate;
        this._visitorID = visitorID;
        this._taskList = taskList;
        this._status = VISIT_STATUS.OPEN;

        this.validate();
    }

    validate() {
        if (this._taskList.length === 0) {
            throw new Error('taskList cannot be empty');
        }

        if (!this._visitorID) {
            throw new Error('visitorID is required');
        }

        return;
    }

    start() {
        if (this._status !== VISIT_STATUS.OPEN) {
            throw new Error('Visit can only be started if status is OPEN');
        }

        if (this._startDate > new Date()) {
            throw new Error('Visit cannot be started before startDate');
        }

        this._status = VISIT_STATUS.IN_PROGRESS;
    }

    complete() {
        if (this._status !== VISIT_STATUS.IN_PROGRESS) {
            throw new Error('Visit can only be completed if status is IN_PROGRESS');
        }

        this._status = VISIT_STATUS.CLOSED;
    }

    abandon() {
        if (this._status !== VISIT_STATUS.IN_PROGRESS) {
            throw new Error('Visit can only be abandoned if status is IN_PROGRESS');
        }

        this._status = VISIT_STATUS.ABANDONED;
    }

    completeTask(taskID: string) {
        if (this._status !== VISIT_STATUS.IN_PROGRESS) {
            throw new Error('Task can only be completed if status is IN_PROGRESS');
        }

        const task = this._taskList.find(task => task.id === taskID);

        if (!task) {
            throw new Error('Task not found');
        }

        task.complete();
    }

    uncompleteTask(taskID: string) {
        if (this._status !== VISIT_STATUS.IN_PROGRESS) {
            throw new Error('Task can only be uncompleted if status is IN_PROGRESS');
        }

        const task = this._taskList.find(task => task.id === taskID);

        if (!task) {
            throw new Error('Task not found');
        }

        task.uncomplete();
    }

    static restore(data: { id: string, startDate: Date, visitorID: number, taskList: Task[], status: VISIT_STATUS }) {
        const visit = new Visit(data.startDate, data.visitorID, data.taskList);
        
        visit._id = data.id;
        visit._status = data.status;

        return visit;
    }
}

