import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./UnfilteredLandingPage.css";
import silasLogo from '../assets/silas_logo.png';

const mailerLiteEmbedHtml = `
  <style type="text/css">@import url('https://assets.mlcdn.com/fonts.css?version=1752130');</style>
  <div id="mlb2-28436674" class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-28436674">
    <div class="ml-form-align-center ">
      <div class="ml-form-embedWrapper embedForm">
        <div class="ml-form-embedBody ml-form-embedBodyDefault row-form">
          <div class="ml-form-embedContent" style="margin-bottom: 0px;"></div>
          <form class="ml-block-form" action="https://assets.mailerlite.com/jsonp/1667600/forms/160022650035373147/subscribe" method="post">
            <div class="ml-form-formContent">
              <div class="ml-form-fieldRow ml-last-item">
                <div class="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                  <input aria-label="email" aria-required="true" type="email" class="form-control" name="fields[email]" placeholder="Email" autocomplete="email" required style="background:#1a1a1a;color:#fff;border-radius:6px;border:none;padding:1.2rem;font-size:1.15rem;width:100%;max-width:100%;box-sizing:border-box;" />
                </div>
              </div>
            </div>
            <input type="hidden" name="ml-submit" value="1">
            <div class="ml-form-embedSubmit" style="margin-top:1rem;">
              <button type="submit" class="primary" style="width:100%;background:#3B8A7F;color:#fff;font-weight:bold;border:none;border-radius:6px;cursor:pointer;padding:1.2rem;font-size:1.15rem;transition:background 0.3s;">Subscribe</button>
            </div>
            <input type="hidden" name="anticsrf" value="true">
          </form>
        </div>
        <div class="ml-form-successBody row-success" style="display:none;text-align:center;">
          <div class="ml-form-successContent">
            <h4 style="color:#3B8A7F;font-size:2rem;font-weight:700;margin-bottom:0.5rem;">Thank you!</h4>
            <p style="color:#fff;font-size:1.1rem;">You have successfully joined our subscriber list.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

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

    // Dynamically load MailerLite script after HTML is present
    if (!document.getElementById('mlb2-28436674-script')) {
      const script = document.createElement('script');
      script.id = 'mlb2-28436674-script';
      script.src = 'https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024';
      script.type = 'text/javascript';
      script.async = true;
      document.body.appendChild(script);
    }
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
            <div dangerouslySetInnerHTML={{ __html: mailerLiteEmbedHtml }} />
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
