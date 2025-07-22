INSERT INTO users (username, email, password, enabled, created_at, updated_at)
VALUES
    ('adminuser', 'admin@example.com', '1234', true, NOW(), NOW()),
    ('writer1', 'writer1@example.com', '1234',true, NOW(), NOW()),
    ('reader1', 'reader1@example.com', '1234',true, NOW(), NOW());


INSERT INTO user_roles (user_id, role)
VALUES
    (1, 'ROLE_ADMIN'),
    (2, 'ROLE_WRITER'),
    (3, 'ROLE_READER');

INSERT INTO posts (author_id, title, content, category, cover_url, likes, dislikes, created_at, updated_at)
VALUES
    (1, 'Glenn Martens Debut', 'Whatever it was that we witnessed at Glenn Martens’s Margiela debut, it was wrapped up in an an apparition of fearsome beauty. In basement chambers lined with layers of peeling paper, a collection of elababorately masked people evoked Gothic sculpture and strange, antiqued and patch-worked surfaces, sometimes almost as if they’d sprung from the walls themselves.

It takes some guts for a designer to follow both John Galliano and Martin Margiela, especially straight into presenting the Artisanal collection—the equivalent of haute couture at this house. It needed someone bold and fearless enough to seize that challenge, yet smart and skilled enough not to stumble obliviously over a storied past that many in fashion hold sacred. Martens proved himself to be that person: a designer who brings his own peculiarly Belgian sensibility to a label founded by a Belgian.

If we’ve been craving a frisson from fashion, now here it was, arriving in a strange, characterful form, a vision fraught with poetic imagery rising from dark corners of medieval history to give a new, cracked gloss to the upcycling and repurposing foundations of the house.', 'Fashion', 'https://cdn.mos.cms.futurecdn.net/jyddsqVGxyApw3DF5XmHKE.jpg', 0, 0, NOW(), NOW()),


    (1, 'Jan Sigma Ludwig', 'Jan ist ein Ayri', 'Film', 'https://noseryoung.ch/wp-content/uploads/2024/08/Jan_Ludwig.jpg', 0, 0, NOW(), NOW()),
    (2, 'Film Noir Revival', 'Classic cinema is back and better than ever.', 'Film', 'https://img.nzz.ch/2017/10/25/a1530f59-77bf-4d7d-96c0-6a297a5b9675.jpeg?width=1120&height=1688&fit=bounds&quality=75&auto=webp&crop=995,1500,x0,y0', 0, 0, NOW(), NOW()),

    (1, 'Is Bully Dropping?', 'When is kanye Dropping?', 'Music', 'https://preview.redd.it/bully-ye-wallpaper-v0-hx8zcz4md5vd1.png?width=640&crop=smart&auto=webp&s=d19ec46d33a9ad9a82b6f6354a998921b9b798b5', 0, 0, NOW(), NOW());



INSERT INTO comment (id, content, created_at, user_id, post_id)
VALUES (1, 'Great article!', NOW(), 1, 1);

