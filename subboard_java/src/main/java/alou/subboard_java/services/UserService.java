package alou.subboard_java.services;

import alou.subboard_java.commons.UserUtils;
import alou.subboard_java.dtos.User;
import alou.subboard_java.entities.UserEntity;
import alou.subboard_java.mapping.SubboardMapper;
import alou.subboard_java.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final SubboardMapper subboardMapper;

    public UserService(UserRepository userRepository, SubboardMapper subboardMapper) {
        this.userRepository = userRepository;
        this.subboardMapper = subboardMapper;
    }

    public User getCurrentUser() {
        Long connectedUserId = UserUtils.getConnectedUserId();

        UserEntity userEntity = userRepository.findById(connectedUserId).orElseThrow(() -> new NoSuchElementException("lol"));

        return subboardMapper.toUserDto(userEntity);
    }
}
