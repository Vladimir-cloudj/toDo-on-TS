export interface Task {
    id: string;
    name: string;
    priority: string;
    status: TaskStatus;//используем enum для статуса задачи
}

export interface Data {
    tasks: Task[];
}

export interface UIElementsI {
    HIGH_TASK_FORM: HTMLElement | null;
    LOW_TASK_FORM: HTMLElement | null;
    TASK_INPUT_HIGH: HTMLInputElement | null;
    TASK_INPUT_LOW: HTMLInputElement | null;
    HIGH_TASKS_LIST: HTMLUListElement | null;
    LOW_TASKS_LIST: HTMLUListElement | null;
}

// реализация enum для TaskStatus
export enum TaskStatus {
    Todo = 'To Do',
    Done= 'DONE',
}

// реализация enum для Priority
export enum TaskPriority {
    High = 'high',
    Low = 'low',
}