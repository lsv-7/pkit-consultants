export default function Services() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold mb-12">
        Our Services
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-slate-900 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">
            AI Solutions
          </h2>

          <ul className="space-y-2 text-slate-300 mb-4">
            <li>AI Chatbots</li>
            <li>Generative AI</li>
            <li>Process Automation</li>
            <li>AI Integration</li>
          </ul>

          <p className="text-slate-400 leading-7">
            Intelligent automation, AI chatbots, generative AI solutions,
            and business process optimization designed to improve efficiency,
            productivity, and decision-making.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">
            Custom Software Development
          </h2>

          <ul className="space-y-2 text-slate-300 mb-4">
            <li>SaaS Platforms</li>
            <li>Enterprise Applications</li>
            <li>Web Portals</li>
          </ul>

          <p className="text-slate-400 leading-7">
            Scalable web applications, SaaS platforms, enterprise software,
            and custom business systems tailored to your organization's
            unique requirements.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">
            Mobile App Development
          </h2>

          <ul className="space-y-2 text-slate-300 mb-4">
            <li>Android Apps</li>
            <li>iOS Apps</li>
            <li>Cross Platform Apps</li>
          </ul>

          <p className="text-slate-400 leading-7">
            High-performance mobile applications for Android and iOS,
            delivering seamless user experiences across devices and platforms.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">
            IT Consultancy
          </h2>

          <ul className="space-y-2 text-slate-300 mb-4">
            <li>Digital Transformation</li>
            <li>Technology Strategy</li>
            <li>Architecture Planning</li>
          </ul>

          <p className="text-slate-400 leading-7">
            Strategic technology consulting services focused on digital
            transformation, IT planning, infrastructure optimization,
            and long-term business growth.
          </p>
        </div>

      </div>
    </div>
  );
}