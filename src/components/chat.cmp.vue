<template>
  <section>
    <button @click="openChat" class="chat-btn">
      <img src="../assets/chat.png" />
      <div v-if="isNewMsg" class="red-dot"></div>
    </button>

    <div v-if="party" v-show="isChat" class="chat">
      <div class="chat-header">
        <button class="btn close-btn" @click="isChat=!isChat">X</button>
        <h1>Chat</h1>
        <p>{{party.name}}</p>
        <p v-if="isTyping" class="typing">{{whoType | capitalize}} is typing...</p>
      </div>

      <ul>
        <li v-if="msgs.length===0">
          Welcome to the chat of '{{party.name}}'.
          What do you think?
        </li>
        <li v-else v-for="(msg, idx) in msgs" :key="idx">{{msg.from | capitalize}}: {{msg.txt}}</li>
      </ul>

      <form @submit.prevent="sendMsg" class="flex">
        <input type="text" v-model="msg.txt" placeholder="ABC" />
        <button class="btn send">
          <img src="../assets/paper-pane.png" />
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import SocketService from "../services/SocketService.js";

export default {
  name: "chat-page",
  props: ["party"],
  data() {
    return {
      msg: { from: "Me", txt: "" },
      msgs: [],
      topic: "Love",
      isChat: false,
      isTyping: false,
      whoType: "",
      isNewMsg: false
    };
  },
  destroyed() {
    SocketService.off("chat addMsg", this.addMsg);
    SocketService.terminate();
  },
  updated() {
    var ul = this.$el.querySelector("ul");
    ul.scrollTop = ul.scrollHeight;
    this.msg.from = this.$store.getters.loggedInUser.username
      ? this.$store.getters.loggedInUser.username
      : "Guest";
  },
  methods: {
    openChat() {
      this.isChat = !this.isChat;
      if (this.isNewMsg) this.isNewMsg = false;
    },
    showTypeingAndUser(userName, txt) {
      if (txt) {
        this.isTyping = true;
        this.whoType = userName;
      } else {
        this.isTyping = false;
      }
    },
    addMsg(msg) {
      this.msgs.push(msg);
      localStorage.setItem(`msgs-${this.party._id}`, JSON.stringify(this.msgs));
      if (!this.isChat) {
        this.isNewMsg = true;
      }
      console.log("this.isNewMsg:", this.isNewMsg);
    },
    sendMsg() {
      if (this.msg.txt !== "") {
        // EventBus of Socket
        SocketService.emit("chat newMsg", this.msg);
        this.msg = { from: "Me", txt: "" };
      }
    },
    changeTopic() {
      SocketService.emit("chat joinTopic", this.topic);
    }
  },
  watch: {
    topic() {},
    "msg.txt"() {
      SocketService.emit("typing user", {
        userName: this.msg.from,
        txt: this.msg.txt
      });
    },
    msgs: {
      handler() {}
    }
  },
  created() {
    this.msgs = localStorage.getItem(`msgs-${this.party._id}`)
      ? JSON.parse(localStorage.getItem(`msgs-${this.party._id}`))
      : [];
    // Init Setup of socket
    SocketService.setup();
    if (this.party) {
      SocketService.emit("chat joinTopic", this.party._id);
    } else {
      SocketService.emit("chat joinTopic", this.topic);
    }

    // Listening to fired events from the socket server
    SocketService.on("show Typing", this.showTypeingAndUser);
    SocketService.on("chat addMsg", this.addMsg);
    this.msg.from = this.$store.getters.loggedInUser.username;
  }
};
</script>

<style lang="scss" scoped>
.chat-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: white;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  margin: 0px 3px 5px 3px;
  transition: 0.2s;
  box-shadow: 0px 4px 16px -4px black;

  &:hover {
    background-color: #e4e6eb;
  }
  &:active {
    background-color: white;
    box-shadow: none;
  }
  img {
    width: 30px;
    position: relative;
    bottom: 4px;
    right: 5px;
  }
  .red-dot {
    position: absolute;
    top: 0;
    right: 0;
    background: red;
    width: 16px;
    height: 16px;
    border-radius: 50%;
  }
}
.chat {
  position: fixed;
  bottom: 5px;
  left: 58px;
  background-color: white;
  width: 240px;
  // max-height: 70vh;
  margin: auto;
  border-radius: 10px;
  padding: 10px 20px;
  color: black;
  z-index: 2;
  .chat-header {
    // background-color: khaki;
    border-bottom: 1px solid rgb(238, 238, 238);
    position: relative;
    width: inherit;
    left: -20px;
    padding-bottom: 8px;
    box-shadow: 0px 10px 7px -15px black;
    color: black;

    .close-btn {
      position: absolute;
      left: 0px;
      // float: left;
      color: #0084ff;
      font-weight: bold;
      background-color: white;
      width: fit-content;
      // border: 1px solid black;
      border: none;
      border-radius: 50%;
      margin-left: 5px;
      transition: 0.2s;
      &:hover {
        background-color: #e4e6eb;
      }
    }
    h1 {
      padding: 0;
      margin: 0;
    }
    p {
      margin: 0;
      color: #5e5e5e;
    }
  }
  ul {
    overflow-y: scroll;
    overflow-wrap: anywhere;
    background-color: white;
    max-height: 50vh;
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: 0;
    li {
      background: #0084ff;
      padding: 8px;
      height: fit-content;
      width: fit-content;
      max-width: 240px;
      // text-overflow: ellipsis;
      border-radius: 1rem;
      color: white;
      margin-bottom: 5px;
      text-align: left;
    }
    .typing {
      font-size: 1rem;
    }
  }
  form {
    height: 30px;
    justify-content: center;
    input {
      background: #e4e6eb;
      border: none;
      border-radius: 50px;
      outline: none;
      width: 100%;
    }
    .btn {
      background-color: white;
      width: 30px;
      // border: 1px solid black;
      border: none;
      border-radius: 50%;
      margin-left: 5px;
      transition: 0.2s;
      &:hover {
        background-color: #e4e6eb;
      }
      img {
        width: 22px;
        position: relative;
        bottom: 4px;
        right: 6px;
      }
    }
  }
}
</style>