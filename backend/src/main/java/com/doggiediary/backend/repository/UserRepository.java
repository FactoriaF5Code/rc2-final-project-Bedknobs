package com.doggiediary.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.doggiediary.backend.model.UserDoggie;


public interface UserRepository extends JpaRepository<UserDoggie, Long> {

    public UserDoggie findByEmail(String email);

    @Query("SELECT DISTINCT u FROM UserDoggie u WHERE u.fullName LIKE %:query% ESCAPE '\\' OR u.email LIKE %:query% ESCAPE '\\'")
public List<UserDoggie> searchUser(@Param("query") String query);


}