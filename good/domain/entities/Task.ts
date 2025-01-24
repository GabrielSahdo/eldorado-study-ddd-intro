export class Task {
    private _id: string;
    private _name: string;
    private _completed: boolean;

    constructor(name: string) {
        this._id = crypto.randomUUID();
        this._name = name;
        this._completed = false;
    }

    complete() {
        this._completed = true;
    }

    uncomplete() {
        this._completed = false;
    }

    get id() {
        return this.id;
    }
}