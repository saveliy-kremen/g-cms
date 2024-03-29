package db

var schema = `
DROP TABLE IF EXISTS items_rozetka_properties;
DROP TABLE IF EXISTS items_rozetka_categories;
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS orders_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS items_properties;
DROP TABLE IF EXISTS properties_categories;
DROP TABLE IF EXISTS properties_values;
DROP TABLE IF EXISTS properties;
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
	upload_images json DEFAULT '[]'::JSON,
	active bool DEFAULT false,
	shop_name varchar(256) DEFAULT '',
	shop_url varchar(256) DEFAULT ''
);
CREATE INDEX fullname ON users (fullname);

CREATE TABLE items (
	id bigserial PRIMARY KEY,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,

	user_id int,
	draft bool DEFAULT false,
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
	vendor_id int DEFAULT 0,
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
	user_id int,
	item_id    bigint REFERENCES items (id) ON UPDATE CASCADE ON DELETE CASCADE,
    category_id int REFERENCES categories (id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT items_categories_pkey PRIMARY KEY (item_id, category_id)
);

CREATE TABLE properties (
	id bigserial PRIMARY KEY,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,

	user_id int,
	title text NOT NULL,
	code varchar(256) NOT NULL,
	type int NOT NULL,
	display int NOT NULL,
	required bool DEFAULT false,
	multiple bool DEFAULT false,
	sort int NOT NULL,

	FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
CREATE INDEX properties_created_at ON properties (created_at);
CREATE INDEX properties_title ON properties (title);

CREATE TABLE properties_values (
	id bigserial PRIMARY KEY,
	user_id int,
	property_id bigint REFERENCES properties (id) ON UPDATE CASCADE ON DELETE CASCADE,
	value varchar(256) NOT NULL,
	image varchar(256) DEFAULT '',
	sort int NOT NULL
);

CREATE TABLE properties_categories (
	user_id int,
	property_id bigint REFERENCES properties (id) ON UPDATE CASCADE ON DELETE CASCADE,
	category_id bigint REFERENCES categories (id) ON UPDATE CASCADE ON DELETE CASCADE,

	CONSTRAINT properties_categories_pkey PRIMARY KEY (user_id, property_id, category_id)
);
  
CREATE TABLE items_properties (
	user_id int,
	item_id    bigint REFERENCES items (id) ON UPDATE CASCADE ON DELETE CASCADE,
	property_id int REFERENCES properties (id) ON UPDATE CASCADE ON DELETE CASCADE,
	property_value_id int REFERENCES properties_values (id) ON UPDATE CASCADE ON DELETE CASCADE,
	
	CONSTRAINT items_properties_pkey PRIMARY KEY (item_id, property_id)
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

CREATE TABLE orders (
	id bigserial PRIMARY KEY,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,

	name text NOT NULL,
	phone varchar(256) NOT NULL,
	address varchar(256) NOT NULL,
	payment varchar(256) DEFAULT ''
);
CREATE INDEX orders_created_at ON orders (created_at);
CREATE INDEX orders_name ON orders (name);

CREATE TABLE orders_items (
	order_id int REFERENCES orders (id) ON UPDATE CASCADE ON DELETE CASCADE,
	item_id bigint REFERENCES items (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE settings (
	id bigserial PRIMARY KEY,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,

	user_id int,
	rozetka_markup numeric(4,2) DEFAULT 0
);

CREATE TABLE items_rozetka_categories (
	user_id int NOT NULL,
	item_id    bigint REFERENCES items (id) ON UPDATE CASCADE ON DELETE CASCADE,
	category_id int NOT NULL,
	title varchar(256) NOT NULL,
	full_title varchar(256) NOT NULL,
	
	CONSTRAINT items_rozetka_categories_pkey PRIMARY KEY (item_id, category_id)
);

CREATE TABLE items_rozetka_properties (
	user_id int NOT NULL,
	item_id bigint REFERENCES items (id) ON UPDATE CASCADE ON DELETE CASCADE,
	property_id int NOT NULL,
	property_name varchar(256) NOT NULL,
	property_value_id int NOT NULL,
	property_value_name varchar(256) NOT NULL
);
CREATE INDEX item_id ON items_rozetka_properties(item_id);
`
