package com.doggiediary.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.doggiediary.backend.dto.LikeDto;
import com.doggiediary.backend.exception.PostException;
import com.doggiediary.backend.exception.UserException;
import com.doggiediary.backend.mapper.LikeDtoMapper;
import com.doggiediary.backend.model.Like;
import com.doggiediary.backend.model.UserDoggie;
import com.doggiediary.backend.service.LikeService;
import com.doggiediary.backend.service.UserService;

@RestController
@RequestMapping("/api")
public class LikeController {

    @Autowired
    private UserService userService;
    @Autowired
    private LikeService likeService;

    @PostMapping("/{postId}/likes")
    public ResponseEntity<LikeDto> likePost(@PathVariable Long postId,
            @RequestHeader("Authorization") String jwt) throws UserException, PostException {

        UserDoggie user = userService.findUserProfileByJwt(jwt);
        Like like = likeService.likePost(postId, user);

        LikeDto likeDto = LikeDtoMapper.toLikeDto(like, user);

        return new ResponseEntity<LikeDto>(likeDto, HttpStatus.CREATED);

    }

    @PostMapping("/post/{postId}")
    public ResponseEntity<List<LikeDto>> getAllLikes(@PathVariable Long postId,
            @RequestHeader("Authorization") String jwt) throws UserException, PostException {

        UserDoggie user = userService.findUserProfileByJwt(jwt);
        List<Like> likes = likeService.getAllLikes(postId);

        List<LikeDto> likeDtos = LikeDtoMapper.toLikeDtos(likes, user);

        return new ResponseEntity<>(likeDtos, HttpStatus.CREATED);

    }

}
