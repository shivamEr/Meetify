const apiUrl = import.meta.env.VITE_SOCKET_SERVER;

const socket = io(apiUrl);

export default socket;