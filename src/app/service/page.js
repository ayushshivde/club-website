// import React from 'react'

// const page = () => {
//   return (
    
//     <div>
//       service page
//     </div>
//   )
// }

// export default page

"use client";
import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ================= HEADER SECTION ================= */}
      <section className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1602751586064-9c86dfb5b60d?auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-3">Our Services </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Elevate your game with our world-class cricket programs and facilities.
          </p>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-12">
            What We Offer
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {/* Service 1 */}
            <div className="bg-white rounded-xl shadow hover:shadow-xl transition p-6">
              <Image
                src="/images/coach3.jfif"
                alt="Coaching"
                width={400}
                height={250}
                className="rounded-lg object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Professional Coaching            
              </h3>
              <p className="text-gray-600 text-sm">
                Learn from expert coaches who have played and trained at the
                highest levels of the game. Personalized sessions for all age
                groups and skill levels.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-xl shadow hover:shadow-xl transition p-6">
              <Image
                src="/images/fitness.jfif"
                alt="Fitness"
                width={400}
                height={250}
                className="rounded-lg object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Fitness & Conditioning
              </h3>
              <p className="text-gray-600 text-sm">
                Customized fitness programs designed to boost your strength,
                stamina, agility, and performance on the field.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-xl shadow hover:shadow-xl transition p-6">
              <Image
                src="/images/match.jfif"
                alt="Tournaments"
                width={400}
                height={250}
                className="rounded-lg object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Match Opportunities
              </h3>
              <p className="text-gray-600 text-sm">
                Compete in real tournaments organized by Cricket Verse and
                affiliated clubs — perfect for exposure and growth.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-xl shadow hover:shadow-xl transition p-6">
              <Image
                src="https://images.unsplash.com/photo-1584317813037-4c2b7bfa11cd?auto=format&fit=crop&w=800&q=80"
                alt="Ground"
                width={400}
                height={250}
                className="rounded-lg object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                World-Class Facilities
              </h3>
              <p className="text-gray-600 text-sm">
                Practice on turf wickets, use modern training nets, and enjoy
                the latest cricket equipment at our premium ground.
              </p>
            </div>

            {/* Service 5 */}
            <div className="bg-white rounded-xl shadow hover:shadow-xl transition p-6">
              <Image
                src="https://images.unsplash.com/photo-1600375077112-3ec2f4a4f40b?auto=format&fit=crop&w=800&q=80"
                alt="Academy"
                width={400}
                height={250}
                className="rounded-lg object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Cricket Academy
              </h3>
              <p className="text-gray-600 text-sm">
                Long-term training programs for beginners and intermediate
                players with a structured learning path.
              </p>
            </div>

            {/* Service 6 */}
            <div className="bg-white rounded-xl shadow hover:shadow-xl transition p-6">
              <Image
                src="https://images.unsplash.com/photo-1620050617495-df00ad9f64c1?auto=format&fit=crop&w=800&q=80"
                alt="Analysis"
                width={400}
                height={250}
                className="rounded-lg object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Video Analysis
              </h3>
              <p className="text-gray-600 text-sm">
                Get your performance reviewed through high-speed video analysis
                to identify and improve your strengths and weaknesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="bg-green-700 text-white text-center py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Elevate Your Game?
        </h2>
        <p className="max-w-2xl mx-auto mb-6 text-lg">
          Join Cricket Verse today and become part of a growing cricket
          community dedicated to excellence.
        </p>
        <Link
          href="/register"
          className="bg-white text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          Join Now
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6">
        <p>&copy; {new Date().getFullYear()} Cricket Verse. All Rights Reserved.</p>
      </footer>
    </div>
  );
}


