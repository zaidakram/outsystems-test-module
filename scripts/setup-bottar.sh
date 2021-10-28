#!/bin/bash

# cp plugins/bottar-ai/dist/cxi-message-broker-client_message-broker-webrtc_client_StandardWebRTCMessageBrokerClient_js.main.js www/js/cxi-message-broker-client_message-broker-webrtc_client_StandardWebRTCMessageBrokerClient_js.main.js
# cp plugins/bottar-ai/dist/cxi-message-broker-client_message-broker_client_websocket_StandardWSMessageBrokerClient_js.main.js www/js/cxi-message-broker-client_message-broker_client_websocket_StandardWSMessageBrokerClient_js.main.js

cp plugins/bottar-ai/dist/cxi-message-broker-client_message-broker-webrtc_client_StandardWebRTCMessageBrokerClient_js.main.js www/scripts/cxi-message-broker-client_message-broker-webrtc_client_StandardWebRTCMessageBrokerClient_js.main.js
cp plugins/bottar-ai/dist/cxi-message-broker-client_message-broker_client_websocket_StandardWSMessageBrokerClient_js.main.js www/scripts/cxi-message-broker-client_message-broker_client_websocket_StandardWSMessageBrokerClient_js.main.js

./plugins/bottar-ai/bin/jq '.manifest.urlVersions."/Chat/scripts/cxi-message-broker-client_message-broker-webrtc_client_StandardWebRTCMessageBrokerClient_js.main.js" = "?123"' platforms/android/app/src/main/assets/www/manifest.json > transformed.json
./plugins/bottar-ai/bin/jq '.manifest.urlVersions."/Chat/scripts/cxi-message-broker-client_message-broker_client_websocket_StandardWSMessageBrokerClient_js.main.js" = "?321"' transformed.json > transformed-final.json

rm transformed.json
rm platforms/android/app/src/main/assets/www/manifest.json
mv transformed-final.json platforms/android/app/src/main/assets/www/manifest.json
