import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./UnfilteredLandingPage.css";
import silasLogo from '../assets/silas_logo.png';

const UnfilteredLandingPage = () => {
  const [email, setEmail] = useState("");
  const [quote, setQuote] = useState({ content: "", author: "" });
  const [submitted, setSubmitted] = useState(false);

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
      .catch(() => setQuote({ content: "Couldn't fetch quote.", author: "API Error" }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TEMP: Replace this with MailerLite integration or embed
    console.log("Email submitted:", email);
    setSubmitted(true);
  };

  return (
    <>
      <nav className="main-nav" aria-label="Main navigation">
        <div className="nav-left">
          <img src={silasLogo} alt="Silas Logo" className="nav-logo" />
        </div>
        <div className="nav-right">
          <a href="https://www.silasabiodun.com/" target="_blank" rel="noopener noreferrer" className="nav-cta">More about Silas</a>
        </div>
      </nav>
      <main className="container" aria-label="Unfiltered by Silas newsletter landing page">
        <motion.section
          className="content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          aria-labelledby="newsletter-header"
        >
          <header id="newsletter-header">
            <h1 className="main-title">
              <span className="logo-main">Unfiltered</span>
              <span className="logo-sub">by Silas</span>
            </h1>
          </header>
          <p className="cta">Relax, no spam. Just hot takes, weird thoughts, and memes you’ll pretend you didn’t laugh at. You’re curious now, aren’t you?</p>
          <section aria-label="Email signup form" style={{ width: '100%' }}>
            {submitted ? (
              <p className="success" role="status">🔥 You're in. Check your inbox soon.</p>
            ) : (
              <form onSubmit={handleSubmit} className="form" autoComplete="off">
                <label htmlFor="email" className="visually-hidden">Email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                  autoComplete="email"
                />
                <button type="submit" aria-label="Subscribe to Unfiltered newsletter">Subscribe</button>
              </form>
            )}
          </section>
          <section className="quote" aria-label="Random inspirational quote">
            <div className="quote-heading">Today's Quote</div>
            <blockquote>
              <p>"{quote.content}"</p>
              <footer><span>– {quote.author}</span></footer>
            </blockquote>
          </section>
        </motion.section>
      </main>
    </>
  );
};

export default UnfilteredLandingPage;
