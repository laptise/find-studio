# find-studio

postgres -D /usr/local/var/postgres

## Docker 停止

`docker stop`

## ある Image

`docker ps -a`

## 稼働中のコンテナの停止

```
docker stop $(docker ps -q)
```

## 停止中のコンテナの削除

```
docker rm $(docker ps -aq)
```

## イメージの削除

```
docker rmi $(docker images -q)
```

# typeOrm

https://github.com/typeorm/typeorm
