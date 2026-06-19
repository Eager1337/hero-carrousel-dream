import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/skyelite/book")({
  head: () => ({ meta: [{ title: "Book — SkyElite" }] }),
  component: Book,
});

function Book() {
  const [sent, setSent] = useState(false);
  return (
    <section className="pt-32 pb-24 px-6 sm:px-10 max-w-3xl mx-auto">
      <p className="text-xs uppercase tracking-[0.4em] text-white/60">Book your flight</p>
      <h1 className="mt-3 font-[Playfair_Display,serif] italic text-4xl sm:text-6xl">Let's get you airborne.</h1>
      <p className="mt-4 text-white/70 max-w-lg">
        Tell us where, when, and how many. We'll come back with options in under 10 minutes.
      </p>

      {sent ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 rounded-2xl border border-white/20 bg-white/10 p-8 text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
            <Check className="w-6 h-6" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold">Request received.</h2>
          <p className="mt-2 text-white/70">Our concierge will reach out shortly.</p>
          <Link to="/skyelite" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black">
            Back to home <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mt-10 grid sm:grid-cols-2 gap-4"
        >
          <Field label="From" placeholder="e.g. Freetown (FNA)" />
          <Field label="To" placeholder="e.g. Dubai (DXB)" />
          <Field label="Date" type="date" />
          <Field label="Passengers" type="number" placeholder="4" />
          <Field label="Full name" placeholder="Your name" wide />
          <Field label="Email" type="email" placeholder="you@email.com" wide required />
          <Field label="Notes" placeholder="Anything we should know?" wide />
          <button
            type="submit"
            className="sm:col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black hover:bg-white/90 transition"
          >
            Send request <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}
    </section>
  );
}

function Field({ label, wide, ...rest }: { label: string; wide?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`flex flex-col gap-1.5 ${wide ? "sm:col-span-2" : ""}`}>
      <span className="text-xs uppercase tracking-widest text-white/60">{label}</span>
      <input
        {...rest}
        className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none focus:bg-white/10 transition"
      />
    </label>
  );
}
