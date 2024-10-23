package com.hakan.todo_list.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hakan.todo_list.business.abstracts.TodoService;
import com.hakan.todo_list.core.utilities.results.DataResult;
import com.hakan.todo_list.core.utilities.results.Result;
import com.hakan.todo_list.core.utilities.results.TodoDTO;
import com.hakan.todo_list.entities.abstracts.Todo;


@RestController
@RequestMapping("/api/todo")
@CrossOrigin
public class TodosController {
	
	@Autowired
	private TodoService todoService;
	
	@GetMapping("/getall")
	public DataResult<List<Todo>> getTodos(){
		return this.todoService.getTodos();
	}
	
	@PostMapping("/add")
	@ResponseBody
	public Result addTodo(@RequestBody TodoDTO todo) {
		return this.todoService.addTodo(todo);
	}
	
	@PostMapping("/edit")
	@ResponseBody
	public Result editTodo(@RequestBody TodoDTO todo) {
		return this.todoService.editTodo(todo);
	}
	
	@PostMapping("/delete")
	@ResponseBody
	public Result deleteTodo(@RequestBody TodoDTO todo) {
		return this.todoService.deleteTodo(todo);
	}
	

}
