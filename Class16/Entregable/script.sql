create database testDB ;
use testDB;
create table items (
id int unsigned NOT NULL auto_increment,
name varchar(255) NOT NULL,
category varchar(255) NOT NULL,
stock int unsigned NOT NULL,
primary key (id)
);

insert into items (name, category, stock) values ("Fideos", "Harina", 20);

insert into items (name, category, stock) values ("Leche", "Lácteos", 30);


insert into items (name, category, stock) values ("Crema", "Lácteos", 15);

select * from items;

delete from items where id=1;

update items set stock=45 where id=2;

select * from items;