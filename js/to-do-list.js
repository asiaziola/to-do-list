{
    let tasks = [
    ];

    let hideDoneTasks = false;

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-removeButton");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const doneButtons = document.querySelectorAll(".js-doneButton");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                doneTask(index);
            });
        });
    };

    const bindAllEvent = () => {
        if (tasks.length > 0) {
            const doneAllTasks = document.querySelector(".js-doneAll");
            doneAllTasks.addEventListener("click", () => {
                for (const task of tasks) {
                    task.done ? task.done : task.done = !task.done
                };
                render();
            });
        };

        if (tasks.length > 0) {
            const toggleDoneTasks = document.querySelector(".js-toggleDone");
            toggleDoneTasks.addEventListener("click", () => {
                hideDoneTasks = !hideDoneTasks;
                render();
            });
        };
    };

    const renderButtons = () => {
        let htmlString = "";
        if (tasks.length > 0) {
            htmlString += `
            <button class="js-toggleDone">${hideDoneTasks ?'Ukryj ukończone' :'Pokaż ukończone'}</button>
            <button ${tasks.every(({ done }) => done) ? 'disabled' : ""} class="js-doneAll">Ukończ wszystkie</button>
            `
        }

        document.querySelector(".js-buttonsAll").innerHTML = htmlString;
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
                htmlString += `
                <li class="${hideDoneTasks && task.done ?'list__item--disabled' : "list__item"}">
                <button class="list__button--done js-doneButton">${task.done ? "✔" : ""}</button>
                <span${task.done ? " style=\"text-decoration: line-through\"" : ""} class="list__content">
                ${task.content}</span>
                <button class="js-removeButton list__button--remove"><i class="fa fa-trash-o"></i></button>
                </li>
                `;
            }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindAllEvent();
    };

    const doneTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            { ...tasks[index], done: !tasks[index].done },
            ...tasks.slice(index + 1)
        ];
        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.splice(0, index),
            ...tasks.splice(index + 1)
        ];
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
                done: false,
            }
        ];

        render();
    };

    const resetForm = () => {
        document.querySelector(".js-form").reset();
    };

    const focusForm = () => {
        document.querySelector(".js-newTask").focus();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            focusForm();
            return;
        }

        addNewTask(newTaskContent);
        resetForm();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}