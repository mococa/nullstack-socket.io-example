// External
import Nullstack from "nullstack";
import { io, Socket } from "socket.io-client";

// Styles
import "./Messager.css";

class Messager extends Nullstack {
  socket: Socket = null;
  message_list: string[] = [];
  message_text: string = "";

  async emitMessage() {
    // Assuring socket is connected before emitting message
    if (!this.socket?.connected) return;

    this.socket.emit("chat message", this.message_text);

    // Clear input text
    this.message_text = "";
  }

  terminate() {
    // Disconnecting on component unmount
    this.socket?.disconnect();
  }

  hydrate() {
    // Socket connection
    const socket = io(":3001");

    // Logger
    socket.on("logger", console.log);

    // On chat update, add incoming message to list of messages!
    socket.on("chat update", (msg) => {
      this.message_list.push(msg);
    });

    this.socket = socket;
  }

  render() {
    return (
      <div class="container">
        <ul>
          {this.message_list.map((message) => (
            <li>{message}</li>
          ))}
        </ul>

        <form onsubmit={this.emitMessage}>
          <input
            type="text"
            bind={this.message_text}
            placeholder="Enter your message here"
          />

          <button type="submit" disabled={!this.socket?.connected}>
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default Messager;
