function Contact() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">

          <div className="text-5xl mb-4">📞</div>

          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Contact Us
          </h1>

          <p className="max-w-3xl mx-auto text-blue-50 text-lg">
            Have a question, suggestion or feedback about the Smart Health &
            Hygiene Portal? Get in touch with us.
          </p>

        </div>
      </section>

      {/* Contact Content */}
      <section className="max-w-6xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-md p-8">

            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Get In Touch
            </h2>

            <p className="text-slate-600 leading-7 mb-8">
              We welcome your feedback and suggestions. Your ideas can help
              improve the Smart Health & Hygiene Portal.
            </p>

            <div className="space-y-6">

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-50
                  flex items-center justify-center text-2xl">
                  📧
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    Email
                  </h3>

                  <p className="text-slate-500">
                    smarthealth@example.com
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-50
                  flex items-center justify-center text-2xl">
                  📍
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    Location
                  </h3>

                  <p className="text-slate-500">
                    Smart Health & Hygiene Portal
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-50
                  flex items-center justify-center text-2xl">
                  💬
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    Feedback
                  </h3>

                  <p className="text-slate-500">
                    We appreciate your suggestions.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-md p-8">

            <h2 className="text-3xl font-bold text-slate-800 mb-6">
              Send a Message
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! Your message has been submitted.");
              }}
              className="space-y-5"
            >

              <div>
                <label className="block text-sm font-semibold
                  text-slate-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                  className="w-full border border-slate-300
                  rounded-xl px-4 py-3 focus:outline-none
                  focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold
                  text-slate-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full border border-slate-300
                  rounded-xl px-4 py-3 focus:outline-none
                  focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold
                  text-slate-700 mb-2">
                  Message
                </label>

                <textarea
                  rows="5"
                  placeholder="Enter your message..."
                  required
                  className="w-full border border-slate-300
                  rounded-xl px-4 py-3 focus:outline-none
                  focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700
                text-white font-semibold py-3 rounded-xl transition"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Contact;