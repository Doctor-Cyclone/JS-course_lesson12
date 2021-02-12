'use strict';

const todoControl = document.querySelector('.todo-control'),
	headerInput = document.querySelector('.header-input'),
	todoList = document.querySelector('.todo-list'),
	todoCompleted = document.querySelector('.todo-completed');

const todoData = [];

const render = function(){
	let todoFromLS = JSON.parse(localStorage.getItem('todo'));

	todoList.textContent = '';
	todoCompleted.textContent = '';

	todoData.forEach(function(item){
		item.value = item.value.trim();

		if(item.value === ''){
			alert('Пустое поле нельзя добавить!');
		} else {
			const li = document.createElement('li');
			li.classList.add('todo-item');
			li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
				'<div class="todo-buttons">' +
					'<button class="todo-remove"></button>' +
					'<button class="todo-complete"></button>' +
				'</div>';

			if(item.completed){
				todoCompleted.append(li);
			} else {
				todoList.append(li);
			}

			const btnTodoComplete = li.querySelector('.todo-complete'),
				btnTodoRemove = li.querySelector('.todo-remove');
			//Удаление блока
			btnTodoRemove.addEventListener('click', function(){
				li.remove();
				localStorage.setItem('todo', JSON.stringify(todoData));
			});
			//Отметка выполнено
			btnTodoComplete.addEventListener('click', function(){
				item.completed = !item.completed;
				render();
			});
		}
		localStorage.setItem('todo', JSON.stringify(todoData));
	});
	headerInput.value = '';
};

todoControl.addEventListener('submit', function(event){
	event.preventDefault();

	const newTodo = {
		value: headerInput.value,
		completed: false
	};

	todoData.push(newTodo);
	render();
});

render();