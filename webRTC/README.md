# What is WebRTC ?

WebRTC is a set of JavaScript APIs that allow us to establish peer-to-peer connection between two browsers to exchange data, such as audio and video, in real time.

What makes WebRTC so special is that the connection is between two client-side applications (browsers), and the data that transmits betweens the browsers, doesn't reach a server. That doesn't mean we do not need a server involved at all. But once a connection has been established, the data transmission happens between two browsers. Thus, WebRTC is ideal for audio and video as the server layer usually adds latency which is eliminated in WebRTC, which transmits data over UDP and UDP is fast.

---

# What is UDP

The User Datagram Protocol (UDP) is a lightweight data transport protocol that works on top of IP. UDP provides a mechanism to detect corrupt data in packets, but it does not attempt to solve other problems that arise with packets, such as lost or out of order packets.

---

# What are Websockets and what are the difference between Websockets and WebRTC

| **Websockets** | **WebRTC** |
| Real time transmission through the server with very minimal latency. | Real time communication between browsers. Data never touches the server. |

## So if webRTC is so fast, why use websockets at all?

If both websockets and webRTC both give us real-time communication and one can transfer data faster than the other, why do we need websockets at all? It seems webRTC is the optimal path here as more speed seems like the better option.

The reason we still need websockets is because there are some limitations to webRTC:

1. **UDP is an unreliable protocol** - webRTC uses UDP and UDP is not a reliable protocol for transferring important data. The way UDP works is it sends data really fast but it doesn't wait to validate if the data was received. For audio and video, even if we lose a few frames of audio or video, it is usually no big deal. However, if we are sending a file and if we lose a few bytes of the file, the entire file can be corrupted. UDP suits the first use case of audio and video, but is not reliable for sending important data.

2. **No built-in signalling** - We can't just use webRTC and make the initial connection. webRTC leaves that upto us to make that initial connection before webRTC takes over the transfer protocol. This is where process where websockets and webRTC go good together. We will be using a process called signaling with websockets. We would send the information between the two peers, the connection is made, then webRTC takes over.

---

# How does it all work?

![WebRTC Diagram](https://www.ryantoken.com/blog_images/learning-webrtc/webrtc-STUN.jpg)

---

# So what exactly is sent between the two peers and how are we sending it?

A 'handshake' needs to be done via a signalling protocol like websockets after which data is sent.

The data has two components,

### SDP

A Session Description Protocol (SDP), is an object containing information about the session connection such as the codec, address, media type, audio and video and so on.
Both peers would need to exchange a SDP, one in the form of an offer, one in form of an answer.

### ICE Candidates

An **ICE candidate** is a public IP address and port that could potentially be an address that receives data.
Each peer will typically have multiple **ICE Candidates** that are gathered by making a series of requests to a **Stun Server** and they are exchanged between the two peers.

### Summary of the Steps

1. Peer A sends SDP to Server through a signaling process and sent to Peer B.
2. Peer B receives Peer A's SDP and accepts it by sending their own SDP to the server through a signalling process to Peer A.
3. Once both SDPs are exchanged, the peers are now connected. However, data still cannot flow yet.
4. We still have to coordinate the discovery of our IP addresses but the **problem is most devices sit behind Firewalls and NAT devices**. So to do this, we will be using a method called ICE.
5. Now each peer must make a series of requests to a STUN server to ask the public IP addresses and use the signalling process to send ICE Candidates to the other peer.
6. Once the network finds an optimal path to communicate through with these ICE Candiates, data can start flowing between the two peers and the entire connection is complete.

---

# Trickling ICE Candidates

The best practice is to send the SDP offer/answer over and then signal over each ICE Candidate as they are generated.

---

# [Watch the video](https://youtu.be/QsH8FL0952k?t=1007)
