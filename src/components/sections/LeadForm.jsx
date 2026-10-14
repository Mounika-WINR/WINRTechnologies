import { FOOTER } from "../../data/services.js";
import { NewsletterForm } from "./NewsletterForm.jsx";

export function LeadForm({ title = "Get a free consultation", cta = "Request callback" }) {
  return (
    <form className="wr-news" style={{ maxWidth: 560 }} onSubmit={(e) => e.preventDefault()}>
      <strong style={{ textAlign: "left" }}>{title}</strong>
      <input required placeholder="Your name" aria-label="Your name" />
      <input required type="email" placeholder="Work email" aria-label="Work email" />
      <input placeholder="Phone (optional)" aria-label="Phone" />
      <input placeholder="What do you want to build?" aria-label="Project brief" />
      <button type="submit">{cta}</button>
    </form>
  );
}

export { NewsletterForm };
export const FOOTER_META = FOOTER;
