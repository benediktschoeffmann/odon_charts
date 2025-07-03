#!/bin/bash

docker run --detach --name mariadb\
    -p ${MARIADB_PORT}:3306\
    --add-host=host.docker.internal:host-gateway\
    -v ./dbdata:/var/lib/mysql\
    --env MARIADB_ALLOW_EMPTY_ROOT_PASSWORD=1\
    --env MARIADB_DATABASE=${MARIADB_DATABASE}\
    mariadb:10.11