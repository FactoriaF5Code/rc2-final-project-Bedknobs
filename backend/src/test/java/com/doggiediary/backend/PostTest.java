package com.doggiediary.backend;

import com.doggiediary.backend.model.Post;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class PostTest {

    @Test
    public void testPostInitialization() {
        Post post = new Post();

        assertNotNull(post);

        assertNotNull(post.getLikes());
        assertNotNull(post.getReplyPosts());
        assertNotNull(post.getRepostUser());
        assertTrue(post.getLikes().isEmpty());
        assertTrue(post.getReplyPosts().isEmpty());
        assertTrue(post.getRepostUser().isEmpty());

        assertNull(post.getContent());
        assertNull(post.getImage());
        assertNull(post.getVideo());
    }

    @Test
    public void testPostProperties() {
        Post post = new Post();

        post.setContent("Test content");
        post.setImage("test.jpg");
        post.setVideo("test.mp4");

        assertEquals("Test content", post.getContent());
        assertEquals("test.jpg", post.getImage());
        assertEquals("test.mp4", post.getVideo());
    }

}
