import { Task, Data, TaskStatus } from './types.js';
import { UIElements, SIZE_LIMITS } from './uiElements.js';

const taskList: Data = {
    tasks: []
};

export async function loadTasks(): Promise<Data> {
    // пробуем вначале загрузить из LocalStorage
    const localStorageTasks = localStorage.getItem('tasks');
    // если задач нет, то загружаем из файла
    if (localStorageTasks && localStorageTasks.length>2) {//магическое цифра 2
        taskList.tasks = JSON.parse(localStorageTasks);
        return taskList;
    } else{
        try {
            const response = await fetch('../dist/tasks.json');
            if (!response.ok) {
                throw new Error('Ошибка загрузки задач');// выбрасываем исключение
            }
            const jsonTasks: Data = await response.json();
            taskList.tasks = jsonTasks.tasks;// если загрузка прошла успешно, то присваиваем задачи из файла
            saveTasksToLocalStorage(); // сохраняем задачи в LocalStorage для последующего использования
            return taskList;
        } catch(error) {
            console.error('Ошибка загрузки задач:', error);
            throw error;
        }
    }
}

function isNameValid(name: string) {
    if (name.length < SIZE_LIMITS.minSizeMessage || name.length > SIZE_LIMITS.maxSizeMessage) {
        throw new Error('Имя должно быть от 3 до 90 символов');
    }
}

export function addTask(name: string, priority: string, status: TaskStatus = TaskStatus.Todo): Task {
    // проверяем валидно ли имя
    isNameValid(name)
    // if (name.length < SIZE_LIMITS.minSizeMessage || name.length > SIZE_LIMITS.maxSizeMessage) {
    //     throw new Error('Имя должно быть от 3 до 90 символов');// выбрасываем исключение
    // }
    // создаем новую задачу
    const newTask: Task = {
        id: Date.now().toString(),//используем текущее время в мс как уникальный ID
        name,
        priority,
        status,
    };
    taskList.tasks.push(newTask);// добавляем задачу в наш массив
    saveTasksToLocalStorage(); // сохраняем задачи в LocalStorage для последующего использования
    return newTask; // возвращаем задачу
}

function saveTasksToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(taskList.tasks));
}

