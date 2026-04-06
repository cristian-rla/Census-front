import Image from "next/image";
import FotoProfesional from "./Foto_profesional_CRLA.jpeg";

export default function Header() {
  return (
    <header className="bg-white w-full px-8 py-3 flex items-center gap-25">
      <label className="relative flex flex-1 items-center bg-neutral-2 p-2 gap-4 rounded-lg">
        <span className="pointer-events-none select-none material-symbols-outlined">
          search
        </span>
        <input
          type="text"
          placeholder="Search contacts, companies or leads"
          className="flex-1 focus:outline-none bg-transparent text-sm"
        ></input>
      </label>
      <div className="flex items-center text-slate-500 gap-6">
        <button className="flex-1 bg-primary-2 rounded-lg py-2 px-4 text-white font-light">
          Add Lead
        </button>
        <button className="text-on-surface">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button>
          <span className="material-symbols-outlined">history</span>
        </button>
        <button>
          <span className="material-symbols-outlined">apps</span>
        </button>
        <button>
          <Image
            src={FotoProfesional}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-lg object-cover aspect-square"
          />
        </button>
      </div>
    </header>
  );
}
