package com.hakan.todo_list.core.utilities.results;

import com.hakan.todo_list.enums.TodoPriority;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public final class TodoDTO {
	private int id;
    private String title;
    private TodoPriority priority;
}