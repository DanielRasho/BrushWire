-- Dummy Data
INSERT INTO member (username, password)
values
	('dummy', 123);

INSERT INTO post ( author, title, tags, thumbnail_path, content_path )
values
	('dummy', 'title 1', 'art,Noveau', '/image/path', '/content/path'),
	('dummy', 'title 2', 'drawing,draft', '/image/path', '/content/path');
