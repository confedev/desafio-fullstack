package com.previred.challenge.core.service;

import com.previred.challenge.core.model.User;
import com.previred.challenge.core.port.inbound.UserServicePort;
import com.previred.challenge.core.port.outbound.UserRepositoryPort;

import java.util.List;

public class UserServiceImpl implements UserServicePort {
    private final UserRepositoryPort userRepositoryPort;

    public UserServiceImpl(UserRepositoryPort userRepositoryPort) {
        this.userRepositoryPort = userRepositoryPort;
    }

    @Override
    public User createUser(User user) {
        return userRepositoryPort.save(user);
    }

    @Override
    public User getUserById(Long id) {
        return userRepositoryPort.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));
    }

    @Override
    public List<User> getAllUsers() {
        return userRepositoryPort.findAll();
    }

    @Override
    public User updateUser(Long id, User user) {
        User existingUser = getUserById(id);
        existingUser.setNombres(user.getNombres());
        existingUser.setApellidos(user.getApellidos());
        existingUser.setRut(user.getRut());
        existingUser.setDv(user.getDv());
        existingUser.setFechaNacimiento(user.getFechaNacimiento());
        existingUser.setCorreoElectronico(user.getCorreoElectronico());
        if (user.getContrasena() != null && !user.getContrasena().trim().isEmpty()) {
            existingUser.setContrasena(user.getContrasena());
        }
        return userRepositoryPort.save(existingUser);
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepositoryPort.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado con ID: " + id);
        }
        userRepositoryPort.deleteById(id);
    }
}
