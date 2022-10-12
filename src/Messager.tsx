import Nullstack from "nullstack";
import "./Messager.css";
import { io, Socket } from "socket.io-client";

class Messager extends Nullstack {
  socket: Socket;
  message_list: string[] = [];
  message_text;

  async emitMessage() {
    this.socket.emit("chat message", this.message_text);

    this.message_text = "";
  }

  hydrate() {
    // Socket connection
    const socket = io(":3001");

    // Logger
    socket.on("logger", console.log);

    // On chat update, add to list of messages!
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

          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default Messager;
