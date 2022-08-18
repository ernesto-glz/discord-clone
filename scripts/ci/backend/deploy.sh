#!/bin/sh
cd /root/discord-backend
sed -i "s/discord-backend:.*/discord-backend:$1/g" docker-compose.override.yml
docker-compose up -d