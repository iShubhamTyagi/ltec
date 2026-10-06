import React from "react";
import LungsIcon from "../resources/ltec_icon.png";
import HeroImage from "../resources/landing/hero.jpg";
import XrayImage from "../resources/landing/lungs-xray.jpg";

/**
 * Marketing landing page shown before Sign In. Explains the problem LTEC
 * solves, what it set out to do, how the tool works, and the feasibility
 * study evidence, then hands off to the existing Login flow.
 *
 * Pure presentation. Carries no screening/auth logic of its own.
 */
function LandingPage({ onGetStarted }) {
  return (
    <>
      <header className="hdr">
        <div className="hdr-inner">
          <div className="hdr-logo">
            <img src={LungsIcon} alt="Lungs Icon" />
          </div>
          <div className="hdr-title">
            <span className="t1-short">LTEC</span>
            <span className="t1-short-sub">
              <span className="t1-short-sub-line">Lung Transplant</span>
              <span className="t1-short-sub-line">Eligibility Calculator</span>
            </span>
            <span className="t1">Lung Transplant Eligibility Calculator</span>
            <span className="t2">CLINICAL DECISION SUPPORT</span>
          </div>
          <div className="hdr-cta">
            <button className="btn btn-on-dark" onClick={onGetStarted}>
              Open LTEC
            </button>
          </div>
        </div>
      </header>

      <section className="lp-hero">
        <div>
          <div className="lp-eyebrow">Clinical decision support</div>
          <h1>
            Find transplant&#8209;eligible patients <em>before it&rsquo;s too late</em>.
          </h1>
          <p className="lp-sub">
            LTEC checks COPD, ILD, and bronchiectasis patients against ISHLT 2021 referral
            and listing criteria. Takes under 90 seconds, during a routine OPD visit.
          </p>
          <div className="lp-hero-actions">
            <button className="btn btn-primary btn-lg" onClick={onGetStarted}>
              Open LTEC
            </button>
            <a href="#how" className="btn btn-ghost btn-lg">
              See how it works
            </a>
          </div>
          <div className="lp-hero-note">
            Tested in a single tertiary-care respiratory OPD. Feasibility study accepted
            for publication in Lung India.
          </div>
        </div>
        <div className="lp-hero-media">
          <img src={HeroImage} alt="Doctor listening to a patient's chest with a stethoscope" />
          <div className="lp-hero-badge">
            <span className="n">82s</span>
            <span className="l">average screening time</span>
          </div>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-problem">
          <div className="lp-problem-copy">
            <div className="lp-section-head" style={{ marginBottom: 22 }}>
              <div className="lp-kicker">The problem</div>
              <h2>Eligible patients get missed.</h2>
            </div>
            <p>Lung transplant is proven and life-saving. In India, eligible patients are often found too late.</p>
            <ul className="lp-list">
              <li>Transplant centres are limited. Donor organs are scarce.</li>
              <li>Waiting times are long. Awareness is low.</li>
              <li>Manually applying ISHLT criteria is complex. It is often overlooked in busy clinics.</li>
            </ul>
            <div className="lp-problem-stat">
              <span className="n">68.9M</span>
              <span className="l">people in India live with a chronic respiratory disease</span>
            </div>
          </div>
          <div className="lp-problem-media">
            <img src={XrayImage} alt="Chest X-ray" />
            <div className="cap">
              COPD, bronchiectasis and ILD patients are seen every day in routine respiratory
              OPDs
            </div>
          </div>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-objective-card">
          <div className="lp-obj-mark">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1.6" />
              <path d="M12 7v5l3.2 2" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h3>Our objective</h3>
            <p>
              Apply the ISHLT 2021 referral and listing criteria automatically. Make
              eligibility checks fast and standardized, at the point of care.
            </p>
          </div>
        </div>
      </section>

      <section className="lp-section" id="how">
        <div className="lp-section-head">
          <div className="lp-kicker">The solution</div>
          <h2>How LTEC works</h2>
          <p>Four short steps, built on ISHLT 2021 criteria. The same flow a clinician already follows, just standardized and timed.</p>
        </div>
        <div className="lp-steps">
          <div className="card lp-step">
            <div className="lp-step-n">1</div>
            <h4>Select the disease</h4>
            <p>Choose COPD, ILD, or Bronchiectasis. Enter age, ID, and sex.</p>
          </div>
          <div className="card lp-step">
            <div className="lp-step-n">2</div>
            <h4>Answer structured criteria</h4>
            <p>Work through referral and listing questions from ISHLT 2021.</p>
          </div>
          <div className="card lp-step">
            <div className="lp-step-n">3</div>
            <h4>Screen for contraindications</h4>
            <p>Answer absolute and relative contraindication questions, in the same flow.</p>
          </div>
          <div className="card lp-step">
            <div className="lp-step-n">4</div>
            <h4>Get an instant verdict</h4>
            <p>Color-coded result, logged with timing.</p>
          </div>
        </div>
      </section>

      <section className="lp-section lp-evidence">
        <div className="lp-section-head">
          <div className="lp-kicker">Evidence</div>
          <h2>Tested in a real OPD</h2>
          <p>Single-centre, 6-month feasibility study. Consecutive COPD, ILD, and bronchiectasis patients screened with LTEC against ISHLT 2021 criteria.</p>
        </div>
        <div className="lp-evidence-grid">
          <div className="card lp-evidence-tile">
            <div className="n">70</div>
            <div className="l">patients screened over 6 months</div>
          </div>
          <div className="card lp-evidence-tile">
            <div className="n">60%</div>
            <div className="l">met ISHLT referral criteria</div>
          </div>
          <div className="card lp-evidence-tile">
            <div className="n">25.7%</div>
            <div className="l">eligible for listing after review</div>
          </div>
          <div className="card lp-evidence-tile">
            <div className="n">~82s</div>
            <div className="l">average time per patient</div>
          </div>
        </div>
        <p className="lp-finding">
          The study reported no extra clinic visits, no dedicated staff, and no interruption
          to routine OPD services.
        </p>
        <div className="lp-citation">
          Accepted for publication in <em>Lung India</em> (2026).
          <br />
          Rahul Tyagi, Srishti Tripathi, Shemsya Shajahan, Manu Chopra, Shubham Tyagi.
        </div>
      </section>

      <section className="lp-cta">
        <h2>Screen your next patient in under 90 seconds.</h2>
        <p>A fast, standardized eligibility check, right in your OPD.</p>
        <button className="btn btn-on-dark btn-lg" onClick={onGetStarted}>
          Open LTEC
        </button>
      </section>
    </>
  );
}

export default LandingPage;
