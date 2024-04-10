package com.doggiediary.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doggiediary.backend.exception.PostException;
import com.doggiediary.backend.exception.UserException;
import com.doggiediary.backend.model.Like;
import com.doggiediary.backend.model.Post;
import com.doggiediary.backend.model.UserDoggie;
import com.doggiediary.backend.repository.LikeRepository;
import com.doggiediary.backend.repository.PostRepository;

@Service
public class LikeServiceImplementation implements LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private PostService postService;

    @Autowired
    private PostRepository postRepository;

    @Override
    public Like likePost(Long postId, UserDoggie user) throws UserException, PostException {

        Like isLikeExist = likeRepository.isLikeExist(user.getId(), postId);

        if (isLikeExist != null) {
            likeRepository.deleteById(isLikeExist.getId());
            return isLikeExist;
        }

        Post post = postService.findById(postId);

        Like like = new Like();
        like.setPost(post);
        like.setUser(user);

        Like savedLike = likeRepository.save(like);

        post.getLikes().add(savedLike);
        postRepository.save(post);

        return savedLike;

    }

    @Override
    public List<Like> getAllLikes(Long postId) throws PostException {

        Post post = postService.findById(postId);

        List<Like> likes = likeRepository.findByPostId(postId);
        
        return likes;

    }

}
