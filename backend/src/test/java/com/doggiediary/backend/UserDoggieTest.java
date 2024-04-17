package com.doggiediary.backend;

import com.doggiediary.backend.model.UserDoggie;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class UserDoggieTest {

    @Test
    public void testUserDoggieInitialization() {
        UserDoggie user = new UserDoggie();

        assertNotNull(user);

        assertNotNull(user.getPost());
        assertNotNull(user.getLikes());
        assertNotNull(user.getFollowers());
        assertNotNull(user.getFollowings());

        assertTrue(user.getPost().isEmpty());
        assertTrue(user.getLikes().isEmpty());
        assertTrue(user.getFollowers().isEmpty());
        assertTrue(user.getFollowings().isEmpty());
    }

    @Test
    public void testUserDoggieProperties() {
        UserDoggie user = new UserDoggie();

        user.setFullName("John Doe");
        user.setEmail("john@example.com");
        user.setPassword("password123");

        assertEquals("John Doe", user.getFullName());
        assertEquals("john@example.com", user.getEmail());
        assertEquals("password123", user.getPassword());
    }

}
