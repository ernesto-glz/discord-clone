#!/bin/sh
cd /root/discord-frontend
sed -i "s/dclone-frontend:.*/dclone-frontend:$1/g" docker-compose.override.yml
docker-compose up -d