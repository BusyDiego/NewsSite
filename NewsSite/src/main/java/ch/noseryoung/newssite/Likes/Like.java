package ch.noseryoung.newssite.Likes;

import ch.noseryoung.newssite.Posts.Post;
import ch.noseryoung.newssite.Users.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Post post;

    @ManyToOne
    private User user;

    private boolean liked;
}
