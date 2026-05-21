package com.previred.challenge.infrastructure.persistence.repository;

import com.previred.challenge.core.model.User;
import com.previred.challenge.core.port.outbound.UserRepositoryPort;
import com.previred.challenge.infrastructure.persistence.entity.UserEntity;
import com.previred.challenge.infrastructure.persistence.mapper.UserPersistenceMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class UserRepositoryAdapter implements UserRepositoryPort {
    private final SpringDataUserRepository springRepository;
    private final UserPersistenceMapper mapper;

    public UserRepositoryAdapter(SpringDataUserRepository springRepository, UserPersistenceMapper mapper) {
        this.springRepository = springRepository;
        this.mapper = mapper;
    }

    @Override
    public User save(User user) {
        UserEntity entity = mapper.toEntity(user);
        UserEntity savedEntity = springRepository.save(entity);
        return mapper.toDomain(savedEntity);
    }

    @Override
    public Optional<User> findById(Long id) {
        return springRepository.findById(id).map(mapper::toDomain);
    }

    @Override
    public List<User> findAll() {
        return springRepository.findAll().stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id) {
        springRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return springRepository.existsById(id);
    }
}
