dir=$(dirname $0)

# docker run -it --rm -v $dir:/e2e -w /e2e docker.io/cypress/included:latest

podman run -it --rm -v $dir:/e2e -w /e2e docker.io/cypress/included:latest
