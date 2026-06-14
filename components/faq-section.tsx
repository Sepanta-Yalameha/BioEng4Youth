"1use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What is a hackathon?",
    a: "A hackathon is an event where participants form teams and collaborate intensively over a short period — usually 24–48 hours — to build a project from scratch. It's part competition, part learning experience, part community event.",
  },
  {
    q: "Who can participate in McMaster Biohacks?",
    a: "McMaster Biohacks follows MLH guidelines and is open to everyone — students of all levels, backgrounds, and disciplines. You don't need to be a bioengineering student to participate.",
  },
  {
    q: "Is it free to attend?",
    a: "Yes! McMaster Biohacks is completely free to participate in. More details on registration will be announced soon.",
  },
  {
    q: "Do I need to have a team before signing up?",
    a: "No. You can register your interest individually. We'll have team formation activities at the event, and you can form or join a team once registration opens.",
  },
  {
    q: "What do I need to bring or know?",
    a: "Just curiosity and enthusiasm. All skill levels are welcome — we'll have workshops and mentors to support you throughout the event. A laptop is recommended.",
  },
  {
    q: "When and where is it happening?",
    a: "We're still finalizing the date and venue. Register your interest below and you'll be the first to know when details are confirmed.",
  },
];

export default function FaqSection() {
  const { ref, inView } = useInView();

  return (
    <section className="py-24 bg-white/[0.93] backdrop-blur-md">
      <div ref={ref} className="max-w-3xl mx-auto px-4 sm:px-6">
        <div
          className={cn(
            "text-center mb-14 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-brand-accent text-xs font-mono tracking-widest uppercase mb-3">
            FAQ
          </p>
          <h2 className="font-display font-bold text-brand-text text-4xl sm:text-5xl leading-tight tracking-tight">
            Common questions
          </h2>
        </div>

        <div
          className={cn(
            "transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: "200ms" }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-brand-primary/10 rounded-2xl px-6 overflow-hidden"
              >
                <AccordionTrigger className="font-display font-semibold text-brand-text hover:text-brand-primary hover:no-underline py-5 text-left text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-brand-text/55 leading-relaxed pb-5 text-sm">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
