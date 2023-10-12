import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { TasksRepository } from "./tasks.repository";

const mockTaskRepository = () => ({
    getTasks: jest.fn(),
})

const mockUser = {
    username: 'Ariel',
    id: 'someId',
    password: 'somePassword',
    tasks: [],
};

describe("TasksService", () => {
    let tasksService: TasksService;
    let tasksRepository: TasksRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                {
                    provide: TasksRepository,
                    useFactory: mockTaskRepository
                }],

        }).compile();

        tasksService = module.get(TasksService);
        tasksRepository = module.get(TasksRepository)
    })

    describe('getTasks', () => {
        it('calls TaskRepository.getTasks and returns the result', async () => {
            expect(tasksRepository.getTasks).not.toHaveBeenCalled();

            const result = await tasksService.getTasks(null, mockUser);

            expect(tasksRepository.getTasks).toHaveBeenCalled();
            expect(result).toEqual('someValue');

        })
    })

})