package com.doggiediary.backend.mapper;

import java.util.ArrayList;
import java.util.List;

import com.doggiediary.backend.dto.LikeDto;
import com.doggiediary.backend.dto.PostDto;
import com.doggiediary.backend.dto.UserDto;
import com.doggiediary.backend.model.Like;
import com.doggiediary.backend.model.UserDoggie;

public class LikeDtoMapper {

    public static LikeDto toLikeDto(Like like, UserDoggie reqUser) {

        UserDto user = UserDtoMapper.toUserDto(like.getUser());
        UserDto reqUserDto = UserDtoMapper.toUserDto(reqUser);
        PostDto post = PostDtoMapper.toPostDto(like.getPost(), reqUser);

        LikeDto likeDto = new LikeDto();
        likeDto.setId(like.getId());
        likeDto.setPost(post);
        likeDto.setUser(user);

        return likeDto;

    }

    public static List<LikeDto> toLikeDtos(List<Like> likes, UserDoggie reqUser) {

        List<LikeDto> likeDtos = new ArrayList<>();

        for (Like like : likes) {
            UserDto user = UserDtoMapper.toUserDto(like.getUser());
            PostDto post = PostDtoMapper.toPostDto(like.getPost(), reqUser);

            LikeDto likeDto = new LikeDto();
            likeDto.setId(like.getId());
            likeDto.setPost(post);
            likeDto.setUser(user);
            likeDtos.add(likeDto);
        }
        
        return likeDtos;

    }

}
