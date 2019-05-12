# Serverless messaging service

## Pre-requisitions

- Make sure you have `serverless` installed.
- aws credentials configured

## Build

    npm install
    npm run build

## Issues

[Bug](https://github.com/serverless/serverless/issues/6100) in plugin [serverless-aws-documentation](https://github.com/deliveryhero/serverless-aws-documentation) doesn't let to build project first time.

_Workaround_: Build without plugin. Enable plugin and build again.

## How to use

### Send email

    curl -X POST \
    https://<domain>/emails \
    -H 'Content-Type: application/json' \
    -d '{ "recipient":"noreplay@example.com", "body": "Hello world", subject: "Test" }'

### Send sms

    curl -X POST \
    https://<domain>/sms \
    -H 'Content-Type: application/json' \
    -d '{ "recipient":"+31..", "text": "Update your application"}'
