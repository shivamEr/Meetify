export default function createPeer(peerId, socket, localStream, setRemoteStreams) {
  const peer = new RTCPeerConnection({
    iceServers: [
      { urls: 'stun:stun.xirsys.com' }
    ]
  });

  localStream.getTracks().forEach(track => {
    peer.addTrack(track, localStream);
  });

  peer.onicecandidate = (e) => {
    if (e.candidate) {
      socket.emit('signal', {
        to: peerId,
        from: socket.id,
        signal: e.candidate
      });
    }
  };

  peer.ontrack = (e) => {
    const stream = e.streams[0];
    stream.userId = peerId;
    setRemoteStreams(prev => [...prev.filter(s => s.id !== stream.id), stream]);
  };

  return peer;
}
