package com.doggiediary.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doggiediary.backend.exception.PostException;
import com.doggiediary.backend.exception.UserException;
import com.doggiediary.backend.model.Post;
import com.doggiediary.backend.model.UserDoggie;
import com.doggiediary.backend.repository.PostRepository;
import com.doggiediary.backend.request.PostReplyRequest;

@Service
public class PostServiceImplementation implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    public Post createPost(Post req, UserDoggie user) throws UserException {
        Post post = new Post();
        post.setContent(req.getContent());
        post.setCreatedAt(LocalDateTime.now());
        post.setImage(req.getImage());
        post.setUser(user);
        post.setReply(false);
        post.setPost(true);
        post.setVideo(req.getVideo());

        return postRepository.save(post);
    }

    @Override
    public List<Post> findAllPost() {
        return postRepository.findAllByIsPostTrueOrderByCreatedAtDesc();
    }

    @Override
    public Post repost(Long postId, UserDoggie user) throws UserException, PostException {
        Post post = findById(postId);
        if (post.getRepostUser().contains(user)) {
            post.getRepostUser().remove(user);
        } else {
            post.getRepostUser().add(user);
        }
        return postRepository.save(post);
    }

    @Override
    public Post findById(Long postId) throws PostException {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new PostException("Post not found with id " + postId));
        return post;
    }

    @Override
    public void deletePostById(Long postId, Long userId) throws PostException, UserException {
        Post post = findById(postId);
        if (!userId.equals(post.getUser().getId())) {
            throw new UserException("You can't delete another user's post");
        }
        postRepository.deleteById(post.getId());
    }

    @Override
    public Post removeFromRepost(Long postId, UserDoggie user) throws PostException, UserException {
        return null;
    }

    @Override
    public Post createdReply(PostReplyRequest req, UserDoggie user) throws PostException {

        Post replyFor = findById(req.getPostId());

        Post post = new Post();
        post.setContent(req.getContent());
        post.setCreatedAt(LocalDateTime.now());
        post.setImage(req.getImage());
        post.setUser(user);
        post.setReply(true);
        post.setPost(false);
        post.setReplyFor(replyFor);

        Post savedReply = postRepository.save(post);

        post.getReplyPosts().add(savedReply);
        postRepository.save(replyFor);

        return replyFor;
    }

    @Override
    public List<Post> getUserPost(UserDoggie user) {
        return postRepository.findByRepostUserContainsOrUser_IdAndIsPostTrueOrderByCreatedAtDesc(user, user.getId());
    }

    @Override
    public List<Post> findByLikesContainsUser(UserDoggie user) {
        return postRepository.findByLikesUser_id(user.getId());
    }

}
