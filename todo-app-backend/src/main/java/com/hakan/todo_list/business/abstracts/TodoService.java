package com.hakan.todo_list.business.abstracts;

import java.util.List;

import com.hakan.todo_list.core.utilities.results.DataResult;
import com.hakan.todo_list.core.utilities.results.Result;
import com.hakan.todo_list.core.utilities.results.TodoDTO;
import com.hakan.todo_list.entities.abstracts.Todo;

public interface TodoService {
	
	DataResult<List<Todo>> getTodos();
	
	DataResult<Todo> addTodo(TodoDTO todo);
	
	Result editTodo(TodoDTO todo);
	
	Result deleteTodo(TodoDTO todo);


}
