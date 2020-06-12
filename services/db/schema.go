package db

var schema = `
DROP TABLE IF EXISTS users;
CREATE TABLE users (
	id serial PRIMARY KEY,
	created_at timestamp,

	fullname varchar(256) NOT NULL,
	phone varchar(13),
	email varchar(256) NOT NULL UNIQUE,
	password varchar(256) NOT NULL,
	photo varchar(256),
	role int,
	trademark varchar(256),
	tariff int,
	amount numeric(10,2) DEFAULT 0,
	about text 
   );
CREATE INDEX fullname ON users (fullname);

DROP TABLE IF EXISTS user_images;
CREATE TABLE user_images (
	id serial PRIMARY KEY,

	user_id int,
	filename text ,

	FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
   );

DROP TABLE IF EXISTS items;
CREATE TABLE items (
	id bigserial PRIMARY KEY,
	created_at timestamp,

	user_id int,
	vendor_id int,
	parent_id bigint,
	draft bool,
	title text NOT NULL,
	article varchar(256),
	alias varchar(256) NOT NULL,
	images json,
	description text,
	price numeric(11,2),
	old_price numeric(11,2),
	currency_id smallint,
	count int,
	in_stock bool,
	disable bool,
	sort int,
	seo_title text,
	seo_description text,
	seo_keywords text
   );
CREATE INDEX created_at ON items (created_at);
CREATE INDEX title ON items (title);
CREATE INDEX alias ON items (alias);
`
