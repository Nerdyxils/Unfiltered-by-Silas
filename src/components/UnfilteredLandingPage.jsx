import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./UnfilteredLandingPage.css";
import silasLogo from "../assets/silas_logo.png";
import { useNavigate } from "react-router-dom";

const UnfilteredLandingPage = () => {
  const navigate = useNavigate();
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
          <p className="cta">
            Relax, no spam. Just hot takes, weird thoughts, and memes you’ll
            pretend you didn’t laugh at. You’re curious now, aren’t you?
          </p>

          {/* ✅ Render the raw MailerLite HTML/embed exactly */}
          <section
            aria-label="Email signup form"
            style={{ width: "100%", minHeight: "180px" }}
            >
            <div
              dangerouslySetInnerHTML={{
                __html: `
                  <style type="text/css">@import url('https://assets.mlcdn.com/fonts.css?version=1752130');</style>
                  <style type="text/css">/* LOADER */ .ml-form-embedSubmitLoad { display: inline-block; width: 20px; height: 20px; } .g-recaptcha { transform: scale(1); -webkit-transform: scale(1); transform-origin: 0 0; -webkit-transform-origin: 0 0; height: ; } .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; } .ml-form-embedSubmitLoad:after { content: " "; display: block; width: 11px; height: 11px; margin: 1px; border-radius: 50%; border: 4px solid #fff; border-color: #ffffff #ffffff #ffffff transparent; animation: ml-form-embedSubmitLoad 1.2s linear infinite; } @keyframes ml-form-embedSubmitLoad { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } /* ... (rest of CSS omitted for brevity, but should be included in full) ... */ </style>
                  <div id="mlb2-28436674" class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-28436674"> <div class="ml-form-align-center "> <div class="ml-form-embedWrapper embedForm"> <div class="ml-form-embedBody ml-form-embedBodyDefault row-form"> <div class="ml-form-embedContent" style="margin-bottom: 0px; "></div> <form class="ml-block-form" action="https://assets.mailerlite.com/jsonp/1667600/forms/160022650035373147/subscribe" data-code="" method="post" target="_blank"> <div class="ml-form-formContent"> <div class="ml-form-fieldRow ml-last-item"> <div class="ml-field-group ml-field-email ml-validate-email ml-validate-required"> <input aria-label="email" aria-required="true" type="email" class="form-control" data-inputmask="" name="fields[email]" placeholder="Email" autocomplete="email"> </div> </div> </div> <input type="hidden" name="ml-submit" value="1"> <div class="ml-form-embedSubmit"> <button type="submit" class="primary">Subscribe</button> <button disabled="disabled" style="display: none;" type="button" class="loading"> <div class="ml-form-embedSubmitLoad"></div> <span class="sr-only">Loading...</span> </button> </div> <input type="hidden" name="anticsrf" value="true"> </form> </div> <div class="ml-form-successBody row-success" style="display: none"> <div class="ml-form-successContent"> <h4>Thank you!</h4> <p>You have successfully joined our subscriber list.</p> </div> </div> </div> </div> </div> <script> function ml_webform_success_28436674() { try { window.top.location.href = 'https://unfiltered.silasabiodun.com/success'; } catch (e) { window.location.href = 'https://unfiltered.silasabiodun.com/success'; } } </script> <script src="https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024" type="text/javascript"></script> <script> fetch("https://assets.mailerlite.com/jsonp/1667600/forms/160022650035373147/takel") </script>
                <style>
                  /* Custom overrides for dark theme */
                  #mlb2-28436674.ml-form-embedContainer .ml-form-embedWrapper {
                    border-radius: 16px !important;
                    box-shadow: 0 4px 24px 0 rgba(31,38,135,0.18);
                    border: none !important;
                    width: 100% !important;
                    max-width: 520px !important;
                  }
                  #mlb2-28436674.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody,
                  #mlb2-28436674.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody {
                    /* padding: 1.5rem 1.2rem 0 1.2rem !important; */
                  }
                  #mlb2-28436674.ml-form-embedContainer input[type="email"],
                  #mlb2-28436674.ml-form-embedContainer .form-control {
                    background: #1a1a1a !important;
                    color: #fff !important;
                    border: none !important;
                    border-radius: 8px !important;
                    font-size: 1.1rem !important;
                    padding: 1.1rem !important;
                    width: 440px !important;
                    max-width: 100% !important;
                    box-sizing: border-box !important;
                  }
                  #mlb2-28436674.ml-form-embedContainer input[type="email"]::placeholder {
                    color: #bbb !important;
                  }
                  #mlb2-28436674.ml-form-embedContainer button.primary {
                    background: #3B8A7F !important;
                    color: #fff !important;
                    font-weight: bold !important;
                    border: none !important;
                    border-radius: 8px !important;
                    font-size: 1.1rem !important;
                    padding: 1.1rem !important;
                    width: 440px !important;
                    max-width: 100% !important;
                    box-sizing: border-box !important;
                    transition: background 0.3s;
                    margin-top: 20px !important;
                  }
                  #mlb2-28436674.ml-form-embedContainer button.primary:hover {
                    background: #2f6e65 !important;
                    color: #fff !important;
                  }
                  #mlb2-28436674.ml-form-embedContainer .ml-form-successContent h4 {
                    color: #3B8A7F !important;
                    font-size: 2rem !important;
                    font-weight: 700 !important;
                  }
                  #mlb2-28436674.ml-form-embedContainer .ml-form-successContent p {
                    color: #fff !important;
                    font-size: 1.1rem !important;
                  }
                  #mlb2-28436674.ml-form-embedContainer .ml-form-embedContent,
                  #mlb2-28436674.ml-form-embedContainer .ml-form-embedContent p,
                  #mlb2-28436674.ml-form-embedContainer .ml-form-embedContent h4 {
                    color: #fff !important;
                  }
                </style>
              `,
            }}
          />
        </section>

          <section className="quote" aria-label="Random inspirational quote">
            <div className="quote-heading">Today's Quote</div>
            <blockquote>
              <p>"{quote.content}"</p>
              <footer>
                <span>– {quote.author}</span>
              </footer>
            </blockquote>
          </section>
        </motion.section>
      </main>
    </>
  );
};

export default UnfilteredLandingPage;
