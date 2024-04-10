package com.doggiediary.backend.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import java.util.List;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Entity
@Data
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    @ManyToOne
    private UserDoggie user;

    private String content;
    private String image;
    private String video;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Like> likes = new ArrayList<>();

    @OneToMany
    private List<Post> replyPosts = new ArrayList<>();

    @ManyToMany
    private List<UserDoggie> repostUser = new ArrayList<>();

    @ManyToOne
    private Post replyFor;

    private boolean isReply;
    private boolean isPost;

    private LocalDateTime createdAt;
}