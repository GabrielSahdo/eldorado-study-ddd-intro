import express from 'express';
import { Database } from './database/Database.ts';
import { VisitService } from './services/VisitService.ts';
import { TaskService } from './services/TaskService.ts';
import { VisitController } from './controllers/VisitController.ts';
import { TaskController } from './controllers/TaskController.ts';

const PORT = 9000;
const database = new Database();
const visitService = new VisitService(database);
const visitController = new VisitController(visitService);
const taskService = new TaskService(database);
const taskController = new TaskController(taskService);

const app = express();
app.use(express.json());

app.get('/visit/:id', visitController.getVisit.bind(visitController));
app.post('/visit', visitController.createVisit.bind(visitController));
app.put('/visit/:id/start', visitController.startVisit.bind(visitController));
app.put('/visit/:id/complete', visitController.completeVisit.bind(visitController));
app.put('/visit/:id/abandon', visitController.abandonVisit.bind(visitController));
app.delete('/visit/:id', visitController.deleteVisit.bind(visitController));

app.post('/task', taskController.createTask.bind(taskController));
app.delete('/task/:id', taskController.deleteTask.bind(taskController));
app.put('/task/:id/complete', taskController.completeTask.bind(taskController));

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});