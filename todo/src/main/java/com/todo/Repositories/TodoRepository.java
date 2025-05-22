package com.todo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todo.Entities.Todo;

public interface TodoRepository extends JpaRepository<Todo, String>{
    List<Todo> findAllByOrderByCreatedAtAsc();
}
