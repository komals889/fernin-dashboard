import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Left marketing panel */}
      <section className="hidden w-1/2 flex-col justify-between bg-gradient-to-b from-slate-950 via-slate-900 to-black px-12 py-10 text-white lg:flex">
        <div className="text-lg font-semibold text-primary">aps</div>

        <div>
          <h1 className="max-w-md text-4xl font-semibold leading-tight">
            Expert level Cybersecurity
            <br />
            in hours not weeks
          </h1>
          <p className="mt-4 max-w-md text-sm text-gray-300">
            Effortlessly spider and map targets to uncover hidden security
            flaws. Deliver high-quality, validated findings in hours, not weeks.
          </p>

          <div className="mt-8 space-y-3 text-sm text-gray-200">
            <p>What&apos;s included</p>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Automated mapping of web and API attack surfaces</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Validated, noise-free findings your team can trust</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Enterprise-grade reporting out of the box</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-xs text-gray-400">
          <span className="font-semibold text-white">Trustpilot</span> · Rated
          4.5/5 (100k+ reviews)
        </div>
      </section>

      {/* Right auth card */}
      <section className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
          <header className="mb-6 flex items-center justify-between text-sm">
            <h2 className="text-lg font-semibold">Sign up</h2>
            <button className="text-xs text-primary hover:underline">
              Already have an account? Log in
            </button>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="First name">
                <input
                  required
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </Field>
              <Field label="Last name">
                <input
                  required
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </Field>
            </div>

            <Field label="Email address">
              <input
                type="email"
                required
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </Field>

            <Field label="Password (8+ characters)">
              <input
                type="password"
                minLength={8}
                required
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </Field>

            <label className="flex items-start gap-2 text-xs text-gray-500">
              <input
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 rounded border-border accent-primary"
              />
              <span>
                I agree to Aps&apos;s Terms &amp; Conditions and acknowledge the
                Privacy Policy.
              </span>
            </label>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-md hover:bg-teal-500"
            >
              Create account
            </button>
          </form>

          <div className="mt-6 space-y-3">
            <p className="text-center text-xs text-gray-500">
              Or continue with
            </p>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <button className="rounded-lg border border-border bg-background px-3 py-2">
                Apple
              </button>
              <button className="rounded-lg border border-border bg-background px-3 py-2">
                Google
              </button>
              <button className="rounded-lg border border-border bg-background px-3 py-2">
                Meta
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block text-xs">
      <span className="mb-1 inline-block text-gray-500">{label}</span>
      {children}
    </label>
  );
}

