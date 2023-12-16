"use client"
import { useEffect, useState } from "react";
import LoadingDots from "../icons/loading-dots";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const AddOpenaiApiKey = () => {
  const [pending, setPending] = useState(false);
  const [openaiApiKey, setOpenaiApiKey] = useState("");

  useEffect(() => {
    const apiKey = window.localStorage.getItem("openaiApiKey");
    if (apiKey) setOpenaiApiKey(apiKey);
    
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPending(true);
    localStorage.setItem("openaiApiKey", openaiApiKey);
    setPending(false);
    toast.success(`Successfully updated openAi ApiKey!`);

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-black"
    >
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <h2 className="font-cal text-xl dark:text-white">Openai Api Key</h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Add your own Openai Api Key to use Ai feature on the app.
        </p>
        <input
          name="openaiApiKey"
          onChange={(e) => setOpenaiApiKey(e.target.value)}
          value={openaiApiKey}
          type="text"
          className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
        />
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Please Add Open Ai api key{" "}
        </p>
        <button
          type="submit"
          className={cn(
            "flex h-8 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10",
            pending
              ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
              : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
          )}
          disabled={pending}
        >
          {pending ? <LoadingDots color="#808080" /> : <p>Save Changes</p>}
        </button>
      </div>
    </form>
  );
};

export default AddOpenaiApiKey;