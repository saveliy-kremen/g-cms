package db

var schema = `
DROP TABLE IF EXISTS items_categories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS vendors;
DROP TABLE IF EXISTS currencies;

CREATE TABLE users (
	id serial PRIMARY KEY,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,

	fullname varchar(256) NOT NULL,
	phone varchar(13) DEFAULT '',
	email varchar(256) NOT NULL UNIQUE,
	password varchar(256) NOT NULL,
	photo varchar(256) DEFAULT '',
	role int DEFAULT 0,
	trademark varchar(256) DEFAULT '',
	tariff int DEFAULT 0,
	amount numeric(10,2) DEFAULT 0,
	about text DEFAULT '',
	upload_images json DEFAULT '[]'::JSON
   );
CREATE INDEX fullname ON users (fullname);

CREATE TABLE items (
	id bigserial PRIMARY KEY,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,

	user_id int,
	draft bool,
	title text NOT NULL,
	article varchar(256) DEFAULT '',
	alias varchar(256) NOT NULL,
	images json DEFAULT '[]'::JSON,
	description text DEFAULT '',
	price numeric(11,2) DEFAULT 0,
	old_price numeric(11,2) DEFAULT 0,
	count int DEFAULT 0,
	in_stock bool DEFAULT false,
	disable bool DEFAULT false,
	sort int DEFAULT 0,
	seo_title text DEFAULT '',
	seo_description text DEFAULT '',
	seo_keywords text DEFAULT '',

	parent_id bigint DEFAULT NULL,
	vendor_id int DEFAULT NUll,
	currency_id smallint DEFAULT NULL,

	FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
	FOREIGN KEY (parent_id) REFERENCES items (id) ON DELETE CASCADE
   );
CREATE INDEX created_at ON items (created_at);
CREATE INDEX title ON items (title);
CREATE INDEX alias ON items (alias);

CREATE TABLE categories (
	id bigserial PRIMARY KEY,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,

	user_id int,
	draft bool,
	title text NOT NULL,
	alias varchar(256) NOT NULL,
	description text DEFAULT '',
	image text DEFAULT '',
	parent varchar(256) DEFAULT '',
	sort int DEFAULT 0,
	disabled bool DEFAULT false,
	seo_title text DEFAULT '',
	seo_description text DEFAULT '',
	seo_keywords text DEFAULT '',

	FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
   );
CREATE INDEX categories_created_at ON categories (created_at);
CREATE INDEX categories_title ON categories (title);

CREATE TABLE items_categories (
	item_id    bigint REFERENCES items (id) ON UPDATE CASCADE ON DELETE CASCADE,
    category_id int REFERENCES categories (id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT items_categories_pkey PRIMARY KEY (item_id, category_id)
  );

CREATE TABLE vendors (
	id serial PRIMARY KEY,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,

	name varchar(256) NOT NULL,
	country varchar(256) DEFAULT ''
   );
CREATE INDEX name ON vendors (name);

CREATE TABLE currencies (
	id serial PRIMARY KEY,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,

	name varchar(256) NOT NULL,
	short_name varchar(256) DEFAULT '',
	code varchar(4) NOT NULL,
	rate numeric(5,4) NOT NULL
   );
`
