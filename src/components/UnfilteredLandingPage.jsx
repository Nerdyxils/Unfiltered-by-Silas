import React, { useState, useEffect } from "react";
import "./UnfilteredLandingPage.css";
import silasLogo from "../assets/silas_logo.png";

const MAILERLITE_URL = "https://assets.mailerlite.com/jsonp/1667600/forms/160022650035373147/subscribe";

function NewsletterForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    // If honeypot is filled, treat as spam and do not submit
    if (honeypot) {
      setStatus("error");
      setError("Spam detected. Please try again.");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("fields[email]", email);
    formData.append("ml-submit", "1");
    formData.append("anticsrf", "true");
    // Optionally include honeypot field for backend logging
    formData.append("website", honeypot);

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
        if (onSuccess) onSuccess();
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
    <form className="form" onSubmit={handleSubmit} autoComplete="off">
      {/* Honeypot field for spam bots, visually hidden from users */}
      <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex="-1"
          autoComplete="off"
          value={honeypot}
          onChange={e => setHoneypot(e.target.value)}
        />
      </div>
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
  );
}

const UnfilteredLandingPage = () => {
  const [quote, setQuote] = useState({ content: "", author: "" });
  const [success, setSuccess] = useState(false);

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

  if (success) {
    return (
      <div className="container">
        <div className="content" style={{ textAlign: 'center' }}>
          <img src={silasLogo} alt="Silas Logo" className="nav-logo" style={{ marginBottom: '1.5rem' }} />
          <h1 className="main-title" style={{ color: '#3B8A7F', fontSize: '2.5rem', marginBottom: '1rem' }}>
        Congrats! You just joined the coolest newsletter you never asked for.
        </h1>   
        <p className="cta" style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '2rem' }}>
        Get ready for weird thoughts, hot takes, and the occasional meme you’ll pretend didn’t make you laugh.<br />
        Check your inbox (or spam, if your email’s being dramatic).
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
            <NewsletterForm onSuccess={() => setSuccess(true)} />
          </section>
          <div className="quote" style={{ marginTop: "2.5rem" }}>
            <div className="quote-heading">Chew on This</div>
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
