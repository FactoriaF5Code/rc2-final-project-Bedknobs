package com.doggiediary.backend.service;

import java.util.List;

import com.doggiediary.backend.exception.PostException;
import com.doggiediary.backend.exception.UserException;
import com.doggiediary.backend.model.Post;
import com.doggiediary.backend.model.UserDoggie;
import com.doggiediary.backend.request.PostReplyRequest;

public interface PostService {

    public Post createPost(Post req, UserDoggie user) throws UserException;

    public List<Post> findAllPost();

    public Post repost(Long postId, UserDoggie user) throws UserException, PostException;

    public Post findById(Long postId) throws PostException;

    public void deletePostById(Long postId, Long userId) throws PostException, UserException;

    public Post removeFromRepost(Long postId, UserDoggie user) throws PostException, UserException;

    public Post createdReply(PostReplyRequest req, UserDoggie user) throws PostException;

    public List<Post> getUserPost(UserDoggie user);

    public List<Post> findByLikesContainsUser(UserDoggie user);

}
