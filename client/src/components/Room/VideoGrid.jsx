import React from 'react';

export default function VideoGrid({ localVideo, remoteStreams }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <video ref={localVideo} autoPlay muted playsInline className="rounded-2xl shadow-lg border border-gray-700" />
      {remoteStreams.map((stream, i) => (
        <video
          key={i}
          autoPlay
          playsInline
          className="rounded-2xl shadow-lg border border-gray-700"
          ref={video => video && (video.srcObject = stream)}
        />
      ))}
    </div>
  );
}
