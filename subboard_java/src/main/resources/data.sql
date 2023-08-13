DELETE
FROM [dbo].[subscription];
DELETE
FROM [dbo].[user];

INSERT INTO [dbo].[user] (id, email, profil_picture, theme)
VALUES (1, 'test@test.test', null, 'dark');

ALTER SEQUENCE [user_seq] RESTART WITH 2;

INSERT INTO [dbo].[subscription] (id, user_id, name, color, logo)
VALUES (1, 1, 'Netflix', 'red', null),
       (2, 1, 'Spotify', 'lime', null);

ALTER SEQUENCE [subscription_seq] RESTART WITH 3;
