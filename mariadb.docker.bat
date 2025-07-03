docker run --detach --name mariadb\
    -p ${MARIADB_PORT}:3306\
    -v ./dbdata:/var/lib/mysql\
    --env MARIADB_USER=${MARIADB_USER}\
    --env MARIADB_PASSWORD=${MARIADB_PASSWORD}\
    --env MARIADB_ROOT_PASSWORD=${MARIADB_ROOT_PASSWORD}\
    --env MARIADB_DATABASE=${MARIADB_DATABASE}\
    mariadb:10.11