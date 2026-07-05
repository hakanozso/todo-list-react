package com.hakan.todo_list.core.utilities.results;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public final class TodoDTO {
	private int todoId;
    private String todoText;
//    private String parentCategory;
   
}