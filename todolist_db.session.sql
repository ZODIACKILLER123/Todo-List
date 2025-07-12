
create table TASKS (
    id_task int auto_increment primary key,
    checked boolean default false,
    title varchar(255) not null,
    description text,
    date datetime default current_timestamp
)

