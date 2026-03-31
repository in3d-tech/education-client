import { useEffect, useState, useMemo, useCallback } from "react";
import { useAppContext } from "../../context/appContext";
import { Navbar } from "../../navigation/Navbar";
import ArLessonNew from "./ArLessonNew";
import { useFetch } from "../../common/logic/useFetch";
import useWindowDimensions from "../../common/logic/getViewport";
import "./Lesson.css";

const classObj: Record<number, string> = {
  1: "א",
  2: "ב",
  3: "ג",
  4: "ד",
  5: "ה",
  6: "ו",
  7: "ז",
  8: "ח",
  9: "ט",
  10: "י",
  11: "יא",
  12: "יב",
};

const Lesson = () => {
  const [startScanning, setStartScanning] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { activeLesson, user } = useAppContext();
  const [photoDataArray, setPhotoDataArray] = useState([]);
  const { height, width } = useWindowDimensions();

  // ── Tripo 3D Model State ──
  const [customModelBlob, setCustomModelBlob] = useState<Blob | null>(null);
  const [isGeneratingModel, setIsGeneratingModel] = useState(false);
  const [modelGenError, setModelGenError] = useState<string | null>(null);

  // ── Prompt Dialog State ──
  const [showPromptDialog, setShowPromptDialog] = useState(false);
  const [modelPrompt, setModelPrompt] = useState("");

  const fetchBody = useMemo(
    () =>
      JSON.stringify({
        lessonId: activeLesson ? activeLesson[0].lessonId : null,
      }),
    [activeLesson],
  );

  const { error, response } = useFetch(
    "/fetchPhotos",
    fetchBody,
    "POST",
    "application/json",
  );

  useEffect(() => {
    if (!activeLesson) return;
    try {
      if (response) setPhotoDataArray(response);
      if (error) console.error(error);
    } catch (err) {
      console.error("Error fetching photos:", err);
    }
  }, [response, error, activeLesson]);

  // ── Generate 3D Model via Tripo ──
  const handleGenerateModel = useCallback(async (prompt: string) => {
    if (!prompt.trim()) return;

    setShowPromptDialog(false);
    setIsGeneratingModel(true);
    setModelGenError(null);

    // const serverToReach = "http://localhost:3000/generate-model"
    const serverToReach = "https://edu-server-ke5y.onrender.com/generate-model";

    try {
      const res = await fetch(serverToReach, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      console.log({ res });

      const blob = await res.blob();
      const contentType = res.headers.get("Content-Type") || "";
      if (
        !contentType.includes("model/gltf-binary") &&
        !contentType.includes("application/octet-stream")
      ) {
        throw new Error("Server did not return a valid 3D model");
      }

      setCustomModelBlob(blob);
      console.log({ blob });

      // Trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `model-${Date.now()}.glb`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      // setCustomModelBlob(blob);

      // // Trigger download
      // const url = URL.createObjectURL(blob);
      // const a = document.createElement("a");
      // a.href = url;
      // a.download = `model-${Date.now()}.glb`;
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error("Failed to generate model:", err);
      setModelGenError(err.message || "Failed to generate model");
    } finally {
      setIsGeneratingModel(false);
    }
  }, []);

  const handlePromptSubmit = () => {
    handleGenerateModel(modelPrompt);
  };

  const handlePromptKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePromptSubmit();
    }
    if (e.key === "Escape") {
      setShowPromptDialog(false);
      setModelPrompt("");
    }
  };

  // ── Error state ──
  if (!activeLesson) {
    return (
      <div className="lesson-error-screen">
        <div className="lesson-error-icon">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="lesson-error-title">לא נמצא שיעור</h2>
        <p className="lesson-error-subtitle">חזור ובחר שיעור מהרשימה</p>
      </div>
    );
  }

  const currentLesson = activeLesson[0];

  return (
    <>
      <Navbar
        title={currentLesson?.lessonData?.headline || "שיעור"}
        user={user}
      />

      {/* ── Prompt Dialog Overlay ── */}
      {showPromptDialog && (
        <div
          className="prompt-overlay"
          onClick={() => {
            setShowPromptDialog(false);
            setModelPrompt("");
          }}
        >
          <div className="prompt-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="prompt-dialog-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3 className="prompt-dialog-title">צור מודל תלת-ממד</h3>
            <p className="prompt-dialog-subtitle">תאר את המודל שתרצה ליצור</p>
            <input
              className="prompt-dialog-input"
              type="text"
              dir="auto"
              placeholder='לדוגמה: "דינוזאור כחול"'
              value={modelPrompt}
              onChange={(e) => setModelPrompt(e.target.value)}
              onKeyDown={handlePromptKeyDown}
              autoFocus
            />
            <div className="prompt-dialog-actions">
              <button
                className="prompt-dialog-btn prompt-dialog-btn--cancel"
                onClick={() => {
                  setShowPromptDialog(false);
                  setModelPrompt("");
                }}
              >
                ביטול
              </button>
              <button
                className="prompt-dialog-btn prompt-dialog-btn--submit"
                disabled={!modelPrompt.trim()}
                onClick={handlePromptSubmit}
              >
                צור מודל
              </button>
            </div>
          </div>
        </div>
      )}

      {startScanning ? (
        <ArLessonNew
          setStartScanning={setStartScanning}
          firstImage={photoDataArray.length > 0 ? photoDataArray[0] : null}
          secondImage={photoDataArray.length > 1 ? photoDataArray[1] : null}
          images={photoDataArray}
          screenHeight={height}
          screenWidth={width}
          customModelBlob={customModelBlob}
        />
      ) : (
        <div className="lesson-page">
          {/* ── Top: Lesson Status Indicator ── */}
          <div className="lesson-status-bar">
            <span className="lesson-status-dot" />
            <span className="lesson-status-text">שיעור פעיל</span>
          </div>

          {/* ── Briefing Card ── */}
          <article className="lesson-briefing-card">
            {currentLesson?.lessonData?.headline && (
              <header className="lesson-briefing-header">
                <h1 className="lesson-briefing-title" dir="auto">
                  {currentLesson.lessonData.headline}
                </h1>
              </header>
            )}

            <div className="lesson-meta-row">
              {currentLesson.createdByInfo && (
                <div className="lesson-meta-chip">
                  <svg
                    className="lesson-meta-chip-icon"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span dir="auto">
                    {currentLesson.createdByInfo.firstName}{" "}
                    {currentLesson.createdByInfo.lastName}
                  </span>
                </div>
              )}
              {currentLesson.classAgeGroup && (
                <div className="lesson-meta-chip">
                  <svg
                    className="lesson-meta-chip-icon"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  <span>
                    כיתה {classObj[currentLesson.classAgeGroup] || ""}
                  </span>
                </div>
              )}
            </div>

            <div className="lesson-briefing-divider" />

            {currentLesson?.lessonData?.description && (
              <section className="lesson-briefing-section">
                <h3 className="lesson-section-label">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="17" y1="10" x2="3" y2="10" />
                    <line x1="21" y1="6" x2="3" y2="6" />
                    <line x1="21" y1="14" x2="3" y2="14" />
                    <line x1="17" y1="18" x2="3" y2="18" />
                  </svg>
                  תיאור
                </h3>
                <p className="lesson-section-body" dir="auto">
                  {currentLesson.lessonData.description}
                </p>
              </section>
            )}

            {currentLesson?.lessonData?.instructions && (
              <section className="lesson-briefing-section">
                <h3 className="lesson-section-label">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  הוראות
                </h3>
                <p className="lesson-section-body" dir="auto">
                  {currentLesson.lessonData.instructions}
                </p>
              </section>
            )}
          </article>

          {/* ── Generate 3D Model Button ── */}
          <div
            className="lesson-launch-area"
            style={{ marginBottom: "0.5rem" }}
          >
            <button
              disabled={isGeneratingModel}
              className={`lesson-launch-btn ${isGeneratingModel ? "lesson-launch-btn--loading" : ""}`}
              style={{
                background: customModelBlob
                  ? "#22c55e"
                  : isGeneratingModel
                    ? "#9ca3af"
                    : undefined,
              }}
              onClick={() => {
                if (!isGeneratingModel && !customModelBlob) {
                  setModelPrompt("");
                  setShowPromptDialog(true);
                }
              }}
            >
              {isGeneratingModel ? (
                <span className="lesson-launch-btn-inner">
                  <span className="lesson-launch-spinner" />
                  <span>יוצר מודל תלת-ממד...</span>
                </span>
              ) : customModelBlob ? (
                <span className="lesson-launch-btn-inner">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>מודל מוכן!</span>
                </span>
              ) : (
                <span className="lesson-launch-btn-inner">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                  <span>צור מודל תלת-ממד</span>
                </span>
              )}
            </button>

            {modelGenError && (
              <p
                style={{
                  color: "#ef4444",
                  fontSize: "0.85rem",
                  marginTop: "0.5rem",
                  textAlign: "center",
                }}
              >
                שגיאה: {modelGenError}
              </p>
            )}

            {customModelBlob && !isGeneratingModel && (
              <p
                style={{
                  color: "#22c55e",
                  fontSize: "0.85rem",
                  marginTop: "0.5rem",
                  textAlign: "center",
                }}
              >
                המודל הורד בהצלחה — לחץ על "התחל סריקה" כדי להציג אותו
              </p>
            )}
          </div>

          {/* ── Launch Button ── */}
          <div className="lesson-launch-area">
            <button
              disabled={disabled}
              className={`lesson-launch-btn ${disabled ? "lesson-launch-btn--loading" : ""}`}
              onClick={() => {
                setDisabled(true);
                setTimeout(() => {
                  setDisabled(false);
                  setStartScanning(true);
                }, 1000);
              }}
            >
              {disabled ? (
                <span className="lesson-launch-btn-inner">
                  <span className="lesson-launch-spinner" />
                  <span>מאתחל מצלמה...</span>
                </span>
              ) : (
                <span className="lesson-launch-btn-inner">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <span>התחל סריקה</span>
                </span>
              )}
            </button>
            <p className="lesson-launch-hint">
              כוון את המצלמה לעבר הסמנים כדי להציג אובייקטים תלת-ממדיים
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Lesson;
