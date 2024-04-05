package com.doggiediary.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.doggiediary.config.JwtProvider;
import com.doggiediary.exception.UserException;
import com.doggiediary.model.User;
import com.doggiediary.reponse.AuthResponse;
import com.doggiediary.repository.UserRepository;
import com.doggiediary.service.CustomUserDetailsServiceImplementation;

@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CustomUserDetailsServiceImplementation customeUserDetails;

    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {

        return null;

    }

}
