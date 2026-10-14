
export function NewsletterForm() {
  return (
    <form className="wr-news" onSubmit={(e) => e.preventDefault()}>
      <input type="email" required placeholder="Your email address" aria-label="Your email address" />
      <button type="submit">Subscribe</button>
    </form>
  );
}
