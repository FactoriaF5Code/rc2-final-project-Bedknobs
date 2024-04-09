package com.doggiediary.backend.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Data;
import java.util.List;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
public class UserDoggie {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    private String fullName;
    private String firstName;
    private String lastName;
    private String location;
    private String birthDate;
    private String email;
    private String password;
    private String mobile;
    private String image;
    private String backgroundImage;
    private String bio;
    private boolean req_user;
    private boolean login_with_google;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Post> post = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Like> likes = new ArrayList<>();

    @JsonIgnore
    @ManyToMany
    private List<UserDoggie> followers = new ArrayList<>();

    @JsonIgnore
    @ManyToMany
    private List<UserDoggie> followings = new ArrayList<>();

}