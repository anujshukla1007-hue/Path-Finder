import { useState, useMemo, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   ───────────────────────────────
═══════════════════════════════════════════════════════════════ */




/* ═══════════════════════════════════════════════════════════════
   DATA SECURITY & PRIVACY POLICY  (detailed T&C modal content)
═══════════════════════════════════════════════════════════════ */
const PRIVACY_POLICY = {
  lastUpdated: "1 June 2025",
  sections: [
    {
      icon: "🏢", title: "1. Data Controller & Platform Identity",
      body: `This Eligibility & Career Discovery Engine ("Platform") is operated by CareerMap Engine / [Your Organization Name], registered under applicable Indian law. By submitting your personal information through this Platform, you agree to the collection and processing of your data as described in this Policy. This policy is governed by the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 (DPDP Act) of India.`,
    },
    {
      icon: "📋", title: "2. Data We Collect",
      body: `We collect the following categories of personal data when you voluntarily submit the lead capture form:
• Full Name (as provided)
• Mobile Number (10-digit Indian mobile number)
• Email Address
• Current Class / Educational Level (e.g., Class 10, 12, Graduation)
• Target Competitive Exam (e.g., JEE, NEET, UPSC, Banking)
• Target Year of Attempt
• City / State of Residence (optional)
• Device information, IP address, and browser metadata collected automatically for security and analytics purposes.`,
    },
    {
      icon: "🎯", title: "3. Purpose of Data Collection",
      body: `Your personal data will be used for the following specific, lawful purposes:
(a) Mentorship & Career Guidance: To provide personalised career roadmaps, exam eligibility analysis, and counseling sessions by trained counselors.
(b) Educational Communication: To send you exam notifications, study material, exam updates, admit card alerts, result updates via SMS, WhatsApp, and Email.
(c) Promotional Communication: To inform you about coaching programs, test series, crash courses, scholarship opportunities from our verified partner platforms including PW (Physics Wallah), Aakash Institute, Allen Career Institute, and other affiliated educational institutions.
(d) Partner University Referrals: Your data may be shared with partner universities for direct admission counseling upon your explicit request or implicit consent given via this form.
(e) Platform Improvement: Anonymised, aggregated data is used to improve eligibility algorithm accuracy and user experience.
(f) Compliance & Legal: To comply with applicable laws, court orders, or government requests.`,
    },
    {
      icon: "🤝", title: "4. Data Sharing with Third Parties",
      body: `We may share your personal data with the following categories of verified and trusted partners ONLY:
• Verified Educational Platforms: PW (Physics Wallah), Aakash Institute, Allen Career Institute, Unacademy — for relevant course recommendations.
• Partner Universities & Colleges: Amity, LPU, Manipal, SRM, Chandigarh University, UPES, and similar — for direct admission counseling.
• Career Counseling Agencies: Licensed and empanelled career counselors and mentors registered with our platform.
• Analytics Providers: Google Analytics, Supabase (hosting/database) for anonymised platform analytics.
• Legal Authorities: As required by law, court order, or government directive.

We DO NOT sell your personal data to unverified third parties, data brokers, or unsolicited commercial entities.`,
    },
    {
      icon: "🔒", title: "5. Data Security Measures",
      body: `We employ industry-standard technical and organisational security measures to protect your data:
• Encryption in Transit: All data transmitted between your browser and our servers uses TLS 1.2+ (HTTPS) encryption.
• Encryption at Rest: Data stored in Supabase (PostgreSQL) is encrypted at rest using AES-256.
• Access Controls: Database access is restricted via Row Level Security (RLS) policies. Only authorised personnel with verified credentials can access personally identifiable data.
• API Key Security: Public-facing API keys are restricted to insert-only operations. No read or delete access is possible via the public key.
• Data Minimisation: We collect only the data necessary for the stated purposes.
• Regular Audits: Security configurations are reviewed quarterly.`,
    },
    {
      icon: "⏳", title: "6. Data Retention Policy",
      body: `Your personal data will be retained as follows:
• Active Lead Data: Retained for up to 24 months from the date of submission for counseling follow-up purposes.
• Anonymised Analytics Data: Retained indefinitely for platform improvement.
• Promotional Communication Opt-out: If you opt out of marketing communications, your data will be flagged as "do not contact" within 72 hours and removed from active marketing lists.
• Account Deletion Request: Upon written request to our Data Protection Officer (DPO), personal data will be deleted within 30 days, subject to legal retention requirements.`,
    },
    {
      icon: "✅", title: "7. Your Rights Under DPDP Act 2023",
      body: `Under India's Digital Personal Data Protection Act, 2023, you have the following rights:
• Right to Access: Request a copy of the personal data we hold about you.
• Right to Correction: Request correction of inaccurate or incomplete data.
• Right to Erasure: Request deletion of your personal data (subject to legal obligations).
• Right to Grievance Redressal: File a complaint with our Data Protection Officer.
• Right to Nominate: Nominate another person to exercise rights on your behalf in the event of incapacity.
• Right to Withdraw Consent: Withdraw your consent for data processing at any time. Withdrawal does not affect the lawfulness of processing before withdrawal.

To exercise any of these rights, contact our DPO at: dpo@careermap.in (replace with your actual email).`,
    },
    {
      icon: "📢", title: "8. Marketing Communications & Opt-Out",
      body: `By submitting the lead form, you expressly consent to receiving marketing, promotional, and informational communications from us and our verified partners via:
• SMS and WhatsApp on the provided mobile number
• Email newsletters and exam alerts
• Phone calls from career counselors during business hours (9 AM – 7 PM IST)

You may opt out at any time by:
(a) Clicking the "Unsubscribe" link in any email communication
(b) Sending "STOP" via WhatsApp/SMS to our contact number
(c) Emailing optout@careermap.in with subject "Data Opt-Out – [Your Mobile Number]"`,
    },
    {
      icon: "🔞", title: "9. Children's Privacy",
      body: `Our platform serves students including minors (below 18 years). For users under 18 years of age, we require parental/guardian consent. By submitting data for a minor, the submitting party confirms they are the parent or legal guardian and consents on behalf of the minor. We take special care to handle data of minors in accordance with applicable child data protection guidelines.`,
    },
    {
      icon: "🌐", title: "10. Cross-Border Data Transfer",
      body: `Your data is stored on Supabase servers which may be hosted on cloud infrastructure outside India (e.g., AWS regions). Such transfers are made under standard contractual clauses and data processing agreements ensuring equivalent data protection. We ensure that any international data transfer complies with the requirements of India's DPDP Act 2023.`,
    },
    {
      icon: "🔄", title: "11. Policy Updates",
      body: `This Data Security & Privacy Policy may be updated from time to time. Significant changes will be communicated via email and a prominent notice on the Platform. Your continued use of the Platform after notification of changes constitutes acceptance of the revised policy. The "Last Updated" date at the top of this policy reflects the most recent revision.`,
    },
    {
      icon: "📞", title: "12. Contact & Grievance Officer",
      body: `For any privacy-related queries, data access requests, or complaints:

Data Protection Officer (DPO): [Your DPO Name]
Organisation: CareerMap Engine / [Your Organisation Name]
Email: dpo@careermap.in
Phone: [Your Contact Number]
Address: [Your Registered Office Address], India

Response Time: We aim to respond to all data-related requests within 15 business days as required under the DPDP Act 2023.`,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   LEAD CAPTURE MODAL COMPONENT
═══════════════════════════════════════════════════════════════ */
const EXAM_OPTIONS = [
  "JEE Main / Advanced","NEET-UG","BITSAT","UPSC CSE (IAS/IPS)","UPPSC PCS","MPSC","MPPSC","BPSC","RPSC RAS",
  "HPSC HCS","JPSC","WBCS","KPSC KAS","TNPSC","IBPS PO","IBPS Clerk","SBI PO","RBI Grade B","JAIIB","CAIIB",
  "SSC CGL","SSC CHSL","SSC GD Constable","SSC JE","RRB NTPC","RRB JE","RRB ALP","NDA","CDS","AFCAT","UPSC CAPF",
  "UP Police","CTET","UPTET","UGC NET","KVS/NVS Teacher","NTSE","DU CUET","CLAT","CA Foundation","CUET-UG","GATE","IES/ESE","IPMAT/JIPMAT","Other",
];
const YEAR_OPTIONS = ["2025","2026","2027","2028","2029"];
const CLASS_OPTIONS = ["Class 9","Class 10","Class 11","Class 12","Graduation (1st Year)","Graduation (2nd Year)","Graduation (3rd Year / Final)","Post Graduation","Appeared / Passed Out","Working Professional"];

function LeadModal({ onClose, lang, prefillExam }) {
  const t = (en, hi) => lang === "hi" ? hi : en;
  const [form, setForm] = useState({
    name: "", mobile: "", email: "", classLevel: CLASS_OPTIONS[3],
    targetExam: prefillExam || EXAM_OPTIONS[0], targetYear: "2026", city: "", consent: false,
  });
  const [errs, setErrs] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [policyOpen, setPolicyOpen] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = t("Name is required","नाम आवश्यक है");
    if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = t("Enter valid 10-digit mobile","10 अंकों का मोबाइल नंबर दर्ज करें");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t("Enter valid email","वैध ईमेल दर्ज करें");
    if (!form.consent) e.consent = t("Please accept the Data Security Policy to continue","जारी रखने के लिए Data Security Policy स्वीकार करें");
    return e;
  }

  async function handleSubmit() {
    const e = validate();
    setErrs(e);
    if (Object.keys(e).length > 0) return;
    setStatus("loading");
    const payload = {
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      email: form.email.trim().toLowerCase(),
      class_level: form.classLevel,
      target_exam: form.targetExam,
      target_year: form.targetYear,
      city: form.city.trim() || null,
      consent: true,
      source: "eligibility_calculator",
    };
    const res = await saveLead(payload);
    setStatus(res.ok ? "success" : "error");
  }

  function F({ label, ek, children }) {
    return (
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 11, color: "#8899cc", display: "block", marginBottom: 4, fontWeight: 600 }}>{label}</label>
        {children}
        {errs[ek] && <div style={{ fontSize: 10, color: "#ff7875", marginTop: 3 }}>⚠ {errs[ek]}</div>}
      </div>
    );
  }

  return (
    <>
      {/* BACKDROP */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.75)", zIndex: 2000, backdropFilter: "blur(4px)" }} />

      {/* MODAL */}
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "min(95vw, 540px)", maxHeight: "92vh", overflowY: "auto",
        background: "#0d1323", border: "1px solid #4f6ef744", borderRadius: 20,
        zIndex: 2001, boxShadow: "0 24px 80px #00000099",
      }}>
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg,#4f6ef7,#7c3aed)", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 1 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>
              🎯 {t("Get Free Career Guidance", "निःशुल्क करियर मार्गदर्शन पाएं")}
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.8)", marginTop: 2 }}>
              {t("Expert counselors will contact you within 24 hours", "विशेषज्ञ 24 घंटे में संपर्क करेंगे")}
            </div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,.2)", border: "none", color: "#fff", width: 28, height: 28, borderRadius: "50%", cursor: "pointer", fontSize: 14, flexShrink: 0 }}>✕</button>
        </div>

        <div style={{ padding: "20px 22px 24px" }}>
          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "30px 10px" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#00d68f", marginBottom: 8 }}>{t("Thank You!", "धन्यवाद!")}</div>
              <div style={{ fontSize: 14, color: "#aab4d4", lineHeight: 1.7, marginBottom: 20 }}>
                {t("Your details have been saved successfully. Our career counselor will contact you within 24 hours on your mobile/email.", "आपकी जानकारी सफलतापूर्वक सेव हो गई है। हमारे करियर काउंसलर 24 घंटे में आपसे संपर्क करेंगे।")}
              </div>
              <div style={{ background: "#00d68f11", border: "1px solid #00d68f33", borderRadius: 12, padding: "12px 16px", fontSize: 12, color: "#00d68f", marginBottom: 16 }}>
                ✅ {t("Data saved to CareerMap database securely (Supabase).", "डेटा CareerMap डेटाबेस में सुरक्षित सेव हो गया।")}
              </div>
              <button className="btn-primary" onClick={onClose} style={{ fontSize: 13, padding: "10px 24px" }}>
                {t("Continue Exploring →", "जारी रखें →")}
              </button>
            </div>
          ) : status === "error" ? (
            <div style={{ textAlign: "center", padding: "20px 10px" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#ff7875", marginBottom: 8 }}>{t("Submission Failed", "सबमिशन विफल")}</div>
              <div style={{ fontSize: 12, color: "#aab4d4", marginBottom: 16 }}>
                {t("Could not connect to database. Please check Supabase credentials in the code (SUPABASE_URL & SUPABASE_ANON_KEY) and ensure the 'leads' table exists.", "डेटाबेस से कनेक्ट नहीं हो सका। कोड में SUPABASE_URL और SUPABASE_ANON_KEY जांचें।")}
              </div>
              <div style={{ background: "#ff4d4f11", border: "1px solid #ff4d4f33", borderRadius: 10, padding: "10px 14px", fontSize: 11, color: "#ff7875", textAlign: "left", marginBottom: 16 }}>
                <strong>Setup Steps:</strong><br/>
                1. Create project at supabase.com<br/>
                2. Run the SQL in code comments to create 'leads' table<br/>
                3. Replace SUPABASE_URL and SUPABASE_ANON with your credentials
              </div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                <button className="btn-primary" onClick={() => setStatus("idle")} style={{ fontSize: 12, padding: "8px 18px" }}>{t("Try Again", "फिर कोशिश करें")}</button>
                <button className="btn-sec" onClick={onClose} style={{ fontSize: 12, padding: "8px 18px" }}>{t("Close", "बंद करें")}</button>
              </div>
            </div>
          ) : (
            <>
              {/* Trust badges */}
              <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
                {[{ i: "🔒", l: t("Secure & Encrypted", "सुरक्षित") }, { i: "🚫", l: t("No Spam", "स्पैम नहीं") }, { i: "✅", l: t("DPDP Act Compliant", "DPDP अनुपालक") }].map(b => (
                  <div key={b.l} style={{ display: "flex", alignItems: "center", gap: 5, background: "#00d68f11", border: "1px solid #00d68f33", borderRadius: 20, padding: "3px 10px", fontSize: 10, color: "#00d68f", fontWeight: 600 }}>
                    {b.i} {b.l}
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" }}>
                <F label={`${t("Full Name","पूरा नाम")} *`} ek="name">
                  <input className={`input-field${errs.name ? " error" : ""}`} placeholder={t("Rahul Sharma", "राहुल शर्मा")}
                    value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                </F>
                <F label={`${t("Mobile Number","मोबाइल नंबर")} *`} ek="mobile">
                  <input className={`input-field${errs.mobile ? " error" : ""}`} type="tel" placeholder="9876543210" maxLength={10}
                    value={form.mobile} onChange={e => setForm(p => ({ ...p, mobile: e.target.value.replace(/\D/g, "") }))} />
                </F>
              </div>

              <F label={`${t("Email Address","ईमेल पता")} *`} ek="email">
                <input className={`input-field${errs.email ? " error" : ""}`} type="email" placeholder="rahul@email.com"
                  value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
              </F>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" }}>
                <F label={t("Current Class / Level","वर्तमान कक्षा")} ek="classLevel">
                  <select className="input-field" value={form.classLevel} onChange={e => setForm(p => ({ ...p, classLevel: e.target.value }))}>
                    {CLASS_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                </F>
                <F label={t("Target Year","लक्ष्य वर्ष")} ek="targetYear">
                  <select className="input-field" value={form.targetYear} onChange={e => setForm(p => ({ ...p, targetYear: e.target.value }))}>
                    {YEAR_OPTIONS.map(y => <option key={y}>{y}</option>)}
                  </select>
                </F>
              </div>

              <F label={t("Target Exam","लक्ष्य परीक्षा")} ek="targetExam">
                <select className="input-field" value={form.targetExam} onChange={e => setForm(p => ({ ...p, targetExam: e.target.value }))}>
                  {EXAM_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
              </F>

              <F label={t("City (optional)","शहर (वैकल्पिक)")} ek="city">
                <input className="input-field" placeholder={t("e.g. Lucknow, Delhi, Mumbai","जैसे लखनऊ, दिल्ली, मुंबई")}
                  value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} />
              </F>

              {/* Consent checkbox */}
              <div style={{ background: errs.consent ? "#ff4d4f11" : "#4f6ef708", border: `1px solid ${errs.consent ? "#ff4d4f44" : "#4f6ef722"}`, borderRadius: 10, padding: "12px 14px", marginBottom: 16 }}>
                <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer" }}>
                  <input type="checkbox" checked={form.consent} onChange={e => setForm(p => ({ ...p, consent: e.target.checked }))}
                    style={{ width: 16, height: 16, flexShrink: 0, marginTop: 2, accentColor: "#4f6ef7" }} />
                  <span style={{ fontSize: 11, color: "#aab4d4", lineHeight: 1.65, fontFamily: lang === "hi" ? "'Noto Sans Devanagari'" : "inherit" }}>
                    {t(
                      <>I agree that CareerMap Engine may use my data for mentorship, career guidance, and promotional purposes by verified and trusted sources. I have read and accept the{" "}
                        <button onClick={(e) => { e.preventDefault(); setPolicyOpen(true); }}
                          style={{ background: "none", border: "none", color: "#7c9eff", textDecoration: "underline", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit", padding: 0 }}>
                          Data Security Policy
                        </button>
                        {" "}and Terms & Conditions.</>,
                      <>मैं सहमत हूं कि CareerMap Engine मेरे डेटा का उपयोग mentorship, करियर मार्गदर्शन और प्रमोशनल उद्देश्यों के लिए verified sources के साथ कर सकता है।{" "}
                        <button onClick={(e) => { e.preventDefault(); setPolicyOpen(true); }}
                          style={{ background: "none", border: "none", color: "#7c9eff", textDecoration: "underline", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit", padding: 0 }}>
                          डेटा सुरक्षा नीति
                        </button>
                        {" "}पढ़ और स्वीकार करता/करती हूं।</>
                    )}
                  </span>
                </label>
                {errs.consent && <div style={{ fontSize: 10, color: "#ff7875", marginTop: 5 }}>⚠ {errs.consent}</div>}
              </div>

              <button className="btn-primary" onClick={handleSubmit} disabled={status === "loading"}
                style={{ width: "100%", fontSize: 14, padding: "13px", position: "relative" }}>
                {status === "loading" ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <span style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid #ffffff44", borderTopColor: "#fff", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                    {t("Saving your details…", "जानकारी सेव हो रही है…")}
                  </span>
                ) : `🚀 ${t("Get Free Career Guidance", "निःशुल्क करियर मार्गदर्शन पाएं")}`}
              </button>

              <p style={{ fontSize: 10, color: "#4f6ef7", textAlign: "center", marginTop: 10, lineHeight: 1.6 }}>
                🔒 {t("Your data is encrypted and stored securely (Supabase / PostgreSQL). We never sell your data to unverified third parties. See our", "आपका डेटा एन्क्रिप्टेड और सुरक्षित है। हम आपका डेटा किसी अनधिकृत पार्टी को नहीं बेचते। देखें")}{" "}
                <button onClick={() => setPolicyOpen(true)} style={{ background: "none", border: "none", color: "#7c9eff", textDecoration: "underline", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit", padding: 0 }}>
                  {t("Data Security Policy", "डेटा सुरक्षा नीति")}
                </button>.
              </p>
            </>
          )}
        </div>
      </div>

      {/* PRIVACY POLICY MODAL */}
      {policyOpen && <PrivacyPolicyModal onClose={() => setPolicyOpen(false)} lang={lang} />}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRIVACY POLICY MODAL COMPONENT
═══════════════════════════════════════════════════════════════ */
function PrivacyPolicyModal({ onClose, lang }) {
  const t = (en, hi) => lang === "hi" ? hi : en;
  const [activeSection, setActiveSection] = useState(0);

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.85)", zIndex: 3000, backdropFilter: "blur(6px)" }} />
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "min(96vw, 820px)", height: "88vh",
        background: "#0a0e1a", border: "1px solid #4f6ef744", borderRadius: 20,
        zIndex: 3001, boxShadow: "0 30px 100px #000000cc",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg,#1a2240,#12182d)", padding: "16px 22px", borderBottom: "1px solid #1e2a4a", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#e8ecf4" }}>🔒 {t("Data Security & Privacy Policy", "डेटा सुरक्षा और गोपनीयता नीति")}</div>
            <div style={{ fontSize: 11, color: "#4f6ef7", marginTop: 2 }}>{t(`Last Updated: ${PRIVACY_POLICY.lastUpdated}`, `अंतिम अपडेट: ${PRIVACY_POLICY.lastUpdated}`)}</div>
          </div>
          <button onClick={onClose} style={{ background: "#ff4d4f22", border: "1px solid #ff4d4f44", color: "#ff7875", width: 30, height: 30, borderRadius: "50%", cursor: "pointer", fontSize: 14, flexShrink: 0 }}>✕</button>
        </div>

        {/* DPDP Banner */}
        <div style={{ background: "linear-gradient(135deg,#00d68f11,#00d68f08)", borderBottom: "1px solid #00d68f22", padding: "8px 22px", display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 14 }}>✅</span>
          <span style={{ fontSize: 11, color: "#00d68f" }}>
            {t("This policy complies with India's Digital Personal Data Protection Act (DPDP Act), 2023 and the Information Technology Act, 2000.", "यह नीति भारत के DPDP Act 2023 और IT Act 2000 के अनुसार है।")}
          </span>
        </div>

        {/* Two-panel layout */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Sidebar nav */}
          <div style={{ width: 200, borderRight: "1px solid #1e2a4a", overflowY: "auto", padding: "10px 0", flexShrink: 0, background: "#0d1323" }}>
            {PRIVACY_POLICY.sections.map((s, i) => (
              <button key={i} onClick={() => setActiveSection(i)}
                style={{ width: "100%", background: activeSection === i ? "linear-gradient(90deg,#4f6ef722,transparent)" : "none", border: "none", borderLeft: activeSection === i ? "3px solid #4f6ef7" : "3px solid transparent", padding: "8px 14px", cursor: "pointer", textAlign: "left", fontFamily: "inherit", fontSize: 11, color: activeSection === i ? "#7c9eff" : "#8899cc", lineHeight: 1.5, transition: "all .2s" }}>
                {s.icon} {s.title.replace(/^\d+\.\s/, "").slice(0, 28)}{s.title.replace(/^\d+\.\s/, "").length > 28 ? "…" : ""}
              </button>
            ))}
          </div>

          {/* Content area */}
          <div style={{ flex: 1, overflowY: "auto", padding: "22px 24px" }}>
            {PRIVACY_POLICY.sections[activeSection] && (
              <div>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{PRIVACY_POLICY.sections[activeSection].icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#e8ecf4", marginBottom: 14 }}>{PRIVACY_POLICY.sections[activeSection].title}</h3>
                <div style={{ fontSize: 12, color: "#aab4d4", lineHeight: 1.9, whiteSpace: "pre-line" }}>{PRIVACY_POLICY.sections[activeSection].body}</div>

                {/* Navigation buttons */}
                <div style={{ display: "flex", gap: 8, marginTop: 24, paddingTop: 16, borderTop: "1px solid #1e2a4a" }}>
                  {activeSection > 0 && (
                    <button className="btn-sec" onClick={() => setActiveSection(p => p - 1)} style={{ fontSize: 11, padding: "7px 16px" }}>
                      ← {t("Previous", "पिछला")}
                    </button>
                  )}
                  {activeSection < PRIVACY_POLICY.sections.length - 1 && (
                    <button className="btn-primary" onClick={() => setActiveSection(p => p + 1)} style={{ fontSize: 11, padding: "7px 16px" }}>
                      {t("Next", "अगला")} →
                    </button>
                  )}
                  <div style={{ flex: 1 }} />
                  <span style={{ fontSize: 10, color: "#4f6ef7", alignSelf: "center" }}>{activeSection + 1} / {PRIVACY_POLICY.sections.length}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "12px 22px", borderTop: "1px solid #1e2a4a", background: "#0d1323", display: "flex", gap: 10, alignItems: "center", justifyContent: "space-between", flexShrink: 0, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, color: "#4f6ef7" }}>
            {t("For queries: dpo@careermap.in | Response within 15 business days", "प्रश्नों के लिए: dpo@careermap.in | 15 कार्यदिवस में जवाब")}
          </span>
          <button className="btn-primary" onClick={onClose} style={{ fontSize: 11, padding: "7px 18px" }}>
            ✓ {t("I Understand & Accept", "समझ गया और स्वीकार करता/करती हूं")}
          </button>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUBJECT POOLS
═══════════════════════════════════════════════════════════════ */
const SUBJECTS_12 = {
  Science: ["Physics","Chemistry","Mathematics","Biology","Computer Science","Biotechnology","Physical Education","English","Hindi","Informatics Practices"],
  Commerce: ["Accountancy","Business Studies","Economics","Mathematics","Statistics","English","Hindi","Computer Science","Physical Education"],
  Arts: ["History","Geography","Political Science","Economics","Sociology","Psychology","Philosophy","English","Hindi","Fine Arts","Home Science","Physical Education"],
};
const SUBJECTS_10 = ["Mathematics","Science","Social Science","English","Hindi","Sanskrit","Computer","Third Language"];
const GRADUATION_BRANCHES = ["B.E/B.Tech (Any)","B.E/B.Tech (Civil)","B.E/B.Tech (Electrical)","B.E/B.Tech (Mechanical)","B.E/B.Tech (Electronics)","B.E/B.Tech (CS/IT)","B.Sc (Physics)","B.Sc (Chemistry)","B.Sc (Mathematics)","B.Sc (Biology/Zoology/Botany)","B.Sc (Computer Science)","B.Com","B.Com (Hons)","B.A (Any)","B.A (History)","B.A (Geography)","B.A (Political Science)","B.A (Economics)","B.A (Hindi)","B.A (English)","LLB/BA LLB","BBA","BCA","B.Sc Agriculture","B.Pharma","MBBS","BDS","Diploma (Engineering)","Any Graduation"];
const POSTGRAD_BRANCHES = ["M.Tech","M.E","M.Sc","M.A","M.Com","MBA/PGDM","LLM","MD/MS","MCA","Any Post Graduation"];

/* ═══════════════════════════════════════════════════════════════
   CAREER PATHS DATABASE
═══════════════════════════════════════════════════════════════ */
const CAREER_DB = {
  jee_main:{icon:"⚙️",title:"Engineering Careers",paths:[{r:"Software Engineer",s:"₹6–40 LPA | TCS, Infosys, Google",e:"💻"},{r:"Data Scientist / ML Engineer",s:"₹8–50 LPA | FAANG, Startups",e:"📊"},{r:"Civil / Structural Engineer",s:"₹4–20 LPA | Govt, Infrastructure",e:"🏗️"},{r:"Mechanical Engineer",s:"₹4–18 LPA | Tata, ISRO, DRDO",e:"🔧"},{r:"Electronics / VLSI Engineer",s:"₹6–30 LPA | Qualcomm, Intel",e:"⚡"},{r:"PSU Engineer (BHEL/ONGC/NTPC)",s:"₹8–17 LPA via GATE",e:"🏭"}],pg:["M.Tech IITs/NITs via GATE","MBA IIMs via CAT","MS Abroad (GRE)","PhD Research"]},
  jee_advanced:{icon:"🏛️",title:"IIT Graduate Careers",paths:[{r:"IIT Research Scholar/PhD",s:"₹31K–54K stipend | CSIR/DST",e:"🔬"},{r:"Quantitative Analyst (Quant)",s:"₹15–80 LPA | HFTs, Trading",e:"📈"},{r:"Product Manager",s:"₹15–60 LPA | Google, Amazon",e:"🎯"},{r:"Management Consultant",s:"₹12–40 LPA | McKinsey, BCG",e:"💼"},{r:"Chip/Semiconductor Designer",s:"₹10–35 LPA | Intel, Qualcomm",e:"🔲"},{r:"Startup Founder",s:"IIT Network → VC Funding",e:"🚀"}],pg:["MBA IIM via CAT","MS/PhD MIT/Stanford","CFA for Finance","IAS/IFS via UPSC"]},
  neet_ug:{icon:"🏥",title:"Medical & Healthcare Careers",paths:[{r:"MBBS Doctor/Specialist",s:"₹8–80 LPA | Govt/Private Hospitals",e:"👨‍⚕️"},{r:"Dentist (BDS)",s:"₹5–25 LPA | Own Clinic",e:"🦷"},{r:"BAMS/Ayurveda Practitioner",s:"₹4–20 LPA | AYUSH Sector",e:"🌿"},{r:"Pharmacist",s:"₹4–18 LPA | Pharma Companies",e:"💊"},{r:"Biomedical Researcher",s:"₹5–25 LPA | ICMR, AIIMS Labs",e:"🔬"},{r:"Public Health Officer",s:"₹6–20 LPA | WHO, Govt, NGOs",e:"🌍"}],pg:["MD/MS via NEET-PG","MPH (Public Health)","USMLE for USA","PLAB for UK"]},
  bitsat:{icon:"🔬",title:"BITS Graduate Careers",paths:[{r:"Software/Full-Stack Developer",s:"₹8–40 LPA | Product Companies",e:"💻"},{r:"Chemical/Process Engineer",s:"₹5–20 LPA | ONGC, Reliance",e:"⚗️"},{r:"Electronics Design Engineer",s:"₹6–25 LPA | Samsung, Qualcomm",e:"📟"},{r:"Dual Degree Researcher",s:"Practice School → Top Research",e:"🎓"}],pg:["MS Abroad (GRE)","MBA via CAT","GATE for M.Tech","PhD at IITs/IISc"]},
  clat:{icon:"⚖️",title:"Legal Profession Careers",paths:[{r:"Advocate/Litigator",s:"₹3–50 LPA | District to Supreme Court",e:"⚖️"},{r:"Corporate Lawyer/In-House Counsel",s:"₹10–60 LPA | MNCs, Startups",e:"🏢"},{r:"Civil Servant (IAS/IPS via UPSC)",s:"₹56K–2.5L/month + perks",e:"🎖️"},{r:"Judicial Services/Judge",s:"₹1–2.5L/month | State Judiciary",e:"🔨"},{r:"IP Attorney",s:"₹8–30 LPA | Patent Firms",e:"💡"},{r:"Legal Researcher/Academic",s:"₹4–15 LPA | Law Schools, NGOs",e:"📚"}],pg:["LLM India/Abroad","Judicial Services Exam","UPSC CSE (Law Optional)","Bar Council Enrollment"]},
  ca_foundation:{icon:"💰",title:"CA/Finance Careers",paths:[{r:"Chartered Accountant (CA)",s:"₹7–80 LPA | Big 4, Own Practice",e:"📊"},{r:"Chief Financial Officer (CFO)",s:"₹20 LPA–1Cr+ | Corporates",e:"💹"},{r:"Tax Consultant/GST Practitioner",s:"₹5–25 LPA | Own CA Firm",e:"🧾"},{r:"Investment Banker",s:"₹15–80 LPA | Goldman, JPMorgan",e:"📈"},{r:"Forensic Accountant",s:"₹8–25 LPA | Big 4, CBI Advisory",e:"🔍"}],pg:["CA Final → CPA USA","CFA Charter","MBA Finance via CAT","CS after CA Foundation"]},
  cuet_ug:{icon:"🏫",title:"Central University Careers",paths:[{r:"Civil Servant (IAS/IPS/IFS)",s:"₹56K–2.5L/month via UPSC",e:"🎖️"},{r:"Economist/Policy Analyst",s:"₹6–25 LPA | RBI, Think Tanks",e:"📈"},{r:"Journalist/Media Professional",s:"₹3–20 LPA | TV, Digital, Print",e:"📰"},{r:"Social Scientist/Researcher",s:"₹4–15 LPA | Academia, NGOs",e:"🔬"},{r:"Management Trainee",s:"₹5–15 LPA | Corporates",e:"💼"}],pg:["MA/M.Sc via CUET-PG","MBA via CAT/XAT","UPSC Civil Services","Abroad (GRE/IELTS)"]},
  ipmat:{icon:"📊",title:"IIM Integrated MBA Careers",paths:[{r:"Management Consultant",s:"₹15–60 LPA | MBB, Big 4",e:"💼"},{r:"Investment Banker",s:"₹15–80 LPA | Goldman, Kotak IB",e:"💰"},{r:"Startup Founder/Entrepreneur",s:"IIM Brand → VC Network",e:"🚀"},{r:"Brand Manager (FMCG)",s:"₹10–25 LPA | HUL, P&G, ITC",e:"🎯"},{r:"Product Manager",s:"₹12–40 LPA | Amazon, Flipkart",e:"📱"}],pg:["IIM Exchange Programs Abroad","CFA for Finance","Join Startup Ecosystem","MBA at Top B-School"]},
  gate:{icon:"🔧",title:"GATE Qualified Careers",paths:[{r:"PSU Engineer (BHEL/ONGC/NTPC/IOCL)",s:"₹8–17 LPA + DA + Perks",e:"🏭"},{r:"M.Tech at IIT/NIT",s:"₹12.5K/month GATE Stipend",e:"🎓"},{r:"Scientist B (DRDO/ISRO/BARC)",s:"₹9–15 LPA + Govt Perks",e:"🛸"},{r:"Assistant Professor (after PhD)",s:"₹10–18 LPA | AICTE Funded",e:"👨‍🏫"},{r:"IES/ESE Officer via UPSC",s:"₹9–12 LPA + Perks | Class-1",e:"🎖️"}],pg:["M.Tech IIT via GATE","PhD at IISc/IIT","MS Abroad after M.Tech","PSU Jobs via GATE Score"]},
  ssc_je:{icon:"🏗️",title:"SSC JE Govt Engineer Careers",paths:[{r:"Junior Engineer (Civil/Elec/Mech)",s:"₹35,400–1,12,400/month Level 6",e:"🏗️"},{r:"Sub-Divisional Engineer (Promotion)",s:"₹56K–1.77L/month",e:"🔑"},{r:"State PWD/Irrigation Engineer",s:"₹35–70K/month | State Govt",e:"🌊"},{r:"CPWD/BRO Engineer",s:"₹35,400+ | Central Govt",e:"🛣️"}],pg:["GATE for PSU/M.Tech","Departmental Promotion Exams","IES after Experience","State AE/Executive Engineer Exam"]},
  ies:{icon:"🎖️",title:"IES Officer Careers",paths:[{r:"IES Officer (Class-1 Gazetted)",s:"₹56,100–1,77,500/month + DA",e:"🎖️"},{r:"Executive Engineer (Promotion)",s:"₹67,700+ | Ministry postings",e:"🏛️"},{r:"Joint Secretary/Secretary level",s:"Ministry of Railways, PWD, MES",e:"🇮🇳"},{r:"Technical Consultant (Post-retirement)",s:"₹5–20 LPA | Govt/Pvt",e:"💡"}],pg:["UPSC CSE (IAS with Engg background)","World Bank/ADB Technical Roles","IIT/IISc Executive Programs"]},
  nda:{icon:"🪖",title:"NDA / Armed Forces Careers",paths:[{r:"Army Officer (Lt → General)",s:"₹56K–2.5L/month + Promotions",e:"🪖"},{r:"Naval Officer",s:"₹56K–2.5L/month | Ships/Submarines",e:"⚓"},{r:"IAF Pilot/Flying Officer",s:"₹56K–2.5L/month + Flying Allowance",e:"✈️"},{r:"Military Intelligence Officer",s:"Classified | Strategic Roles",e:"🕵️"},{r:"Ex-Serviceman → Govt/PSU Jobs",s:"₹5–20 LPA | Preference in Hiring",e:"🏅"}],pg:["Defence Services Staff College","IIM Executive (post-retirement)","UPSC CDS","IIT Tech Program for Army Engineers"]},
  cds:{icon:"⭐",title:"CDS Defence Careers",paths:[{r:"IMA → Army Officer",s:"₹56K+ | Lt to General track",e:"🎖️"},{r:"Naval Academy → Naval Officer",s:"₹56K+ | Executive/Tech",e:"⚓"},{r:"Air Force Academy → Flying Officer",s:"₹56K+ + Flight Pay",e:"✈️"},{r:"OTA → Short Service Commission",s:"₹56K+ | 10–14 year commission",e:"🏅"}],pg:["Defence Services Staff College","IIM/ISB Executive MBA","UPSC Civil Services","Diplomatic/Foreign Service"]},
  afcat:{icon:"✈️",title:"AFCAT / IAF Careers",paths:[{r:"Flying Branch – Fighter/Transport Pilot",s:"₹56K–2.5L/month + Flying Allowance",e:"🛩️"},{r:"Technical Branch – Aeronautical Engineer",s:"₹56K+ | Aircraft Maintenance",e:"🔧"},{r:"Ground Duty – Admin/Logistics",s:"₹56K+ | Supply Chain, Admin",e:"📋"},{r:"Education Branch – IAF Professor",s:"₹56K+ | Training IAF Cadets",e:"📚"}],pg:["Defence Services Staff College","IIT Aerospace for Ex-Officers","Airline Pilot via CPL Conversion","UPSC CSE with IAF background"]},
  ssc_gd:{icon:"👮",title:"SSC GD / Paramilitary Careers",paths:[{r:"Constable GD → Head Constable → ASI",s:"₹21,700–69,100/month",e:"👮"},{r:"CRPF/BSF/CISF/ITBP Constable",s:"₹21K+ + CGHS + Allowances",e:"🛡️"},{r:"Border Force (ITBP/SSB)",s:"₹21K+ | Border Security Postings",e:"⛰️"},{r:"Sub-Inspector via Dept. Exam",s:"₹35,400+ after Departmental Exam",e:"🎯"}],pg:["Sub-Inspector via SSC CPO","Graduation via IGNOU","UPSC CAPF (AC) after Graduation","State Police SI Exam"]},
  up_police:{icon:"🚔",title:"UP Police Careers",paths:[{r:"Constable → ASI → SI → Inspector",s:"₹21,700–69,100/month UP Pay Matrix",e:"🚔"},{r:"Sub-Inspector (UP Police SI)",s:"₹35,400–1,12,400/month",e:"🔍"},{r:"Commissionerate/District Force",s:"75 Districts of Uttar Pradesh",e:"🏙️"},{r:"IPS Officer via UPSC (long-term)",s:"₹56K–2.5L/month | SP → DGP",e:"🌟"}],pg:["Graduation via IGNOU while in service","UPSC CAPF (AC)","UP PCS for Civil Services","SSC CPO for Central Police"]},
  upsc_cse:{icon:"🇮🇳",title:"IAS/IPS/IFS Careers",paths:[{r:"IAS – District Collector/DM",s:"₹56,100–2,50,000/month + Perks",e:"🏛️"},{r:"IPS – Superintendent of Police (SP)",s:"₹56,100–2,25,000/month",e:"👮"},{r:"IFS – Indian Foreign Service Officer",s:"₹56,100+ | Diplomatic postings",e:"🌍"},{r:"IRS – Revenue Service Officer",s:"₹56,100+ | Income Tax, Customs",e:"💼"},{r:"IFS – Indian Forest Service",s:"₹56,100+ | Environment/Forests",e:"🌳"}],pg:["UPSC optional subject mastery","State PCS for quick entry","Management programs post-service","International organizations (UN, World Bank)"]},
  uppsc:{icon:"🏛️",title:"UP State Services Careers",paths:[{r:"SDM / Deputy Collector",s:"₹56,100–1,77,500/month UP Pay",e:"🏛️"},{r:"DSP – Deputy Superintendent of Police",s:"₹56,100+ | Law Enforcement",e:"👮"},{r:"Block Development Officer (BDO)",s:"₹44,900+ | Rural Development",e:"🌾"},{r:"UP Naib Tehsildar",s:"₹35,400–1,12,400/month",e:"📋"},{r:"UP State Services Group-B/C",s:"₹19,900+ Various Depts",e:"📁"}],pg:["UPSC CSE for IAS","State Service Training","IGNOU programs in service","Leadership & Management Training"]},
  ssc_cgl:{icon:"📋",title:"SSC CGL Careers",paths:[{r:"Income Tax Inspector (ITI)",s:"₹44,900–1,42,400/month Level 7",e:"🧾"},{r:"Audit Officer/Accounts Officer",s:"₹44,900+ | CAG, CGDA",e:"📊"},{r:"Assistant Section Officer (MEA/MHA)",s:"₹35,400–1,12,400/month Level 6",e:"🏢"},{r:"Sub Inspector (CBI/NIA)",s:"₹35,400+ | Investigation",e:"🔍"},{r:"Statistical Investigator Gr-II",s:"₹44,900+ | Ministry of Statistics",e:"📈"},{r:"Tax Assistant",s:"₹25,500+ | CBDT/CBEC",e:"💰"}],pg:["SSC CGL post promotion to SO","Departmental exams for Gazetted","UPSC CSE (SSC experience helps)","MBA via CAT while in service"]},
  ssc_chsl:{icon:"📝",title:"SSC CHSL Careers",paths:[{r:"Lower Division Clerk (LDC)",s:"₹19,900–63,200/month Level 2",e:"📝"},{r:"Data Entry Operator (DEO)",s:"₹25,500+ Level 4 | Ministries",e:"💻"},{r:"Postal Assistant/Sorting Assistant",s:"₹25,500+ | India Post",e:"📮"},{r:"Court Clerk/Junior Secretariat Asst",s:"₹19,900+ | Govt Depts",e:"⚖️"}],pg:["SSC CGL for promotion","UPSC CSE preparation","Graduation via IGNOU","Bank Clerk/PO exams"]},
  ibps_po:{icon:"🏦",title:"Bank PO/Manager Careers",paths:[{r:"Probationary Officer (PO) → Manager",s:"₹23,700–42,000/month + Allowances",e:"🏦"},{r:"Branch Manager (Promotion)",s:"₹36,000+ | Scale II/III",e:"🌿"},{r:"Relationship Manager/SME Banker",s:"₹5–15 LPA | Retail/Corporate Banking",e:"🤝"},{r:"Credit Analyst/Loan Officer",s:"₹5–12 LPA | Risk Assessment",e:"📊"},{r:"Regional Manager/Zonal Head",s:"₹10–25 LPA | Top Management",e:"🌐"}],pg:["JAIIB/CAIIB for promotion","MBA Finance while in service","CFA for Investment Banking","RBI Grade B for apex bank role"]},
  ibps_clerk:{icon:"🏧",title:"Bank Clerk Careers",paths:[{r:"Bank Clerk → Senior Clerk → Head Cashier",s:"₹11,765–31,540/month + Allowances",e:"🏧"},{r:"Clerk to Officer (Internal Exam)",s:"₹23,700+ after JAIIB + Internal",e:"📈"},{r:"Back Office Operations",s:"NEFT/RTGS/Loan Processing",e:"💳"},{r:"Customer Service Executive",s:"Branch Front Desk, Query Resolution",e:"🤝"}],pg:["JAIIB for promotion","IBPS PO attempt","SSC CGL while in service","Graduation via IGNOU"]},
  jaiib:{icon:"📗",title:"JAIIB Certified Banker Careers",paths:[{r:"Bank Officer (Junior/Middle Management)",s:"Scale I-II → Scale III promotion",e:"📗"},{r:"Compliance Officer",s:"₹6–15 LPA | Regulatory Compliance",e:"🔏"},{r:"Treasury Operations Officer",s:"₹8–20 LPA | Forex, Bonds",e:"💱"},{r:"MSME/Credit Officer",s:"₹5–12 LPA | SME Lending",e:"🏭"}],pg:["CAIIB after JAIIB","CFA/FRM for Finance","MBA Finance while in service","RBI Grade B Exam"]},
  caiib:{icon:"📘",title:"CAIIB Senior Banker Careers",paths:[{r:"Scale III/IV Manager",s:"₹42,000–63,840/month | Senior Scale",e:"📘"},{r:"Chief Manager/AGM (Promotion)",s:"₹63,840+ | Apex Management",e:"🏦"},{r:"Risk Management Officer",s:"₹10–25 LPA | Basel III Compliance",e:"⚠️"},{r:"International Banking Officer",s:"₹12–30 LPA | Trade Finance, FOREX",e:"🌐"}],pg:["DIB/DEFS from IIBF","FRM/PRM Certifications","CFA for Investment roles","Executive MBA from NIBM/ISB"]},
  rbi_grade_b:{icon:"🏛️",title:"RBI Officer Careers",paths:[{r:"Grade B Officer → DGM → GM",s:"₹35,150–1,17,500/month + HRA",e:"🏛️"},{r:"Department of Regulation Officer",s:"Policy making, Bank Supervision",e:"📋"},{r:"Economic Research Officer",s:"₹35,150+ | Monetary Policy Research",e:"📊"},{r:"Forex/Treasury Officer",s:"Reserve Management, FOREX",e:"💱"},{r:"IT/Fintech Officer",s:"₹35,150+ | Digital Banking Infra",e:"💻"}],pg:["PhD Economics/Finance","CFA/FRM for Finance specialization","IMF/World Bank posts post-retirement","NIBM/IIM Executive Programs"]},
  rrb_ntpc:{icon:"🚉",title:"Railway NTPC Careers",paths:[{r:"Station Master → Area Manager",s:"₹35,400–1,12,400/month Level 6",e:"🚉"},{r:"Goods Guard → Chief Guard",s:"₹29,200–92,300/month Level 5",e:"🚂"},{r:"Junior Account Assistant",s:"₹25,500+ | Finance Dept",e:"💼"},{r:"Traffic Assistant/Sr. Clerk",s:"₹25,500–29,200/month Level 4",e:"📋"},{r:"Commercial Apprentice",s:"₹35,400+ | Customer/Revenue",e:"🎫"}],pg:["GATE for RRB JE posts","Promotion to Gazetted Officer","UPSC for IRS (Indian Railway Service)","Departmental LDCE exams"]},
  rrb_je:{icon:"🔩",title:"Railway JE Engineer Careers",paths:[{r:"Junior Engineer → Senior Section Engineer",s:"₹35,400–1,12,400/month Level 6",e:"🔩"},{r:"Section Engineer → Sr. Section Engineer",s:"₹44,900+ Level 7 Promotion",e:"🛠️"},{r:"Jr. Engineer IT (NIT posts)",s:"₹35,400+ | IT Infrastructure",e:"💻"},{r:"Drawing & Design Engineer",s:"₹35,400+ | CAD, Civil/Mech Design",e:"📐"}],pg:["GATE for promotion/PSU","Departmental LDCE exam for SE","IES exam (after experience)","SSC JE for transfer to other depts"]},
  rrb_alp:{icon:"🚆",title:"Railway ALP/Technician Careers",paths:[{r:"Assistant Loco Pilot → Loco Pilot",s:"₹19,900–35,400/month Level 2–6",e:"🚆"},{r:"Loco Pilot Goods → Mail/Express",s:"₹35,400–1,12,400/month | Promotion",e:"🚄"},{r:"Technician → Senior Technician",s:"₹19,900–29,200/month Level 2–4",e:"🔧"},{r:"Junior Engineer via LDCE",s:"₹35,400+ | Dept. Limited Exam",e:"📈"}],pg:["LDCE for JE post","GATE while in service","Dept. exams for promotion","Technical certifications"]},
  upsc_capf:{icon:"🛡️",title:"CAPF AC / Paramilitary Careers",paths:[{r:"Assistant Commandant (AC) → DIG → DG",s:"₹56,100–2,25,000/month",e:"🛡️"},{r:"BSF/CRPF/CISF/ITBP/SSB Officer",s:"₹56,100+ | Command & Admin",e:"⚔️"},{r:"NSG/SPG Officer (later posting)",s:"Special Force roles | Merit based",e:"🦅"},{r:"Anti-Terrorism/Intelligence Ops",s:"IB/RAW deputation (later stage)",e:"🕵️"}],pg:["IPS via UPSC CSE","NPA Hyderabad Training","UPSC ESE if technical","Staff College, Wellington"]},
  mpsc:{icon:"🏛️",title:"Maharashtra State Services Careers",paths:[{r:"Deputy Collector/SDO",s:"₹56,100+ | Revenue Admin",e:"🏛️"},{r:"DSP – Deputy Superintendent of Police",s:"₹56,100+ | Maharashtra Police",e:"👮"},{r:"Assistant Commissioner of Sales Tax",s:"₹44,900+ | Finance Dept",e:"💰"},{r:"Tehsildar/Naib Tehsildar",s:"₹35,400+ | Revenue Work",e:"📋"}],pg:["UPSC CSE for IAS","Maharashtra IAS Training","Government Management Programs"]},
  mppsc:{icon:"🏛️",title:"MP State Services Careers",paths:[{r:"DSP / Deputy Collector",s:"₹56,100+ | MP Pay Matrix",e:"🏛️"},{r:"Commercial Tax Officer",s:"₹44,900+ | GST/VAT Dept",e:"💰"},{r:"Assistant District Prosecution Officer",s:"₹35,400+ | Law Dept",e:"⚖️"},{r:"MP Naib Tehsildar",s:"₹35,400+ | Revenue",e:"📋"}],pg:["UPSC CSE for IAS","MP Public Service Training","IGNOU programs in service"]},
  bpsc:{icon:"🏛️",title:"Bihar State Services Careers",paths:[{r:"Bihar Administrative Services (BAS)",s:"₹56,100+ | Bihar Pay Matrix",e:"🏛️"},{r:"DSP Bihar Police",s:"₹56,100+ | Law Enforcement",e:"👮"},{r:"Bihar Finance Service Officer",s:"₹44,900+ | Treasury/Finance",e:"💰"},{r:"Divisional Commissioner (long-term)",s:"₹1,44,200+ | IAS level",e:"🎖️"}],pg:["UPSC CSE for IAS","Bihar Institute of Public Administration","Management programs in service"]},
  rpsc:{icon:"🏛️",title:"Rajasthan State Services Careers",paths:[{r:"RAS Officer (Rajasthan Admin Service)",s:"₹56,100+ | Rajasthan Pay Matrix",e:"🏛️"},{r:"Circle Inspector (Revenue)",s:"₹44,900+",e:"🔍"},{r:"Sub-Inspector Rajasthan Police",s:"₹35,400+",e:"👮"},{r:"Tehsildar",s:"₹35,400+ | Revenue Department",e:"📋"}],pg:["UPSC CSE for IAS","RIPA Training Programs","Rajasthan IAS Study Group"]},
  ctet:{icon:"📚",title:"Teaching / Education Careers",paths:[{r:"Primary Teacher (TGT/PRT)",s:"₹35,400–1,12,400/month Govt Schools",e:"📚"},{r:"Post Graduate Teacher (PGT)",s:"₹44,900–1,42,400/month | Govt",e:"🎓"},{r:"KVS/NVS Teacher",s:"₹44,900+ | Central School Teaching",e:"🏫"},{r:"State Board Teacher",s:"₹35,400+ | State Recruitment",e:"👨‍🏫"},{r:"Education Officer/Inspector",s:"₹44,900+ | Dept. Exam",e:"📊"}],pg:["M.Ed for Education Research","UGC NET for Asst. Professor","Ph.D in Education","CBSE curriculum development"]},
  ugc_net:{icon:"🔬",title:"UGC NET / Assistant Professor Careers",paths:[{r:"Assistant Professor (Govt College)",s:"₹57,700–98,900/month Level 10",e:"👨‍🏫"},{r:"Associate Professor",s:"₹1,31,400+ Level 12 | With PhD",e:"📚"},{r:"JRF → PhD Scholar",s:"₹31,000–35,000/month Stipend",e:"🔬"},{r:"Research Scientist",s:"₹8–20 LPA | CSIR, DST Labs",e:"🧪"},{r:"Academic Consultant/Policy Advisor",s:"₹6–20 LPA | NGOs, Think Tanks",e:"🌍"}],pg:["PhD at Central University/IIT","Post-Doctoral Research","Abroad Fellowship (Fulbright/DAAD)","Science Policy Government roles"]},
  du_entrance:{icon:"🏫",title:"Delhi University Graduate Careers",paths:[{r:"Civil Services via UPSC",s:"DU + coaching → IAS/IPS/IFS",e:"🎖️"},{r:"Corporate/MNC Professional",s:"₹5–25 LPA | After DU + MBA/Law",e:"💼"},{r:"Journalist/Media",s:"₹3–15 LPA | Print, TV, Digital",e:"📰"},{r:"Academic Researcher",s:"₹4–15 LPA | Academia, Think Tanks",e:"🔬"}],pg:["MA/M.Sc at DU/JNU","MBA via CAT","LLM for Law","UPSC CSE optional subjects"]},
  jipmat:{icon:"📊",title:"JIPMAT / IIM Junior Careers",paths:[{r:"Management Trainee → Manager",s:"₹8–25 LPA | Corporates after IIM",e:"💼"},{r:"Business Analyst",s:"₹6–18 LPA | Consulting, IT",e:"📊"},{r:"Operations Manager",s:"₹8–20 LPA | FMCG, Logistics",e:"⚙️"},{r:"Entrepreneur",s:"IIM Brand → Fundraising ease",e:"🚀"}],pg:["IIM PGP (MBA)","Exchange Programs Abroad","CFA for Finance specialization"]},
  kvs_prt:{icon:"🏫",title:"KVS/NVS Teacher Careers",paths:[{r:"Primary Teacher (PRT)",s:"₹35,400–1,12,400/month",e:"📚"},{r:"Trained Graduate Teacher (TGT)",s:"₹44,900–1,42,400/month",e:"🎓"},{r:"Post Graduate Teacher (PGT)",s:"₹47,600–1,51,100/month",e:"👨‍🏫"},{r:"Vice Principal → Principal",s:"₹78,800+ Level 12 | Promotion",e:"🏫"}],pg:["M.Ed for specialization","UGC NET for promotion","Ph.D in Education","Administrative exam for Principal"]},
};

/* ═══════════════════════════════════════════════════════════════
   SMART IMPROVEMENT RECOMMENDATIONS
═══════════════════════════════════════════════════════════════ */
const IMPROVEMENT = {
  low_marks_12:{
    title:"📈 Improve Your 12th Marks – Official Options",
    titleHi:"📈 12वीं अंक सुधार – आधिकारिक विकल्प",
    recs:[
      {icon:"🔁",label:"CBSE Improvement Exam",labelHi:"CBSE सुधार परीक्षा",desc:"CBSE allows improvement in all 5 subjects in the next year's board exam. Better marks replace old marks. Apply through cbse.gov.in during October–November.",link:"https://cbse.gov.in",tags:["CBSE","Class 12","Free"]},
      {icon:"🌐",label:"NIOS (National Institute of Open Schooling)",labelHi:"NIOS से 12वीं सुधार",desc:"NIOS conducts exams in April and October/November. You can appear as a fresh candidate or for improvement. Accepted by all universities and entrance exams including NTA.",link:"https://nios.ac.in",tags:["All Boards","Flexible","5 Attempts/Year"]},
      {icon:"📖",label:"State Open School (e.g. UP Rajarshi Tandon / MPSOS)",labelHi:"राज्य मुक्त विद्यालय",desc:"Each state has its own open school: UP – UPMSP Open, MP – MPSOS, Bihar – BSEB Improvement. Flexible exam dates, widely accepted.",link:"https://upmsp.edu.in",tags:["State Board","UP","MP","Bihar"]},
      {icon:"📝",label:"Compartment Exam (CBSE/State Board)",labelHi:"कम्पार्टमेंट परीक्षा",desc:"If failed in 1–2 subjects, appear in Compartment Exam within same academic year. Conducted July–August.",link:"https://cbse.gov.in",tags:["CBSE","State Board","Same Year"]},
      {icon:"🎓",label:"Private Candidate (Any Board)",labelHi:"प्राइवेट कैंडिडेट",desc:"Re-appear in Class 12 as private candidate in CBSE or State Board. Scores are valid for all entrance exams (NEET, JEE, CUET).",link:"https://cbse.gov.in",tags:["All India","Re-appear"]},
    ],
  },
  missing_subjects:{
    title:"📚 How to Add Missing Subjects – Official Routes",
    titleHi:"📚 जरूरी विषय जोड़ें – आधिकारिक तरीके",
    recs:[
      {icon:"🌐",label:"NIOS – Add Subject as Additional",labelHi:"NIOS से अतिरिक्त विषय",desc:"NIOS allows adding Physics, Chemistry, Math, Biology as additional/6th subject alongside your regular board. Perfect for Arts/Commerce students wanting NEET/JEE. Apply at nios.ac.in.",link:"https://nios.ac.in",tags:["NIOS","Extra Subject","All India"]},
      {icon:"📖",label:"CBSE – 6th Subject Addition",labelHi:"CBSE में 6वां विषय",desc:"CBSE students can appear in an additional 6th subject in the improvement exam. Helps fulfil mandatory subject requirements for entrance exams.",link:"https://cbse.gov.in",tags:["CBSE","6th Subject"]},
      {icon:"🎓",label:"Bridge Course via NIOS + Coaching",labelHi:"ब्रिज कोर्स",desc:"Join private coaching for the missing subject and appear via NIOS in the next cycle. Many students use this to add Biology after 12th Commerce for NEET.",link:"https://nios.ac.in/admission.aspx",tags:["NIOS","Bridge Course","Flexible"]},
    ],
  },
  low_marks_grad:{
    title:"🎓 Improve Graduation Marks – Options",
    titleHi:"🎓 स्नातक अंक सुधारें – विकल्प",
    recs:[
      {icon:"🔁",label:"Re-appear in Back Paper / Improvement Exam",labelHi:"बैक पेपर / सुधार परीक्षा",desc:"Most universities allow improvement in individual subjects. Contact your university examination department.",link:"https://ugc.ac.in",tags:["University","Back Paper"]},
      {icon:"📚",label:"IGNOU Distance Graduation",labelHi:"IGNOU दूरस्थ स्नातक",desc:"If your original college marks are low, an IGNOU PG Diploma or supplementary degree can strengthen your profile.",link:"https://ignou.ac.in",tags:["IGNOU","Distance","Flexible"]},
      {icon:"🌐",label:"Additional Certification Courses",labelHi:"अतिरिक्त सर्टिफिकेट कोर्स",desc:"NPTEL, Coursera, SWAYAM certifications can supplement lower graduation marks for software/banking exams.",link:"https://swayam.gov.in",tags:["NPTEL","SWAYAM","Online"]},
    ],
  },
  age_issue:{
    title:"⏳ Age Limit Crossed – What To Do",
    titleHi:"⏳ आयु सीमा पार – क्या करें",
    recs:[
      {icon:"📅",label:"Check SC/ST/OBC Age Relaxation",labelHi:"SC/ST/OBC आयु छूट जांचें",desc:"Most exams give 3–5 years age relaxation for OBC and 5 years for SC/ST. Verify your category certificate.",link:"",tags:["SC/ST","OBC","Age Relaxation"]},
      {icon:"🎓",label:"Explore Exams with Higher Age Limits",labelHi:"उच्च आयु सीमा वाली परीक्षाएं",desc:"UPSC CDS (25 yrs), AFCAT (26), Territorial Army (42), SSC CGL (32), IBPS PO (30), State PCS (40+). Explore alternatives.",link:"https://upsc.gov.in",tags:["Alternative","Higher Age Limit"]},
      {icon:"🔄",label:"Wait for Next Notification Cycle",labelHi:"अगली अधिसूचना का इंतजार",desc:"Most major exams (SSC, IBPS, Railways) release notifications twice a year. Plan for the next cycle.",link:"",tags:["Planning","Next Cycle"]},
      {icon:"📖",label:"Age Relaxation for Ex-Servicemen",labelHi:"भूतपूर्व सैनिक के लिए छूट",desc:"Ex-servicemen get 3–5 years additional age relaxation in most Central Govt jobs.",link:"https://sainikwelfare.gov.in",tags:["Ex-Servicemen","Relaxation"]},
    ],
  },
  physical_issue:{
    title:"💪 Physical Standards – Official Guidance",
    titleHi:"💪 शारीरिक मानक – क्या करें",
    recs:[
      {icon:"🏃",label:"Height Increase (Before Age 21)",labelHi:"ऊंचाई बढ़ाएं (21 से पहले)",desc:"Stretching exercises, Yoga (Tadasana), swimming, proper protein diet, 8 hrs sleep. Consult orthopaedic. Growth plates active till ~21.",link:"",tags:["Health","Growth","Yoga"]},
      {icon:"🥊",label:"Chest Expansion Training",labelHi:"सीना विस्तार प्रशिक्षण",desc:"3–6 months of swimming, push-ups, chest press, pranayama can increase chest expansion by 3–5 cm.",link:"",tags:["Physical","Fitness","Training"]},
      {icon:"👓",label:"Vision – LASIK Correction",labelHi:"LASIK दृष्टि सुधार",desc:"LASIK is accepted for most defence posts (check specific exam). Allowed after 18 yrs. Success rate 95%+. Consult eye specialist.",link:"",tags:["Vision","LASIK","Defence"]},
      {icon:"🔄",label:"Alternative Roles with Relaxed Criteria",labelHi:"वैकल्पिक भूमिकाएं",desc:"NCC 'C' Certificate holders get direct entry in defence with relaxed criteria. Consider Intelligence Corps, EME, Supply/Service branches.",link:"https://ncc.gov.in",tags:["NCC","Alternative","Defence"]},
      {icon:"🏆",label:"Sports Quota Relaxation",labelHi:"खेल कोटा छूट",desc:"Outstanding sportspersons get physical standard relaxations in many Govt and Defence exams.",link:"https://yas.nic.in",tags:["Sports","Quota","Relaxation"]},
    ],
  },
  graduation_needed:{
    title:"🎓 Graduation Required – Fast Track Options",
    titleHi:"🎓 स्नातक आवश्यक – तेज़ विकल्प",
    recs:[
      {icon:"🌐",label:"IGNOU Distance Education (3-Year Graduation)",labelHi:"IGNOU से स्नातक",desc:"IGNOU offers BA/B.Com/B.Sc via distance mode. UGC recognized, widely accepted for Govt exams. Enroll at ignou.ac.in.",link:"https://ignou.ac.in",tags:["IGNOU","Distance","3 Years"]},
      {icon:"📖",label:"NIOS Open Distance Learning",labelHi:"NIOS से स्नातक",desc:"NIOS offers vocational and higher education programs alongside Class 12 completion.",link:"https://nios.ac.in",tags:["NIOS","Open Learning"]},
      {icon:"💻",label:"SOL Delhi University (Distance)",labelHi:"दिल्ली विश्वविद्यालय SOL",desc:"DU School of Open Learning offers BA/B.Com programs. DU brand + affordable fees.",link:"https://sol.du.ac.in",tags:["DU","Distance","BA/B.Com"]},
      {icon:"🎓",label:"YCMOU / State Open Universities",labelHi:"राज्य मुक्त विश्वविद्यालय",desc:"YCMOU (Maharashtra), VMOU (Rajasthan), BRAOU (AP), MPBOU (MP) offer affordable distance graduation.",link:"https://ugc.ac.in",tags:["State Open Univ","Distance"]},
    ],
  },
};

/* ═══════════════════════════════════════════════════════════════
   MASTER EXAMS DATABASE  (55+ exams, 12 categories)
═══════════════════════════════════════════════════════════════ */
const EXAMS = [
  // ─── MEDICAL & ENGINEERING ──────────────────────────────────
  {id:"jee_main",name:"JEE Main 2026",nameHi:"जेईई मेन 2026",cat:"medical_engg",logo:"⚙️",badge:"NTA 2026",by:"NTA",site:"https://jeemain.nta.ac.in",
   el:{qualLevel:["12"],streams:["Science"],mandatorySubjects:["Physics","Chemistry","Mathematics"],minSubMarks:{Physics:50,Chemistry:50,Mathematics:50},minMarks:75,minMarksCat:{OBC:65,SC:65,ST:65},maxAge:null,note:"PCM mandatory. 75% aggregate (65% SC/ST/OBC). Max 3 attempts. Pass yr 2024/2025/2026."},
   desc:"Engineering entrance for NITs, IIITs, CFTIs.",descHi:"NITs, IIITs के लिए इंजीनियरिंग प्रवेश।",
   batches:[{n:"PW JEE",url:"https://pw.live/courses/jee",p:"PW"},{n:"Aakash JEE",url:"https://www.aakash.ac.in/jee-coaching",p:"Aakash"},{n:"Allen JEE",url:"https://www.allen.ac.in/jee-coaching",p:"Allen"}],
   alts:["WBJEE","MHT-CET","COMEDK","CUET-UG","B.Voc Programs"]},

  {id:"jee_advanced",name:"JEE Advanced 2026",nameHi:"जेईई एडवांस्ड 2026",cat:"medical_engg",logo:"🏛️",badge:"IIT Entrance",by:"IIT Delhi (2026)",site:"https://jeeadv.ac.in",
   el:{qualLevel:["12"],streams:["Science"],mandatorySubjects:["Physics","Chemistry","Mathematics"],minSubMarks:{Physics:50,Chemistry:50,Mathematics:50},minMarks:75,minMarksCat:{SC:65,ST:65,OBC:65},maxAge:null,note:"Must qualify JEE Main (top 2.5L). Max 2 attempts. Only 2025/2026 pass years."},
   desc:"IIT entrance. Qualify JEE Main first.",descHi:"IIT प्रवेश। JEE Main क्वालीफाई करें।",
   batches:[{n:"PW Advanced",url:"https://pw.live/courses/jee-advanced",p:"PW"},{n:"Aakash IIT-JEE",url:"https://www.aakash.ac.in/iit-jee-coaching",p:"Aakash"},{n:"Allen Advanced",url:"https://www.allen.ac.in/advanced-coaching",p:"Allen"}],
   alts:["BITSAT","NITs via JEE Main","IIIT Programs","DAIICT"]},

  {id:"neet_ug",name:"NEET-UG 2026",nameHi:"नीट-यूजी 2026",cat:"medical_engg",logo:"🏥",badge:"NTA 2026",by:"NTA",site:"https://neet.nta.nic.in",
   el:{minAge:17,maxAge:25,maxAgeCat:{OBC:28,SC:30,ST:30},qualLevel:["12"],streams:["Science"],mandatorySubjects:["Physics","Chemistry","Biology"],minSubMarks:{Physics:50,Chemistry:50,Biology:50},minMarks:50,minMarksCat:{SC:40,ST:40},note:"Biology/Biotechnology mandatory. Age 17+ on Dec 31. No upper age limit per SC HC order (verify officially)."},
   desc:"MBBS, BDS, BAMS, BHMS entrance.",descHi:"MBBS, BDS, BAMS प्रवेश परीक्षा।",
   batches:[{n:"PW NEET",url:"https://pw.live/courses/neet",p:"PW"},{n:"Aakash Medical",url:"https://www.aakash.ac.in/neet-coaching",p:"Aakash"},{n:"Allen Medical",url:"https://www.allen.ac.in/neet-coaching",p:"Allen"}],
   alts:["BPharm","Paramedical Courses","B.Sc Nursing","JIPMER Allied Health"]},

  {id:"bitsat",name:"BITSAT 2026",nameHi:"बिटसैट 2026",cat:"medical_engg",logo:"🔬",badge:"BITS Pilani",by:"BITS Pilani",site:"https://bitsadmission.com",
   el:{qualLevel:["12"],streams:["Science"],mandatorySubjects:["Physics","Chemistry","Mathematics"],minSubMarks:{Physics:60,Chemistry:60,Mathematics:60},minMarks:75,note:"PCM with 75% aggregate and 60% in each subject individually."},
   desc:"BITS Pilani, Goa, Hyderabad entrance.",descHi:"BITS पिलानी, गोवा, हैदराबाद प्रवेश।",
   batches:[{n:"PW BITSAT",url:"https://pw.live/courses/bitsat",p:"PW"},{n:"Allen BITSAT",url:"https://www.allen.ac.in/bitsat-coaching",p:"Allen"}],
   alts:["JEE Main","VITEEE","SRMJEEE","Manipal MET"]},

  // ─── PROFESSIONAL ────────────────────────────────────────────
  {id:"clat",name:"CLAT 2026",nameHi:"क्लैट 2026",cat:"professional",logo:"⚖️",badge:"NLU Law",by:"Consortium of NLUs",site:"https://consortiumofnlus.ac.in",
   el:{qualLevel:["12"],streams:["Science","Commerce","Arts"],mandatorySubjects:["English"],minSubMarks:{English:40},minMarks:45,minMarksCat:{SC:40,ST:40},note:"Any stream allowed. No upper age limit. English mandatory."},
   desc:"Entrance for 22 National Law Universities.",descHi:"22 राष्ट्रीय विधि विश्वविद्यालयों का प्रवेश।",
   batches:[{n:"PW CLAT",url:"https://pw.live/courses/clat",p:"PW"},{n:"Aakash CLAT",url:"https://www.aakash.ac.in/clat-coaching",p:"Aakash"}],
   alts:["AILET","SLAT","LSAT India","DU LLB"]},

  {id:"ca_foundation",name:"CA Foundation 2026",nameHi:"सीए फाउंडेशन 2026",cat:"professional",logo:"💼",badge:"ICAI New Scheme",by:"ICAI",site:"https://icai.org",
   el:{qualLevel:["12"],streams:["Science","Commerce","Arts"],mandatorySubjects:[],minSubMarks:{},minMarks:null,note:"Any stream. Register after Class 12 result. No minimum % required."},
   desc:"First step to CA (ICAI New Scheme 2023).",descHi:"CA बनने का पहला चरण।",
   batches:[{n:"PW CA Foundation",url:"https://pw.live/courses/ca",p:"PW"},{n:"Aakash CA",url:"https://www.aakash.ac.in/ca-coaching",p:"Aakash"}],
   alts:["CMA Foundation","CS Foundation","B.Com Hons DU","BBA Programs"]},

  {id:"cuet_ug",name:"CUET-UG 2026",nameHi:"सीयूईटी-यूजी 2026",cat:"professional",logo:"🏫",badge:"NTA 2026",by:"NTA",site:"https://cuet.samarth.ac.in",
   el:{qualLevel:["12"],streams:["Science","Commerce","Arts"],mandatorySubjects:["English"],minSubMarks:{English:40},minMarks:50,minMarksCat:{SC:45,ST:45},note:"Domain subjects should match desired course. DU, BHU, JNU, AMU and 200+ universities."},
   desc:"Central University entrance (DU, BHU, JNU).",descHi:"DU, BHU, JNU सहित 200+ विश्वविद्यालय।",
   batches:[{n:"PW CUET",url:"https://pw.live/courses/cuet",p:"PW"},{n:"Allen CUET",url:"https://www.allen.ac.in/cuet-coaching",p:"Allen"}],
   alts:["IPU CET","GGSIPU","State Universities","Private Universities"]},

  {id:"ipmat",name:"IPMAT 2026",nameHi:"आईपीमैट 2026",cat:"professional",logo:"📊",badge:"IIM 5-Year",by:"IIM Indore/Rohtak",site:"https://iimindore.ac.in/ipmat",
   el:{maxAge:20,qualLevel:["12"],streams:["Science","Commerce"],mandatorySubjects:["Mathematics"],minSubMarks:{Mathematics:60},minMarks:60,minMarksCat:{SC:55,ST:55},note:"Math mandatory. Age max 20 yrs on July 31, 2026."},
   desc:"5-Year Integrated MBA at IIM Indore, Rohtak.",descHi:"IIM इंदौर में 5 वर्षीय MBA।",
   batches:[{n:"PW IPMAT",url:"https://pw.live/courses/ipmat",p:"PW"},{n:"Aakash IPMAT",url:"https://www.aakash.ac.in/ipmat-coaching",p:"Aakash"}],
   alts:["JIPMAT","NPAT (NMIMS)","SET (Symbiosis)","BBA Programs"]},

  {id:"jipmat",name:"JIPMAT 2026",nameHi:"जिपमैट 2026",cat:"professional",logo:"📊",badge:"IIM Bodh Gaya/Jammu",by:"NTA",site:"https://jipmat.nta.ac.in",
   el:{maxAge:20,qualLevel:["12"],streams:["Science","Commerce"],mandatorySubjects:["Mathematics"],minSubMarks:{Mathematics:60},minMarks:60,minMarksCat:{SC:55,ST:55},note:"Math mandatory. Age max 20 on 1 Aug 2026. IIM Bodh Gaya and Jammu."},
   desc:"5-Year IPM at IIM Bodh Gaya & IIM Jammu.",descHi:"IIM बोधगया और जम्मू में 5 वर्षीय IPM।",
   batches:[{n:"PW JIPMAT",url:"https://pw.live/courses/jipmat",p:"PW"}],
   alts:["IPMAT","BBA Programs","NPAT","Christ University BBA"]},

  // ─── BANKING ────────────────────────────────────────────────
  {id:"ibps_po",name:"IBPS PO 2025-26",nameHi:"आईबीपीएस पीओ 2025-26",cat:"banking",logo:"🏦",badge:"Bank PO",by:"IBPS",site:"https://ibps.in",
   el:{minAge:20,maxAge:30,maxAgeCat:{OBC:33,SC:35,ST:35},qualLevel:["graduation","postgrad"],graduationBranches:["Any Graduation"],minMarks:null,mandatorySubjects:[],minSubMarks:{},note:"Any graduation degree. Age 20–30 (OBC 33, SC/ST 35). Computer literacy required."},
   desc:"Probationary Officer in Public Sector Banks.",descHi:"सार्वजनिक क्षेत्र के बैंकों में PO भर्ती।",
   batches:[{n:"PW Banking",url:"https://pw.live/courses/banking",p:"PW"},{n:"Aakash Banking",url:"https://www.aakash.ac.in/banking-coaching",p:"Aakash"}],
   alts:["SBI PO","RBI Grade B","IBPS Clerk","NABARD Grade A"]},

  {id:"ibps_clerk",name:"IBPS Clerk 2025-26",nameHi:"आईबीपीएस क्लर्क 2025-26",cat:"banking",logo:"🏧",badge:"Bank Clerk",by:"IBPS",site:"https://ibps.in",
   el:{minAge:20,maxAge:28,maxAgeCat:{OBC:31,SC:33,ST:33},qualLevel:["graduation","postgrad"],graduationBranches:["Any Graduation"],minMarks:null,mandatorySubjects:[],minSubMarks:{},note:"Any graduation. Age 20–28 (OBC 31, SC/ST 33). Local language knowledge preferable."},
   desc:"Clerical cadre in Public Sector Banks.",descHi:"सार्वजनिक क्षेत्र के बैंकों में लिपिक संवर्ग।",
   batches:[{n:"PW Banking",url:"https://pw.live/courses/banking",p:"PW"},{n:"Aakash Banking",url:"https://www.aakash.ac.in/banking-coaching",p:"Aakash"}],
   alts:["IBPS PO","SBI Clerk","Post Office GDS","SSC CHSL"]},

  {id:"sbi_po",name:"SBI PO 2025-26",nameHi:"एसबीआई पीओ 2025-26",cat:"banking",logo:"🏦",badge:"SBI Recruitment",by:"SBI",site:"https://sbi.co.in/careers",
   el:{minAge:21,maxAge:30,maxAgeCat:{OBC:33,SC:35,ST:35},qualLevel:["graduation","postgrad"],graduationBranches:["Any Graduation"],minMarks:null,mandatorySubjects:[],minSubMarks:{},note:"Graduation required. Age 21–30. Strong preference for Math/Finance background."},
   desc:"Probationary Officer at State Bank of India.",descHi:"भारतीय स्टेट बैंक में प्रोबेशनरी ऑफिसर।",
   batches:[{n:"PW Banking",url:"https://pw.live/courses/banking",p:"PW"},{n:"Allen Banking",url:"https://www.allen.ac.in/bank-coaching",p:"Allen"}],
   alts:["IBPS PO","RBI Grade B","IBPS SO","LIC AAO"]},

  {id:"rbi_grade_b",name:"RBI Grade B 2025-26",nameHi:"आरबीआई ग्रेड बी 2025-26",cat:"banking",logo:"🏛️",badge:"Apex Bank",by:"RBI",site:"https://rbi.org.in",
   el:{minAge:21,maxAge:30,maxAgeCat:{OBC:33,SC:35,ST:35},qualLevel:["graduation","postgrad"],graduationBranches:["Any Graduation"],minMarks:60,minMarksCat:{SC:55,ST:55},mandatorySubjects:[],minSubMarks:{},note:"60% graduation marks (55% SC/ST). Age 21–30. Economics/Finance graduates preferred."},
   desc:"Officer at Reserve Bank of India.",descHi:"भारतीय रिजर्व बैंक में अधिकारी।",
   batches:[{n:"PW RBI",url:"https://pw.live/courses/rbi",p:"PW"},{n:"Aakash RBI",url:"https://www.aakash.ac.in/rbi-coaching",p:"Aakash"}],
   alts:["SEBI Grade A","NABARD Grade A","IBPS PO","UPSC CSE (Economics)"]},

  {id:"jaiib",name:"JAIIB 2025-26",nameHi:"जेएआईआईबी 2025-26",cat:"banking",logo:"📗",badge:"IIBF Certification",by:"IIBF",site:"https://iibf.org.in",
   el:{qualLevel:["graduation","postgrad"],mandatorySubjects:[],minSubMarks:{},minMarks:null,note:"Must be a bank employee (member of IIBF). Not open to general public. Required for Scale I→II promotion."},
   desc:"Junior Associate of Indian Institute of Banking and Finance.",descHi:"बैंक कर्मचारियों के लिए प्रोन्नति परीक्षा।",
   batches:[{n:"IIBF Study Material",url:"https://iibf.org.in",p:"IIBF"}],
   alts:["CAIIB","DB&F","JAIIB Diploma","Certified Banking Compliance Professional"]},

  {id:"caiib",name:"CAIIB 2025-26",nameHi:"सीएआईआईबी 2025-26",cat:"banking",logo:"📘",badge:"IIBF Senior",by:"IIBF",site:"https://iibf.org.in",
   el:{qualLevel:["graduation","postgrad"],mandatorySubjects:[],minSubMarks:{},minMarks:null,note:"Must be JAIIB qualified + bank employee. Required for Scale II→III promotion. 3 papers."},
   desc:"Certified Associate of Indian Institute of Banking (Senior banker cert).",descHi:"वरिष्ठ बैंकर के लिए IIBF सर्टिफिकेशन।",
   batches:[{n:"IIBF CAIIB Material",url:"https://iibf.org.in",p:"IIBF"}],
   alts:["DIB (Diploma in Banking)","DEFS","FRM/CFA","Certificate Examination in Risk"]},

  // ─── RAILWAYS ────────────────────────────────────────────────
  {id:"rrb_ntpc",name:"RRB NTPC 2025-26",nameHi:"आरआरबी एनटीपीसी 2025-26",cat:"railway",logo:"🚉",badge:"Railway Bharti",by:"RRB / RRC",site:"https://rrbapply.gov.in",
   el:{minAge:18,maxAge:33,maxAgeCat:{OBC:36,SC:38,ST:38},qualLevel:["12","graduation","postgrad"],graduationBranches:["Any Graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:null,note:"Graduate posts: Age 18–33. 12th pass posts: 18–30. Various posts: Station Master, Goods Guard, Jr Account Asst, Commercial Apprentice."},
   desc:"Non-Technical Popular Categories in Indian Railways.",descHi:"भारतीय रेलवे में NTPC भर्ती।",
   batches:[{n:"PW Railway",url:"https://pw.live/courses/railway",p:"PW"},{n:"Aakash Railway",url:"https://www.aakash.ac.in/railway-coaching",p:"Aakash"}],
   alts:["RRB JE","RRB ALP","SSC CGL","UPSC ESE"]},

  {id:"rrb_je",name:"RRB JE 2025-26",nameHi:"आरआरबी जेई 2025-26",cat:"railway",logo:"🔩",badge:"Railway Engineer",by:"RRB",site:"https://rrbapply.gov.in",
   el:{minAge:18,maxAge:33,maxAgeCat:{OBC:36,SC:38,ST:38},qualLevel:["graduation","diploma"],graduationBranches:["B.E/B.Tech (Civil)","B.E/B.Tech (Electrical)","B.E/B.Tech (Mechanical)","B.E/B.Tech (Electronics)","B.E/B.Tech (CS/IT)","Diploma (Engineering)"],mandatorySubjects:[],minSubMarks:{},minMarks:null,note:"B.E/B.Tech or 3-year Diploma in relevant engineering branch. Age 18–33."},
   desc:"Junior Engineer recruitment in Indian Railways.",descHi:"भारतीय रेलवे में जूनियर इंजीनियर भर्ती।",
   batches:[{n:"PW Railway JE",url:"https://pw.live/courses/rrb-je",p:"PW"},{n:"Aakash RRB JE",url:"https://www.aakash.ac.in/rrb-je-coaching",p:"Aakash"}],
   alts:["SSC JE","GATE","State JE Exams","DRDO CEPTAM"]},

  {id:"rrb_alp",name:"RRB ALP 2025-26",nameHi:"आरआरबी एएलपी 2025-26",cat:"railway",logo:"🚆",badge:"Railway ALP",by:"RRB",site:"https://rrbapply.gov.in",
   el:{minAge:18,maxAge:28,maxAgeCat:{OBC:31,SC:33,ST:33},qualLevel:["10","12","diploma"],mandatorySubjects:[],minSubMarks:{},minMarks:null,note:"10th pass + ITI or 12th pass with Physics & Maths for ALP. Diploma for Technician posts. Age 18–28."},
   desc:"Assistant Loco Pilot & Technician in Indian Railways.",descHi:"भारतीय रेलवे में ALP और टेक्नीशियन भर्ती।",
   batches:[{n:"PW Railway ALP",url:"https://pw.live/courses/rrb-alp",p:"PW"}],
   alts:["SSC GD","State Technical Jobs","Apprenticeship","ITI Government Jobs"]},

  // ─── GOVERNMENT (SSC / CENTRAL) ─────────────────────────────
  {id:"ssc_cgl",name:"SSC CGL 2025-26",nameHi:"एसएससी सीजीएल 2025-26",cat:"govt_central",logo:"📋",badge:"Govt Group B/C",by:"SSC",site:"https://ssc.nic.in",
   el:{minAge:18,maxAge:32,maxAgeCat:{OBC:35,SC:37,ST:37},qualLevel:["graduation","postgrad"],graduationBranches:["Any Graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:null,note:"Graduation from recognized university. Age 18–32 (post-wise varies 18–27). Multiple posts: ITI, AO, ASO, SI CBI, etc."},
   desc:"Combined Graduate Level – Income Tax Inspector, Audit Officer, ASO, Sub-Inspector CBI.",descHi:"इनकम टैक्स इंस्पेक्टर, ऑडिट ऑफिसर, ASO भर्ती।",
   batches:[{n:"PW SSC CGL",url:"https://pw.live/courses/ssc-cgl",p:"PW"},{n:"Aakash SSC CGL",url:"https://www.aakash.ac.in/ssc-cgl-coaching",p:"Aakash"},{n:"Allen SSC",url:"https://www.allen.ac.in/ssc-coaching",p:"Allen"}],
   alts:["IBPS PO","RBI Grade B","UPSC CSE","State PSC"]},

  {id:"ssc_chsl",name:"SSC CHSL 2025-26",nameHi:"एसएससी सीएचएसएल 2025-26",cat:"govt_central",logo:"📝",badge:"Govt LDC/DEO",by:"SSC",site:"https://ssc.nic.in",
   el:{minAge:18,maxAge:27,maxAgeCat:{OBC:30,SC:32,ST:32},qualLevel:["12","graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:50,note:"12th pass mandatory. Age 18–27. LDC, DEO, PA, SA posts."},
   desc:"Combined Higher Secondary Level – LDC, Data Entry Operator, Postal/Sorting Asst.",descHi:"LDC, DEO, डाक सहायक, Sorting Assistant भर्ती।",
   batches:[{n:"PW SSC CHSL",url:"https://pw.live/courses/ssc-chsl",p:"PW"},{n:"Aakash SSC",url:"https://www.aakash.ac.in/ssc-coaching",p:"Aakash"}],
   alts:["SSC CGL","Bank Clerk","Post Office GDS","IBPS Clerk"]},

  {id:"ssc_gd",name:"SSC GD Constable 2025-26",nameHi:"एसएससी जीडी कांस्टेबल",cat:"defense_police",logo:"👮",badge:"BSF/CRPF/CISF",by:"SSC",site:"https://ssc.nic.in",
   el:{minAge:18,maxAge:23,maxAgeCat:{OBC:26,SC:28,ST:28},qualLevel:["10","12"],mandatorySubjects:[],minSubMarks:{},minMarks:33,height:{M:170,F:157,OBC_M:162.5,OBC_F:155},chest:{normal:80,expanded:85},vision:"6/6 one eye, 6/9 other (without glass)",note:"10th/12th pass. Physical Standard Test mandatory. Age 18–23 (OBC 26, SC/ST 28)."},
   desc:"Constable GD in BSF, CISF, CRPF, ITBP, SSB, NIA, SSF, AR.",descHi:"BSF, CISF, CRPF, ITBP में कांस्टेबल GD।",
   batches:[{n:"PW SSC GD",url:"https://pw.live/courses/ssc-gd",p:"PW"},{n:"Aakash SSC GD",url:"https://www.aakash.ac.in/ssc-gd-coaching",p:"Aakash"}],
   alts:["UP Police","Delhi Police","RPF Constable","Agnipath Agniveer"]},

  {id:"ssc_je",name:"SSC JE 2025-26",nameHi:"एसएससी जेई 2025-26",cat:"technical_jobs",logo:"🏗️",badge:"Govt JE",by:"SSC",site:"https://ssc.nic.in",
   el:{minAge:18,maxAge:32,maxAgeCat:{OBC:35,SC:37,ST:37},qualLevel:["graduation","diploma"],graduationBranches:["B.E/B.Tech (Civil)","B.E/B.Tech (Electrical)","B.E/B.Tech (Mechanical)","Diploma (Engineering)"],mandatorySubjects:[],minSubMarks:{},minMarks:null,note:"Diploma/Degree in Civil/Elec/Mech. Age 18–32."},
   desc:"Junior Engineer (Civil/Electrical/Mechanical) in PWD, MES, CWC, CPWD.",descHi:"PWD, MES में जूनियर इंजीनियर भर्ती।",
   batches:[{n:"PW SSC JE",url:"https://pw.live/courses/ssc-je",p:"PW"},{n:"Aakash SSC JE",url:"https://www.aakash.ac.in/ssc-je-coaching",p:"Aakash"}],
   alts:["GATE","RRB JE","State JE Exams","DRDO CEPTAM","UPPCL JE"]},

  // ─── DEFENSE ────────────────────────────────────────────────
  {id:"nda",name:"NDA 2026",nameHi:"एनडीए 2026",cat:"defense_police",logo:"🪖",badge:"Army/Navy/Air Force",by:"UPSC",site:"https://upsc.gov.in",
   el:{minAge:16.5,maxAge:19.5,qualLevel:["12"],streams:["Science","Arts","Commerce"],mandatorySubjects:["Physics","Mathematics"],minSubMarks:{Physics:50,Mathematics:50},minMarks:null,height:{M:157,F:152},chest:null,vision:"6/6 better, 6/18 worse (Army); 6/6 uncorrected (IAF)",optNote:"PCM for Navy/Air Force; any stream for Army.",note:"Age 16.5–19.5. 12th pass or appearing. PCM mandatory for Navy/Air Force."},
   desc:"UPSC NDA – Army, Navy, Air Force entry after 12th.",descHi:"12वीं के बाद थल सेना, नौसेना, वायु सेना प्रवेश।",
   batches:[{n:"PW NDA",url:"https://pw.live/courses/nda",p:"PW"},{n:"Aakash NDA",url:"https://www.aakash.ac.in/nda-coaching",p:"Aakash"},{n:"Allen NDA",url:"https://www.allen.ac.in/nda-coaching",p:"Allen"}],
   alts:["CDS (after grad)","AFCAT (after grad)","TES (Technical Entry)","MNS Nursing"]},

  {id:"cds",name:"CDS 2026",nameHi:"सीडीएस 2026",cat:"defense_police",logo:"⭐",badge:"Graduate Defence",by:"UPSC",site:"https://upsc.gov.in",
   el:{minAge:20,maxAge:25,maxAgeCat:{AF:24},qualLevel:["graduation","postgrad"],graduationBranches:["B.E/B.Tech (Any)","Any Graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:null,height:{M:157,F:152},chest:{normal:77,expanded:82},vision:"6/6 with correction for most",note:"For AF: engineering/PCM Grad. For IMA/OTA: any grad. Age 20–25."},
   desc:"IMA, INA, Air Force Academy, OTA entry after graduation.",descHi:"स्नातकों के लिए IMA, INA, AFA प्रवेश।",
   batches:[{n:"PW CDS",url:"https://pw.live/courses/cds",p:"PW"},{n:"Aakash CDS",url:"https://www.aakash.ac.in/cds-coaching",p:"Aakash"}],
   alts:["AFCAT","NDA (for younger)","JAG Entry (Law Grads)","SSC Technical Entry"]},

  {id:"afcat",name:"AFCAT 2026",nameHi:"एएफकैट 2026",cat:"defense_police",logo:"✈️",badge:"Indian Air Force",by:"IAF",site:"https://afcat.cdac.in",
   el:{minAge:20,maxAge:26,qualLevel:["graduation","postgrad"],graduationBranches:["B.E/B.Tech (Any)","Any Graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:60,height:{M:162.5,F:152},chest:{normal:81,expanded:86},vision:"6/6 uncorrected (Flying); 6/9 corrected (Ground)",note:"Flying: PCM+60% in 12th; Technical: B.E/B.Tech; Ground Duty: any grad with 60%."},
   desc:"IAF flying, technical, and ground duty entry.",descHi:"वायु सेना फ्लाइंग, तकनीकी और ग्राउंड ड्यूटी प्रवेश।",
   batches:[{n:"PW AFCAT",url:"https://pw.live/courses/afcat",p:"PW"},{n:"Aakash Defence",url:"https://www.aakash.ac.in/defence-coaching",p:"Aakash"}],
   alts:["CDS","NCC Entry IAF","Coast Guard AC","Meteorological Branch"]},

  {id:"up_police",name:"UP Police 2025-26",nameHi:"यूपी पुलिस 2025-26",cat:"defense_police",logo:"🚔",badge:"UP Govt",by:"UPPBPB",site:"https://uppbpb.gov.in",
   el:{minAge:18,maxAge:22,maxAgeCat:{OBC:25,SC:27,ST:27},qualLevel:["12","graduation"],mandatorySubjects:["Hindi","English"],minSubMarks:{Hindi:33,English:33},minMarks:50,height:{M:168,F:152,OBC_M:160,OBC_F:147},chest:{normal:79,expanded:84},vision:"6/12 without glasses",domicile:"Uttar Pradesh",note:"UP domicile mandatory. Hindi + English subjects. Running test: 4.8 km in 25 min (M)."},
   desc:"UP Police Constable & SI recruitment for UP domicile.",descHi:"UP अधिवास के लिए UP पुलिस भर्ती।",
   batches:[{n:"PW UP Police",url:"https://pw.live/courses/up-police",p:"PW"},{n:"Aakash UP Police",url:"https://www.aakash.ac.in/up-police-coaching",p:"Aakash"}],
   alts:["SSC GD","UP SI Exam","Delhi Police","RPF Constable","UP Lekhpal"]},

  // ─── UPSC ────────────────────────────────────────────────────
  {id:"upsc_cse",name:"UPSC CSE 2026 (IAS/IPS)",nameHi:"यूपीएससी सीएसई 2026",cat:"upsc",logo:"🇮🇳",badge:"IAS/IPS/IFS",by:"UPSC",site:"https://upsc.gov.in",
   el:{minAge:21,maxAge:32,maxAgeCat:{OBC:35,SC:37,ST:37},attempts:{General:6,OBC:9,SC:-1,ST:-1},qualLevel:["graduation","postgrad"],graduationBranches:["Any Graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:null,note:"Graduation from recognized university. Age 21–32 (OBC 35, SC/ST 37). 6 attempts General, 9 OBC, unlimited SC/ST."},
   desc:"Civil Services Examination – IAS, IPS, IFS, IRS recruitment.",descHi:"IAS, IPS, IFS, IRS भर्ती के लिए सिविल सेवा परीक्षा।",
   batches:[{n:"PW UPSC",url:"https://pw.live/courses/upsc",p:"PW"},{n:"Aakash UPSC",url:"https://www.aakash.ac.in/ias-coaching",p:"Aakash"},{n:"Allen UPSC",url:"https://www.allen.ac.in/upsc-coaching",p:"Allen"}],
   alts:["State PSC (UPPSC/MPSC/BPSC)","SSC CGL","UPSC CAPF","Defence Services"]},

  {id:"upsc_capf",name:"UPSC CAPF 2026",nameHi:"यूपीएससी सीएपीएफ 2026",cat:"upsc",logo:"🛡️",badge:"AC CAPF",by:"UPSC",site:"https://upsc.gov.in",
   el:{minAge:20,maxAge:25,maxAgeCat:{OBC:28,SC:30,ST:30},qualLevel:["graduation","postgrad"],graduationBranches:["Any Graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:null,height:{M:165,F:157},chest:{normal:81,expanded:86},vision:"6/6 corrected",note:"Age 20–25. Graduation required. Physical and Medical test mandatory. BSF/CRPF/CISF/ITBP/SSB."},
   desc:"Assistant Commandant in BSF, CRPF, CISF, ITBP, SSB.",descHi:"BSF, CRPF, CISF, ITBP में Assistant Commandant।",
   batches:[{n:"PW CAPF",url:"https://pw.live/courses/capf",p:"PW"},{n:"Aakash CAPF",url:"https://www.aakash.ac.in/capf-coaching",p:"Aakash"}],
   alts:["CDS","IPS via UPSC CSE","SSC CPO SI","State Police OC"]},

  {id:"gate",name:"GATE 2026",nameHi:"गेट 2026",cat:"technical_jobs",logo:"🔧",badge:"PSU Gateway",by:"IIT Roorkee",site:"https://gate.iitr.ac.in",
   el:{qualLevel:["graduation","postgrad"],graduationBranches:["B.E/B.Tech (Any)","B.E/B.Tech (Civil)","B.E/B.Tech (Electrical)","B.E/B.Tech (Mechanical)","B.E/B.Tech (Electronics)","B.E/B.Tech (CS/IT)","B.Sc (Mathematics)","B.Sc (Physics)","M.Sc","Any Post Graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:null,note:"Final year students can also apply. 29 papers. No age/attempt limit. Used for PSU hiring and M.Tech admission."},
   desc:"Graduate Aptitude Test – PSUs, M.Tech at IITs/NITs.",descHi:"PSUs, M.Tech प्रवेश के लिए GATE।",
   batches:[{n:"PW GATE",url:"https://pw.live/courses/gate",p:"PW"},{n:"Aakash GATE",url:"https://www.aakash.ac.in/gate-coaching",p:"Aakash"},{n:"Allen GATE",url:"https://www.allen.ac.in/gate-coaching",p:"Allen"}],
   alts:["IES/ESE","PSU Direct","State Technical Services","DRDO CEPTAM"]},

  {id:"ies",name:"IES/ESE 2026",nameHi:"आईईएस/ईएसई 2026",cat:"technical_jobs",logo:"🎖️",badge:"UPSC Class-1 Engg",by:"UPSC",site:"https://upsc.gov.in",
   el:{minAge:21,maxAge:30,maxAgeCat:{OBC:33,SC:35,ST:35},qualLevel:["graduation","postgrad"],graduationBranches:["B.E/B.Tech (Civil)","B.E/B.Tech (Electrical)","B.E/B.Tech (Mechanical)","B.E/B.Tech (Electronics)"],mandatorySubjects:[],minSubMarks:{},minMarks:null,note:"Only 4 branches: Civil, Mech, Elec, Electronics & Telecom. Indian citizen. Age 21–30."},
   desc:"Engineering Services – Class-1 Gazetted posts under GoI.",descHi:"भारत सरकार में Class-1 इंजीनियरिंग सेवा।",
   batches:[{n:"PW IES",url:"https://pw.live/courses/ies",p:"PW"},{n:"Aakash IES",url:"https://www.aakash.ac.in/ies-coaching",p:"Aakash"}],
   alts:["GATE + PSU","State PCS Technical","DRDO Scientist","BIS Technical Officer"]},

  // ─── STATE PSC ───────────────────────────────────────────────
  {id:"uppsc",name:"UPPSC PCS 2025-26",nameHi:"यूपीपीएससी पीसीएस",cat:"state_psc",logo:"🏛️",badge:"UP State Services",by:"UPPSC",site:"https://uppsc.up.nic.in",
   el:{minAge:21,maxAge:40,maxAgeCat:{OBC:43,SC:45,ST:45},qualLevel:["graduation","postgrad"],graduationBranches:["Any Graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:null,domicile:"Uttar Pradesh",note:"Age 21–40 (cat. relaxation). Graduation required. UP domicile preferred. Prelims + Mains + Interview."},
   desc:"UP PCS – Deputy Collector, DSP, BDO recruitment.",descHi:"UP PCS – डिप्टी कलेक्टर, DSP, BDO भर्ती।",
   batches:[{n:"PW UPPSC",url:"https://pw.live/courses/uppsc",p:"PW"},{n:"Aakash UPPSC",url:"https://www.aakash.ac.in/uppsc-coaching",p:"Aakash"}],
   alts:["UPSC CSE","SSC CGL","UP Police SI","UP Lekhpal"]},

  {id:"mpsc",name:"MPSC 2025-26",nameHi:"एमपीएससी 2025-26",cat:"state_psc",logo:"🏛️",badge:"Maharashtra State",by:"MPSC",site:"https://mpsc.gov.in",
   el:{minAge:19,maxAge:38,maxAgeCat:{OBC:43,SC:43,ST:43},qualLevel:["graduation","postgrad"],graduationBranches:["Any Graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:null,domicile:"Maharashtra",note:"Age 19–38 (OBC/SC/ST 43). Maharashtra domicile required. Marathi proficiency needed."},
   desc:"Maharashtra State Services – Deputy Collector, DSP, Sales Tax Officer.",descHi:"महाराष्ट्र राज्य सेवाएं – डिप्टी कलेक्टर, DSP।",
   batches:[{n:"PW MPSC",url:"https://pw.live/courses/mpsc",p:"PW"},{n:"Aakash MPSC",url:"https://www.aakash.ac.in/mpsc-coaching",p:"Aakash"}],
   alts:["UPSC CSE","SSC CGL","Maharashtra Police SI","IBPS PO"]},

  {id:"mppsc",name:"MPPSC 2025-26",nameHi:"एमपीपीएससी 2025-26",cat:"state_psc",logo:"🏛️",badge:"MP State Services",by:"MPPSC",site:"https://mppsc.mp.gov.in",
   el:{minAge:21,maxAge:40,maxAgeCat:{OBC:43,SC:45,ST:45},qualLevel:["graduation","postgrad"],graduationBranches:["Any Graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:null,domicile:"Madhya Pradesh",note:"MP domicile. Age 21–40 (cat. relaxation). Hindi proficiency preferred. Prelims + Mains + Interview."},
   desc:"MP State Services – DSP, Dy Collector, Naib Tehsildar.",descHi:"MP राज्य सेवाएं – DSP, नायब तहसीलदार भर्ती।",
   batches:[{n:"PW MPPSC",url:"https://pw.live/courses/mppsc",p:"PW"},{n:"Aakash MPPSC",url:"https://www.aakash.ac.in/mppsc-coaching",p:"Aakash"}],
   alts:["UPSC CSE","SSC CGL","MP Police SI","MP Vyapam Exams"]},

  {id:"bpsc",name:"BPSC 2025-26",nameHi:"बीपीएससी 2025-26",cat:"state_psc",logo:"🏛️",badge:"Bihar State Services",by:"BPSC",site:"https://bpsc.bih.nic.in",
   el:{minAge:20,maxAge:37,maxAgeCat:{OBC:40,SC:42,ST:42,F:40,FOBC:43,FSC:45},qualLevel:["graduation","postgrad"],graduationBranches:["Any Graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:null,domicile:"Bihar",note:"Age 20–37 (M Gen). Higher limits for women and reserved categories. Bihar domicile preferred."},
   desc:"Bihar State Services – BAS, DSP, Block Development Officer.",descHi:"बिहार राज्य सेवाएं – BAS, DSP, BDO भर्ती।",
   batches:[{n:"PW BPSC",url:"https://pw.live/courses/bpsc",p:"PW"},{n:"Aakash BPSC",url:"https://www.aakash.ac.in/bpsc-coaching",p:"Aakash"}],
   alts:["UPSC CSE","SSC CGL","Bihar Police SI","Bihar Sachivalay"]},

  {id:"rpsc",name:"RPSC RAS 2025-26",nameHi:"आरपीएससी आरएएस 2025-26",cat:"state_psc",logo:"🏛️",badge:"Rajasthan State",by:"RPSC",site:"https://rpsc.rajasthan.gov.in",
   el:{minAge:21,maxAge:40,maxAgeCat:{OBC:43,SC:45,ST:45},qualLevel:["graduation","postgrad"],graduationBranches:["Any Graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:null,domicile:"Rajasthan",note:"Rajasthan domicile preferred. Age 21–40. Hindi/Rajasthani culture knowledge helpful."},
   desc:"Rajasthan Administrative Service – RAS Officer, Circle Inspector.",descHi:"राजस्थान प्रशासनिक सेवा – RAS अधिकारी भर्ती।",
   batches:[{n:"PW RPSC",url:"https://pw.live/courses/rpsc",p:"PW"}],
   alts:["UPSC CSE","SSC CGL","Rajasthan Police SI","Rajasthan Patwari"]},

  {id:"hpsc",name:"HPSC HCS 2025-26",nameHi:"एचपीएससी एचसीएस 2025-26",cat:"state_psc",logo:"🏛️",badge:"Haryana State",by:"HPSC",site:"https://hpsc.gov.in",
   el:{minAge:21,maxAge:42,maxAgeCat:{SC:47,ST:47},qualLevel:["graduation","postgrad"],graduationBranches:["Any Graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:null,domicile:"Haryana",note:"Haryana domicile. HCS Officer, DSP, etc. 3-stage exam."},
   desc:"Haryana Civil Services – HCS Officer, DSP, Sub-Registrar.",descHi:"हरियाणा सिविल सेवाएं – HCS अधिकारी भर्ती।",
   batches:[{n:"PW HPSC",url:"https://pw.live/courses/hpsc",p:"PW"}],
   alts:["UPSC CSE","SSC CGL","Haryana Police SI","HSSC Clerk"]},

  {id:"jpsc",name:"JPSC 2025-26",nameHi:"जेपीएससी 2025-26",cat:"state_psc",logo:"🏛️",badge:"Jharkhand State",by:"JPSC",site:"https://www.jpsc.gov.in",
   el:{minAge:21,maxAge:35,maxAgeCat:{OBC:38,SC:40,ST:40},qualLevel:["graduation","postgrad"],graduationBranches:["Any Graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:null,domicile:"Jharkhand",note:"Jharkhand domicile. Tribal population representation. Hindi/Santhali/Bengali knowledge useful."},
   desc:"Jharkhand State Services – JPSAS, DSP recruitment.",descHi:"झारखंड राज्य सेवाएं – JPSAS, DSP भर्ती।",
   batches:[{n:"PW JPSC",url:"https://pw.live/courses/jpsc",p:"PW"}],
   alts:["UPSC CSE","SSC CGL","Jharkhand Police","JSSC"]},

  {id:"psc_wbcs",name:"WBCS 2025-26",nameHi:"डब्ल्यूबीसीएस 2025-26",cat:"state_psc",logo:"🏛️",badge:"West Bengal State",by:"WBPSC",site:"https://wbpsc.gov.in",
   el:{minAge:21,maxAge:36,maxAgeCat:{OBC:39,SC:41,ST:41},qualLevel:["graduation","postgrad"],graduationBranches:["Any Graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:null,domicile:"West Bengal",note:"WB domicile preferred. Bengali language knowledge required for some posts."},
   desc:"West Bengal Civil Services – Deputy Magistrate, DSP.",descHi:"पश्चिम बंगाल सिविल सेवाएं।",
   batches:[{n:"PW WBCS",url:"https://pw.live/courses/wbcs",p:"PW"}],
   alts:["UPSC CSE","SSC CGL","WB Police SI","WB PSC Clerkship"]},

  {id:"kpsc",name:"KPSC KAS 2025-26",nameHi:"केपीएससी केएएस 2025-26",cat:"state_psc",logo:"🏛️",badge:"Karnataka State",by:"KPSC",site:"https://kpsc.kar.nic.in",
   el:{minAge:21,maxAge:35,maxAgeCat:{OBC:38,SC:40,ST:40},qualLevel:["graduation","postgrad"],graduationBranches:["Any Graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:null,domicile:"Karnataka",note:"Karnataka domicile + Kannada language compulsory."},
   desc:"Karnataka Administrative Services – Deputy Collector, DSP.",descHi:"कर्नाटक प्रशासनिक सेवाएं।",
   batches:[{n:"PW KPSC",url:"https://pw.live/courses/kpsc",p:"PW"}],
   alts:["UPSC CSE","SSC CGL","Karnataka Police SI","BBMP Recruitment"]},

  {id:"tnpsc",name:"TNPSC Group 1/2 2025-26",nameHi:"टीएनपीएससी 2025-26",cat:"state_psc",logo:"🏛️",badge:"Tamil Nadu State",by:"TNPSC",site:"https://tnpsc.gov.in",
   el:{minAge:21,maxAge:32,maxAgeCat:{BC:32,MBC:32,SC:35,ST:35},qualLevel:["graduation","postgrad"],graduationBranches:["Any Graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:null,domicile:"Tamil Nadu",note:"Tamil language mandatory for Group 1/2. Age 21–32. TN domicile."},
   desc:"Tamil Nadu Public Service – DSP, Deputy Collector, Revenue Officer.",descHi:"तमिलनाडु सिविल सेवाएं।",
   batches:[{n:"PW TNPSC",url:"https://pw.live/courses/tnpsc",p:"PW"}],
   alts:["UPSC CSE","SSC CGL","TN Police SI","TN Forest Dept"]},

  // ─── TEACHING ────────────────────────────────────────────────
  {id:"ctet",name:"CTET 2025-26",nameHi:"सीटीईटी 2025-26",cat:"teaching",logo:"📚",badge:"CBSE Teacher Cert",by:"CBSE",site:"https://ctet.nic.in",
   el:{qualLevel:["graduation","postgrad"],graduationBranches:["Any Graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:50,minMarksCat:{SC:45,ST:45},note:"B.Ed (2-yr) for Paper II (Class 6–8). D.El.Ed for Paper I (Class 1–5). 50% graduation (SC/ST 45%)."},
   desc:"Central Teacher Eligibility Test – KVS, NVS, Govt Schools.",descHi:"केंद्रीय शिक्षक पात्रता परीक्षा – KVS, NVS।",
   batches:[{n:"PW CTET",url:"https://pw.live/courses/ctet",p:"PW"},{n:"Aakash CTET",url:"https://www.aakash.ac.in/ctet-coaching",p:"Aakash"}],
   alts:["UPTET","State TET","KVS Recruitment","NVS LT Grade"]},

  {id:"uptet",name:"UPTET 2025-26",nameHi:"यूपीटेट 2025-26",cat:"teaching",logo:"📚",badge:"UP Teacher Exam",by:"UPMSP",site:"https://updeled.gov.in",
   el:{qualLevel:["graduation","postgrad"],graduationBranches:["Any Graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:50,minMarksCat:{SC:45,ST:45},note:"D.El.Ed/B.T.C for Paper I. B.Ed for Paper II. UP domicile preferred. 50% grad marks."},
   desc:"UP Teacher Eligibility Test – Primary & Upper Primary.",descHi:"यूपी सरकारी स्कूल शिक्षक पात्रता परीक्षा।",
   batches:[{n:"PW UPTET",url:"https://pw.live/courses/uptet",p:"PW"},{n:"Aakash UPTET",url:"https://www.aakash.ac.in/uptet-coaching",p:"Aakash"}],
   alts:["CTET","UP Aided School Recruitment","KVS Recruitment","UPSESSB"]},

  {id:"ugc_net",name:"UGC NET 2025-26",nameHi:"यूजीसी नेट 2025-26",cat:"teaching",logo:"🔬",badge:"Assistant Professor",by:"NTA",site:"https://ugcnet.nta.ac.in",
   el:{qualLevel:["postgrad"],graduationBranches:["Any Post Graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:55,minMarksCat:{SC:50,ST:50,OBC:50},note:"Post Graduation with 55% (SC/ST/OBC 50%). PhD holders exempt from NET. JRF: Age max 30 (SC/ST 35). 83 subjects available."},
   desc:"University Grants Commission NET – JRF & Assistant Professor eligibility.",descHi:"UGC NET – JRF और असिस्टेंट प्रोफेसर पात्रता।",
   batches:[{n:"PW UGC NET",url:"https://pw.live/courses/ugc-net",p:"PW"},{n:"Aakash UGC NET",url:"https://www.aakash.ac.in/ugc-net-coaching",p:"Aakash"}],
   alts:["CSIR NET","SET/SLET","ICMR JRF","GATE (for science/engg)"]},

  {id:"kvs_prt",name:"KVS TGT/PGT/PRT 2025-26",nameHi:"केवीएस शिक्षक 2025-26",cat:"teaching",logo:"🏫",badge:"KVS Recruitment",by:"KVS",site:"https://kvsangathan.nic.in",
   el:{qualLevel:["graduation","postgrad"],graduationBranches:["Any Graduation"],mandatorySubjects:[],minSubMarks:{},minMarks:50,note:"PRT: D.El.Ed + CTET Paper I. TGT: B.Ed + CTET Paper II. PGT: PG in Subject + B.Ed. 50% marks required."},
   desc:"Kendriya Vidyalaya Sangathan Teacher recruitment.",descHi:"केंद्रीय विद्यालय संगठन में शिक्षक भर्ती।",
   batches:[{n:"PW KVS",url:"https://pw.live/courses/kvs",p:"PW"},{n:"Aakash KVS",url:"https://www.aakash.ac.in/kvs-coaching",p:"Aakash"}],
   alts:["NVS Teacher","DSSSB Teacher","UP Aided School","CTET Exam"]},

  // ─── UNIVERSITY ENTRANCE ─────────────────────────────────────
  {id:"du_entrance",name:"DU CUET 2026",nameHi:"दिल्ली विश्वविद्यालय CUET 2026",cat:"university_entrance",logo:"🏫",badge:"Delhi University",by:"NTA/DU",site:"https://cuet.samarth.ac.in",
   el:{qualLevel:["12"],streams:["Science","Commerce","Arts"],mandatorySubjects:["English"],minSubMarks:{English:40},minMarks:50,note:"DU uses CUET-UG scores. Stream-specific domain subjects required. No DU separate exam now."},
   desc:"Delhi University admission via CUET-UG.",descHi:"दिल्ली विश्वविद्यालय प्रवेश – CUET-UG के माध्यम से।",
   batches:[{n:"PW CUET",url:"https://pw.live/courses/cuet",p:"PW"},{n:"Allen CUET",url:"https://www.allen.ac.in/cuet-coaching",p:"Allen"}],
   alts:["CUET-UG other universities","IP University CET","JNU Entrance","BHU Entrance via CUET"]},

  {id:"jnu_entrance",name:"JNU Entrance 2026",nameHi:"जेएनयू प्रवेश 2026",cat:"university_entrance",logo:"🎓",badge:"JNU Delhi",by:"NTA/JNU",site:"https://jnu.ac.in",
   el:{qualLevel:["12","graduation","postgrad"],mandatorySubjects:[],minSubMarks:{},minMarks:50,note:"JNU uses CUET-UG/PG scores. UG: 12th pass 50%. PG: Graduation 55%. PhD: PG 55% + NET/JRF preferred."},
   desc:"Jawaharlal Nehru University – Arts, Social Science, Science programs.",descHi:"JNU – कला, सामाजिक विज्ञान, विज्ञान कार्यक्रम।",
   batches:[{n:"PW CUET",url:"https://pw.live/courses/cuet",p:"PW"}],
   alts:["DU via CUET","BHU via CUET","AMU Entrance","Hyderabad University"]},

  {id:"bhu_entrance",name:"BHU UET/PET 2026",nameHi:"बीएचयू प्रवेश 2026",cat:"university_entrance",logo:"🎓",badge:"BHU Varanasi",by:"BHU/NTA",site:"https://bhuonline.in",
   el:{qualLevel:["12","graduation","postgrad"],mandatorySubjects:[],minSubMarks:{},minMarks:50,note:"BHU UG via CUET-UG since 2022. PG via CUET-PG or own PET. 50% marks in qualifying exam."},
   desc:"Banaras Hindu University – UG, PG, Research programs.",descHi:"बनारस हिंदू विश्वविद्यालय प्रवेश।",
   batches:[{n:"PW CUET",url:"https://pw.live/courses/cuet",p:"PW"}],
   alts:["DU via CUET","JNU Entrance","CUET-PG","Allahabad University"]},

  {id:"amu_entrance",name:"AMU Entrance 2026",nameHi:"एएमयू प्रवेश 2026",cat:"university_entrance",logo:"🎓",badge:"Aligarh Muslim Univ",by:"AMU",site:"https://amucontrollerexams.com",
   el:{qualLevel:["12","graduation","postgrad"],mandatorySubjects:[],minSubMarks:{},minMarks:50,note:"AMU conducts its own entrance tests (not CUET). 50% in qualifying exam. Strong on Urdu/Islamic Studies."},
   desc:"Aligarh Muslim University – Engineering, Medical, Arts, Law.",descHi:"AMU अलीगढ़ – इंजीनियरिंग, मेडिकल, कला, कानून।",
   batches:[{n:"PW CUET",url:"https://pw.live/courses/cuet",p:"PW"}],
   alts:["JMI Entrance","CUET-UG","Jamia Millia Islamia","HCU Entrance"]},

  {id:"ipu_cet",name:"IPU CET 2026",nameHi:"आईपीयू सीईटी 2026",cat:"university_entrance",logo:"🎓",badge:"Delhi IP University",by:"GGSIPU",site:"https://ipu.ac.in",
   el:{qualLevel:["12","graduation"],streams:["Science","Commerce","Arts"],mandatorySubjects:[],minSubMarks:{},minMarks:50,note:"IPU Delhi conducts own CET for Engineering, Law, MBA, BBA, Nursing. 50% qualifying marks."},
   desc:"IP University Common Entrance Test – Engineering, Law, MBA, Nursing.",descHi:"IP विश्वविद्यालय – इंजीनियरिंग, लॉ, MBA प्रवेश।",
   batches:[{n:"PW IPU",url:"https://pw.live/courses/ipu",p:"PW"}],
   alts:["CUET-UG","JEE Main","DU CUET","CLAT for Law"]},

  // ─── SCHOOL OLYMPIAD ─────────────────────────────────────────
  {id:"ntse",name:"NTSE 2025-26",nameHi:"एनटीएसई 2025-26",cat:"school_olympiad",logo:"🎓",badge:"NCERT Scholarship",by:"NCERT",site:"https://ncert.nic.in/ntse.php",
   el:{qualLevel:["10"],mandatorySubjects:["Mathematics","Science","Social Science"],minSubMarks:{Mathematics:55,Science:55},minMarks:60,minMarksCat:{SC:55,ST:55},note:"Class 10 only. School registration mandatory. Stage 1 (State) then Stage 2 (National)."},
   desc:"National Talent Search Exam – Class 10, prestigious scholarship.",descHi:"कक्षा 10 के लिए NCERT राष्ट्रीय छात्रवृत्ति।",
   batches:[{n:"PW NTSE",url:"https://pw.live/courses/ntse",p:"PW"},{n:"Allen NTSE",url:"https://www.allen.ac.in/ntse-coaching",p:"Allen"}],
   alts:["INSPIRE Scholarship","IMO","NSO","JSTS"]},

  {id:"imo",name:"IMO 2025-26",nameHi:"आईएमओ 2025-26",cat:"school_olympiad",logo:"🔢",badge:"SOF Olympiad",by:"SOF",site:"https://sofworld.org/imo",
   el:{qualLevel:["10","12","primary"],mandatorySubjects:["Mathematics"],minSubMarks:{},minMarks:null,note:"Class 1–12. School must be registered with SOF."},
   desc:"International Mathematics Olympiad – Class 1 to 12.",descHi:"कक्षा 1-12 के लिए अंतर्राष्ट्रीय गणित ओलंपियाड।",
   batches:[{n:"PW Olympiad",url:"https://pw.live/courses/olympiad",p:"PW"}],
   alts:["NSO","NTSE","NMTC","HBCSE Junior Math Olympiad"]},
];

const CATEGORIES_LIST = [
  {id:"all",l:"All Exams",lh:"सभी परीक्षाएं",icon:"🎯"},
  {id:"medical_engg",l:"Medical & Engineering",lh:"मेडिकल और इंजीनियरिंग",icon:"⚙️"},
  {id:"professional",l:"Professional",lh:"प्रोफेशनल",icon:"💼"},
  {id:"banking",l:"Banking (IBPS/SBI/RBI)",lh:"बैंकिंग",icon:"🏦"},
  {id:"railway",l:"Railways",lh:"रेलवे",icon:"🚉"},
  {id:"govt_central",l:"Govt (SSC/Central)",lh:"केंद्र सरकार (SSC)",icon:"📋"},
  {id:"defense_police",l:"Defense & Police",lh:"रक्षा और पुलिस",icon:"🪖"},
  {id:"upsc",l:"UPSC Exams",lh:"यूपीएससी परीक्षाएं",icon:"🇮🇳"},
  {id:"state_psc",l:"State PSC (All States)",lh:"राज्य PSC (सभी राज्य)",icon:"🏛️"},
  {id:"technical_jobs",l:"Technical Jobs",lh:"तकनीकी नौकरियां",icon:"🔧"},
  {id:"teaching",l:"Teaching Exams",lh:"शिक्षण परीक्षाएं",icon:"📚"},
  {id:"university_entrance",l:"University Entrance",lh:"विश्वविद्यालय प्रवेश",icon:"🎓"},
  {id:"school_olympiad",l:"School & Olympiad",lh:"स्कूल और ओलंपियाड",icon:"🏆"},
];

/* ═══════════════════════════════════════════════════════════════
   PARTNER UNIVERSITIES
═══════════════════════════════════════════════════════════════ */
const PARTNER_UNIVERSITIES = [
  {name:"Lovely Professional University",logo:"🎓",type:"Private",courses:"200+",state:"Punjab"},
  {name:"Amity University",logo:"🏛️",type:"Private",courses:"150+",state:"UP/Pan India"},
  {name:"Manipal University",logo:"🎓",type:"Private",courses:"180+",state:"Karnataka"},
  {name:"SRM University",logo:"🏫",type:"Private",courses:"160+",state:"Tamil Nadu"},
  {name:"Chandigarh University",logo:"🎓",type:"Private",courses:"120+",state:"Punjab"},
  {name:"UPES Dehradun",logo:"⚡",type:"Private",courses:"80+",state:"Uttarakhand"},
  {name:"Symbiosis International",logo:"📚",type:"Deemed",courses:"100+",state:"Maharashtra"},
  {name:"KIIT University",logo:"🔬",type:"Deemed",courses:"90+",state:"Odisha"},
];

/* ═══════════════════════════════════════════════════════════════
   ELIGIBILITY ENGINE
═══════════════════════════════════════════════════════════════ */
function checkEligibility(exam, ui) {
  const reasons = [];
  const smartRecs = new Set();
  const el = exam.el;
  const isSCST = ui.category==="SC"||ui.category==="ST";
  const isOBC = ui.category==="OBC";

  // Age
  if (el.minAge && Number(ui.age)<el.minAge) {
    reasons.push({field:"age",msg:ui.lang==="hi"?`आयु ${ui.age} वर्ष, न्यूनतम ${el.minAge} वर्ष आवश्यक है`:`Age ${ui.age} yrs is below minimum ${el.minAge} yrs`});
    smartRecs.add("age_issue");
  }
  const maxAge = isSCST?(el.maxAgeCat?.SC||el.maxAge):isOBC?(el.maxAgeCat?.OBC||el.maxAge):el.maxAge;
  if (maxAge&&Number(ui.age)>maxAge) {
    reasons.push({field:"age",msg:ui.lang==="hi"?`आयु ${ui.age} वर्ष, अधिकतम ${maxAge} वर्ष है (${ui.category} category)`:`Age ${ui.age} yrs exceeds max ${maxAge} yrs (${ui.category})`});
    smartRecs.add("age_issue");
  }

  // Qualification level
  const ql = ui.qualLevel;
  if (el.qualLevel&&!el.qualLevel.includes(ql)) {
    const needed = el.qualLevel.join(" / ");
    reasons.push({field:"qual",msg:ui.lang==="hi"?`इस परीक्षा के लिए ${needed} आवश्यक है`:`This exam requires: ${needed}`});
    if (["graduation","postgrad"].some(q=>el.qualLevel.includes(q))) smartRecs.add("graduation_needed");
  }

  // Graduation branch
  if (el.graduationBranches&&el.graduationBranches.length>0&&!el.graduationBranches.includes("Any Graduation")&&["graduation","postgrad","diploma"].includes(ql)) {
    if (ui.gradBranch&&!el.graduationBranches.some(b=>ui.gradBranch.includes(b.split("(")[0].trim())||b.includes(ui.gradBranch.split("(")[0].trim())||b==="Any Graduation")) {
      reasons.push({field:"branch",msg:ui.lang==="hi"?`आपकी ब्रांच ${ui.gradBranch} इस परीक्षा के लिए उपयुक्त नहीं है। आवश्यक: ${el.graduationBranches.slice(0,3).join(", ")}`:`Your branch (${ui.gradBranch}) doesn't match. Required: ${el.graduationBranches.slice(0,3).join(", ")}`});
    }
  }

  // Overall marks
  const minMk = isSCST?(el.minMarksCat?.SC||el.minMarks):isOBC?(el.minMarksCat?.OBC||el.minMarks):el.minMarks;
  if (minMk&&Number(ui.marks)<minMk) {
    const gap=(minMk-Number(ui.marks)).toFixed(1);
    reasons.push({field:"marks",msg:ui.lang==="hi"?`कुल अंक ${ui.marks}% – न्यूनतम ${minMk}% आवश्यक है (${gap}% कम)`:`Overall marks ${ui.marks}% – min ${minMk}% needed (short by ${gap}%)`});
    smartRecs.add(["12","diploma"].includes(ql)?"low_marks_12":"low_marks_grad");
  }

  // Mandatory subjects check (for 12th/10th)
  if (el.mandatorySubjects?.length>0&&["12","10","diploma"].includes(ql)&&ui.selectedSubjects) {
    const simpleReq = el.mandatorySubjects.filter(s=>!s.includes(" OR ")&&s!=="Any");
    simpleReq.forEach(sub=>{
      if (!ui.selectedSubjects.includes(sub)) {
        reasons.push({field:"subject",sub,msg:ui.lang==="hi"?`अनिवार्य विषय "${sub}" आपके विषयों में नहीं है`:`Mandatory subject "${sub}" is missing from your selected subjects`});
        smartRecs.add("missing_subjects");
      }
    });
  }

  // Per-subject marks
  if (el.minSubMarks&&ui.subjectMarks) {
    Object.entries(el.minSubMarks).forEach(([sub,req])=>{
      if (!ui.selectedSubjects?.includes(sub)) return;
      const got=Number(ui.subjectMarks[sub]);
      if (!isNaN(got)&&got<req) {
        reasons.push({field:"subject",sub,msg:ui.lang==="hi"?`${sub}: ${got}% अंक, न्यूनतम ${req}% आवश्यक है (${(req-got).toFixed(1)}% कम)`:`${sub}: ${got}% marks, minimum ${req}% needed (short by ${(req-got).toFixed(1)}%)`});
        smartRecs.add(["12","diploma"].includes(ql)?"low_marks_12":"low_marks_grad");
      }
    });
  }

  // Stream check
  if (el.streams&&el.streams.length>0&&["12","diploma"].includes(ql)&&ui.stream&&!el.streams.includes(ui.stream)) {
    const hasScienceOpt = el.optNote||el.el?.optNote;
    if (!hasScienceOpt) {
      reasons.push({field:"stream",msg:ui.lang==="hi"?`स्ट्रीम ${ui.stream} इस परीक्षा के लिए उपयुक्त नहीं है। आवश्यक: ${el.streams.join(", ")}`:`Stream ${ui.stream} not valid. Required: ${el.streams.join(", ")}`});
    }
  }

  // Physical checks
  if (el.height&&ui.height) {
    const reqH = ui.gender==="Female"?(el.height.F||el.height.M):
      (isOBC&&el.height.OBC_M?el.height.OBC_M:el.height.M);
    if (Number(ui.height)<reqH) {
      reasons.push({field:"physical",msg:ui.lang==="hi"?`ऊंचाई ${ui.height} सेमी, न्यूनतम ${reqH} सेमी आवश्यक है`:`Height ${ui.height} cm below min ${reqH} cm`});
      smartRecs.add("physical_issue");
    }
  }
  if (el.chest&&ui.gender!=="Female"&&ui.chest) {
    if (Number(ui.chest)<el.chest.normal) {
      reasons.push({field:"physical",msg:ui.lang==="hi"?`सीना ${ui.chest} सेमी, न्यूनतम ${el.chest.normal} सेमी आवश्यक है`:`Chest ${ui.chest} cm below min ${el.chest.normal} cm`});
      smartRecs.add("physical_issue");
    }
  }
  if (el.domicile&&ui.domicile&&el.domicile!==ui.domicile) {
    reasons.push({field:"domicile",msg:ui.lang==="hi"?`यह परीक्षा ${el.domicile} अधिवास के लिए है`:`This exam requires ${el.domicile} domicile`});
  }

  return {eligible:reasons.length===0,reasons,smartRecs:[...smartRecs]};
}

/* ═══════════════════════════════════════════════════════════════
   FORM VALIDATION
═══════════════════════════════════════════════════════════════ */
function validateForm(exam,ui) {
  const e={};
  if (!exam){e.exam="Please select an exam first.";return e;}
  if (!ui.age) e.age="Age is required.";
  else if (Number(ui.age)<5||Number(ui.age)>65) e.age="Enter valid age (5–65).";
  if (!ui.category) e.category="Select category.";
  if (!ui.gender) e.gender="Select gender.";
  if (!ui.qualLevel) e.qualLevel="Select qualification.";

  const ql=ui.qualLevel;
  const needsMarks=exam.el.minMarks!=null;
  if (needsMarks&&!ui.marks) e.marks="Overall marks % required.";
  else if (needsMarks&&ui.marks&&(Number(ui.marks)<0||Number(ui.marks)>100)) e.marks="Marks must be 0–100.";

  // Subject selection required for 12th exams with mandatory subjects
  const mandSimple=(exam.el.mandatorySubjects||[]).filter(s=>!s.includes(" OR ")&&s!=="Any"&&s!=="B.E/B.Tech or equivalent degree");
  if (mandSimple.length>0&&["12","10","diploma"].includes(ql)) {
    if (!ui.selectedSubjects||ui.selectedSubjects.length===0)
      e.subjects=`Select subjects – required: ${mandSimple.join(", ")}`;
  }
  // Per-subject marks for selected mandatory subjects
  if (exam.el.minSubMarks) {
    Object.keys(exam.el.minSubMarks).forEach(sub=>{
      if (ui.selectedSubjects?.includes(sub)) {
        const v=ui.subjectMarks?.[sub];
        if (!v) e[`sub_${sub}`]=`Enter ${sub} marks.`;
        else if (Number(v)<0||Number(v)>100) e[`sub_${sub}`]=`${sub}: 0–100 only.`;
      }
    });
  }
  // Physical
  if (exam.el.height&&!ui.height) e.height="Height required for this exam.";
  if (exam.el.chest&&ui.gender!=="Female"&&!ui.chest) e.chest="Chest measurement required.";
  return e;
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════════════ */
function SubjectSelector({ql,stream,selected,subMarks,exam,lang,onChange,onMarksChange}){
  const t=(en,hi)=>lang==="hi"?hi:en;
  const pool=useMemo(()=>{
    if (ql==="10") return SUBJECTS_10;
    if (ql==="12"||ql==="diploma") return SUBJECTS_12[stream]||SUBJECTS_12.Science;
    return [];
  },[ql,stream]);

  const mandSimple=(exam?.el?.mandatorySubjects||[]).filter(s=>!s.includes(" OR ")&&s!=="Any");
  const needMarks=Object.keys(exam?.el?.minSubMarks||{});

  if (!pool.length) return null;

  return (
    <div style={{marginTop:14,padding:12,background:"#0d1323",borderRadius:12,border:"1px solid #c084fc33"}}>
      <div style={{fontSize:12,fontWeight:700,color:"#c084fc",marginBottom:8}}>
        📚 {t("Select Your Subjects","अपने विषय चुनें")}
        {ql==="12"&&` (${t("Class 12","कक्षा 12")})`}
        {ql==="10"&&` (${t("Class 10","कक्षा 10")})`}
      </div>
      {mandSimple.length>0&&(
        <div style={{background:"#fbbf2411",border:"1px solid #fbbf2433",borderRadius:8,padding:"5px 10px",marginBottom:8,fontSize:11,color:"#fbbf24"}}>
          ⭐ {t("Mandatory for this exam:","इस परीक्षा के लिए अनिवार्य:")} <strong>{mandSimple.join(", ")}</strong>
        </div>
      )}
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
        {pool.map(sub=>{
          const isMand=mandSimple.includes(sub);
          const isSel=selected.includes(sub);
          return (
            <button key={sub} onClick={()=>{
              const next=isSel?selected.filter(s=>s!==sub):[...selected,sub];
              onChange(next);
            }} style={{padding:"4px 11px",borderRadius:20,fontSize:11,fontWeight:600,cursor:"pointer",border:"none",fontFamily:"inherit",transition:"all .2s",
              background:isSel?(isMand?"linear-gradient(135deg,#fbbf24,#f59e0b)":"linear-gradient(135deg,#4f6ef7,#7c3aed)"):"#1a2240",
              color:isSel?"#fff":isMand?"#fbbf24":"#8899cc",
              outline:isMand&&!isSel?"1.5px solid #fbbf2466":"none"}}>
              {isMand?"⭐":""}{sub}
            </button>
          );
        })}
      </div>
      {needMarks.filter(s=>selected.includes(s)).length>0&&(
        <div>
          <div style={{fontSize:11,color:"#7c9eff",marginBottom:6,fontWeight:600}}>
            📊 {t("Enter marks for key subjects (%)","मुख्य विषयों के अंक दर्ज करें (%)")}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:7}}>
            {needMarks.filter(s=>selected.includes(s)).map(sub=>{
              const req=exam.el.minSubMarks[sub];
              const got=Number(subMarks[sub]);
              const hasVal=subMarks[sub]!==undefined&&subMarks[sub]!=="";
              const ok=hasVal&&got>=req;
              const bad=hasVal&&got<req;
              return (
                <div key={sub}>
                  <label style={{fontSize:10,color:"#8899cc",display:"block",marginBottom:3}}>
                    {sub} <span style={{color:"#fbbf24"}}>(min {req}%)</span>
                  </label>
                  <input className={`input-field${bad?" error":""}`} type="number" min="0" max="100" placeholder={`${sub} %`}
                    value={subMarks[sub]||""}
                    onChange={e=>onMarksChange({...subMarks,[sub]:e.target.value})}
                    style={{fontSize:12,padding:"7px 10px",borderColor:bad?"#ff4d4f":ok?"#00d68f":undefined}} />
                  {bad&&<div style={{fontSize:10,color:"#ff7875",marginTop:2}}>❌ Need {req}%</div>}
                  {ok&&<div style={{fontSize:10,color:"#00d68f",marginTop:2}}>✅ OK</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function SmartRecs({recs,lang}){
  const [open,setOpen]=useState({});
  const t=(en,hi)=>lang==="hi"?hi:en;
  if (!recs||recs.length===0) return null;
  return (
    <div style={{padding:18,marginBottom:14,background:"linear-gradient(135deg,#fbbf2408,#f59e0b08)",border:"1px solid #fbbf2444",borderRadius:16}}>
      <div style={{fontSize:13,fontWeight:700,color:"#fbbf24",marginBottom:12}}>
        🧠 {t("AI Smart Recommendations – How to Become Eligible","AI सिफारिशें – पात्र कैसे बनें")}
      </div>
      {recs.map(key=>{
        const rec=IMPROVEMENT[key];
        if (!rec) return null;
        return (
          <div key={key} style={{marginBottom:14}}>
            <div style={{fontSize:12,fontWeight:700,color:"#e8ecf4",marginBottom:7}}>{lang==="hi"?rec.titleHi:rec.title}</div>
            {rec.recs.map((r,i)=>(
              <div key={i} style={{marginBottom:6,background:"#12182d",border:"1px solid #1e2a4a",borderRadius:10,overflow:"hidden"}}>
                <button onClick={()=>setOpen(p=>({...p,[`${key}${i}`]:!p[`${key}${i}`]}))}
                  style={{width:"100%",background:"none",border:"none",padding:"9px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:9,textAlign:"left",fontFamily:"inherit"}}>
                  <span style={{fontSize:18}}>{r.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:600,color:"#e8ecf4"}}>{lang==="hi"?r.labelHi:r.label}</div>
                    <div style={{display:"flex",gap:4,marginTop:2,flexWrap:"wrap"}}>
                      {r.tags.map(tag=>(
                        <span key={tag} style={{fontSize:10,background:"#4f6ef711",border:"1px solid #4f6ef733",color:"#7c9eff",padding:"1px 6px",borderRadius:10}}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span style={{color:"#4f6ef7",fontSize:12}}>{open[`${key}${i}`]?"▲":"▼"}</span>
                </button>
                {open[`${key}${i}`]&&(
                  <div style={{padding:"0 12px 10px",borderTop:"1px solid #1e2a4a"}}>
                    <p style={{fontSize:11,color:"#aab4d4",lineHeight:1.7,margin:"8px 0 7px"}}>{r.desc}</p>
                    {r.link&&<a href={r.link} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,background:"#4f6ef711",border:"1px solid #4f6ef744",color:"#7c9eff",padding:"4px 10px",borderRadius:7,textDecoration:"none",fontSize:11,fontWeight:600}}>
                      🌐 {t("Official Site →","आधिकारिक साइट →")}
                    </a>}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function CareerPanel({exam,eligible,lang}){
  const [tab,setTab]=useState("roles");
  const t=(en,hi)=>lang==="hi"?hi:en;
  const cp=CAREER_DB[exam?.id];
  if (!cp) return null;
  return (
    <div style={{padding:18,marginBottom:14,background:"linear-gradient(135deg,#0d1b35,#12182d)",border:"1px solid #1e2a4a",borderRadius:16}}>
      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:20}}>{cp.icon}</span>
        <div>
          <div style={{fontSize:13,fontWeight:700,color:"#e8ecf4"}}>{t("Career Paths","करियर पथ")} — {lang==="hi"?exam.nameHi:exam.name}</div>
          <div style={{fontSize:11,color:"#4f6ef7"}}>{cp.title}</div>
        </div>
      </div>
      <div style={{display:"flex",gap:5,marginBottom:12}}>
        {[{id:"roles",l:t("Job Roles","नौकरियां")},{id:"pg",l:t("Higher Studies","उच्च शिक्षा")}].map(tb=>(
          <button key={tb.id} onClick={()=>setTab(tb.id)}
            style={{padding:"5px 14px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:11,
              background:tab===tb.id?"linear-gradient(135deg,#4f6ef7,#7c3aed)":"transparent",
              color:tab===tb.id?"#fff":"#8899cc"}}>
            {tb.l}
          </button>
        ))}
      </div>
      {tab==="roles"&&(
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          {cp.paths.map((p,i)=>(
            <div key={i} style={{background:"#0d1323",border:"1px solid #1e2a4a",borderRadius:10,padding:"9px 12px",display:"flex",gap:9}}>
              <span style={{fontSize:20,flexShrink:0}}>{p.e}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:12,fontWeight:700,color:"#e8ecf4"}}>{p.r}</div>
                <div style={{fontSize:11,color:"#00d68f",margin:"2px 0 4px"}}>{p.s}</div>
              </div>
              {eligible&&<span style={{color:"#00d68f",fontSize:13,flexShrink:0}}>✓</span>}
            </div>
          ))}
        </div>
      )}
      {tab==="pg"&&(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {cp.pg.map((opt,i)=>(
            <div key={i} style={{background:"#0d1323",border:"1px solid #1e2a4a",borderRadius:10,padding:"8px 12px",display:"flex",gap:8}}>
              <span style={{fontSize:16}}>📌</span>
              <span style={{fontSize:12,color:"#c4d0ee"}}>{opt}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function EligibilityCalculator(){const openGoogleForm = () => {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSejRIZKVtmkPxJUjZbzAbduOxF4whfNKi6guVr9NtzlrAjh2w/viewform?usp=dialog", "_blank");
  };
  const [lang,setLang]=useState("en");
// Sirf ye line badal dein
const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [policyModalOpen,setPolicyModalOpen]=useState(false);
  const [activeTab,setActiveTab]=useState("finder");
  const [activeCat,setActiveCat]=useState("all");
  const [search,setSearch]=useState("");
  const [selExam,setSelExam]=useState(null);
  const [showResult,setShowResult]=useState(false);
  const [result,setResult]=useState(null);
  const [fieldErr,setFieldErr]=useState({});
  const [chatOpen,setChatOpen]=useState(false);
  const [chatMsgs,setChatMsgs]=useState([{from:"bot",text:"Hello! I'm your AI Career Counselor. Ask me about any exam, subject requirement, or career path!"}]);
  const [chatIn,setChatIn]=useState("");

  const [ui,setUi]=useState({
    age:"",marks:"",category:"General",gender:"Male",
    qualLevel:"12",stream:"Science",gradBranch:"Any Graduation",
    height:"",chest:"",domicile:"Uttar Pradesh",lang:"en",
    selectedSubjects:[],subjectMarks:{},
  });

  const t=useCallback((en,hi)=>lang==="hi"?hi:en,[lang]);

  const filtered=useMemo(()=>{
    let exs=activeCat==="all"?EXAMS:EXAMS.filter(e=>e.cat===activeCat);
    if (search.trim()) {
      const q=search.toLowerCase();
      exs=exs.filter(e=>e.name.toLowerCase().includes(q)||e.nameHi.includes(search)||e.by.toLowerCase().includes(q)||e.desc.toLowerCase().includes(q));
    }
    return exs;
  },[activeCat,search]);

  function pickExam(ex){
    setSelExam(ex);setShowResult(false);setFieldErr({});setResult(null);
    setUi(p=>({...p,selectedSubjects:[],subjectMarks:{}}));
    setActiveTab("checker");
  }

  function handleCheck(){
    const errors=validateForm(selExam,ui);
    setFieldErr(errors);
    if (Object.keys(errors).length>0) return;
    const res=checkEligibility(selExam,{...ui,lang});
    setResult(res);setShowResult(true);
  }

  function sendChat(){
    if (!chatIn.trim()) return;
    const msg=chatIn.trim();
    setChatMsgs(p=>[...p,{from:"user",text:msg}]);
    setChatIn("");
    setTimeout(()=>{
      const lc=msg.toLowerCase();
      let reply=lang==="hi"?"आपकी मदद के लिए यहाँ हूं। किसी भी परीक्षा या करियर के बारे में पूछें!":"Here to help! Ask about any exam, eligibility criteria, or career path.";
      if (lc.includes("neet")||lc.includes("medical")) reply=lang==="hi"?"NEET-UG 2026: Physics, Chemistry, Biology अनिवार्य। कुल 50% (SC/ST 40%)। आयु 17 वर्ष+।":"NEET-UG 2026: PCB mandatory, 50% overall (SC/ST 40%), age 17+. Biology ≥50%.";
      else if (lc.includes("jee")) reply=lang==="hi"?"JEE Main 2026: PCM अनिवार्य, 12वीं में 75% (SC/ST/OBC 65%)। Physics, Chemistry, Math प्रत्येक में 50%+ चाहिए।":"JEE Main 2026: PCM mandatory, 75% Class 12 (65% SC/ST/OBC). Each subject ≥50%.";
      else if (lc.includes("upsc")||lc.includes("ias")) reply=lang==="hi"?"UPSC CSE: स्नातक आवश्यक। आयु 21–32 वर्ष। 6 प्रयास (General)। Prelims + Mains + Interview।":"UPSC CSE: Graduation required, age 21–32, 6 attempts (General). Three stages: Prelims, Mains, Interview.";
      else if (lc.includes("nios")||lc.includes("improve")) reply=lang==="hi"?"NIOS से साल में 2 बार 12वीं सुधार परीक्षा दे सकते हैं (April/Oct)। nios.ac.in पर जाएं।":"NIOS allows 12th improvement twice a year (April & Oct). Accepted by NTA for JEE/NEET. Visit nios.ac.in";
      else if (lc.includes("bank")||lc.includes("ibps")||lc.includes("sbi")) reply=lang==="hi"?"IBPS PO: स्नातक आवश्यक, आयु 20–30। JAIIB/CAIIB बैंक कर्मचारियों के लिए प्रोन्नति परीक्षाएं हैं।":"IBPS PO: Graduation needed, age 20–30 (OBC 33, SC/ST 35). JAIIB/CAIIB are IIBF exams for bank employees.";
      else if (lc.includes("railway")||lc.includes("rrb")) reply=lang==="hi"?"RRB NTPC: 12वीं/स्नातक (पद-अनुसार), आयु 18–33। RRB JE: Diploma/B.Tech, आयु 18–33।":"RRB NTPC: 12th/Graduation (post-wise), age 18–33. RRB JE: Diploma/B.Tech, age 18–33.";
      setChatMsgs(p=>[...p,{from:"bot",text:reply}]);
    },700);
  }

  function ErrMsg({k}){
    if (!fieldErr[k]) return null;
    return <div style={{fontSize:10,color:"#ff7875",marginTop:3}}>⚠ {fieldErr[k]}</div>;
  }
  function IWrap({label,ek,children}){
    return <div><label style={{fontSize:11,color:"#8899cc",display:"block",marginBottom:3}}>{label}</label>{children}<ErrMsg k={ek}/></div>;
  }

  const showSubjectPicker=["12","10","diploma"].includes(ui.qualLevel)&&selExam&&selExam.el.mandatorySubjects?.length>0;
  const showGradBranch=["graduation","postgrad"].includes(ui.qualLevel)&&selExam?.el?.graduationBranches?.length>0&&!selExam.el.graduationBranches.includes("Any Graduation");
  const showPhysical=selExam?.el?.height||selExam?.el?.chest;

  return (
    <div style={{fontFamily:"'Sora',sans-serif",background:"#0a0e1a",minHeight:"100vh",color:"#e8ecf4"}}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#0a0e1a}::-webkit-scrollbar-thumb{background:#4f6ef7;border-radius:2px}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        @keyframes slideUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glow{0%,100%{box-shadow:0 0 5px #4f6ef766}50%{box-shadow:0 0 20px #4f6ef7aa}}
        @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
        .card{background:#12182d;border:1px solid #1e2a4a;border-radius:14px;transition:all .25s}
        .card:hover{border-color:#4f6ef755;transform:translateY(-2px);box-shadow:0 6px 24px #4f6ef722}
        .btn-primary{background:linear-gradient(135deg,#4f6ef7,#7c3aed);border:none;color:#fff;padding:11px 22px;border-radius:10px;cursor:pointer;font-family:inherit;font-weight:600;font-size:13px;transition:all .25s}
        .btn-primary:hover{transform:translateY(-1px);box-shadow:0 4px 18px #4f6ef766}
        .btn-primary:disabled{opacity:.45;cursor:not-allowed;transform:none}
        .btn-sec{background:transparent;border:1px solid #4f6ef7;color:#4f6ef7;padding:9px 18px;border-radius:10px;cursor:pointer;font-family:inherit;font-weight:500;font-size:12px;transition:all .25s}
        .btn-sec:hover{background:#4f6ef722}
        .input-field{background:#1a2240;border:1px solid #2a3560;border-radius:9px;color:#e8ecf4;padding:9px 12px;font-family:inherit;font-size:13px;width:100%;transition:border-color .25s;outline:none}
        .input-field:focus{border-color:#4f6ef7}
        .input-field.error{border-color:#ff4d4f;animation:shake .3s ease}
        select.input-field option{background:#1a2240}
        .tbtn{padding:9px 18px;border-radius:9px;border:none;cursor:pointer;font-family:inherit;font-weight:600;font-size:12px;transition:all .25s}
        .ta{background:linear-gradient(135deg,#4f6ef7,#7c3aed);color:#fff}
        .ti{background:transparent;color:#8899cc}
        .ti:hover{color:#4f6ef7;background:#4f6ef711}
        .elig-card{background:linear-gradient(135deg,#00d68f11,#00d68f22);border:1px solid #00d68f44}
        .inelig-card{background:linear-gradient(135deg,#ff4d4f11,#ff4d4f22);border:1px solid #ff4d4f44}
        .exam-sel{border-color:#4f6ef7 !important;box-shadow:0 0 0 2px #4f6ef733}
        .cpill{padding:7px 14px;border-radius:20px;border:1px solid #1e2a4a;background:#12182d;cursor:pointer;font-size:12px;font-weight:500;transition:all .25s;white-space:nowrap}
        .cpill.act{background:linear-gradient(135deg,#4f6ef722,#7c3aed22);border-color:#4f6ef7;color:#7c9eff}
        .cpill:hover:not(.act){border-color:#4f6ef766;color:#a0b4e8}
        .bdg{display:inline-flex;align-items:center;gap:3px;padding:2px 9px;border-radius:18px;font-size:10px;font-weight:600}
        .bdg-b{background:#4f6ef722;color:#7c9eff;border:1px solid #4f6ef744}
        .bdg-g{background:#00d68f22;color:#00d68f;border:1px solid #00d68f44}
        .bdg-o{background:#ff6b3522;color:#ff8c61;border:1px solid #ff6b3544}
        .bdg-p{background:#7c3aed22;color:#a78bfa;border:1px solid #7c3aed44}
        .bdg-r{background:#ff4d4f22;color:#ff7875;border:1px solid #ff4d4f44}
        .chat-b{background:#1a2240;border-radius:12px 12px 12px 2px}
        .chat-u{background:linear-gradient(135deg,#4f6ef7,#7c3aed);border-radius:12px 12px 2px 12px}
        .gdot{width:7px;height:7px;border-radius:50%;background:#00d68f;animation:pulse 2s infinite;display:inline-block}
        .err-box{background:#ff4d4f11;border:1px solid #ff4d4f44;border-radius:9px;padding:9px 12px;margin-bottom:10px;font-size:11px;color:#ff7875}
      `}</style>

      {/* HEADER */}
      <header style={{background:"#0d1323",borderBottom:"1px solid #1e2a4a",padding:"14px 20px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:1280,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:40,height:40,borderRadius:11,background:"linear-gradient(135deg,#4f6ef7,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,animation:"float 4s ease-in-out infinite"}}>🎯</div>
            <div>
              <div <div style={{
    fontSize: "clamp(18px, 3vw, 20px)", // 18px chota, 24px bada, screen ke hisaab se adjust hoga
    fontWeight: "700",             
    fontStyle: "italic",           
    letterSpacing: "0.5px",        
    background: "linear-gradient(135deg, #7c9eff, #c084fc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textTransform: "uppercase"      
}}>
    {t("Path Finder", "पाथ फाइंडर")}
</div>
              </div>
              <div style={{fontSize:10,color:"#4f6ef7",fontWeight:500}}>{t("55+ Exams • Subject-wise Analysis • AI Recs • 2025-26","55+ परीक्षाएं • विषयवार • AI सिफारिश • 2025-26")}</div>
            </div>
          </div>
          <div style={{display:"flex",gap:7,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{display:"flex",gap:3,background:"#12182d",padding:3,borderRadius:9,border:"1px solid #1e2a4a"}}>
              <button onClick={()=>{setLang("en");setUi(p=>({...p,lang:"en"}));}} className={`tbtn ${lang==="en"?"ta":"ti"}`} style={{padding:"5px 12px",fontSize:11}}>EN</button>
              <button onClick={()=>{setLang("hi");setUi(p=>({...p,lang:"hi"}));}} className={`tbtn ${lang==="hi"?"ta":"ti"}`} style={{padding:"5px 12px",fontSize:11,fontFamily:"'Noto Sans Devanagari'"}}>हिंदी</button>
            </div>
            <button className="btn-sec" style={{fontSize:11,padding:"6px 12px"}}>🏫 {t("School Connect","स्कूल कनेक्ट")}</button>
            <button className="btn-primary" style={{fontSize:11,padding:"6px 12px",background:"linear-gradient(135deg,#00d68f,#059669)"}} onClick={()=>openGoogleForm(true)}>🎯 {t("Free Guidance","फ्री गाइडेंस")}</button>
            <button className="btn-primary" style={{fontSize:11,padding:"6px 12px"}}>👤 {t("Login","लॉगिन")}</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <div style={{background:"linear-gradient(135deg,#0d1323,#141b35,#0d1323)",padding:"36px 20px 24px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 20% 50%,#4f6ef711,transparent 50%),radial-gradient(circle at 80% 50%,#7c3aed11,transparent 50%)"}}/>
        <div style={{maxWidth:780,margin:"0 auto",position:"relative"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:5,background:"#4f6ef711",border:"1px solid #4f6ef744",borderRadius:18,padding:"3px 12px",fontSize:11,color:"#7c9eff",marginBottom:12}}>
            <span className="gdot"/> {t("2025-26 Official Data • 55+ Exams • All States • AI Recommendations","2025-26 आधिकारिक डेटा • 55+ परीक्षाएं • सभी राज्य • AI सिफारिशें")}
          </div>
          <h1 style={{fontSize:"clamp(24px,4vw,40px)",fontWeight:800,background:"linear-gradient(135deg,#e8ecf4,#7c9eff,#c084fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1.2,marginBottom:10}}>
            {t("Your Complete Exam Eligibility & Career Engine","आपका संपूर्ण परीक्षा पात्रता और करियर इंजन")}
          </h1>
          <p style={{color:"#8899cc",fontSize:14,lineHeight:1.7,maxWidth:600,margin:"0 auto 20px",fontFamily:lang==="hi"?"'Noto Sans Devanagari'":"inherit"}}>
            {t("Select subjects with individual marks → Instant eligibility → AI tells you exactly what to fix → Detailed career roadmaps for every exam","विषय + अंक चुनें → तुरंत पात्रता → AI बताए क्या सुधारें → हर परीक्षा के करियर रोडमैप")}
          </p>
          <div style={{display:"flex",gap:9,justifyContent:"center",flexWrap:"wrap"}}>
            <button className="btn-primary" onClick={()=>setActiveTab("checker")} style={{fontSize:13,padding:"11px 22px"}}>✅ {t("Check My Eligibility","पात्रता जांचें")}</button>
            <button className="btn-sec" onClick={()=>setActiveTab("finder")} style={{fontSize:13,padding:"11px 22px"}}>🔍 {t("Browse 55+ Exams","55+ परीक्षाएं देखें")}</button>
            <button onClick={openGoogleForm} style={{fontSize:13,padding:"11px 22px",background:"linear-gradient(135deg,#00d68f,#059669)",border:"none",color:"#fff",borderRadius:10,cursor:"pointer",fontFamily:"inherit",fontWeight:700,transition:"all .25s"}}>
              🎓 {t("Get Free Career Counseling","निःशुल्क करियर काउंसलिंग")}
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{background:"#0d1323",borderBottom:"1px solid #1e2a4a",padding:"9px 20px"}}>
        <div style={{maxWidth:1280,margin:"0 auto",display:"flex",gap:24,justifyContent:"center",flexWrap:"wrap"}}>
          {[{n:"55+",l:t("Exams","परीक्षाएं")},{n:"13",l:t("Categories","श्रेणियां")},{n:"All States",l:t("PSC Coverage","PSC कवरेज")},{n:"JAIIB/CAIIB",l:t("Banking","बैंकिंग")},{n:"AI",l:t("Smart Recs","AI सिफारिश")},{n:"2026",l:t("Updated","अपडेट")}].map(s=>(
            <div key={s.l} style={{textAlign:"center"}}>
              <div style={{fontSize:16,fontWeight:800,color:"#7c9eff"}}>{s.n}</div>
              <div style={{fontSize:10,color:"#4f6ef7"}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* LEAD CAPTURE STRIP */}
      <div style={{background:"linear-gradient(90deg,#0d2b1e,#0a1a2e,#1a0d2e)",borderBottom:"1px solid #00d68f22",padding:"10px 20px"}}>
        <div style={{maxWidth:1280,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:20}}>👨‍🏫</span>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:"#e8ecf4"}}>{t("Not sure which exam to target?","कौन सी परीक्षा दें – तय नहीं है?")}</div>
              <div style={{fontSize:11,color:"#8899cc"}}>{t("Get a FREE 1:1 session with our expert career counselors within 24 hrs","24 घंटे में हमारे विशेषज्ञ से FREE 1:1 सत्र पाएं")}</div>
            </div>
          </div>
          <button onClick={()=>openGoogleForm(true)} style={{background:"linear-gradient(135deg,#00d68f,#059669)",border:"none",color:"#fff",padding:"9px 20px",borderRadius:10,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:12,whiteSpace:"nowrap",flexShrink:0}}>
            🎯 {t("Book Free Session →","फ्री सत्र बुक करें →")}
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{maxWidth:1280,margin:"0 auto",padding:"18px 14px"}}>
        {/* TABS */}
        <div style={{display:"flex",gap:5,marginBottom:18,background:"#12182d",padding:3,borderRadius:12,border:"1px solid #1e2a4a",width:"fit-content",flexWrap:"wrap"}}>
          {[{id:"finder",icon:"🔍",l:t("Exam Finder","परीक्षा खोजें")},{id:"checker",icon:"✅",l:t("Eligibility Checker","पात्रता जांचें")},{id:"partners",icon:"🏛️",l:t("Partners","पार्टनर")}].map(tab=>(
            <button key={tab.id} className={`tbtn ${activeTab===tab.id?"ta":"ti"}`} onClick={()=>{setActiveTab(tab.id);setShowResult(false);}}>
              {tab.icon} {tab.l}
            </button>
          ))}
        </div>

        {/* ══ EXAM FINDER ══ */}
        {activeTab==="finder"&&(
          <div style={{animation:"slideUp .35s ease"}}>
            <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:220,position:"relative"}}>
                <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#4f6ef7",fontSize:15}}>🔍</span>
                <input className="input-field" style={{paddingLeft:36}} placeholder={t("Search exams, boards...","परीक्षा, बोर्ड खोजें...")} value={search} onChange={e=>setSearch(e.target.value)}/>
              </div>
            </div>
            {/* Category pills */}
            <div style={{display:"flex",gap:7,marginBottom:18,overflowX:"auto",paddingBottom:4}}>
              {CATEGORIES_LIST.map(cat=>(
                <button key={cat.id} className={`cpill ${activeCat===cat.id?"act":""}`} onClick={()=>setActiveCat(cat.id)}>
                  {cat.icon} {lang==="hi"?cat.lh:cat.l}
                </button>
              ))}
            </div>
            {/* Count */}
            <div style={{fontSize:12,color:"#4f6ef7",marginBottom:10}}>{t(`Showing ${filtered.length} exams`,`${filtered.length} परीक्षाएं दिख रही हैं`)}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:12}}>
              {filtered.map(exam=>(
                <div key={exam.id} className={`card ${selExam?.id===exam.id?"exam-sel":""}`} style={{padding:16,cursor:"pointer"}} onClick={()=>pickExam(exam)}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:9}}>
                    <div style={{display:"flex",gap:9,alignItems:"center"}}>
                      <span style={{fontSize:24}}>{exam.logo}</span>
                      <div>
                        <div style={{fontWeight:700,fontSize:13,color:"#e8ecf4"}}>{lang==="hi"?exam.nameHi:exam.name}</div>
                        <div style={{fontSize:10,color:"#4f6ef7",marginTop:1}}>{exam.by}</div>
                      </div>
                    </div>
                    <span className={`bdg ${exam.badge.includes("⚠")?"bdg-o":"bdg-b"}`}>{exam.badge}</span>
                  </div>
                  {/* Mandatory subjects preview */}
                  {(exam.el.mandatorySubjects||[]).filter(s=>!s.includes(" OR ")&&s!=="Any").slice(0,3).length>0&&(
                    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:7}}>
                      {(exam.el.mandatorySubjects||[]).filter(s=>!s.includes(" OR ")&&s!=="Any").slice(0,3).map(s=>(
                        <span key={s} style={{fontSize:9,background:"#fbbf2411",border:"1px solid #fbbf2433",color:"#fbbf24",padding:"1px 6px",borderRadius:9}}>⭐{s}</span>
                      ))}
                    </div>
                  )}
                  <p style={{fontSize:11,color:"#8899cc",lineHeight:1.6,marginBottom:9}}>{lang==="hi"?exam.descHi:exam.desc}</p>
                  <div style={{display:"flex",gap:5,alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{display:"flex",gap:4}}>
                      {(exam.batches||[]).slice(0,2).map(b=>(
                        <span key={b.p} className={`bdg bdg-${b.p==="PW"?"o":b.p==="Aakash"?"b":"g"}`} style={{fontSize:9}}>{b.p}</span>
                      ))}
                    </div>
                    <button className="btn-primary" style={{fontSize:10,padding:"5px 11px"}} onClick={e=>{e.stopPropagation();pickExam(exam);}}>
                      {t("Check →","जांचें →")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {filtered.length===0&&(
              <div style={{textAlign:"center",padding:"50px 20px",color:"#4f6ef7"}}>
                <div style={{fontSize:36,marginBottom:10}}>🔍</div>
                <div style={{fontSize:15,fontWeight:600}}>{t("No exams found","कोई परीक्षा नहीं मिली")}</div>
              </div>
            )}
          </div>
        )}

        {/* ══ ELIGIBILITY CHECKER ══ */}
        {activeTab==="checker"&&(
          <div style={{animation:"slideUp .35s ease"}}>
            <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)",gap:18,alignItems:"start"}}>

              {/* LEFT: FORM */}
              <div>
                {/* Step 1: Pick exam */}
                <div style={{marginBottom:14}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#7c9eff",marginBottom:7}}>
                    {t("1. Select Exam","1. परीक्षा चुनें")}
                    {fieldErr.exam&&<span style={{color:"#ff7875",fontSize:10,marginLeft:8}}>← {fieldErr.exam}</span>}
                  </div>
                  {/* Category quick filter in checker */}
                  <div style={{display:"flex",gap:5,marginBottom:8,overflowX:"auto",paddingBottom:2}}>
                    {CATEGORIES_LIST.slice(0,8).map(c=>(
                      <button key={c.id} className={`cpill ${activeCat===c.id?"act":""}`} style={{fontSize:10,padding:"4px 10px"}} onClick={()=>setActiveCat(c.id)}>
                        {c.icon}
                      </button>
                    ))}
                    <button className={`cpill ${["state_psc","teaching","university_entrance","school_olympiad"].includes(activeCat)?"act":""}`} style={{fontSize:10,padding:"4px 10px"}} onClick={()=>setActiveCat("state_psc")}>🏛️+</button>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:5,maxHeight:200,overflowY:"auto",paddingRight:2}}>
                    {filtered.map(exam=>(
                      <div key={exam.id} className={`card ${selExam?.id===exam.id?"exam-sel":""}`}
                        style={{padding:"9px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:7}}
                        onClick={()=>pickExam(exam)}>
                        <span style={{fontSize:16}}>{exam.logo}</span>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:11,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{lang==="hi"?exam.nameHi:exam.name}</div>
                          <div style={{fontSize:9,color:"#4f6ef7"}}>{exam.by}</div>
                        </div>
                        {selExam?.id===exam.id&&<span style={{color:"#4f6ef7",fontSize:14,flexShrink:0}}>✓</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exam eligibility note */}
                {selExam&&(
                  <div style={{background:"#0d1323",border:"1px solid #4f6ef722",borderRadius:10,padding:10,marginBottom:12}}>
                    <div style={{fontSize:10,fontWeight:700,color:"#7c9eff",marginBottom:4}}>
                      📋 {lang==="hi"?selExam.nameHi:selExam.name} — {t("Requirements","आवश्यकताएं")}
                    </div>
                    <div style={{fontSize:10,color:"#aab4d4",lineHeight:1.7}}>{selExam.el.note}</div>
                    {selExam.el.optNote&&<div style={{fontSize:10,color:"#fbbf24",marginTop:3,fontStyle:"italic"}}>ℹ️ {selExam.el.optNote}</div>}
                  </div>
                )}

                {/* Step 2: Your details */}
                <div style={{fontSize:12,fontWeight:700,color:"#7c9eff",marginBottom:7}}>{t("2. Your Details","2. आपकी जानकारी")}</div>
                {Object.keys(fieldErr).length>0&&<div className="err-box">⚠️ {t("Fix highlighted fields before checking.","हाइलाइट किए गए फील्ड ठीक करें।")}</div>}

                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
                  <IWrap label={t("Age (years)","आयु (वर्ष)")} ek="age">
                    <input className={`input-field${fieldErr.age?" error":""}`} type="number" placeholder="e.g. 20" value={ui.age} onChange={e=>setUi(p=>({...p,age:e.target.value}))}/>
                  </IWrap>
                  <IWrap label={t("Category","श्रेणी")} ek="category">
                    <select className="input-field" value={ui.category} onChange={e=>setUi(p=>({...p,category:e.target.value}))}>
                      {["General","OBC","SC","ST","EWS","PWD"].map(o=><option key={o}>{o}</option>)}
                    </select>
                  </IWrap>
                  <IWrap label={t("Gender","लिंग")} ek="gender">
                    <select className="input-field" value={ui.gender} onChange={e=>setUi(p=>({...p,gender:e.target.value}))}>
                      {["Male","Female","Other"].map(o=><option key={o}>{o}</option>)}
                    </select>
                  </IWrap>
                  <IWrap label={t("Qualification","योग्यता")} ek="qualLevel">
                    <select className="input-field" value={ui.qualLevel} onChange={e=>setUi(p=>({...p,qualLevel:e.target.value,selectedSubjects:[],subjectMarks:{},gradBranch:"Any Graduation"}))}>
                      <option value="10">Class 10</option>
                      <option value="12">Class 12</option>
                      <option value="diploma">Diploma</option>
                      <option value="graduation">Graduation</option>
                      <option value="postgrad">Post Graduation</option>
                    </select>
                  </IWrap>
                  {["12","diploma"].includes(ui.qualLevel)&&(
                    <IWrap label={t("Stream","स्ट्रीम")} ek="stream">
                      <select className="input-field" value={ui.stream} onChange={e=>setUi(p=>({...p,stream:e.target.value,selectedSubjects:[],subjectMarks:{}}))}>
                        <option>Science</option><option>Commerce</option><option value="Arts">Arts / Humanities</option>
                      </select>
                    </IWrap>
                  )}
                  {showGradBranch&&(
                    <IWrap label={t("Graduation Branch","स्नातक ब्रांच")} ek="gradBranch">
                      <select className="input-field" value={ui.gradBranch} onChange={e=>setUi(p=>({...p,gradBranch:e.target.value}))}>
                        {GRADUATION_BRANCHES.map(b=><option key={b}>{b}</option>)}
                      </select>
                    </IWrap>
                  )}
                  {["postgrad"].includes(ui.qualLevel)&&(
                    <IWrap label={t("PG Branch","PG ब्रांच")} ek="gradBranch">
                      <select className="input-field" value={ui.gradBranch} onChange={e=>setUi(p=>({...p,gradBranch:e.target.value}))}>
                        {POSTGRAD_BRANCHES.map(b=><option key={b}>{b}</option>)}
                      </select>
                    </IWrap>
                  )}
                  <IWrap label={t("Overall Marks (%)","कुल अंक (%)")} ek="marks">
                    <input className={`input-field${fieldErr.marks?" error":""}`} type="number" min="0" max="100" placeholder="e.g. 72" value={ui.marks} onChange={e=>setUi(p=>({...p,marks:e.target.value}))}/>
                  </IWrap>
                  <IWrap label={t("State / Domicile","राज्य / अधिवास")} ek="domicile">
                    <select className="input-field" value={ui.domicile} onChange={e=>setUi(p=>({...p,domicile:e.target.value}))}>
                      {["Uttar Pradesh","Delhi","Maharashtra","Bihar","Rajasthan","Madhya Pradesh","Punjab","Haryana","Gujarat","Karnataka","Tamil Nadu","West Bengal","Jharkhand","Odisha","Other"].map(s=><option key={s}>{s}</option>)}
                    </select>
                  </IWrap>
                </div>

                {/* Subject Selector */}
                {showSubjectPicker&&(
                  <div>
                    <SubjectSelector ql={ui.qualLevel} stream={ui.stream} selected={ui.selectedSubjects} subMarks={ui.subjectMarks} exam={selExam} lang={lang}
                      onChange={s=>setUi(p=>({...p,selectedSubjects:s}))}
                      onMarksChange={sm=>setUi(p=>({...p,subjectMarks:sm}))}/>
                    {fieldErr.subjects&&<div style={{fontSize:11,color:"#ff7875",marginTop:4,background:"#ff4d4f11",border:"1px solid #ff4d4f33",padding:"5px 9px",borderRadius:7}}>⚠ {fieldErr.subjects}</div>}
                    {Object.keys(fieldErr).filter(k=>k.startsWith("sub_")).map(k=>(
                      <div key={k} style={{fontSize:10,color:"#ff7875",marginTop:3}}>⚠ {fieldErr[k]}</div>
                    ))}
                  </div>
                )}

                {/* Physical details for defense */}
                {showPhysical&&(
                  <div style={{marginTop:12,padding:11,background:"#0d1323",borderRadius:10,border:"1px solid #7c3aed33"}}>
                    <div style={{fontSize:11,color:"#c084fc",marginBottom:7,fontWeight:700}}>🪖 {t("Physical Details (Defense/Police)","शारीरिक विवरण (रक्षा/पुलिस)")}</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                      {selExam.el.height&&(
                        <IWrap label={t("Height (cm)","ऊंचाई (सेमी)")} ek="height">
                          <input className={`input-field${fieldErr.height?" error":""}`} type="number" placeholder="e.g. 168" value={ui.height} onChange={e=>setUi(p=>({...p,height:e.target.value}))} style={{fontSize:12}}/>
                        </IWrap>
                      )}
                      {selExam.el.chest&&ui.gender!=="Female"&&(
                        <IWrap label={t("Chest (cm)","सीना (सेमी)")} ek="chest">
                          <input className={`input-field${fieldErr.chest?" error":""}`} type="number" placeholder="e.g. 80" value={ui.chest} onChange={e=>setUi(p=>({...p,chest:e.target.value}))} style={{fontSize:12}}/>
                        </IWrap>
                      )}
                    </div>
                    {selExam.el.vision&&<div style={{fontSize:10,color:"#8899cc",marginTop:5,fontStyle:"italic"}}>👁 {t("Vision requirement:","दृष्टि आवश्यकता:")} {selExam.el.vision}</div>}
                  </div>
                )}

                <button className="btn-primary" onClick={handleCheck}
                  style={{width:"100%",marginTop:14,fontSize:13,padding:"12px"}} disabled={!selExam}>
                  {selExam?`✅ ${t("Check Eligibility for","पात्रता जांचें")} ${lang==="hi"?selExam.nameHi:selExam.name}`:t("Select an Exam First","पहले परीक्षा चुनें")}
                </button>
              </div>

              {/* RIGHT: RESULTS */}
              <div>
                {!showResult&&(
                  <div style={{padding:"50px 20px",textAlign:"center",border:"1px dashed #1e2a4a",borderRadius:14}}>
                    <div style={{fontSize:44,marginBottom:12,animation:"float 3s ease-in-out infinite"}}>🎯</div>
                    <div style={{fontSize:14,fontWeight:600,color:"#7c9eff",marginBottom:5}}>{t("Your Results Appear Here","यहाँ परिणाम दिखेंगे")}</div>
                    <div style={{fontSize:11,color:"#8899cc"}}>{t("Select exam → fill details → click Check","परीक्षा चुनें → विवरण भरें → जांचें")}</div>
                  </div>
                )}

                {showResult&&result&&selExam&&(
                  <div style={{animation:"slideUp .35s ease"}}>
                    {/* Verdict Card */}
                    <div className={`card ${result.eligible?"elig-card":"inelig-card"}`} style={{padding:18,marginBottom:12}}>
                      <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:12}}>
                        <span style={{fontSize:32}}>{result.eligible?"✅":"❌"}</span>
                        <div>
                          <div style={{fontSize:17,fontWeight:800,color:result.eligible?"#00d68f":"#ff7875"}}>
                            {result.eligible?t("You Are ELIGIBLE!","आप पात्र हैं!"):t("Not Eligible Yet","अभी पात्र नहीं")}
                          </div>
                          <div style={{fontSize:11,color:"#8899cc"}}>{lang==="hi"?selExam.nameHi:selExam.name}</div>
                        </div>
                      </div>
                      {!result.eligible&&result.reasons.length>0&&(
                        <div style={{marginBottom:12}}>
                          <div style={{fontSize:11,fontWeight:700,color:"#ff7875",marginBottom:7}}>
                            ⚠️ {t("Specific Reasons You're Not Eligible:","आप पात्र क्यों नहीं – विशिष्ट कारण:")}
                          </div>
                          {result.reasons.map((r,i)=>(
                            <div key={i} style={{display:"flex",gap:7,marginBottom:5,padding:"6px 9px",
                              background:r.field==="subject"?"#ff4d4f0a":r.field==="marks"?"#ff6b350a":r.field==="physical"?"#c084fc0a":"#ff4d4f0a",
                              border:`1px solid ${r.field==="subject"?"#ff4d4f33":r.field==="marks"?"#ff6b3533":r.field==="physical"?"#c084fc33":"#ff4d4f22"}`,
                              borderRadius:7,fontSize:11,color:"#ffb3b3",fontFamily:lang==="hi"?"'Noto Sans Devanagari'":"inherit"}}>
                              <span style={{flexShrink:0}}>{r.field==="subject"?"📚":r.field==="marks"?"📊":r.field==="age"?"🎂":r.field==="physical"?"💪":r.field==="branch"?"🎓":"ℹ️"}</span>
                              {r.msg}
                            </div>
                          ))}
                        </div>
                      )}
                      {result.eligible&&(
                        <a href={selExam.site} target="_blank" rel="noopener noreferrer"
                          style={{display:"inline-flex",alignItems:"center",gap:5,background:"#00d68f",color:"#0a1a12",padding:"9px 16px",borderRadius:9,fontWeight:700,textDecoration:"none",fontSize:12}}>
                          🌐 {t("Apply on Official Site →","आधिकारिक साइट पर आवेदन →")}
                        </a>
                      )}
                    </div>

                    {/* Smart AI Recs */}
                    {!result.eligible&&result.smartRecs.length>0&&(
                      <SmartRecs recs={result.smartRecs} lang={lang}/>
                    )}

                    {/* Coaching Batches */}
                    {result.eligible&&(selExam.batches||[]).length>0&&(
                      <div className="card" style={{padding:16,marginBottom:12}}>
                        <div style={{fontSize:12,fontWeight:700,color:"#7c9eff",marginBottom:9}}>📚 {t("Recommended Coaching Batches","अनुशंसित कोचिंग बैच")}</div>
                        <div style={{display:"flex",flexDirection:"column",gap:6}}>
                          {selExam.batches.map(b=>(
                            <a key={b.n} href={b.url} target="_blank" rel="noopener noreferrer"
                              style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 12px",borderRadius:9,textDecoration:"none",
                                background:b.p==="PW"?"#ff6b3511":b.p==="Aakash"?"#1a73e811":"#2ecc7111",
                                border:`1px solid ${b.p==="PW"?"#ff6b3533":b.p==="Aakash"?"#1a73e833":"#2ecc7133"}`}}>
                              <div>
                                <div style={{fontSize:12,fontWeight:600,color:"#e8ecf4"}}>{b.n}</div>
                                <div style={{fontSize:10,color:b.p==="PW"?"#ff8c61":b.p==="Aakash"?"#64b5f6":"#5dde95"}}>{b.p}</div>
                              </div>
                              <span style={{fontSize:14,color:"#8899cc"}}>→</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Alternatives */}
                    {!result.eligible&&(selExam.alts||[]).length>0&&(
                      <div className="card" style={{padding:16,marginBottom:12}}>
                        <div style={{fontSize:12,fontWeight:700,color:"#c084fc",marginBottom:8}}>🔄 {t("Alternative Exams","वैकल्पिक परीक्षाएं")}</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                          {selExam.alts.map(alt=>(
                            <span key={alt} className="bdg bdg-p" style={{fontSize:11,padding:"5px 10px"}}>🎯 {alt}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Career Path */}
                    <CareerPanel exam={selExam} eligible={result.eligible} lang={lang}/>

                    {/* Support */}
                    <div className="card" style={{padding:16}}>
                      <div style={{fontSize:12,fontWeight:700,color:"#7c9eff",marginBottom:9}}>🤝 {t("Support Services","सहायता सेवाएं")}</div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                        <a href={selExam.site} target="_blank" rel="noopener noreferrer"
                          style={{padding:"9px 10px",background:"#4f6ef711",border:"1px solid #4f6ef733",borderRadius:9,textDecoration:"none",textAlign:"center"}}>
                          <div style={{fontSize:16,marginBottom:2}}>📄</div>
                          <div style={{fontSize:10,color:"#7c9eff",fontWeight:600}}>{t("Official Notifications","आधिकारिक अधिसूचनाएं")}</div>
                        </a>
                        <button onClick={()=>setChatOpen(true)} style={{padding:"9px 10px",background:"#00d68f11",border:"1px solid #00d68f33",borderRadius:9,cursor:"pointer"}}>
                          <div style={{fontSize:16,marginBottom:2}}>🤖</div>
                          <div style={{fontSize:10,color:"#00d68f",fontWeight:600}}>{t("AI Counselor Chat","AI काउंसलर")}</div>
                        </button>
                        <button onClick={()=>openGoogleForm(true)} style={{padding:"9px 10px",background:"#fbbf2411",border:"1px solid #fbbf2433",borderRadius:9,cursor:"pointer"}}>
                          <div style={{fontSize:16,marginBottom:2}}>👨‍💼</div>
                          <div style={{fontSize:10,color:"#fbbf24",fontWeight:600}}>{t("1:1 Expert Session","एक्सपर्ट सत्र")}</div>
                        </button>
                        <button onClick={()=>openGoogleForm(true)} style={{padding:"9px 10px",background:"#c084fc11",border:"1px solid #c084fc33",borderRadius:9,cursor:"pointer"}}>
                          <div style={{fontSize:16,marginBottom:2}}>📅</div>
                          <div style={{fontSize:10,color:"#c084fc",fontWeight:600}}>{t("Book Counseling","काउंसलिंग बुक करें")}</div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══ PARTNERS ══ */}
        {activeTab==="partners"&&(
          <div style={{animation:"slideUp .35s ease"}}>
            <div style={{textAlign:"center",marginBottom:22}}>
              <h2 style={{fontSize:20,fontWeight:800,color:"#e8ecf4",marginBottom:5}}>🏛️ {t("Partner Universities","पार्टनर विश्वविद्यालय")}</h2>
              <p style={{color:"#8899cc",fontSize:12}}>{t("Direct admission referrals across India","भारत में सीधे प्रवेश रेफरल")}</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12}}>
              {PARTNER_UNIVERSITIES.map(uni=>(
                <div key={uni.name} className="card" style={{padding:18,textAlign:"center"}}>
                  <div style={{fontSize:32,marginBottom:9}}>{uni.logo}</div>
                  <div style={{fontWeight:700,fontSize:13,marginBottom:5}}>{uni.name}</div>
                  <div style={{fontSize:11,color:"#8899cc",marginBottom:8}}>{uni.state}</div>
                  <div style={{display:"flex",gap:5,justifyContent:"center",marginBottom:12}}>
                    <span className="bdg bdg-b">{uni.type}</span>
                    <span className="bdg bdg-g">{uni.courses} {t("Courses","कोर्स")}</span>
                  </div>
                  <button className="btn-primary" style={{width:"100%",fontSize:11}}>{t("Get Direct Admission →","सीधे प्रवेश →")}</button>
                </div>
              ))}
            </div>
            <div className="card" style={{padding:18,marginTop:14,background:"linear-gradient(135deg,#4f6ef711,#7c3aed11)",border:"1px solid #4f6ef733"}}>
              <div style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{fontSize:30}}>🏫</span>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:14,marginBottom:3}}>{t("School & College Connect Portal","स्कूल और कॉलेज कनेक्ट पोर्टल")}</div>
                  <div style={{fontSize:11,color:"#8899cc"}}>{t("Register for bulk eligibility checks and career guidance sessions.","बल्क पात्रता जांच के लिए पंजीकरण करें।")}</div>
                </div>
                <button className="btn-primary" style={{whiteSpace:"nowrap",fontSize:11}}>🔑 {t("Login / Register","लॉगिन / पंजीकरण")}</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DISCLAIMER + FOOTER */}
      <div style={{background:"#0d1323",borderTop:"1px solid #1e2a4a",padding:"16px 20px",marginTop:24}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          {/* Data policy row */}
          <div style={{display:"flex",gap:9,alignItems:"flex-start",marginBottom:12,paddingBottom:12,borderBottom:"1px solid #1e2a4a"}}>
            <span style={{fontSize:14,flexShrink:0}}>🔒</span>
            <p style={{fontSize:10,color:"#4f6ef7",lineHeight:1.7,fontFamily:"'Noto Sans Devanagari','Sora',sans-serif"}}>
              <strong style={{color:"#7c9eff"}}>Data Security:</strong>{" "}
              {t(
                <>By using this platform and submitting your details, you agree to our{" "}
                  <button onClick={()=>setPolicyModalOpen(true)} style={{background:"none",border:"none",color:"#c084fc",textDecoration:"underline",cursor:"pointer",fontFamily:"inherit",fontSize:"inherit",padding:0,fontWeight:700}}>
                    Data Security Policy
                  </button>. Your data is stored securely on Supabase (AES-256 encrypted, TLS 1.2+) and used only for mentorship, career guidance, and promotional purposes by verified and trusted sources. We comply with India's DPDP Act 2023. You may opt-out anytime by emailing optout@careermap.in.</>,
                <>इस Platform का उपयोग करके और अपनी जानकारी सबमिट करके, आप हमारी{" "}
                  <button onClick={()=>setPolicyModalOpen(true)} style={{background:"none",border:"none",color:"#c084fc",textDecoration:"underline",cursor:"pointer",fontFamily:"'Noto Sans Devanagari'",fontSize:"inherit",padding:0,fontWeight:700}}>
                    डेटा सुरक्षा नीति
                  </button>{" "}
                  से सहमत हैं। आपका डेटा Supabase पर सुरक्षित संग्रहीत है और केवल mentorship, करियर मार्गदर्शन और verified sources के साथ प्रमोशनल उद्देश्यों के लिए उपयोग किया जाएगा।</>
              )}
            </p>
          </div>
          {/* Exam disclaimer row */}
          <div style={{display:"flex",gap:9,alignItems:"flex-start"}}>
            <span style={{fontSize:14,flexShrink:0}}>⚠️</span>
            <p style={{fontSize:10,color:"#4f6ef7",lineHeight:1.7,fontFamily:"'Noto Sans Devanagari','Sora',sans-serif"}}>
              <strong style={{color:"#7c9eff"}}>Exam Disclaimer:</strong> Yeh data 2025-2026 ke latest official notifications par aadharit hai (NTA, UPSC, SSC, IBPS, IIBF, RRB, UPPBPB, State PSCs). Halanki hum accuracy ka dhyan rakhte hain, lekin niyam kabhi bhi badal sakte hain. Final decision se pehle hamesha official website verify karein. यह डेटा 2025-2026 के नवीनतम आधिकारिक अधिसूचनाओं पर आधारित है। अंतिम निर्णय से पहले आधिकारिक वेबसाइट पर सत्यापन अनिवार्य है।
            </p>
          </div>
          {/* Footer links */}
          <div style={{display:"flex",gap:14,marginTop:12,paddingTop:12,borderTop:"1px solid #1e2a4a",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <button onClick={()=>setPolicyModalOpen(true)} style={{background:"none",border:"none",color:"#7c9eff",cursor:"pointer",fontFamily:"inherit",fontSize:11,textDecoration:"underline",padding:0}}>
                🔒 {t("Data Security Policy","डेटा सुरक्षा नीति")}
              </button>
              <button onClick={()=>setPolicyModalOpen(true)} style={{background:"none",border:"none",color:"#7c9eff",cursor:"pointer",fontFamily:"inherit",fontSize:11,textDecoration:"underline",padding:0}}>
                📋 {t("Terms & Conditions","नियम और शर्तें")}
              </button>
              <button onClick={()=>setPolicyModalOpen(true)} style={{background:"none",border:"none",color:"#7c9eff",cursor:"pointer",fontFamily:"inherit",fontSize:11,textDecoration:"underline",padding:0}}>
                🛡️ {t("Privacy Policy","गोपनीयता नीति")}
              </button>
              <a href="mailto:dpo@careermap.in" style={{color:"#7c9eff",fontSize:11}}>📧 dpo@careermap.in</a>
            </div>
            <div style={{fontSize:10,color:"#4f6ef766"}}>© 2025-26 CareerMap Engine • DPDP Act 2023 Compliant</div>
          </div>
        </div>
      </div>

      {/* CHATBOT */}
      {chatOpen&&(
        <div style={{position:"fixed",bottom:22,right:22,width:330,background:"#12182d",border:"1px solid #1e2a4a",borderRadius:18,boxShadow:"0 16px 50px #00000088",zIndex:1000,overflow:"hidden",animation:"slideUp .3s ease"}}>
          <div style={{background:"linear-gradient(135deg,#4f6ef7,#7c3aed)",padding:"11px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",gap:7,alignItems:"center"}}>
              <span style={{fontSize:16}}>🤖</span>
              <div>
                <div style={{fontWeight:700,fontSize:11}}>{t("AI Career Counselor","AI करियर काउंसलर")}</div>
                <div style={{fontSize:9,opacity:.8}}>● {t("Online","ऑनलाइन")}</div>
              </div>
            </div>
            <button onClick={()=>setChatOpen(false)} style={{background:"rgba(255,255,255,.2)",border:"none",color:"#fff",width:22,height:22,borderRadius:"50%",cursor:"pointer",fontSize:11}}>✕</button>
          </div>
          <div style={{padding:9,height:240,overflowY:"auto",display:"flex",flexDirection:"column",gap:6}}>
            {chatMsgs.map((m,i)=>(
              <div key={i} style={{display:"flex",justifyContent:m.from==="user"?"flex-end":"flex-start"}}>
                <div className={m.from==="user"?"chat-u":"chat-b"} style={{maxWidth:"82%",padding:"6px 10px",fontSize:11,lineHeight:1.6,color:"#e8ecf4",fontFamily:lang==="hi"?"'Noto Sans Devanagari'":"inherit"}}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div style={{padding:9,borderTop:"1px solid #1e2a4a",display:"flex",gap:6}}>
            <input className="input-field" style={{fontSize:11,flex:1}} placeholder={t("Ask about any exam...","परीक्षा के बारे में पूछें...")} value={chatIn} onChange={e=>setChatIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()}/>
            <button className="btn-primary" onClick={sendChat} style={{padding:"7px 11px",fontSize:13}}>→</button>
          </div>
        </div>
      )}

      {/* Float Chat Button */}
      {!chatOpen&&(
        <button onClick={()=>setChatOpen(true)} className="btn-primary"
          style={{position:"fixed",bottom:22,right:22,width:50,height:50,borderRadius:"50%",fontSize:18,padding:0,animation:"glow 2s ease-in-out infinite",zIndex:999}}>
          🤖
        </button>
      )}

      {/* Floating Lead CTA */}
      <button onClick={()=>openGoogleForm(true)}
        style={{position:"fixed",bottom:84,right:22,background:"linear-gradient(135deg,#00d68f,#059669)",border:"none",color:"#fff",padding:"9px 16px",borderRadius:24,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:11,boxShadow:"0 4px 20px #00d68f55",zIndex:998,whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:6}}>
        🎓 {t("Free Counseling","फ्री काउंसलिंग")}
      </button>

      {/* LEAD CAPTURE MODAL */}
      {leadModalOpen&&(
        <LeadModal
          onClose={()=>openGoogleForm(false)}
          lang={lang}
          prefillExam={selExam?(lang==="hi"?selExam.nameHi:selExam.name):undefined}
        />
      )}

      {/* STANDALONE POLICY MODAL */}
      {policyModalOpen&&(
        <PrivacyPolicyModal onClose={()=>setPolicyModalOpen(false)} lang={lang}/>
      )}
    </div>
  );
}