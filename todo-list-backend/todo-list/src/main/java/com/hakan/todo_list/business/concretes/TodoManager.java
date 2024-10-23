package com.hakan.todo_list.business.concretes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hakan.todo_list.business.abstracts.TodoService;
import com.hakan.todo_list.core.utilities.results.DataResult;
import com.hakan.todo_list.core.utilities.results.ErrorDataResult;
import com.hakan.todo_list.core.utilities.results.ErrorResult;
import com.hakan.todo_list.core.utilities.results.Result;
import com.hakan.todo_list.core.utilities.results.SuccessDataResult;
import com.hakan.todo_list.core.utilities.results.SuccessResult;
import com.hakan.todo_list.core.utilities.results.TodoDTO;
import com.hakan.todo_list.dataAccess.abstracts.TodoDao;
import com.hakan.todo_list.entities.abstracts.Todo;

@Service
public class TodoManager implements TodoService {
	
	@Autowired
	private TodoDao todoDao;
	
	@Override
	public DataResult<List<Todo>> getTodos() { 
		// TODO Auto-generated method stub
		
		return new SuccessDataResult<List<Todo>>(this.todoDao.findAll(), "Veri başarıyla getirildi.");
		
	}

	@Override
	public DataResult<Todo> addTodo(TodoDTO todo2) {
		// TODO Auto-generated method stub
		
		Todo todo = new Todo();
		todo.setTodo(todo2.getTodoText().trim());

		if(todo2.getTodoText().trim().isEmpty()) {
			return new ErrorDataResult<Todo>(null, "Lütfen bir todo giriniz.");
		}else if(!this.todoDao.findByTodo(todo2.getTodoText().trim()).isEmpty()) {
			return new ErrorDataResult<Todo>(null, "Todo daha önce eklenmiş.");
		}else {
			Todo newUser = this.todoDao.save(todo);
			return new SuccessDataResult<Todo>(newUser, "Todo başarıyla eklendi.");
		}
		
	}

	@Override
	
	public Result deleteTodo(TodoDTO todo) {
		// TODO Auto-generated method stub
		
		this.todoDao.deleteById(todo.getTodoId());
		return new SuccessResult("Todo başarıyla silindi");
		
	}

	@Override
	public Result editTodo(TodoDTO todo2) {
		// TODO Auto-generated method stub
		
		if(todo2.getTodoText().trim().isEmpty()) {
			return new ErrorResult("Lütfen bir todo giriniz.");
		}else if(!this.todoDao.findByTodo(todo2.getTodoText().trim()).isEmpty() && this.todoDao.findByTodo(todo2.getTodoText().trim()).get(0).getId() == todo2.getTodoId()) {
			return new ErrorResult("Todo zaten aynı.");
		}else if(!this.todoDao.findByTodo(todo2.getTodoText().trim()).isEmpty()) {
			return new ErrorResult("Todo daha önce eklenmiş.");
		}else {
			Todo todo = new Todo(todo2.getTodoId(), todo2.getTodoText());
			this.todoDao.save(todo);
			return new SuccessResult("Todo başarıyla güncellendi.");
		}

	}



}
