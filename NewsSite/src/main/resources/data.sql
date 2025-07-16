INSERT INTO users (username, email, password, enabled, created_at, updated_at)
VALUES
    ('adminuser', 'admin@example.com', '$2a$10$6DnkN.1MyzUUT0XpTLXs8uMd1eUYHGP5p/ZmtrXiNn5ZC7Dw7FvSG', true, NOW(), NOW()),
    ('writer1', 'writer1@example.com', '$2a$10$6DnkN.1MyzUUT0XpTLXs8uMd1eUYHGP5p/ZmtrXiNn5ZC7Dw7FvSG', true, NOW(), NOW()),
    ('reader1', 'reader1@example.com', '$2a$10$6DnkN.1MyzUUT0XpTLXs8uMd1eUYHGP5p/ZmtrXiNn5ZC7Dw7FvSG', true, NOW(), NOW());


INSERT INTO posts (author_id, title, content, category, cover_url, likes, dislikes, created_at, updated_at)
VALUES
    (1, 'Glenn Martens Debut', 'Glenn Martens Debut at Maison Margiela', 'Fashion', 'https://cdn.mos.cms.futurecdn.net/jyddsqVGxyApw3DF5XmHKE.jpg', 42, 3, NOW(), NOW()),
    (2, 'Film Noir Revival', 'Classic cinema is back and better than ever.', 'Film', 'https://static1.moviewebimages.com/wordpress/wp-content/uploads/2023/08/the-10-best-neo-noir-movies-ever-made-ranked-rp.jpg', 15, 1, NOW(), NOW()),
    (1, 'Street Art Explosion', 'Urban artists are transforming cities.', 'Art', 'https://example.com/art.jpg', 60, 2, NOW(), NOW());
