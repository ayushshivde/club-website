"use client";

import { nanoid } from "nanoid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { saveFormData } from "../../store/PlayerSlice";

const TalentFormPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, watch } = useForm();
  const [photo, setPhoto] = useState(null);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const Submithandler = (data) => {
    console.log(data)
    const newPlayer = { ...data, id: nanoid(), photo };
    
    dispatch(saveFormData(newPlayer));
    const existingPlayers = JSON.parse(localStorage.getItem("players") || "[]");
    const updated = [...existingPlayers, newPlayer];
    localStorage.setItem("players", JSON.stringify(updated));
    alert("✅ Form Submitted Successfully!");
    reset();
    setPhoto(null);
    router.push("/player");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Watch fields
  const cricketFields = watch(["role", "battingStyle", "bowlingStyle", "level"]);
  const performanceFields = watch(["highestScore", "bestBowling"]);

  const isCricketComplete = cricketFields.every((v) => v && v.trim() !== "");
  const isPerformanceComplete = performanceFields.every((v) => v && v.trim() !== "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 flex justify-center">
      <form
        onSubmit={handleSubmit(Submithandler)}
        className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8 md:p-12 space-y-10 border border-gray-100"
      >
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700">
            🏏 Cricketer Registration
          </h1>
          <p className="text-gray-500 mt-2">
            Step {step} of 3 — Fill all details carefully
          </p>
        </div>

        {/* Profile Photo */}
        <div className="flex flex-col items-center gap-3">
          <label className="text-lg font-semibold text-gray-700">
            Profile Photo
          </label>
          <div className="relative">
            {photo ? (
              <img
                src={photo}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full shadow-md border-4 border-blue-500"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gray-100 border-2 border-dashed text-gray-400">
                No Photo
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-blue-700">
              Upload
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>
          {!photo && (
            <p className="text-red-500 text-sm mt-1">
              * Please upload your profile photo
            </p>
          )}
        </div>

        {/* STEP 1️⃣ - Cricket Profile */}
        {step === 1 && (
          <section className="bg-blue-50/40 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">
              🏏 Cricket Profile
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <select {...register("role")} className="input border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400">
                <option value="">Playing Role</option>
                <option>Batsman</option>
                <option>Bowler</option>
                <option>All-Rounder</option>
                <option>Wicket Keeper</option>
              </select>
              <select {...register("battingStyle")} className="input border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400">
                <option value="">Batting Style</option>
                <option>Right-hand Bat</option>
                <option>Left-hand Bat</option>
              </select>
              <select {...register("bowlingStyle")} className="input border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400">
                <option value="">Bowling Style</option>
                <option>Right Arm Fast</option>
                <option>Left Arm Spin</option>
              </select>
              <select {...register("level")} className="input border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400">
                <option value="">Current Level</option>
                <option>School</option>
                <option>College</option>
                <option>Club</option>
                <option>District</option>
                <option>State</option>
              </select>
              <input {...register("experience")} type="number" placeholder="Years of Experience" className="input border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
              <input {...register("teamName")} placeholder="Team / Club Name" className="input border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
            </div>

            {!isCricketComplete && (
              <p className="text-red-500 text-sm mt-3">
                * Please fill all cricket profile details before proceeding.
              </p>
            )}

            <div className="flex justify-end pt-6">
              <button
                type="button"
                disabled={!isCricketComplete || !photo}
                onClick={() => setStep(2)}
                className={`px-6 py-2 rounded-lg text-white ${isCricketComplete && photo ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
              >
                Next →
              </button>
            </div>
          </section>
        )}

        {/* STEP 2️⃣ - Performance */}
        {step === 2 && (
          <section className="bg-blue-50/40 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">
              📊 Performance / Stats
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <input {...register("highestScore")} type="number" placeholder="Highest Score" className="input border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
              <input {...register("bestBowling")} placeholder="Best Bowling Figure (e.g. 5/23)" className="input border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
            </div>
            <textarea {...register("tournaments")} placeholder="Tournaments Played" className="input w-full mt-4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
            <textarea {...register("achievements")} placeholder="Achievements / Awards" className="input w-full mt-4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />

            {!isPerformanceComplete && (
              <p className="text-red-500 text-sm mt-3">* Please fill performance stats before proceeding.</p>
            )}

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
              >
                ← Back
              </button>
              <button
                type="button"
                disabled={!isPerformanceComplete}
                onClick={() => setStep(3)}
                className={`px-6 py-2 rounded-lg text-white ${isPerformanceComplete ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
              >
                Next →
              </button>
            </div>
          </section>
        )}

        {/* STEP 3️⃣ - Media & Verification */}
        {step === 3 && (
          <section className="bg-blue-50/40 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">
              🎥 Media & Verification
            </h2>
            <input {...register("videoLink")} type="url" placeholder="Video Link (YouTube / Drive)" className="input w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
            <div className="mt-4 flex items-center gap-2">
              <input type="checkbox" {...register("consent")} />
              <span className="text-gray-600 text-sm">
                I agree my data can be used for selection and promotion
              </span>
            </div>
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
              >
                ← Back
              </button>
              <button
                type="submit"
                className={`px-3 py-2 rounded-lg text-white ${isPerformanceComplete ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
              >
                Submit Profile
              </button>
            </div>
          </section>
        )}
      </form>
    </div>
  );
};

export default TalentFormPage;


// "use client";

// import { nanoid } from "nanoid";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { saveFormData } from "../../store/PlayerSlice";

// const TalentFormPage = () => {
//   const dispatch = useDispatch();
//   const { register, handleSubmit, reset, watch } = useForm();
//   const [photo, setPhoto] = useState(null);
//   const [step, setStep] = useState(1);
//   const router = useRouter();

//   const Submithandler = (data) => {
//     const newPlayer = { ...data, id: nanoid(), photo };
//     dispatch(saveFormData(newPlayer));
//     // Get existing players from localStorage or initialize empty array
//     const existingPlayers = JSON.parse(localStorage.getItem("players") || "[]");
//     const updated = [...existingPlayers, newPlayer];
//     localStorage.setItem("players", JSON.stringify(updated));
//     alert("✅ Form Submitted Successfully!");
//     reset();
//     setPhoto(null);
//     router.push("/player");
//   };



//   const handlePhotoChange = (e) => {
//   const file = e.target.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPhoto(reader.result); // ab base64 string store hogi
//     };
//     reader.readAsDataURL(file); // file ko base64 me convert karta hai
//   }
// };


//   // Watch fields to check completion before next step
//   const personalFields = watch(["fullName", "dob", "gender", "mobile", "email"]);
//   const cricketFields = watch(["role", "battingStyle", "bowlingStyle", "level"]);
//   const performanceFields = watch(["highestScore", "bestBowling"]);

//   const isPersonalComplete = personalFields.every((v) => v && v.trim() !== "");
//   const isCricketComplete = cricketFields.every((v) => v && v.trim() !== "");
//   const isPerformanceComplete = performanceFields.every((v) => v && v.trim() !== "");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 flex justify-center">
//       <form
//         onSubmit={handleSubmit(Submithandler)}
//         className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8 md:p-12 space-y-10 border border-gray-100"
//       >
//         {/* Heading */}
//         <div className="text-center">
//           <h1 className="text-3xl md:text-4xl font-bold text-blue-700">
//             🏏 Cricketer Registration
//           </h1>
//           <p className="text-gray-500 mt-2">
//             Step {step} of 4 — Fill all details carefully
//           </p>
//         </div>

//         {/* Profile Photo */}
//         <div className="flex flex-col items-center gap-3">
//           <label className="text-lg font-semibold text-gray-700">
//             Profile Photo
//           </label>
//           <div className="relative">
//             {photo ? (
//               <img
//                 src={photo}
//                 alt="Profile"
//                 className="w-32 h-32 object-cover rounded-full shadow-md border-4 border-blue-500"
//               />
//             ) : (
//               <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gray-100 border-2 border-dashed text-gray-400">
//                 No Photo
//               </div>
//             )}
//             <label className="absolute bottom-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-blue-700">
//               Upload
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handlePhotoChange}
//                 className="hidden"
//               />
//             </label>
//           </div>
//           {!photo && (
//             <p className="text-red-500 text-sm mt-1">
//               * Please upload your profile photo
//             </p>
//           )}
//         </div>

//         {/* STEP 1️⃣ - Personal Info */}
//         {step === 1 && (
//           <section className="bg-blue-50/40 rounded-xl p-6 shadow-sm">
//             <h2 className="text-xl font-semibold text-blue-700 mb-4">
//               👤 Personal Information
//             </h2>
//             <div className="grid md:grid-cols-2 gap-6">
//               <input {...register("fullName")} placeholder="Full Name" className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
//               <input {...register("dob")} type="date" className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
//               <select {...register("gender")} className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400">
//                 <option value="">Select Gender</option>
//                 <option>Male</option>
//                 <option>Female</option>
//                 <option>Other</option>
//               </select>
//               <input {...register("mobile")} type="number" placeholder="Mobile Number" className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
//               <input {...register("email")} type="email" placeholder="Email ID" className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
//               <input {...register("city")} placeholder="City / District" className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
//               <select {...register("state")} className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400">
//                 <option value="">Select State</option>
//                 <option>Madhya Pradesh</option>
//                 <option>Uttar Pradesh</option>
//                 <option>Maharashtra</option>
//               </select>
//               <input {...register("pincode")} type="number" placeholder="Pin Code" className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
//             </div>

//             {!isPersonalComplete && (
//               <p className="text-red-500 text-sm mt-3">* Please fill all personal details before proceeding.</p>
//             )}

//             <div className="flex justify-end pt-6">
//               <button
//                 type="button"
//                 disabled={!isPersonalComplete || !photo}
//                 onClick={() => setStep(2)}
//                 className={`px-6 py-2 rounded-lg text-white ${isPersonalComplete && photo ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
//               >
//                 Next →
//               </button>
//             </div>
//           </section>
//         )}

//         {/* STEP 2️⃣ - Cricket Profile */}
//         {step === 2 && (
//           <section className="bg-blue-50/40 rounded-xl p-6 shadow-sm">
//             <h2 className="text-xl font-semibold text-blue-700 mb-4">
//               🏏 Cricket Profile
//             </h2>
//             <div className="grid md:grid-cols-2 gap-6">
//               <select {...register("role")} className="input border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400">
//                 <option value="">Playing Role</option>
//                 <option>Batsman</option>
//                 <option>Bowler</option>
//                 <option>All-Rounder</option>
//                 <option>Wicket Keeper</option>
//               </select>
//               <select {...register("battingStyle")} className="input border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400">
//                 <option value="">Batting Style</option>
//                 <option>Right-hand Bat</option>
//                 <option>Left-hand Bat</option>
//               </select>
//               <select {...register("bowlingStyle")} className="input border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400">
//                 <option value="">Bowling Style</option>
//                 <option>Right Arm Fast</option>
//                 <option>Left Arm Spin</option>
//               </select>
//               <select {...register("level")} className="input border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400">
//                 <option value="">Current Level</option>
//                 <option>School</option>
//                 <option>College</option>
//                 <option>Club</option>
//                 <option>District</option>
//                 <option>State</option>
//               </select>
//               <input {...register("experience")} type="number" placeholder="Years of Experience" className="input border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
//               <input {...register("teamName")} placeholder="Team / Club Name" className="input border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
//             </div>

//             {!isCricketComplete && (
//               <p className="text-red-500 text-sm mt-3">* Please fill all cricket profile details before proceeding.</p>
//             )}

//             <div className="flex justify-between pt-6">
//               <button type="button" onClick={() => setStep(1)} className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500">
//                 ← Back
//               </button>
//               <button
//                 type="button"
//                 disabled={!isCricketComplete}
//                 onClick={() => setStep(3)}
//                 className={`px-6 py-2 rounded-lg text-white ${isCricketComplete ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
//               >
//                 Next →
//               </button>
//             </div>
//           </section>
//         )}

//         {/* STEP 3️⃣ - Performance */}
//         {step === 3 && (
//           <section className="bg-blue-50/40 rounded-xl p-6 shadow-sm">
//             <h2 className="text-xl font-semibold text-blue-700 mb-4">
//               📊 Performance / Stats
//             </h2>
//             <div className="grid md:grid-cols-2 gap-6">
//               <input {...register("highestScore")} type="number" placeholder="Highest Score" className="input border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
//               <input {...register("bestBowling")} placeholder="Best Bowling Figure (e.g. 5/23)" className="input border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
//             </div>
//             <textarea {...register("tournaments")} placeholder="Tournaments Played" className="input w-full mt-4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
//             <textarea {...register("achievements")} placeholder="Achievements / Awards" className="input w-full mt-4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />

//             {!isPerformanceComplete && (
//               <p className="text-red-500 text-sm mt-3">* Please fill performance stats before proceeding.</p>
//             )}

//             <div className="flex justify-between pt-6">
//               <button type="button" onClick={() => setStep(2)} className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500">
//                 ← Back
//               </button>
//               <button
//                 type="button"
//                 disabled={!isPerformanceComplete}
//                 onClick={() => setStep(4)}
//                 className={`px-6 py-2 rounded-lg text-white ${isPerformanceComplete ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
//               >
//                 Next →
//               </button>
//             </div>
//           </section>
//         )}

//         {/* STEP 4️⃣ - Media & Verification */}
//         {step === 4 && (
//           <section className="bg-blue-50/40 rounded-xl p-6 shadow-sm">
//             <h2 className="text-xl font-semibold text-blue-700 mb-4">
//               🎥 Media & Verification
//             </h2>
//             <input {...register("videoLink")} type="url" placeholder="Video Link (YouTube / Drive)" className="input w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
//             <div className="mt-4 flex items-center gap-2">
//               <input type="checkbox" {...register("consent")} />
//               <span className="text-gray-600 text-sm">
//                 I agree my data can be used for selection and promotion
//               </span>
//             </div>
//             <div className="flex justify-between pt-6">
//               <button type="button" onClick={() => setStep(3)}  className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500">
//                 ← Back
//               </button>
//               <button type="submit" className={`px-3 py-2 rounded-lg text-white ${isPerformanceComplete ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}>
//                 Submit Profile
//               </button>
//             </div>
//           </section>
//         )}
//       </form>
//     </div>
//   );
// };

// export default TalentFormPage;
