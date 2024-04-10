package com.doggiediary.backend.util;

import com.doggiediary.backend.model.Like;
import com.doggiediary.backend.model.Post;
import com.doggiediary.backend.model.UserDoggie;

public class PostUtil {

    public final static boolean isLikedByReqUser(UserDoggie reqUser, Post post) {

        for (Like like : post.getLikes()) {
            if (like.getUser().getId().equals(reqUser.getId())) {
                return true;
            }
        }

        return false;

    }

    public final static boolean isRepostedByReqUser(UserDoggie reqUser, Post post) {

        for (UserDoggie user : post.getRepostUser()) {
            if (user.getId().equals(reqUser.getId())) {
                return true;
            }
        }
        return false;
    }

}
