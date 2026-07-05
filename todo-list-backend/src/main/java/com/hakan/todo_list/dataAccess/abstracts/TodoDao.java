package com.hakan.todo_list.dataAccess.abstracts;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hakan.todo_list.entities.abstracts.Todo;


public interface TodoDao extends JpaRepository<Todo, Integer> {
	
	List<Todo> findByTodo(String todo);

}
