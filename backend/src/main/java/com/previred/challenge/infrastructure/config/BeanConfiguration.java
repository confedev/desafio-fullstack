package com.previred.challenge.infrastructure.config;

import com.previred.challenge.core.port.inbound.UserServicePort;
import com.previred.challenge.core.port.outbound.UserRepositoryPort;
import com.previred.challenge.core.service.UserServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfiguration {

    @Bean
    public UserServicePort userServicePort(UserRepositoryPort userRepositoryPort) {
        return new UserServiceImpl(userRepositoryPort);
    }
}
