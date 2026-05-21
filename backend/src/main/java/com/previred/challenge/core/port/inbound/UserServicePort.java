package com.previred.challenge.core.port.inbound;

import com.previred.challenge.core.model.User;

import java.util.List;

public interface UserServicePort {
    User createUser(User user);
    User getUserById(Long id);
    List<User> getAllUsers();
    User updateUser(Long id, User user);
    void deleteUser(Long id);
}
