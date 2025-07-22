package ch.noseryoung.newssite.Posts;


import ch.noseryoung.newssite.Users.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    public Post createPost(Post post, Long authorId) {
        var author = userRepository.findById(authorId)
                .orElseThrow(() -> new RuntimeException("Author not found with id: " + authorId));
        post.setAuthor(author);
        return postRepository.save(post);
    }



    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }


    public void incrementLikes(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow();
        post.setLikes(post.getLikes() + 1);
        postRepository.save(post);
    }

    public void incrementDislikes(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow();
        post.setDislikes(post.getDislikes() + 1);
        postRepository.save(post);
    }

}
