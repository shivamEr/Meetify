import { useState } from 'react';

export default function useMedia(socketRef, peersRef, localVideo) {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  const toggleCamera = () => {
    const videoTrack = localVideo.current?.srcObject?.getVideoTracks()[0];
    if (!videoTrack) return;
    videoTrack.enabled = !videoTrack.enabled;
    setIsCameraOn(videoTrack.enabled);
    socketRef.current.emit('media-toggle', {
      roomId: socketRef.current.id,
      type: 'video',
      state: videoTrack.enabled
    });
  };

  const toggleMic = () => {
    const audioTrack = localVideo.current?.srcObject?.getAudioTracks()[0];
    if (!audioTrack) return;
    audioTrack.enabled = !audioTrack.enabled;
    setIsMicOn(audioTrack.enabled);
    socketRef.current.emit('media-toggle', {
      roomId: socketRef.current.id,
      type: 'audio',
      state: audioTrack.enabled
    });
  };

  const handleScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const screenTrack = screenStream.getVideoTracks()[0];
      const sender = Object.values(peersRef.current)
        .flatMap(p => p.getSenders())
        .find(s => s.track.kind === 'video');

      if (sender) sender.replaceTrack(screenTrack);
      socketRef.current.emit('screen-share-start', { roomId: socketRef.current.id });

      screenTrack.onended = async () => {
        const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
        const cameraTrack = cameraStream.getVideoTracks()[0];
        if (sender) sender.replaceTrack(cameraTrack);
        if (localVideo.current) localVideo.current.srcObject = cameraStream;
        socketRef.current.emit('screen-share-stop', { roomId: socketRef.current.id });
      };

      if (localVideo.current) localVideo.current.srcObject = screenStream;
    } catch (err) {
      console.error('Screen share error:', err);
    }
  };

  return {
    isCameraOn,
    isMicOn,
    toggleCamera,
    toggleMic,
    handleScreenShare,
  };
}
