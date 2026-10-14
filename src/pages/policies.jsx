const POLICY_UPDATED = "9 October 2026";
const PRIVACY_EMAIL = "info@winrtechnologies.com";

function PolicyPage({ eyebrow, title, introduction, sections }) {
  return (
    <section className="wr-sec wr-policy-page">
      <header className="wr-policy-header">
        <p className="wr-eyebrow">{eyebrow}</p>
        <h1 className="wr-main-title">{title}</h1>
        <p className="wr-sub">{introduction}</p>
        <p className="wr-policy-updated">Last updated: {POLICY_UPDATED}</p>
      </header>
      <article className="wr-policy-content">
        {sections.map(({ heading, paragraphs, items }) => (
          <section className="wr-policy-section" key={heading}>
            <h2>{heading}</h2>
            {paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {items && (
              <ul>
                {items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </section>
        ))}
        <p className="wr-policy-note">
          These website policies are general information and are not a substitute for
          legal advice. WINR will update them when its services, systems, or applicable
          legal requirements change.
        </p>
      </article>
    </section>
  );
}

export function PrivacyPolicy() {
  return (
    <PolicyPage
      eyebrow="YOUR INFORMATION"
      title="Privacy Policy"
      introduction="This policy explains how WINR Technologies handles personal data in connection with this website and our services, in line with India’s Digital Personal Data Protection Act, 2023 (DPDP Act), to the extent applicable and in force."
      sections={[
        {
          heading: "Who is responsible for your data",
          paragraphs: [
            "WINR Technologies Pvt Ltd (“WINR”, “we”, “us” or “our”), based in Kakinada, Andhra Pradesh, India, is the Data Fiduciary for personal data we process for our own purposes. You can contact us at info@winrtechnologies.com.",
          ],
        },
        {
          heading: "Personal data and purposes",
          paragraphs: [
            "Depending on the feature you choose to use, personal data may include your name, work email, phone number, company, job title, enquiry or message, job-application information, and information you enter into the resume portal.",
            "We use information you provide to respond to enquiries, discuss and deliver requested services, manage recruitment or applications, operate the resume portal, maintain security, and meet legal obligations. We will seek consent where required and use the data only for the stated purpose or another purpose permitted by law.",
          ],
        },
        {
          heading: "Consent and choices",
          paragraphs: [
            "Where processing is based on consent, we will request a clear affirmative action and explain the purpose. Optional newsletter consent is separate from an enquiry and is not required to contact WINR. You may withdraw consent by contacting us; withdrawal does not affect processing already carried out lawfully before withdrawal.",
            "Some website forms are currently front-end demonstrations and do not transmit submissions. Do not enter sensitive personal data unless the relevant feature is clearly enabled and explains how it will be used.",
          ],
        },
        {
          heading: "Resume portal",
          paragraphs: [
            "The resume portal processes the information you enter to create and assess a resume. If you accept the separate storage permission, the current resume data and selected photo are saved when you choose Preview. Each later preview replaces the prior saved version for that resume session. Withdrawing storage permission deletes the saved resume; the consent and withdrawal record is retained for audit purposes. Resume-portal terms and consent controls shown at the time of use apply to that feature. Do not include sensitive personal data in a resume unless necessary.",
          ],
        },
        {
          heading: "Sharing and security",
          paragraphs: [
            "We do not sell personal data. We may make data available to personnel and service providers who need it to operate the website or provide a requested service, and to authorities where required by law. We expect service providers to protect information and use it only for the services they provide.",
            "We use reasonable technical and organisational safeguards appropriate to the information and processing. No method of transmission or storage can be guaranteed completely secure.",
            "If we become aware of a personal data breach, we will take steps to contain and address it and notify affected Data Principals and the Data Protection Board of India as required by applicable law.",
          ],
        },
        {
          heading: "Retention",
          paragraphs: [
            "We retain personal data only for as long as needed for the purpose for which it was collected, to comply with legal requirements, resolve disputes, or establish and defend legal claims. Retention periods depend on the data type and purpose. Where no longer needed, data will be erased or anonymised, subject to applicable law.",
          ],
        },
        {
          heading: "Your rights and grievances",
          paragraphs: [
            "Subject to the DPDP Act and rules in force, you may request information about processing, correction or erasure of personal data, withdraw consent, use an available grievance redressal channel, and nominate another person to exercise rights in the event of death or incapacity. You may also have a right to approach the Data Protection Board of India as provided by law.",
            `To make a request or raise a grievance, email ${PRIVACY_EMAIL} with “Privacy request” in the subject and enough detail for us to identify the relevant interaction. We may ask for information to verify your identity. We will address requests within the period required by applicable law.`,
          ],
        },
        {
          heading: "Children’s data",
          paragraphs: [
            "Our business website is not directed to children. Where we process a child’s personal data, we will obtain verifiable parental or guardian consent and will not undertake tracking or targeted advertising directed at children, except where permitted by applicable law. A parent or lawful guardian should contact us if they believe a child’s personal data has been provided without appropriate authorisation.",
          ],
        },
        {
          heading: "Changes and contact",
          paragraphs: [
            "We may revise this policy when our practices or legal requirements change. The updated version and date will be posted on this page. Questions or privacy grievances can be sent to info@winrtechnologies.com or WINR Technologies Pvt Ltd, 11-1-7, Meenakshi Manor, 2nd Floor, Above HDFC Bank, 3 Lights Junction, Ramarao Pet, Kakinada – 533004, Andhra Pradesh, India.",
          ],
        },
      ]}
    />
  );
}

export function TermsOfService() {
  return (
    <PolicyPage
      eyebrow="WEBSITE TERMS"
      title="Terms of Services & Conditions"
      introduction="These terms apply to your access to and use of the WINR Technologies website. Separate written agreements govern any professional services we provide."
      sections={[
        {
          heading: "Using this website",
          paragraphs: [
            "You may use this website for lawful purposes and in a way that does not interfere with its operation, compromise its security, or infringe another person’s rights. Do not attempt unauthorised access, introduce malicious code, or misuse forms or contact details.",
          ],
        },
        {
          heading: "Website information",
          paragraphs: [
            "Website content is provided for general information. Service descriptions, availability, timelines, pricing, staffing, and project outcomes are indicative and may change. A request for a quote or a discussion does not create an agreement to provide services.",
          ],
        },
        {
          heading: "Separate service agreements",
          paragraphs: [
            "Any project or staffing engagement will be governed by a separate proposal, statement of work, or written agreement accepted by both parties. That document will set out scope, fees, timelines, responsibilities, acceptance, confidentiality, intellectual property, and other applicable terms. If it conflicts with these website terms, the signed service agreement controls for that engagement.",
          ],
        },
        {
          heading: "Applications and user submissions",
          paragraphs: [
            "Submitting an enquiry, application, resume, or other information does not guarantee a response, interview, job, placement, or engagement. You are responsible for ensuring that information you provide is accurate and that you are entitled to provide it.",
            "Do not submit confidential or sensitive information through a feature unless it is specifically requested and the applicable privacy information is provided. Personal data is handled as described in our Privacy Policy.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "Unless stated otherwise, website text, branding, graphics, and other materials belong to WINR Technologies or its licensors and are protected by applicable intellectual-property laws. You may view and print website pages for personal, non-commercial use. No ownership or licence to use WINR marks or other materials is granted beyond that limited use.",
          ],
        },
        {
          heading: "Third-party links",
          paragraphs: [
            "Links to third-party websites are provided for convenience. WINR does not control or endorse those sites and is not responsible for their content, availability, or privacy practices. Your use of them is subject to their own terms.",
          ],
        },
        {
          heading: "Availability and liability",
          paragraphs: [
            "We aim to keep the website available and current but do not guarantee uninterrupted or error-free operation. To the extent permitted by law, WINR is not liable for indirect or consequential loss arising from use of, or inability to use, this informational website. Nothing in these terms excludes liability that cannot lawfully be excluded or limits rights available under applicable law.",
          ],
        },
        {
          heading: "Privacy, changes, and governing law",
          paragraphs: [
            "Our Privacy Policy and Cookie Policy explain how related personal data and cookies are handled. We may update these terms by posting a revised version here. These terms are governed by the laws of India, and courts of competent jurisdiction in Andhra Pradesh, India, will have jurisdiction, subject to mandatory applicable law.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "For questions about these terms, email info@winrtechnologies.com or write to WINR Technologies Pvt Ltd, 11-1-7, Meenakshi Manor, 2nd Floor, Above HDFC Bank, 3 Lights Junction, Ramarao Pet, Kakinada – 533004, Andhra Pradesh, India.",
          ],
        },
      ]}
    />
  );
}

export function CookiePolicy() {
  return (
    <PolicyPage
      eyebrow="COOKIES & DEVICE DATA"
      title="Cookie Policy"
      introduction="This policy describes cookies and similar technologies in connection with the WINR Technologies website."
      sections={[
        {
          heading: "What cookies are",
          paragraphs: [
            "Cookies are small text files that a website may store on your device. Similar technologies can store or access information in your browser or device. They may support basic site operation, remember a choice, measure site usage, or enable advertising.",
          ],
        },
        {
          heading: "How this website uses them",
          paragraphs: [
            "The current website application does not intentionally set analytics or advertising cookies. The browser may use essential technical storage or receive technical identifiers from the hosting or delivery provider to serve and protect the website. This may change if new features or analytics tools are added.",
          ],
        },
        {
          heading: "Your choices",
          paragraphs: [
            "You can manage or delete cookies through your browser settings and may block future cookies. Blocking essential technologies may affect site availability or functionality. Where consent is required for non-essential cookies, WINR will request consent before using them.",
          ],
        },
        {
          heading: "Changes and contact",
          paragraphs: [
            "We will update this policy if our use of cookies or similar technologies changes. For questions, email info@winrtechnologies.com.",
          ],
        },
      ]}
    />
  );
}
