import { useState, useRef } from "react";
import "./PinLogin.css";

type PinLoginProps = {
  onSuccess: () => void;
};

export function PinLogin({ onSuccess }: PinLoginProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (pin === "1234") {
      onSuccess();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="pin-screen">
      <div className="pin-bg-glow" />

      <div className={`pin-card ${shaking ? "pin-card--shake" : ""}`}>
        {/* Lock icon */}
        <div className="pin-icon-ring">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <h1 className="pin-title">ברוכים הבאים</h1>
        <p className="pin-subtitle">הזן קוד כניסה כדי להמשיך</p>

        <div className="pin-input-wrapper">
          <input
            ref={inputRef}
            className={`pin-input ${error ? "pin-input--error" : ""}`}
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            placeholder="••••"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value.replace(/\D/g, ""));
              setError(false);
            }}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          {error && <span className="pin-error-msg">קוד שגוי, נסה שוב</span>}
        </div>

        <button className="pin-submit-btn" onClick={handleSubmit}>
          כניסה
        </button>
      </div>
    </div>
  );
}
