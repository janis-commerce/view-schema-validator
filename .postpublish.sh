#/!bin/bash

echo "Running post publish hook to notify new version to Slack..."

if [ -f ./.env ]; then
	. ./.env
fi

if [ -z $SLACK_WEBHOOK ]; then
	echo "[X] Missing env var SLACK_WEBHOOK. Notification won't be sent"
	exit
fi

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

curl -s -X POST -H 'content-type: application/json' -d "
	{
		\"username\": \"Janis Views Validator\",
		\"icon_url\":\"https://s3.us-east-1.amazonaws.com/static.janis.fizzmod.com/microservices-icons/views.png\",
		\"text\": \":package: Versión $PACKAGE_VERSION publicada. <https://github.com/janis-commerce/view-schema-validator/blob/master/CHANGELOG.md|[CHANGELOG]>\nPara instalarla, correr \`sudo npm i -g @janiscommerce/view-schema-validator\`\"
	}" $SLACK_WEBHOOK
