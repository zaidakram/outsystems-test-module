let initWebsocket, webSocket, session, interaction, initWebRtc, webRtc;

class WebChatMessageBrokerIntercepter {
  onRegisterationSuccessfull(registerationKey, interactionId, sessionId, saveInGarageOnly) {
    console.warn('onRegisterationSuccessfull', registerationKey, interactionId, sessionId, saveInGarageOnly);
    session = sessionId;
    interaction = interactionId;
  }

  onRegisterationFail(registerationKey, failedReason) {
    console.warn('onRegisterationFail', registerationKey, failedReason);
    this.sessionId = null;
    this.interactionId = null;
  }

  onOfferReceive(interactionId, senderDetails) {
    console.warn('onOfferReceive', interactionId, senderDetails);
  }

  onOfferRejected(interactionId, sessionId, rejectedReason) {
    console.warn('onOfferRejected', interactionId, sessionId, rejectedReason);
  }

  onClientSessionJoin(sessionId, clientDetails) {
    console.warn('onClientSessionJoin', sessionId, clientDetails);
  }

  onClientSessionLeave(sessionId, clientId) {
    console.warn('onClientSessionLeave', sessionId, clientId);
  }

  onAnswerReceive(interactionId, sessionId, supportedBrokerType, brokerConf) {
    console.warn('onAnswerReceive', interactionId, sessionId, supportedBrokerType, brokerConf);
  }

  onDisconnect(event) {
    console.warn('onDisconnect', event)
  }

  onMessageReceive(chatMessage) {
    console.warn('onMessageReceive', chatMessage);
    let msg = document.createElement("div");
    msg.innerHTML = chatMessage['message']['chatMessage'];
    msg.classList.add('agent-message');
    document.getElementById('messageList').appendChild(msg);
  }

  onSeakMessage(chatMessage) {
    console.warn('onSeakMessage', chatMessage);
  }


  onSessionClose(data) {
    const messageNode = document.getElementById("messageList");
    while (messageNode.lastElementChild) {
      messageNode.removeChild(messageNode.lastElementChild);
    }
    console.warn('onSessionClose', data);
  }

  ack(messageId, ackResType, error) {
    console.warn('ack', messageId, ackResType, error);
  }

  onConnect(event) {
    console.warn('onConnect', event);
  }

  onSessionSync(message) {
    console.warn('onSessionSync', message);
  }

  onError(event) {
    console.warn('onError', event);
  }

  onIPAddressReceive(ipAdress) {
    console.warn('onIPAddressReceive', ipAdress);
  }

  onSessionTransferOffered(data) {
    console.warn('onSessionTransferOffered', data);
  }

  onSessionTransferAccepted(sessionId, agentId) {
    console.warn('onSessionTransferAccepted', sessionId, agentId);
  }


  onSessionTransferFailed(sessionId, failedReason) {
    console.warn('onSessionTransferFailed', sessionId, failedReason);
  }

  onSessionTransferCompleate(sessionId, transferTo, transferToDetails) {
    console.warn('onSessionTransferCompleate', sessionId, transferTo, transferToDetails);
  }


  escalateToAgent(sessionId, customerPayload) {
    console.warn('escalateToAgent', sessionId, customerPayload);
  }


  onSuperVisorReQueueSuccess(sessionId, queueName) {
    console.warn('onSuperVisorReQueueSuccess', sessionId, queueName);
  }
  onSuperVisorReQueueFailed(sessionId, queueName, failedReason) {
    console.warn('onSuperVisorReQueueFailed', sessionId, queueName, failedReason);
  }

  onSuperVisorCherryPickSuccess(sessionId, agentId) {
    console.warn('onSuperVisorCherryPickSuccess', sessionId, agentId);
  }
  onSuperVisorCherryPickFailed(sessionId, agentId, failedReason) {
    console.warn('onSuperVisorCherryPickFailed', sessionId, agentId, failedReason);
  }
}

class WebRtcMessageBrokerIntercepter {
  onRegistartionSuccess(template) {
    console.warn('onRegistartionSuccess', template)
  }

  onCallAccepted(sessionId) {
    console.warn('onCallAccepted', sessionId, session);
  }

  onCallRejected(sessionId, rejectedReason) {
    console.warn('onCallRejected', sessionId, rejectedReason)
  }

  onSessionClosed(sessionId) {
    console.warn('onSessionClosed', session, sessionId);
    webRtc.endCall(sessionId, interaction, interaction);
  }
  mediaSessionStarted(interactionId, sessionId, mediaConstraints) {
    console.warn('mediaSessionStarted', interactionId, mediaConstraints, sessionId);
  }

  onLocalStreamStarted() {
    console.warn('onLocalStreamStarted');
  }
  onLocalStreamDisconnected() {
    console.warn('onLocalStreamDisconnected');
  }

  onRemoteStreamStarted() {
    console.warn('onRemoteStreamStarted');
  }
  onRemoteStreamDisconnected() {
    console.warn('onRemoteStreamDisconnected')
  }
}

require('cxi-message-broker-client/message-broker-webrtc/janus/third-party/janus/janusBundle');

require(['cxi-message-broker-client/message-broker/client/websocket/StandardWSMessageBrokerClient'], function (data) {
  initWebsocket = function (customerName = 'Customer') {
    webSocket = new data.StanderdWSMessageBrokerClient(customerName, { fullyQualifiedURL: 'wss://test.cxinfinity.novelvox.net/signalling/' }, new WebChatMessageBrokerIntercepter());
  }
});
require(['cxi-message-broker-client/message-broker-webrtc/client/StandardWebRTCMessageBrokerClient'], function (data) {
  initWebRtc = function() {
    webRtc = new data.StandardWebRTCMessageBrokerClient(webSocket, new WebRtcMessageBrokerIntercepter(), false);
  }
});

export default { initWebsocket, webSocket, session, interaction, initWebRtc, webRtc };
