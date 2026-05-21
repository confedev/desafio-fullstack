package com.previred.challenge.infrastructure.persistence.mapper;

import com.previred.challenge.core.model.User;
import com.previred.challenge.infrastructure.persistence.entity.UserEntity;
import org.springframework.stereotype.Component;

@Component
public class UserPersistenceMapper {

    public User toDomain(UserEntity entity) {
        if (entity == null) {
            return null;
        }
        return User.builder()
                .id(entity.getId())
                .nombres(entity.getNombres())
                .apellidos(entity.getApellidos())
                .rut(entity.getRut())
                .dv(entity.getDv())
                .fechaNacimiento(entity.getFechaNacimiento())
                .correoElectronico(entity.getCorreoElectronico())
                .contrasena(entity.getContrasena())
                .build();
    }

    public UserEntity toEntity(User domain) {
        if (domain == null) {
            return null;
        }
        return UserEntity.builder()
                .id(domain.getId())
                .nombres(domain.getNombres())
                .apellidos(domain.getApellidos())
                .rut(domain.getRut())
                .dv(domain.getDv())
                .fechaNacimiento(domain.getFechaNacimiento())
                .correoElectronico(domain.getCorreoElectronico())
                .contrasena(domain.getContrasena())
                .build();
    }
}
