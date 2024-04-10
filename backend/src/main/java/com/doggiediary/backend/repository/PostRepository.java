package com.doggiediary.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.doggiediary.backend.model.Post;
import com.doggiediary.backend.model.UserDoggie;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findAllByIsPostTrueOrderByCreatedAtDesc();

    List<Post> findByRepostUserContainsOrUser_IdAndIsPostTrueOrderByCreatedAtDesc(UserDoggie user, Long userId);

    List<Post> findByLikesContainingOrderByCreatedAtDesc(UserDoggie user);

    @Query("Select p from Post p JOIN p.likes l where l.user.id=:userId")
    List<Post> findByLikesUser_id(Long userId);

}
