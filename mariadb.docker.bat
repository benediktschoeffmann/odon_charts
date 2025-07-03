docker run --detach --name mariadb^
    -p 3307:3307^
    -v ./dbdata:/var/lib/mysql^
    --env MARIADB_ALLOW_EMPTY_ROOT_PASSWORD=1^
    --env MARIADB_DATABASE=test^
    mariadb:10.11