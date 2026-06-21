export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      {/* Hero */}

      <div className="mb-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          About PKIT Consultants
        </h1>

        <p className="text-xl text-slate-400 max-w-3xl leading-8">
          Connecting Business with Technology through innovative software,
          artificial intelligence solutions, mobile applications, and
          strategic IT consulting services.
        </p>
      </div>

      {/* Company Story */}

      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-6">
          Our Story
        </h2>

        <div className="bg-slate-900 p-8 rounded-xl">
          <p className="text-slate-300 leading-8">
            Founded in 2026 and headquartered in Dubai, UAE, PKIT Consultants
            was established with a vision to help businesses embrace technology
            as a catalyst for growth, innovation, and long-term success.
          </p>

          <p className="text-slate-300 leading-8 mt-4">
            We specialize in delivering modern digital solutions including
            AI-powered applications, custom software development, mobile
            applications, and strategic IT consulting services tailored to
            the unique needs of each client.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}

      <section className="grid md:grid-cols-2 gap-8 mb-20">

        <div className="bg-slate-900 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">
            Mission
          </h2>

          <p className="text-slate-300 leading-8">
            Help businesses leverage technology for growth, efficiency,
            innovation, and sustainable success.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">
            Vision
          </h2>

          <p className="text-slate-300 leading-8">
            Become a trusted technology partner for organizations worldwide,
            delivering innovative digital solutions that create lasting impact.
          </p>
        </div>

      </section>

      {/* Founder */}

      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8">
          Founder & CEO
        </h2>

        <div className="bg-slate-900 p-10 rounded-xl">

          <h3 className="text-2xl font-bold mb-2">
            M. Prasanna Kumar
          </h3>

          <p className="text-blue-400 mb-6">
            Founder & CEO
          </p>

          <p className="text-slate-300 leading-8">
            M. Prasanna Kumar is the Founder & CEO of PKIT Consultants.
            Originally from Andhra Pradesh, India, he founded the company
            with a mission to bridge the gap between business challenges
            and modern technology solutions.
          </p>

          <p className="text-slate-300 leading-8 mt-4">
            His vision is to create opportunities for passionate developers
            to work on meaningful real-world software projects while helping
            businesses accelerate growth through innovation, digital
            transformation, and technology consulting.
          </p>

        </div>
      </section>

      {/* Core Values */}

      <section>

        <h2 className="text-3xl font-bold mb-8">
          Core Values
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">
              Innovation
            </h3>

            <p className="text-slate-400">
              Building modern solutions that solve real business problems.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">
              Reliability
            </h3>

            <p className="text-slate-400">
              Delivering dependable technology solutions and support.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">
              Transparency
            </h3>

            <p className="text-slate-400">
              Maintaining honesty, clarity, and trust in every engagement.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">
              Excellence
            </h3>

            <p className="text-slate-400">
              Striving for the highest standards in everything we build.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}