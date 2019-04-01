#!/bin/bash
a=$(docker inspect -f {{.State.Running}} $client)
if [ $? -eq 1 ]; then
  echo ""
else
  if [ "$a" == "true" ]; then
    echo "Stoping and removing App container"
    docker stop "$client"
  else
    echo "Removing App container"
    docker rm "$client"
  fi
fi

echo "Building frontend alpha docker images .... "
sudo yarn
sudo docker build -t ci/frontend:alpha . && sudo docker run --name "$client" -p 10.1.1.24:80:80 -d --rm ci/frontend:alpha
