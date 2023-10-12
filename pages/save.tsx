import { motion } from "framer-motion";
import React, { useState } from "react";

type Form = {
  password: string;
};

export default function Generate() {
  const [downloadState, setDownloadState] = useState<boolean>(false);
  const [form, setForm] = useState<Form>({
    password: "",
  });

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDownloadState(true);
  };

  const resetForm = () => {
    setForm({
      password: "",
    });
    setDownloadState(false);
  };

  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-screen-lg px-4 mx-auto text-zinc-50 py-20 min-h-screen flex flex-col items-center justify-center"
      >
        <h1 className="text-5xl text-center font-bold bg-clip-text text-transparent from-zinc-50 to-zinc-400 bg-gradient-to-r">
          Save password
        </h1>
        <form onSubmit={submitForm} className="mt-4 text-lg w-8/12">
          <div className="flex md:flex-row flex-col items-center gap-x-4 bg-[#12151a] p-6 rounded-lg mt-4 w-auto">
            <label className="font-medium select-none" htmlFor="length">
              Password:{" "}
            </label>
            <input
              type="text"
              name="password"
              id="password"
              value={form.password}
              onChange={updateForm}
              className="appearance-none w-full rounded focus:outline-none bg-transparent active:border-primary focus:border-primary disabled:opacity-50 disabled:hover:bg-transparent focus:ring-transparent"
              disabled={downloadState}
              minLength={4}
              maxLength={64}
              required
            />
          </div>
          <span
            className={`text-green-500 text-sm pl-2 ${
              !downloadState && "hidden"
            }`}
          >
            Successfully saved password to file.
          </span>
          <div className="mt-4">
            <div className="flex md:flex-row flex-col md:justify-evenly justify-center gap-4">
              <button
                type="submit"
                className="text-zinc-50 w-32 border-2 mx-auto border-primary rounded-lg px-4 py-2 hover:bg-primary duration-150 font-medium disabled:opacity-50 disabled:hover:bg-transparent select-none"
                disabled={downloadState}
              >
                Save
              </button>
              <button
                onClick={() => setDownloadState(false)}
                className="text-zinc-50 w-32 border-2 mx-auto border-green-600 rounded-lg px-4 py-2 hover:bg-green-600 duration-150 font-medium disabled:opacity-50 disabled:hover:bg-transparent select-none"
                disabled={!downloadState}
              >
                Download
              </button>
              <button
                onClick={resetForm}
                className="text-zinc-50 w-32 border-2 mx-auto border-red-600 rounded-lg px-4 py-2 hover:bg-red-600 duration-150 font-medium disabled:opacity-50 disabled:hover:bg-transparent select-none"
                disabled={!downloadState}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </motion.main>
    </>
  );
}
