#!/bin/sh
PATH=/etc:/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin

PGPASSWORD=MKTG853Vup
export PGPASSWORD
pathB=/backup/alllead
dbUser=newud
database=newud_gcms

find $pathB \( -name "*-1[^5].*" -o -name "*-[023]?.*" \) -ctime +61 -delete
pg_dump -h 127.0.0.1 --clean -U $dbUser $database | gzip > $pathB/pgsql_$(date "+%Y-%m-%d").sql.gz

unset PGPASSWORD

#=# CREATE DATABASE users WITH ENCODING='UTF-8';
#gunzip users.dump.gz
#psql turbod < /backup/turbota/pgsql_2020-10-20.sql.gz
#psql -U turbo_u -W turbod < /tmp/users.dump
#zcat /backup/turbota/pgsql_2020-10-20.sql.gz | psql -h 127.0.0.1 -U turbo_u -W turbod