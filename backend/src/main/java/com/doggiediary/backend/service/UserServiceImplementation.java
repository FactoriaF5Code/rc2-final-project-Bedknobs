package com.doggiediary.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doggiediary.backend.config.JwtProvider;
import com.doggiediary.backend.exception.UserException;
import com.doggiediary.backend.model.UserDoggie;
import com.doggiediary.backend.repository.UserRepository;

@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public UserDoggie findUserById(Long userId) throws UserException {

        UserDoggie user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException("User not found " + userId));
        return user;

    }

    @Override
    public UserDoggie findUserProfileByJwt(String jwt) throws UserException {

        String email = jwtProvider.getEmailFromToken(jwt);
        UserDoggie user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UserException("User not found with email " + email);
        }
        return user;

    }

    @Override
    public UserDoggie updateUser(Long userId, UserDoggie req) throws UserException {

        UserDoggie user = findUserById(userId);

        if (req.getFullName() != null) {
            user.setFullName(req.getFullName());
        }

        if (req.getImage() != null) {
            user.setImage(req.getImage());
        }

        if (req.getBackgroundImage() != null) {
            user.setBackgroundImage(req.getBackgroundImage());
        }

        if (req.getBirthDate() != null) {
            user.setBirthDate(req.getBirthDate());
        }

        if (req.getLocation() != null) {
            user.setLocation(req.getLocation());
        }

        if (req.getBio() != null) {
            user.setBio(req.getBio());
        }

        return userRepository.save(user);

    }

    @Override
    public UserDoggie followUser(Long userId, UserDoggie user) throws UserException {

        UserDoggie followToUser = findUserById(userId);

        if (user.getFollowings().contains(followToUser) && followToUser.getFollowers().contains(user)) {
            user.getFollowings().remove(followToUser);
            followToUser.getFollowers().remove(user);
        } else {
            user.getFollowings().add(followToUser);
            followToUser.getFollowers().add(user);
        }
        userRepository.save(followToUser);
        userRepository.save(user);

        return followToUser;

    }

    @Override
    public List<UserDoggie> searchUser(String query) {

        return userRepository.searchUser(query);

    }

}
