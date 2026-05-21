package com.previred.challenge.core.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    private Long id;
    private String nombres;
    private String apellidos;
    private Long rut;
    private String dv;
    private LocalDate fechaNacimiento;
    private String correoElectronico;
    private String contrasena;
}
