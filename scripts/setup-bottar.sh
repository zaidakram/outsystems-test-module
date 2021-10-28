#!/bin/bash

# cp plugins/bottar-ai/dist/cxi-message-broker-client_message-broker-webrtc_client_StandardWebRTCMessageBrokerClient_js.main.js www/js/cxi-message-broker-client_message-broker-webrtc_client_StandardWebRTCMessageBrokerClient_js.main.js
# cp plugins/bottar-ai/dist/cxi-message-broker-client_message-broker_client_websocket_StandardWSMessageBrokerClient_js.main.js www/js/cxi-message-broker-client_message-broker_client_websocket_StandardWSMessageBrokerClient_js.main.js

cp plugins/bottar-ai/dist/cxi-message-broker-client_message-broker-webrtc_client_StandardWebRTCMessageBrokerClient_js.main.js www/scripts/cxi-message-broker-client_message-broker-webrtc_client_StandardWebRTCMessageBrokerClient_js.main.js
cp plugins/bottar-ai/dist/cxi-message-broker-client_message-broker_client_websocket_StandardWSMessageBrokerClient_js.main.js www/scripts/cxi-message-broker-client_message-broker_client_websocket_StandardWSMessageBrokerClient_js.main.js

./plugins/bottar-ai/bin/jq '.manifest.urlVersions."/Chat/scripts/cxi-message-broker-client_message-broker-webrtc_client_StandardWebRTCMessageBrokerClient_js.main.js" = "?123"' www/manifest.json > transformed.json
cat transformed.json
./plugins/bottar-ai/bin/jq '.manifest.urlVersions."/Chat/scripts/cxi-message-broker-client_message-broker_client_websocket_StandardWSMessageBrokerClient_js.main.js" = "?321"' transformed.json > transformed-final.json
cat transformed-final.json

rm transformed.json
rm www/manifest.json
mv transformed-final.json www/manifest.json
echo "Updated manifest.json with CXI SDK scripts!!"
