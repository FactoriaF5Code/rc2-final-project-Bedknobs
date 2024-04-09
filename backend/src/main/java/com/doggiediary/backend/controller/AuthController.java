package com.doggiediary.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.doggiediary.backend.config.JwtProvider;
import com.doggiediary.backend.exception.UserException;
import com.doggiediary.backend.model.UserDoggie;
import com.doggiediary.backend.response.AuthResponse;
import com.doggiediary.backend.repository.UserRepository;
import com.doggiediary.backend.service.CustomUserDetailsServiceImplementation;
import org.springframework.web.bind.annotation.PostMapping;

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

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody UserDoggie user) throws UserException {
        String email = user.getEmail();
        UserDoggie isEmailExist = userRepository.findByEmail(email);
        if (isEmailExist != null) {
            throw new UserException("Email is already used with another account");
        }

        user.setFullName(user.getFirstName() + " " + user.getLastName());

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        
        UserDoggie savedUser = userRepository.save(user);

        String token = jwtProvider.generateToken(email);
        AuthResponse res = new AuthResponse(token, true);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody UserDoggie user) {
        // Verificar la autenticación y generar el token JWT
        String email = user.getEmail();
        UserDoggie foundUser = userRepository.findByEmail(email);
        if (foundUser == null) {
            throw new BadCredentialsException("Invalid username or password");
        }
        if (!passwordEncoder.matches(user.getPassword(), foundUser.getPassword())) {
            throw new BadCredentialsException("Invalid username or password");
        }
        String token = jwtProvider.generateToken(email);
        AuthResponse res = new AuthResponse(token, true);
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

    private Authentication authenticate(String username, String password) {

        UserDetails userDetails = customeUserDetails.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username...");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid username or password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

}