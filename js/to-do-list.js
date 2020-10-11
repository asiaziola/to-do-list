{
    const tasks = [
    ];

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

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="list__item">
                <button class="list__button--done js-doneButton">${task.done ? "✔" : ""}</button>
                <span${task.done ? " style=\"text-decoration: line-through\"" : ""} class="list__content">
                ${task.content}</span>
                <button class="js-removeButton list__button--remove"><i class="fa fa-trash-o"></i></button>
           </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const doneTask = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
            done: false
        });

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