package com.previred.challenge.presentation.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String nombres;
    private String apellidos;
    private Long rut;
    private String dv;
    private LocalDate fechaNacimiento;
    private String correoElectronico;
}
