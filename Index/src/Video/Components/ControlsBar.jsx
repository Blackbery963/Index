import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

export default function ControlsBar({ playing, muted, togglePlay, toggleMute }) {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-6 bg-black/40 px-6 py-3 rounded-full">
      <button onClick={togglePlay} className="text-white">
        {playing ? <FaPause /> : <FaPlay />}
      </button>
      <button onClick={toggleMute} className="text-white">
        {muted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  );
}
