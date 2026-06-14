import { Link } from "react-router-dom";
import { FaEnvelope, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const developers = [
    {
        name: "Dipatuan, Alsahaf",
        role: "Frontend/Backend Developer",
        image: "/developers/DP.png",
        email: "donsadam29@gmail.com",
        github: "https://github.com/Tadamdip",
        facebook: "https://www.facebook.com/vibeswithpopol",
        linkedin: "https://www.linkedin.com/in/sadam-polpol-369ab4402/",
    },
    {
        name: "Indanan, Al-raafi",
        role: "Scrum Master",
        image: "/developers/rapi.png",
        email: "indanan.ac172@s.msumain.edu.ph",
        github: "https://github.com/Piiipang1",
        facebook: "https://www.facebook.com/al.raafi.cadar.indanan",
        linkedin: "",
    },
    {
        name: "Sapio, John Hero",
        role: "Quality Assurance",
        image: "/developers/sapio.jpg",
        email: "sapiojohnhero@gmail.com",
        github: "https://github.com/jhsapio",
        facebook: "https://www.facebook.com/johnhero.sapio.3",
        linkedin: "",
    },
    {
        name: "Baniaga, Al-Owlah",
        role: "Frontend Developer",
        image: "/developers/Owla.jpg",
        email: "",
        github: "https://github.com/albaniaga",
        facebook: "https://www.facebook.com/alstranger10",
        linkedin: "",
    },
    {
        name: "Macapodi, Abdul Naafi",
        role: "Quality Assurance",
        image: "",
        email: "donsadam29@gmail.com",
        github: "https://github.com/finn-08-btw",
        facebook: "",
        linkedin: "",
    },
]

function Developers() {
  return (
    <div className="min-h-screen bg-transparent px-4 py-10 text-gray-900 dark:text-slate-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-[#3E2F26] dark:text-slate-100">
              Meet the Developers
            </h1>
            <p className="mt-2 text-gray-600 dark:text-slate-300">
              The team behind KulturaLink.
            </p>
          </div>

          <Link
            to="/public-listings"
            className="rounded-xl bg-[#556B2F] px-5 py-3 font-semibold text-white hover:bg-[#445523]"
          >
            Back
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {developers.map((dev) => (
            <article
              key={dev.name}
              className="group rounded-2xl border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900/85"
            >
              <div className="relative mb-5 h-24 w-24 overflow-hidden rounded-full bg-[#3E2F26] text-[#F4D58D]">
                <div className="flex h-full w-full items-center justify-center text-2xl font-bold">
                  {dev.name.charAt(0)}
                </div>

                <img
                  src={dev.image}
                  alt={dev.name}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-300 group-hover:opacity-100"
                />
              </div>

              <h2 className="text-2xl font-bold text-[#3E2F26] dark:text-slate-100">
                {dev.name}
              </h2>
              <p className="mt-1 font-semibold text-[#556B2F] dark:text-lime-400">
                {dev.role}
              </p>
              <p className="mt-3 text-sm text-gray-600 dark:text-slate-300">
                {dev.bio}
              </p>

              <div className="mt-5 flex gap-3 text-xl text-[#3E2F26] dark:text-slate-200">
                <a href={`mailto:${dev.email}`} aria-label="Email">
                  <FaEnvelope />
                </a>
                <a href={dev.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <FaGithub />
                </a>
                <a href={dev.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href={dev.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Developers;