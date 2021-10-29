#!/bin/bash

cp plugins/bottar-ai/dist/cxi-message-broker-client_message-broker-webrtc_client_StandardWebRTCMessageBrokerClient_js.main.js www/scripts/cxi-message-broker-client_message-broker-webrtc_client_StandardWebRTCMessageBrokerClient_js.main.js
cp plugins/bottar-ai/dist/cxi-message-broker-client_message-broker_client_websocket_StandardWSMessageBrokerClient_js.main.js www/scripts/cxi-message-broker-client_message-broker_client_websocket_StandardWSMessageBrokerClient_js.main.js

# random_string=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 22 | head -n 1)
# json_sub=".manifest.versionToken = \""$random_string"\" | .manifest.urlVersions.\"/Chat/manifest.json\" = \""?$random_string"\" | .manifest.urlMappings.\"/Chat/moduleservices/moduleinfo?cached\" = \""/Chat/manifest.json?$random_string"\" | .manifest.urlVersions.\"/Chat/scripts/cxi-message-broker-client_message-broker-webrtc_client_StandardWebRTCMessageBrokerClient_js.main.js\" = \"?123\" | .manifest.urlVersions.\"/Chat/scripts/cxi-message-broker-client_message-broker_client_websocket_StandardWSMessageBrokerClient_js.main.js\" = \"?321\""

# ./plugins/bottar-ai/bin/jq "${json_sub}" www/manifest.json > transformed.json
# cat transformed.json

# rm www/manifest.json
# mv transformed.json www/manifest.json
# echo "Updated manifest.json with CXI SDK scripts!!"
