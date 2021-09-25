let _onMessageReceiveCallback = null;

const CXI = {
  onMessageReceive: function(callback) {
    _onMessageReceiveCallback = callback;
  },
  session: undefined,
  interaction: undefined
};

class WebChatMessageBrokerIntercepter {
  onRegisterationSuccessfull(registerationKey, interactionId, sessionId, saveInGarageOnly) {
    document.dispatchEvent(new Event('websocket:registartionSuccess'));
    console.warn('onRegisterationSuccessfull', registerationKey, interactionId, sessionId, saveInGarageOnly);
    CXI.session = sessionId;
    CXI.interaction = interactionId;
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
    _onMessageReceiveCallback(chatMessage);
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
    document.dispatchEvent(new Event('websocket:agentConnected', event));
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
    console.warn('onCallAccepted', sessionId, CXI.session);
  }

  onCallRejected(sessionId, rejectedReason) {
    console.warn('onCallRejected', sessionId, rejectedReason)
  }

  onSessionClosed(sessionId) {
    console.warn('onSessionClosed', CXI.session, sessionId);
    CXI.webRtc.endCall(sessionId, CXI.interaction, CXI.interaction);
  }
  
  mediaSessionStarted(interactionId, sessionId, mediaConstraints) {
    document.dispatchEvent(new Event('webrtc:mediaSessionStarted'));
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
    console.warn('onRemoteStreamDisconnected');
  }
}

require('cxi-message-broker-client/message-broker-webrtc/janus/third-party/janus/janusBundle');

require(['cxi-message-broker-client/message-broker/client/websocket/StandardWSMessageBrokerClient'], function (data) {
  CXI.initWebsocket = function (customerName = 'Customer') {
    CXI.webSocket = new data.StanderdWSMessageBrokerClient(customerName, { fullyQualifiedURL: 'wss://test.cxinfinity.novelvox.net/signalling/' }, new WebChatMessageBrokerIntercepter());
    document.dispatchEvent(new Event('websocket:ready'));
  }
  document.dispatchEvent(new Event('websocket:initReady'));
});

require(['cxi-message-broker-client/message-broker-webrtc/client/StandardWebRTCMessageBrokerClient'], function (data) {
  CXI.initWebRtc = function() {
    CXI.webRtc = new data.StandardWebRTCMessageBrokerClient(CXI.webSocket, new WebRtcMessageBrokerIntercepter(), false);
    document.dispatchEvent(new Event('webrtc:ready'));
  }
});

export default CXI;
