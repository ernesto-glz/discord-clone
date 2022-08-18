# Deploy

<p>Before we begin, it is necessary to know that this continuous deployment process is designed to be used with a vps server, it is not a provider-based continuous deployment process with everything configured beforehand. </p>

<p>
You should also know that this whole process is based entirely on docker and docker-compose.
</p>

## Scripts

<p>
The necessary server-side files that we are going to use are located in scripts/ci
</p>

<p>
On the server create the corresponding folders `discord-backend` `discord-frontend` and copy their corresponding content from the scripts.

:warning: Don't forget to configure the `docker-compose` and `docker-compose.override` files overriding the default values.

After this we must create an ssh key to be able to access from the github-actions process to the server.

</p>

```bash
# generate ssh key
mkdir ssh-keys
ssh-keygen -m pem -f ssh-keys/github

# Add to authorized keys
cat ssh-keys/github.pub >> $HOME/.ssh/authorized_keys
```

<p>
In the ssh-keys folder there will be 2 keys, public and private. So we need to copy the private key to be able to configure it in our github secrets.
</p>

## Github Secrets

<p>
Since this process is based on github actions, we use github secrets to store sensitive information such as ssh keys.

The list that you must establish in your repository is the following:

</p>

| Name                | Description                          |
| ------------------- | ------------------------------------ |
| DOCKER_USER         | Your dockerhub user                  |
| DOCKER_TOKEN        | Your dockerhub authentication token  |
| DOCKER_REPO_BACKEND | Dockerhub repository for the backend |
| SERVER_HOST         | IP or domain of the server/VPS       |
| SERVER_USER         | SSH user                             |
| SERVER_KEY          | SSH private key                      |

## End

<p>Once all of the above is done, if we push to the github repository, the github action located in .github/workflows/integrate.yml must be activated, thus deploying our application.</p>
