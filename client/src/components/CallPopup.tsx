import { useState } from "react";
import { X, Phone, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Vapi from "@vapi-ai/web";
import { vapiFormContent } from "../data/content";
const vapi = new Vapi(
  import.meta.env.VITE_VAPI_PUBLIC_KEY
);

interface CallPopupProps {
  open: boolean;
  onClose: () => void;
}

type CallStatus =
  | "idle"
  | "calling"
  | "connected";

export default function CallPopup({ open, onClose }: CallPopupProps) {
  const { user } = useAuth();
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState<CallStatus>("idle");
  const [isCallActive, setIsCallActive] = useState(false);

const handleSubmit = async (
  e: React.SyntheticEvent<HTMLFormElement>
) => {
  e.preventDefault();

  try {
    setStatus("calling");

    await vapi.start(
      import.meta.env.VITE_VAPI_ASSISTANT_ID
    );

    toast.success("AI Counselor Connected!");
  } catch (error) {
    console.error(error);

    setStatus("idle");

    toast.error("Failed to start AI counselor.");
  }
};
void Phone;
void AlertCircle;
void vapiFormContent;
void user;
void phone;
void course;
void topic;
void isCallActive;
void handleSubmit;
const endCall = () => {
  vapi.stop();

  setIsCallActive(false);

  setStatus("idle");

  toast.success("Call ended");
};

  const reset = () => {
    setStatus("idle");
    setPhone("");
    setCourse("");
    setTopic("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };
  if (open && status === "idle") {
  const startCall = async () => {
    try {
      setStatus("calling");

      await vapi.start(
        import.meta.env.VITE_VAPI_ASSISTANT_ID
      );

      setStatus("connected");

      setIsCallActive(true);
    } catch (error) {
      console.error(error);

      setStatus("idle");

      toast.error("Failed to start AI counselor.");
    }
  };

  startCall();
}

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close */}
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-maroon rounded-t-2xl px-6 py-5">
          <h3 className="font-heading text-xl font-bold text-white">Talk to Our AI Counselor</h3>
          <p className="text-white/70 text-sm mt-1">Get personalized guidance on courses, admissions & more</p>
        </div>

 <div className="text-center py-10">
  {status === "calling" ? (
    <Loader2 className="w-10 h-10 text-maroon mx-auto animate-spin mb-3" />
  ) : (
    <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
  )}

  <h3 className="font-heading text-lg font-bold text-gray-900 mb-1">
    {status === "calling"
      ? "Connecting..."
      : "AI Counselor Connected"}
  </h3>

  <p className="text-gray-500 text-sm mb-4">
    {status === "calling"
      ? "Please wait while we connect your AI counselor."
      : "You are now speaking with Ava."}
  </p>

  {status === "connected" && (
    <button
      onClick={endCall}
      className="bg-red-500 text-white px-5 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors duration-200"
    >
      End Call
    </button>
  )}
</div>
      </div>
    </div>
  );
}

