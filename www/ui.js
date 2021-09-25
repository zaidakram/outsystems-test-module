const ui = `<div id="bottar-ui">
  <style>
    bottar-ui {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: space;
      font-family: "proxima-nova", "Source Sans Pro", sans-serif;
      font-size: 1em;
      letter-spacing: 0.1px;
      color: #32465a;
      text-rendering: optimizeLegibility;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
      -webkit-font-smoothing: antialiased;
    }

    #frame {
      width: 100%;
      height: 100vh;
      background: #E6EAEA;
    }
    @media screen and (max-width: 360px) {
      #frame {
        width: 100%;
        height: 100vh;
      }
    }
    #frame .content {
      float: right;
      width: 60%;
      height: 100%;
      overflow: hidden;
      position: relative;
    }
    @media screen and (max-width: 735px) {
      #frame .content {
        width: 100%;
        min-width: 300px !important;
      }
    }
    @media screen and (min-width: 900px) {
      #frame .content {
        width: 100%;
      }
    }
    #frame .content .contact-profile {
      width: 100%;
      height: 60px;
      line-height: 60px;
      background: #f5f5f5;
    }
    #frame .content .contact-profile img {
      width: 40px;
      border-radius: 50%;
      float: left;
      margin: 9px 12px 0 9px;
    }
    #frame .content .contact-profile p {
      float: left;
      margin-left: 20px;
    }
    #frame .content .contact-profile .actions {
      display: none;
      float: right;
    }
    #frame .content .contact-profile .actions i {
      margin-left: 14px;
      cursor: pointer;
    }
    #frame .content .contact-profile .actions i:nth-last-child(1) {
      margin-right: 20px;
    }
    #frame .content .contact-profile .actions i:hover {
      color: #435f7a;
    }
    #frame .content .messages {
      width: 100%;
      height: auto;
      min-height: calc(100% - 93px);
      max-height: calc(100% - 93px);
      overflow-y: scroll;
      overflow-x: hidden;
    }
    @media screen and (max-width: 735px) {
      #frame .content .messages {
        max-height: calc(100% - 105px);
      }
    }
    #frame .content .messages::-webkit-scrollbar {
      width: 8px;
      background: transparent;
    }
    #frame .content .messages::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.3);
    }
    #frame .content .messages ul li {
      display: inline-block;
      clear: both;
      float: left;
      width: calc(100% - 25px);
      font-size: 0.9em;
    }
    #frame .content .messages ul li:nth-last-child(1) {
      margin-bottom: 20px;
    }
    #frame .content .messages ul li.replies img {
      margin: 6px 8px 0 0;
    }
    #frame .content .messages ul li.replies p {
      background: #435f7a;
      color: #f5f5f5;
    }
    #frame .content .messages ul li.sent img {
      float: right;
      margin: 6px 0 0 8px;
    }
    #frame .content .messages ul li.sent p {
      background: #f5f5f5;
      float: right;
    }
    #frame .content .messages ul li img {
      width: 22px;
      border-radius: 50%;
      float: left;
    }
    #frame .content .messages ul li p {
      display: inline-block;
      padding: 10px 15px;
      border-radius: 20px;
      max-width: 205px;
      line-height: 130%;
    }
    @media screen and (min-width: 735px) {
      #frame .content .messages ul li p {
        max-width: 300px;
      }
    }
    #frame .content .message-input {
      position: absolute;
      bottom: 0;
      width: 100%;
      z-index: 99;
    }
    #frame .content .message-input .wrap {
      position: relative;
    }
    #frame .content .message-input .wrap input {
      font-family: "proxima-nova",  "Source Sans Pro", sans-serif;
      float: left;
      border: none;
      width: calc(100% - 50px);
      padding: 11px 32px 10px 8px;
      font-size: 0.8em;
      color: #32465a;
    }
    @media screen and (max-width: 735px) {
      #frame .content .message-input .wrap input {
        padding: 15px 32px 16px 8px;
      }
    }
    #frame .content .message-input .wrap input:focus {
      outline: none;
    }
    #frame .content .message-input .wrap .attachment {
      position: absolute;
      right: 60px;
      z-index: 4;
      margin-top: 10px;
      font-size: 1.1em;
      color: #435f7a;
      opacity: .5;
      cursor: pointer;
    }
    @media screen and (max-width: 735px) {
      #frame .content .message-input .wrap .attachment {
        margin-top: 17px;
        right: 65px;
      }
    }
    #frame .content .message-input .wrap .attachment:hover {
      opacity: 1;
    }
    #frame .content .message-input .wrap button {
      float: right;
      border: none;
      width: 50px;
      padding: 12px 0;
      cursor: pointer;
      background: #32465a;
      color: #f5f5f5;
    }
    @media screen and (max-width: 735px) {
      #frame .content .message-input .wrap button {
        padding: 16px 0;
      }
    }
    #frame .content .message-input .wrap button:hover {
      background: #435f7a;
    }
    #frame .content .message-input .wrap button:focus {
      outline: none;
    }

    #cxi-media-container {
      display: none;
    }

    #videoremote0 {
      width: 100vw;
      height: 100vh;
      position: absolute;
      text-align: center;
    }

    #videolocal {
      width: 30%;
      height: 25%;
      position: absolute;
      top: 3%;
      right: 6%;
    }

    video {
      object-fit: cover;
      object-position: center center;
    }

    .end-call-button {
      color: white;
      background: #d9381e;
      position: absolute;
      bottom: 6%;
      right: calc(50% - 35px);
      border-radius: 50%;
      border: 1px solid red;
    }

    .end-call-button i {
      padding: 15px;
      font-size: 30px;
    }
  </style>
  
  <div id="frame">
    <div class="content">
      <div class="contact-profile">
        <p class="agent">Agent 007</p>
        <div class="actions">
          <i class="fa fa-video-camera" aria-hidden="true"></i>
        </div>
      </div>
      <div class="messages">
        <ul>
        </ul>
      </div>
      <div class="message-input">
        <div class="wrap">
        <input type="text" placeholder="Write your message..." />
        <button class="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
        </div>
      </div>
    </div>
  </div>

  <div id="cxi-media-container">
    <div id="videoremote0"></div>
    <div id="videolocal"></div>
    <button class="end-call-button">
      <i class="fa fa-phone" aria-hidden="true"></i>
    </button>
  </div>


  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
  <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,300' rel='stylesheet' type='text/css'>
  <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.2/css/font-awesome.min.css'>

  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
  <script src="https://use.typekit.net/hoy3lrg.js"></script>
  <script>try{Typekit.load({ async: true });}catch(e){}</script>
</div>`;

export default ui;
