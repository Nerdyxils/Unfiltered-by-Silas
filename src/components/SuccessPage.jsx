import './UnfilteredLandingPage.css';
import silasLogo from '../assets/silas_logo.png';
import { Link } from 'react-router-dom';

export default function SuccessPage() {
  return (
    <div className="container">
      <div className="content" style={{ textAlign: 'center' }}>
        <img src={silasLogo} alt="Silas Logo" className="nav-logo" style={{ marginBottom: '1.5rem' }} />
        <h1 className="main-title" style={{ color: '#3B8A7F', fontSize: '2.5rem', marginBottom: '1rem' }}>Thank you for subscribing!</h1>
        <p className="cta" style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '2rem' }}>
          You have successfully joined the Unfiltered newsletter.<br />
          Check your inbox for a welcome email soon.
        </p>
        <Link to="/" className="nav-cta" style={{ display: 'inline-block', marginTop: '1.5rem' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
} 