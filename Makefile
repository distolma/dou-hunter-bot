IMAGE := distolma/dou-hunter
VERSION := ${TRAVIS_JOB_ID}

login:
	docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}

image:
	docker build -t ${IMAGE}:${VERSION} .
	docker tag ${IMAGE}:${VERSION} ${IMAGE}:latest

push-image:
	docker push ${IMAGE}:${VERSION}
	docker push ${IMAGE}:latest