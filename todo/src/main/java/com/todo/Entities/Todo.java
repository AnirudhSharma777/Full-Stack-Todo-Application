package com.todo.Entities;

import jakarta.persistence.*;
import lombok.Data; 
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;

@Entity
@Table(name = "todos") 
@Data 
@NoArgsConstructor 
@AllArgsConstructor 
@Builder
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID) 
    private String id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT") 
    private String description;

    @Column(nullable = false)
    private boolean completed = false; 

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

   
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}