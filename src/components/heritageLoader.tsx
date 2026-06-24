import { FaLandmark } from "react-icons/fa";

type HeritageLoaderProps = {
  message?: string;
  count?: number;
};

export default function HeritageLoader({
  message = "Loading cultural heritage data...",
  count = 6,
}: HeritageLoaderProps) {
  return (
    <section
      className="min-h-[70vh] px-4 py-12"
      role="status"
      aria-live="polite"
    >
      <div className="mb-10 flex flex-col items-center">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-[#C8A96B]/30 border-t-[#556B2F]" />

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#3E2F26] shadow-md dark:bg-slate-800 dark:text-[#F4D58D]">
            <FaLandmark className="text-2xl" />
          </div>
        </div>

        <p className="mt-4 font-semibold text-[#3E2F26] dark:text-slate-100">
          {message}
        </p>
        <span className="sr-only">Please wait</span>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse overflow-hidden rounded-lg border border-gray-200 bg-white/85 shadow-md dark:border-slate-700 dark:bg-slate-800/85"
          >
            <div className="h-40 bg-gray-300 dark:bg-slate-700" />

            <div className="space-y-3 p-5">
              <div className="h-5 w-3/4 rounded bg-gray-300 dark:bg-slate-600" />
              <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-slate-700" />
              <div className="h-4 w-full rounded bg-gray-200 dark:bg-slate-700" />
              <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-slate-700" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}