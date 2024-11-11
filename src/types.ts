export interface Task {
    id: string;
    name: string;
    priority: string;
    status: string;
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