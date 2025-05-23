package com.todo.Services;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.todo.Dto.TodoDto;
import com.todo.Entities.Todo;
import com.todo.ResponseDto.TodoResponseDto;

@Component
public class TodoMapper {


    public Todo maptoTodo(TodoDto request) {
        if(request == null){
            return null;
        }


        return Todo.builder()
        .title(request.title())
        .description(request.description())
        .completed(false)
        .createdAt(LocalDateTime.now())
        .updatedAt(null)
        .build();
    }


    public TodoResponseDto maptoTodoResponseDto(Todo todo) {
    if (todo == null) {
        return null;
    }

    return new TodoResponseDto(
        todo.getId(),
        todo.getTitle(),
        todo.getDescription(),
        todo.isCompleted(),
        todo.getCreatedAt(),
        todo.getUpdatedAt()
    );
}

}
