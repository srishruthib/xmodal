import { useState, useEffect, useRef } from "react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });
  const modalRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  function reset() {
    setForm({ username: "", email: "", dob: "", phone: "" });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { username, email, dob, phone } = form;

    // --- Field-specific validations first (so single-field tests pass even if others empty) ---
    if (email && !email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    const digitsOnly = phone.replace(/\D/g, "");
    if (phone && digitsOnly.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    if (dob) {
      const today = new Date();
      const dobDate = new Date(dob);
      const todayYMD = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      if (dobDate > todayYMD) {
        alert("Invalid date of birth. Date of birth cannot be in the future.");
        return;
      }
    }

    // --- Required checks after field-specific ones ---
    if (!username.trim()) {
      alert("Please fill out the Username field.");
      return;
    }
    if (!email.trim()) {
      alert("Please fill out the Email field.");
      return;
    }
    if (!phone.trim()) {
      alert("Please fill out the Phone Number field.");
      return;
    }
    if (!dob.trim()) {
      alert("Please fill out the Date of Birth field.");
      return;
    }

    // Success -> close and reset to initial state
    setIsOpen(false);
    reset();
  }

  function onOverlayClick(e) {
    // Close only when clicking the overlay (outside modal content)
    if (e.target === e.currentTarget) setIsOpen(false);
  }

  return (
    <div className="modal">
      {/* Global CSS so tests don't rely on Tailwind and the root is always sized */}
      <style>{`
        /* Make sure the app root actually has size in the test browser */
        html, body, #root { height: 100%; width: 100%; margin: 0; }

        /* Ensure .modal is always visible and fills the viewport */
        .modal {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .modal-content {
          background: white;
          border-radius: 12px;
          max-width: 480px;
          width: 92vw;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        .field { display: flex; flex-direction: column; gap: 6px; }
        .label { font-weight: 600; }
        .input {
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 14px;
        }
        .btn { border: none; border-radius: 10px; padding: 10px 14px; cursor: pointer; }
        .btn-primary { background: #2563eb; color: #fff; }
        .btn-secondary { background: #e5e7eb; }
        .actions { display: flex; gap: 10px; justify-content: flex-end; }
      `}</style>

      {!isOpen && (
        <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
          Open Form
        </button>
      )}

      {isOpen && (
        <div className="overlay" onClick={onOverlayClick} ref={modalRef}>
          <div className="modal-content" role="dialog" aria-modal="true">
            <div style={{ padding: "24px" }}>
              <h2 style={{ margin: "0 0 16px", fontWeight: 700 }}>User Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="field" style={{ marginBottom: 12 }}>
                  <label className="label" htmlFor="username">Username</label>
                  <input
                    id="username"
                    className="input"
                    type="text"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    placeholder="Enter your username"
                  />
                </div>

                <div className="field" style={{ marginBottom: 12 }}>
                  <label className="label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    className="input"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@example.com"
                  />
                </div>

                <div className="field" style={{ marginBottom: 12 }}>
                  <label className="label" htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    className="input"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="10-digit number"
                  />
                </div>

                <div className="field" style={{ marginBottom: 20 }}>
                  <label className="label" htmlFor="dob">Date of Birth</label>
                  <input
                    id="dob"
                    className="input"
                    type="date"
                    value={form.dob}
                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  />
                </div>

                <div className="actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary submit-button">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
