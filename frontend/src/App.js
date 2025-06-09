import React, { useState } from "react";

const Header = ({ onLogout, userEmail }) => (
  <header className="header">
    <div className="container">
      <div className="logo">MedApp</div>
      <nav>
        {userEmail ? (
          <>
            <span className="user-email">{userEmail}</span>
            <button className="btn-logout" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <span className="nav-guest">Please Sign In</span>
        )}
      </nav>
    </div>
  </header>
);

const SignIn = ({ onEmailSubmit }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError("Please enter a valid email address.");
      return;
    }
    onEmailSubmit(email);
  };

  return (
    <section className="card section">
      <h1 className="heading-lg">Sign In</h1>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="email" className="label">
          Email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          required
          className="input"
        />
        {error && <div className="form-error">{error}</div>}
        <button type="submit" className="btn-primary">
          Send OTP
        </button>
      </form>
    </section>
  );
};

const OtpVerification = ({ email, onVerifyOtp, onBack }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!otp.match(/^\d{6}$/)) {
      setError("OTP must be a 6-digit number.");
      return;
    }
    setLoading(true);
    try {
      await onVerifyOtp(otp);
    } catch (err) {
      setError(err.message || "OTP verification failed");
    }
    setLoading(false);
  };

  return (
    <section className="card section">
      <h1 className="heading-lg">Verify OTP</h1>
      <p className="text-muted mb-6">An OTP was sent to {email}</p>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="otp" className="label">
          Enter OTP
        </label>
        <input
          id="otp"
          type="text"
          placeholder="123456"
          inputMode="numeric"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="input"
        />
        {error && <div className="form-error">{error}</div>}
        <div className="form-btns">
          <button type="button" onClick={onBack} className="btn-ghost">
            Back
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </form>
    </section>
  );
};

const AppointmentBooking = ({ token, onBooked }) => {
  const [doctor, setDoctor] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const doctors = [
    "Dr. Smith",
    "Dr. Johnson",
    "Dr. Lee",
    "Dr. Patel",
    "Dr. Wang",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!doctor) {
      setError("Please select a doctor.");
      return;
    }
    if (!dateTime) {
      setError("Please select date and time.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ doctor, dateTime }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to book appointment");
      }
      setDoctor("");
      setDateTime("");
      onBooked();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <section className="card section">
      <h1 className="heading-lg mb-4">Book Appointment</h1>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="doctor" className="label">
          Select Doctor
        </label>
        <select
          id="doctor"
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          required
          className="input"
        >
          <option value="">Choose a doctor</option>
          {doctors.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <label htmlFor="dateTime" className="label mt-4">
          Appointment Date & Time
        </label>
        <input
          type="datetime-local"
          id="dateTime"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          required
          min={new Date().toISOString().slice(0, 16)}
          className="input"
        />

        {error && <div className="form-error">{error}</div>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </section>
  );
};

export { Header, SignIn, OtpVerification, AppointmentBooking };
