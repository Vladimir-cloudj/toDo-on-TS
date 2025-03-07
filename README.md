# (RU) Менеджер задач
## Использование
Простое приложение для управления задачами, которое позволяет пользователям добавлять и управлять задачами с высоким и низким приоритетом.
Это приложение позволяет пользователям добавлять задачи, классифицированные как задачи с высоким или низким приоритетом. Пользователи могут вводить задачи через формы и просматривать их в отдельных списках.

## Элементы интерфейса
  Приложение использует следующие элементы интерфейса:
- Форма высокоприоритетных задач: Форма для добавления задач с высоким приоритетом.
- Форма низкоприоритетных задач: Форма для добавления задач с низким приоритетом.
- Список высокоприоритетных задач: Список, отображающий все задачи с высоким приоритетом.
- Список низкоприоритетных задач: Список, отображающий все задачи с низким приоритетом.

## Ограничения по размеру
Приложение устанавливает следующие ограничения по размеру для сообщений задач:
Минимальный размер: 3 символа
Максимальный размер: 30 символов

### Основные компоненты кода:
- Типы и интерфейсы:
Используются типы и интерфейсы, такие как Task, Data, TaskStatus, и TaskPriority, которые определены в файле types.ts. Это позволяет строго типизировать данные и предотвращать ошибки, связанные с неправильными типами.
- Enums:
Enums используются для определения статусов задач (TaskStatus) и приоритетов (TaskPriority). Это позволяет легко управлять и использовать эти значения в коде, делая его более читаемым и понятным.
- Асинхронные функции:
Функция loadTasks использует async/await для асинхронной загрузки задач из localStorage или из JSON-файла. Это делает код более чистым и понятным по сравнению с использованием промисов.
- DOM-манипуляции:
В коде активно используются методы для работы с DOM, такие как document.createElement, appendChild, и обработчики событий. Это позволяет динамически создавать и управлять элементами интерфейса.
- Обработка ошибок:
В коде предусмотрена обработка ошибок с помощью try/catch, что позволяет отлавливать и обрабатывать исключения, возникающие при загрузке задач или редактировании.
- Локальное хранилище:
Функция saveTasksToLocalStorage отвечает за сохранение задач в localStorage, что позволяет сохранять состояние задач между сессиями.

# (EN) ToDo
## Usage
Simple task management application that allows users to add and manage tasks with high and low priority. This application enables users to add tasks classified as high-priority or low-priority. Users can enter tasks through forms and view them in separate lists..

## UI Elements
The application uses the following UI elements:

- High Task Form: A form for adding high priority tasks.
- Low Task Form: A form for adding low priority tasks.
- High Tasks List: A list that displays all high priority tasks.
- Low Tasks List: A list that displays all low priority tasks.

## Size Limits
The application enforces the following size limits for task messages:
Minimum size: 3 characters
Maximum size: 30 characters
