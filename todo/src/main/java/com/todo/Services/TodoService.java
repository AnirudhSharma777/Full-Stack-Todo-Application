package com.todo.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.Dto.TodoDto;
import com.todo.Entities.Todo;
import com.todo.Exception.ResourceNotFoundException;
import com.todo.Repositories.TodoRepository;
import com.todo.ResponseDto.TodoResponseDto;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private TodoMapper todoMapper;

    public List<TodoResponseDto> getAllTodos() {
        return todoRepository.findAllByOrderByCreatedAtAsc().stream().map(todoMapper::maptoTodoResponseDto).toList();
    }

    public TodoResponseDto getTodoById(String id) {
        return todoRepository.findById(id).map(todoMapper::maptoTodoResponseDto)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id: " + id));
    }

    public TodoResponseDto addTodo(TodoDto todoDto) {

        Todo todo = todoMapper.maptoTodo(todoDto);
        Todo savedTodo = todoRepository.save(todo);
        return todoMapper.maptoTodoResponseDto(savedTodo);

    }

    public TodoResponseDto updateTodo(String id, TodoDto todoDetails) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id: " + id));

        todo.setTitle(todoDetails.title());
        todo.setDescription(todoDetails.description());
        todo.setUpdatedAt(LocalDateTime.now());

        Todo updatedTodo = todoRepository.save(todo);

        return todoMapper.maptoTodoResponseDto(updatedTodo);
    }

    public void deleteTodo(String id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id: " + id));
        todoRepository.delete(todo);
    }
}