-- 10 April 2023 8:06:30 PM
CREATE TABLE users (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	userId INTEGER(255),
	userName VARCHAR(255),
	email VARCHAR(255),
	date DATE)

-- 10 April 2023 11:28:43 PM
CREATE TABLE creators (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	userId INTEGER(255),
	creatorId INTEGER(255),
	channelId INTEGER(255),
	channelName VARCHAR(255),
	channelCategories VARCHAR(255),
	date DATE)
	
-- 10 April 2023 11:55:16 PM
CREATE TABLE posts (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	creatorId INTEGER(255),
	post VARCHAR(255),
	compressedPost VARCHAR(255),
	postId INTEGER(255),
	language VARCHAR(255),
	categories VARCHAR(255),
	title  VARCHAR(255),
	description VARCHAR(255),
	date DATE
);

-- 11 April 2023 9:32:07 PM
CREATE TABLE subscribers (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	userId INTEGER(255),
	creatorId INTEGER(255)
	)

-- 16 April 2023 6:54:44 PM 
ALTER TABLE creators
ADD creatorProfile varchar(255);

-- 17 April 2023 3:17:54 PM
CREATE TABLE shorts (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
creatorId INTEGER(255),
shorts VARCHAR(255),
date DATE
);

-- 21 April 2023 10:36:35 PM
CREATE TABLE postLikes (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
postId INTEGER(255),
userId INTEGER(255),
likes BOOLEAN,
disLike BOOLEAN,
date DATE
);

ALTER TABLE subscribers
ADD subscribe VARCHAR(255);