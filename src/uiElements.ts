import { UIElementsI } from './types';

export const UIElements: UIElementsI = {
    HIGH_TASK_FORM: document.querySelector<HTMLFormElement>('#high-task-form'),
    LOW_TASK_FORM: document.querySelector<HTMLFormElement>('#low-task-form'),
    TASK_INPUT_HIGH: document.querySelector<HTMLInputElement>('#form-tasks__add--high'),
    TASK_INPUT_LOW: document.querySelector<HTMLInputElement>('#form-tasks__add--low'),
    HIGH_TASKS_LIST: document.querySelector<HTMLUListElement>('#high-tasks__list'),
    LOW_TASKS_LIST: document.querySelector<HTMLUListElement>('#low-tasks__list'),
};

export const SIZE_LIMITS = {
    minSizeMessage: 3,
    maxSizeMessage: 30,
};