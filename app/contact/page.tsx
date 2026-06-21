"use client";
import { useState } from "react";

export default function Contact()  {
  const [loading, setLoading] = useState(false);

const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  budget: "",
  contactMethod: "",
  timeline: "",
  projectDescription: "",
});

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      alert("Consultation request submitted successfully!");

      setFormData({
        fullName: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        budget: "",
        contactMethod: "",
        timeline: "",
        projectDescription: "",
      });
    } else {
      alert("Submission failed.");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold mb-4">
        Contact Us
      </h1>

      <p className="text-slate-400 mb-10">
        Let's discuss your project requirements and explore how PKIT Consultants
        can help your business leverage technology for growth and innovation.
      </p>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Contact Form */}

        <div className="bg-slate-900 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">
            Request Consultation
          </h2>
<form
  onSubmit={handleSubmit}
  className="space-y-5"
>
  <input
  type="text"
  placeholder="Full Name"
  value={formData.fullName}
  onChange={(e) =>
    setFormData({
      ...formData,
      fullName: e.target.value,
    })
  }
  className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700"
/>

  <input
    type="email"
    placeholder="Email Address"
    value={formData.email}
onChange={(e) =>
  setFormData({
    ...formData,
    email: e.target.value,
  })
}
    className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700"
    required
  />

  <input
    type="text"
    placeholder="Company Name"
    value={formData.company}
onChange={(e) =>
  setFormData({
    ...formData,
    company: e.target.value,
  })
}
    className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700"
  />

  <input
    type="tel"
    placeholder="Phone Number"
    value={formData.phone}
onChange={(e) =>
  setFormData({
    ...formData,
    phone: e.target.value,
  })
}
    className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700"
    required
  />

 <select
  value={formData.service}
  onChange={(e) =>
    setFormData({
      ...formData,
      service: e.target.value,
    })
  }
  className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700"
  required
>
  <option value="">Select Service</option>
  <option value="AI Solutions">AI Solutions</option>
  <option value="Custom Software Development">
    Custom Software Development
  </option>
  <option value="Mobile App Development">
    Mobile App Development
  </option>
  <option value="IT Consultancy">
    IT Consultancy
  </option>
</select>

 <select
  value={formData.budget}
  onChange={(e) =>
    setFormData({
      ...formData,
      budget: e.target.value,
    })
  }
  className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700"
>
  <option value="">Budget Range</option>
  <option value="Under $1,000">Under $1,000</option>
  <option value="$1,000 - $5,000">$1,000 - $5,000</option>
  <option value="$5,000 - $10,000">$5,000 - $10,000</option>
  <option value="$10,000+">$10,000+</option>
</select>

  <select
  value={formData.contactMethod}
  onChange={(e) =>
    setFormData({
      ...formData,
      contactMethod: e.target.value,
    })
  }
  className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700"
>
  <option value="">Preferred Contact Method</option>
  <option value="Email">Email</option>
  <option value="Phone">Phone</option>
  <option value="WhatsApp">WhatsApp</option>
</select>

 <select
  value={formData.timeline}
  onChange={(e) =>
    setFormData({
      ...formData,
      timeline: e.target.value,
    })
  }
  className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700"
>
  <option value="">Project Timeline</option>
  <option value="Immediate">Immediate</option>
  <option value="Within 1 Month">Within 1 Month</option>
  <option value="Within 3 Months">Within 3 Months</option>
  <option value="6+ Months">6+ Months</option>
</select>

  <textarea
  rows={6}
  placeholder="Tell us about your project requirements..."
  value={formData.projectDescription}
  onChange={(e) =>
    setFormData({
      ...formData,
      projectDescription: e.target.value,
    })
  }
  className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700"
/>

  <button
  type="submit"
  disabled={loading}
  className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-lg font-semibold transition"
>
  {loading ? "Submitting..." : "Request Consultation"}
</button>

</form>
        </div>

        {/* Contact Information */}

        <div className="bg-slate-900 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">
            Contact Information
          </h2>

          <div className="space-y-6">

            <div>
              <h3 className="font-semibold text-lg">
                Email
              </h3>

              <p className="text-slate-400">
                pkitconsultants@gmail.com
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Location
              </h3>

              <p className="text-slate-400">
                Dubai, United Arab Emirates
              </p>
            </div>

            <div>
              
            <h3 className="font-semibold text-lg">
              Phone Number
            </h3>

            <p className="text-slate-400">
              +971 50 116 4565
            </p>
          </div>

          <div>
  <h3 className="font-semibold text-lg">
    WhatsApp
  </h3>

  <a
    href="https://wa.me/971501164565"
    target="_blank"
    className="text-green-400"
  >
    Chat on WhatsApp
  </a>
</div>

            <div>
              <h3 className="font-semibold text-lg">
                Founder & CEO
              </h3>

              <p className="text-slate-400">
                M. Prasanna Kumar
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Business Hours
              </h3>

              <p className="text-slate-400">
                Monday - Friday
                <br />
                9:00 AM - 6:00 PM
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}