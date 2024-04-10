package com.doggiediary.backend.service;

import java.util.List;

import com.doggiediary.backend.exception.UserException;
import com.doggiediary.backend.model.UserDoggie;

public interface UserService {

    public UserDoggie findUserById(Long userId) throws UserException;

    public UserDoggie findUserProfileByJwt(String jwt) throws UserException;

    public UserDoggie updateUser(Long userId, UserDoggie user) throws UserException;

    public UserDoggie followUser(Long userId, UserDoggie user) throws UserException;

    public List<UserDoggie> searchUser(String query);
    
}
