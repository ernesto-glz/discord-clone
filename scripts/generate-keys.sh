#!/bin/sh
mkdir -p backend/keys
ssh-keygen -t rsa -b 2048 -m PEM -f backend/keys/jwt