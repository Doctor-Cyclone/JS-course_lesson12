'use strict';

const todoControl = document.querySelector('.todo-control'),
	headerInput = document.querySelector('.header-input'),
	todoList = document.querySelector('.todo-list'),
	todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const setLocalStorage = function(){
	localStorage.setItem('todo', JSON.stringify(todoData));
},
getLocalStorage = function(){
	if(localStorage.getItem('todo')){
		return todoData = JSON.parse(localStorage.getItem('todo'));
	}
};

const render = function(){
	getLocalStorage();

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
		//Добавление элемента в ВЫПОЛНЕННЫЕ или неВЫПОЛНЕННЫЕ
				if(item.completed){
					todoCompleted.append(li);
				} else {
					todoList.append(li);
				}
		//КНОПКИ УДАЛИТЬ и ВЫПОЛНЕНО
			const btnTodoComplete = li.querySelector('.todo-complete'),
				btnTodoRemove = li.querySelector('.todo-remove');
			//Удаление блока
			btnTodoRemove.addEventListener('click', function(){
				li.remove();
				todoData.splice(todoData.indexOf(item), 1);
				setLocalStorage();
			});
			//Отметка выполнено
			btnTodoComplete.addEventListener('click', function(){
				item.completed = !item.completed;
				setLocalStorage();
				render();
			});
		}
		
	});

	headerInput.value = '';
};

todoControl.addEventListener('submit', function(event){
	event.preventDefault();

	if(headerInput.value.trim() === ''){
		headerInput.value = '';
	} else {
		const newTodo = {
			value: headerInput.value,
			completed: false
		};
	
		todoData.push(newTodo);
		setLocalStorage();
		render();
	}
	
});

render();