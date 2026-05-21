package com.previred.challenge.presentation.controller.mapper;

import com.previred.challenge.core.model.User;
import com.previred.challenge.presentation.controller.dto.UserRequest;
import com.previred.challenge.presentation.controller.dto.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    User toDomain(UserRequest request);

    UserResponse toResponse(User user);
}
