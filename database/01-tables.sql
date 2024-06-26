-- Create tables
create table member (
	username VARCHAR(30) primary key,
	password VARCHAR(30) not null
); 

create table post (
	id serial primary key,
	author VARCHAR(30) not null,
	title VARCHAR(45) not null,
	tags text,
	publishdate timestamp default current_timestamp not null,
	thumbnailpath text not null,
	contentpath text not null,
	constraint author_title unique (author, title),
	constraint post_author foreign key (author) 
		references member(username)
		on delete cascade
);