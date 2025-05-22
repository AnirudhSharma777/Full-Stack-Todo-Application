package com.todo.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.todo.Entities.Todo;
import com.todo.Services.TodoService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "https://full-stack-todo-application-six.vercel.app/") // Specific for your React app, or configure globally
public class TodoController {

    @Autowired
    private TodoService todoService;

    @PostMapping("/todos")
    public ResponseEntity<Todo> addTodo(@RequestBody Todo todo) {
        Todo newTodo = todoService.addTodo(todo);
        return new ResponseEntity<>(newTodo, HttpStatus.CREATED);
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Todo>> getAllTodos() {
        List<Todo> todos = todoService.getAllTodos();
        return ResponseEntity.ok(todos);
    }


    @GetMapping("/todos/{id}")
    public ResponseEntity<Todo> getTodoUsingId(@PathVariable("id") String id) {
        Todo todo = todoService.getTodoById(id);
        return ResponseEntity.ok(todo);
    }

    @PutMapping("/todos/update/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable("id") String id, @RequestBody Todo todoDetails) {
        Todo updatedTodo = todoService.updateTodo(id, todoDetails);
        return ResponseEntity.ok(updatedTodo);
    }

    @DeleteMapping("/todos/delete/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable("id") String id) {
        todoService.deleteTodo(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}