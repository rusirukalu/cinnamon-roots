import { Eyebrow } from "./Eyebrow";
import { FAQS } from "@/lib/data";

export function Faq() {
  return (
    <section className="section faq" id="faq">
      <div className="faq-heading">
        <Eyebrow number="09">A few things to know</Eyebrow>
        <h2>
          Before
          <br />
          you <em>arrive.</em>
        </h2>
        <p>
          A little clarity for your journey.
          <br />
          For anything else, include a question in your enquiry.
        </p>
      </div>

      <div className="faq-list">
        {FAQS.map((faq, index) => (
          <details key={faq.q} name="visitor-questions">
            <summary>
              <span className="faq-number">0{index + 1}</span>
              <span>{faq.q}</span>
              <span className="faq-plus" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="faq-answer">
              <p>{faq.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
