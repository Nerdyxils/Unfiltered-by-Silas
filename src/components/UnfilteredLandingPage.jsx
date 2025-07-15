import React, { useState, useEffect } from "react";
import "./UnfilteredLandingPage.css";
import silasLogo from "../assets/silas_logo.png";

const MAILERLITE_URL = "https://assets.mailerlite.com/jsonp/1667600/forms/160022650035373147/subscribe";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const formData = new URLSearchParams();
    formData.append("fields[email]", email);
    formData.append("ml-submit", "1");
    formData.append("anticsrf", "true");

    try {
      const response = await fetch(MAILERLITE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });
      const data = await response.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setError(
          data.errors?.fields?.email?.[0] ||
          data.errors?.[0] ||
          "An error occurred. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  };

  return (
    <>
      {/* Overlay and floating success card at bottom right */}
      {status === "success" && (
        <>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.18)',
            zIndex: 1000,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'fixed',
            bottom: '2.5rem',
            right: '2.5rem',
            zIndex: 1100,
            maxWidth: 360,
            minWidth: 280,
            background: 'rgba(30,30,30,0.98)',
            borderRadius: 18,
            boxShadow: '0 4px 24px 0 rgba(31,38,135,0.18)',
            padding: '2rem 1.5rem 1.5rem 1.5rem',
            textAlign: 'center',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid rgba(255,255,255,0.13)',
          }}>
            <img src={silasLogo} alt="Silas Logo" className="nav-logo" style={{ marginBottom: '1.2rem', height: 36 }} />
            <h1 className="main-title" style={{ color: '#3B8A7F', fontSize: '1.5rem', marginBottom: '0.7rem' }}>Thank you for subscribing!</h1>
            <p className="cta" style={{ color: '#fff', fontSize: '1rem', marginBottom: '1.2rem' }}>
              You have successfully joined the Unfiltered newsletter.<br />
              Check your inbox for a welcome email soon.
            </p>
            <a href="/" className="nav-cta" style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '0.95rem', padding: '0.5rem 1.2rem' }}>
              Back to Home
            </a>
          </div>
        </>
      )}
      {/* The form is hidden when status is 'success' */}
      {status !== "success" && (
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="fields[email]"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
            autoComplete="email"
          />
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
          {status === "error" && (
            <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>
          )}
        </form>
      )}
    </>
  );
}

const UnfilteredLandingPage = () => {
  const [quote, setQuote] = useState({ content: "", author: "" });

  useEffect(() => {
    fetch("https://corsproxy.io/?https://zenquotes.io/api/random")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setQuote({ content: data[0].q, author: data[0].a });
        } else {
          setQuote({ content: "Couldn't fetch quote.", author: "API Error" });
        }
      })
      .catch(() =>
        setQuote({ content: "Couldn't fetch quote.", author: "API Error" })
      );
  }, []);

  if (status === "success") {
    return (
      <div className="container">
        <div className="content" style={{ textAlign: 'center' }}>
          <img src={silasLogo} alt="Silas Logo" className="nav-logo" style={{ marginBottom: '1.5rem' }} />
          <h1 className="main-title" style={{ color: '#3B8A7F', fontSize: '2.5rem', marginBottom: '1rem' }}>Thank you for subscribing!</h1>
          <p className="cta" style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '2rem' }}>
            You have successfully joined the Unfiltered newsletter.<br />
            Check your inbox for a welcome email soon.
          </p>
          <a href="/" className="nav-cta" style={{ display: 'inline-block', marginTop: '1.5rem' }}>
            Back to Home
          </a>
        </div>
      </div>
    );
  }
  return (
    <>
      <nav className="main-nav" aria-label="Main navigation">
        <div className="nav-left">
          <img src={silasLogo} alt="Silas Logo" className="nav-logo" />
        </div>
        <div className="nav-right">
          <a
            href="https://www.silasabiodun.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            More about Silas
          </a>
        </div>
      </nav>
      <main className="container" aria-label="Unfiltered by Silas newsletter landing page">
        <section
          className="content"
          aria-labelledby="newsletter-header"
        >
          <header id="newsletter-header">
            <h1 className="main-title">
              <span className="logo-main">Unfiltered</span>
              <span className="logo-sub">by Silas</span>
            </h1>
          </header>
          <p className="cta">
            Relax, no spam. Just hot takes, weird thoughts, and memes you’ll
            pretend you didn’t laugh at. You’re curious now, aren’t you?
          </p>
          {/* Custom AJAX MailerLite Form */}
          <section
            aria-label="Email signup form"
            style={{ width: "100%", minHeight: "180px" }}
          >
            <NewsletterForm />
          </section>
          <div className="quote" style={{ marginTop: "2.5rem" }}>
            <div className="quote-heading">Quote for Your Soul</div>
            <div>
              {quote.content && (
                <>
                  “{quote.content}”
                  <span>— {quote.author}</span>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default UnfilteredLandingPage;
