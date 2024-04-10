package com.doggiediary.backend.util;

import com.doggiediary.backend.model.UserDoggie;

public class UserUtil {

    public static final boolean isReqUser(UserDoggie reqUser, UserDoggie user2) {
        return reqUser.getId().equals(user2.getId());
    }

    public static final boolean isFollowedByReqUser(UserDoggie reqUser, UserDoggie user2) {
        return reqUser.getFollowings().contains(user2);
    }

}
