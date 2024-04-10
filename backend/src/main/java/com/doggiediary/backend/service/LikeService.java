package com.doggiediary.backend.service;

import java.util.List;

import com.doggiediary.backend.exception.PostException;
import com.doggiediary.backend.exception.UserException;
import com.doggiediary.backend.model.Like;
import com.doggiediary.backend.model.UserDoggie;

public interface LikeService {
    
    public Like likePost(Long postId, UserDoggie user) throws UserException, PostException;

    public List<Like> getAllLikes(Long postId) throws PostException;

}
