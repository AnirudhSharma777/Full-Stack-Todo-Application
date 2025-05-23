package com.todo.Dto;

import jakarta.validation.constraints.NotNull;

public record TodoDto(

    @NotNull(message = "title is required")
    String title,
    @NotNull(message = "description is required")
    String description
) {

}
