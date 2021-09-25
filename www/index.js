// Requireing this file just to load configs on window.bottar
import * as config from './bottar-config';
import CXI from './cxi';
import ui from './ui';

document.addEventListener("websocket:initReady", function () {
  CXI.initWebsocket('Zaid');
});

document.addEventListener('websocket:registartionSuccess', function () {
  console.log('websocket:registartionSuccess fired...');
  CXI.initWebRtc();
});

// ALL the UI stuff could've been a small react app.
CXI.onMessageReceive(function (message) {
  let newMessage;
  try {
    // Handle case where it sends html.
    newMessage = $(message.message.chatMessage).text();
  } catch {
    newMessage = message.message.chatMessage;
  }

  $(`<li class="replies"><p>${newMessage}</p></li>`).appendTo($('.messages ul'));
  console.log('messages', message, newMessage);
});

function sendMessage() {
  let message = $(".message-input input").val();
  if($.trim(message) == '' || CXI.session === undefined || CXI.interaction === undefined) {
    return false;
  }

  let chatMessage = {
    chatMessage: "<div>" + message + "</div>",
    isSenderAgent: false,
    senderId: CXI.interaction,
    senderName: "Zaid",
    senderType: "Customer",
    sentDateTime: new Date(),
    type: "text"
  };

  CXI.webSocket.sendMessage(CXI.session, chatMessage);

  $('<li class="sent"><p>' + message + '</p></li>').appendTo($('.messages ul'));
  $('.message-input input').val(null);
  $(".messages").animate({ scrollTop: $(document).height() }, "fast");
};

$('body').on('click', '.submit', function () {
  sendMessage();
});

$(window).on('keydown', function (e) {
  if (e.which == 13) {
    sendMessage();
    return false;
  }
});

document.addEventListener('websocket:agentConnected', function () {
  CXI.webSocket.registerNewReqToBroker({
    channel: "webchat",
    chatNotes: [],
    chatSharedFiles: [],
    chatStartDateTime: new Date(),
    chatTags: [],
    chatTranscript: [],
    customerEmail: "hello@zaidakram.com",
    customerFirstName: "Zaid",
    dynamicFields: [{ Country: "" }, { 'Page Name': "DefaultPage" }, { accountId: "DefaultPage" }, { 'First Name': "Zaid" }, { 'Last Name': "Akram" }, { Email: "zaid@amrood.de" }],
    feedBack: [],
    interactionSubType: "WEBCHAT",
    interactionType: "CHAT",
    operatingSystem: "Windows 10 64-bit",
    pageName: "DefaultPage",
    status: "OPEN",
    tenantId: "SBI123",
    unconfirmed: false,
  });
});

// Entry-point
// Render the chat app...
document.addEventListener(window.bottar.config.renderEvent, function () {
  document.getElementById('main').innerHTML = ui;

  $(".messages").animate({ scrollTop: $(document).height() }, "fast");
});

document.addEventListener('webrtc:ready', function () {
  $('.actions').show();

  $('body').on('click', '.actions', function () {
    window.plugins.k.webrtc.permission.request(
      (result) => {
        console.log('Permissions.........', result);
        if (result.haveRequiredPermission) {
          const options = {
            mediaConstraints: {
              audio: true,
              video: true,
              record: false
            }
          };

          CXI.webRtc.initiateCall(CXI.session, CXI.interaction, CXI.interaction, options);
        }
      },
      (result) => {console.log('Permissions denied...')}
    );

  });
});

$('body').on('click', '.end-call-button', function () {
  CXI.webRtc.endCall(CXI.session, CXI.interaction, CXI.interaction);
  $('#cxi-media-container').hide();
  $('#frame').show();
});

document.addEventListener('webrtc:mediaSessionStarted', function() {
  $('#cxi-media-container').show();
  $('#frame').hide();
})
