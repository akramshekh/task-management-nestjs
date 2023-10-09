import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;

        // Define temporary Array to hold the result

        let tasks = this.getAllTasks();

        // Do something with status
        if (status) {
            tasks = tasks.filter((task) => task.status === status);
        }

        // Do something with description
        if (search) {
            tasks = tasks.filter((task) => {
                if (task.title.includes(search) || task.description.includes(search)) {
                    return task;
                }
            })
        }

        // The final result

        return tasks
    }

    getTaskById(id: string): Task {

        const found = this.tasks.find((task) => task.id === id);

        if (!found) {
            throw new NotFoundException();
        }

        return found
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.tasks.find((task) => task.id === id);
        task.status = status;
        return task;
    }

    deleteTaskById(id: string): void {
        this.tasks = this.tasks.filter((task) => task.id !== id)
    }
}