export function renderTasks(): void {
    // очищение контейнеров перед рендерингом если они есть
    if (UIElements.HIGH_TASKS_LIST && UIElements.LOW_TASKS_LIST) {
        UIElements.HIGH_TASKS_LIST.innerHTML = '';//очищаем контейнер высоприориттных задач
        UIElements.LOW_TASKS_LIST.innerHTML = '';//очищаем контейнер низких задач
    }

    // проходим по всем задачам и добавляем их в соответствующие списки
    taskList.tasks.forEach(task => {
        const taskDiv = document.createElement('div');//создание контейнера для задачи
        taskDiv.className = 'list-item';
        taskDiv.id = `${task.id}`
        //создаем текст имени задачи
        const taskNameInput = document.createElement('input');//создание поля имени для задачи
        taskNameInput.type = 'text';
        taskNameInput.value = task.name;
        taskNameInput.className = 'item-name';
        taskNameInput.readOnly = true;//чтоб задача не могла быть изменена по умолчанию

        //создаем чекбокс
        const doneCheckbox = document.createElement('input');
        doneCheckbox.type = 'checkbox';
        doneCheckbox.checked = task.status === TaskStatus.Done;//устанавливаем состояние чекбокса
        doneCheckbox.addEventListener('change', () => {
            task.status = doneCheckbox.checked ? TaskStatus.Done : TaskStatus.Todo;// меняем статус задачи
            console.log(task.status === TaskStatus.Done);
            taskNameInput.style.textDecoration = task.status === TaskStatus.Done ? 'line-through' : 'none';
            // task.status === TaskStatus.Done ? taskNameInput.style.textDecoration = 'line-through' : taskNameInput.style.textDecoration = 'none'
            // if (task.status === 'Done') {
            //     taskNameInput.style.textDecoration = 'line-through';//Перечеркиваем текст задачи
            // } else {
            //     taskNameInput.style.textDecoration = 'none';//убираем перечеркивание
            // }
            saveTasksToLocalStorage();//сохраняем изменения в LocalStorage
            // renderTasks();// рендерим задачи
        });
        //создаем кнопку "редактировать"
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            taskNameInput.readOnly = false;//разрешаем редактировать имя задачи
            taskNameInput.focus();//переключаем фокус на поле ввода
            // добавим кнопку save для сохраниения изменений
            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            saveButton.addEventListener('click', () => {
                const newName = taskNameInput.value.trim()
                editTask(task.id, newName)
                taskNameInput.readOnly = true//снова делаем поле тольо для чтения
                taskDiv.removeChild(saveButton)//удаляем кнопку Save
            })
            taskDiv.insertBefore(saveButton,editButton)
        });

        // добавляем обработчик события для поля ввода, чтобы сохранять изм имени когда клик вне поля
        taskNameInput.addEventListener('blur', () => {
            const newName = taskNameInput.value.trim()
            editTask(task.id, newName)
            taskNameInput.readOnly = true
            const saveButton = taskDiv.querySelector('button:nth-child(3)')
            if (saveButton) {
                taskDiv.removeChild(saveButton)
            }
        })

        //создаем кнопку "удалить"
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'DeleteButton';
        deleteButton.addEventListener('click', (event) => {
            const taskEl = event.target as HTMLDivElement;
            const taskElement = taskEl.closest('.list-item');//получаем элемент, который был выбран
            if (taskElement) {
                const taskID = taskElement.id;               
                if (taskID) {
                    taskList.tasks = taskList.tasks.filter(task => task.id !== taskID);//удаляем задачу из массива                   
                    saveTasksToLocalStorage();//сохраняем изменения в LocalStorage
                    renderTasks();// рендерим задачи
                }
            }
        });

        //добавляем все элементы в контейнер задачи
        taskDiv.appendChild(doneCheckbox);//добавляем чекбокс
        taskDiv.appendChild(taskNameInput);//добавляем поле имени задачи
        taskDiv.appendChild(editButton);//добавляем кнопку редактирования
        taskDiv.appendChild(deleteButton);//добавляем кнопку удаления
        //добавляем контейнер задачи в соответствующий список по ее приоритету        
        if (task.priority === 'high') {
            UIElements.HIGH_TASKS_LIST?.appendChild(taskDiv);//добавляем контейнер задачи в список высоких задач
        } else if (task.priority === 'low') {
            UIElements.LOW_TASKS_LIST?.appendChild(taskDiv);//добавляем контейнер задачи в список низких задач
        }
    });
}

export function setupAddTaskButtons(): void {
    const addTaskButtons = document.querySelectorAll('.add-task-button');// получаем все кнопки с классом add-task-button
    addTaskButtons.forEach(button => {
        button.addEventListener('click', () => {
            const priority = button.getAttribute('data-priority'); // получаем значение data-priority из кнопки
            const input = button.previousElementSibling as HTMLInputElement; // Получаем предшествующее поле ввода
            const taskName = input.value.trim(); // получаем значение ввода
            if (taskName && priority!== null) {
                addTask(taskName, priority);// добавляем задачу
                input.value = '';// очищаем поле ввода
                renderTasks();// рендерим задачи
            }
        })
    })
}

export function editTask(taskId: string, newName: string): void {
    try {
        isNameValid(newName); // Проверяем валидность нового имени
        const taskToEdit = taskList.tasks.find(task => task.id === taskId);
        if (taskToEdit) {
            taskToEdit.name = newName;
            saveTasksToLocalStorage(); // Сохраняем изменения
            renderTasks(); // Перерисовываем задачи
        } else {
            throw new Error('Задача не найдена');
        }
    } catch (error) {
        console.error('Ошибка при редактировании задачи:', error);// Здесь отображение ошибки пользователю
    }
}

// Инициализация
export function init() {
    loadTasks()
        .then(() => {
            renderTasks();
            setupAddTaskButtons();
        })
        .catch(error => console.error('Ошибка загрузки:', error));
}


export function nameLog(name:number):void {    
    console.log(name);
}
