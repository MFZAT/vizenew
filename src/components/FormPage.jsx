import React, { Suspense, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

export default function FormPage({ formData }) {
  const container = useRef();
  const args = {
    makeDefault: true,
    position: [0, 0, 10],
    zoom: 40,
  };

  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmit = (data) => {
    // console.log(data);

    // console.log(watch("texts"));

    const texts = watch("texts").split(",");

    formData(texts);
  };

  return (
    <>
      <motion.main
        className="h-fit w-full absolute z-10 left-0"
        initial={{ opacity: 0, y: -300 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            ease: "ease-in-out",
            duration: 0.3,
            y: { duration: 1 },
          },
        }}
        exit={{ y: -300, opacity: 0 }}
      >
        <div className="w-full flex flex-col items-start justify-center">
          <form
            className="bg-gradient-to-tr from-[#007934] via-[#bed600] to-[#3f9c35] text-white  rounded  pt-6 pb-16 px-12 rounded-b-full shadow-xl  "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-2">
              {/* <label
                className="block text-gray-700 text-white text-sm font-bold mb-2"
                htmlFor="texts"
              >
                Texty
              </label> */}
              <textarea
                className="font-['Exo_2'] appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                id="texts"
                type="text"
                placeholder="Inovace, AI, "
                {...register("texts")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-center text-black text-sm">
                Vyplňte texty, které chcete zobrazit. Jednotlivé fráze oddělte
                čárkou
              </p>
              <button
                className="
          text-[#007934] bg-white
                font-['Exo_2'] font-bold py-2 px-4 rounded-full mx-auto focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Vytvořit texty
              </button>
            </div>
          </form>
        </div>
      </motion.main>
    </>
  );
}
