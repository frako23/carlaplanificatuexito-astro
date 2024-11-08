import { useState } from "react";
import type { Form } from "../../types";

const Modal = ({
  title,
  styleType,
  downloadGuide,
}: {
  title: string;
  styleType: string;
  downloadGuide?: boolean;
}) => {
  const [show, setShow] = useState(false);
  const [startDownload, setStartDownload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    message: "",
  });
  console.log(show);

  /* ------------------------ DESCARGAR GUIA FINANCIERA ----------------------- */
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/guia-financiera.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* --------------------------- MANEJAR FORMULARIO --------------------------- */
  const handlForm = ({
    target,
  }: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  /* ---------------------------- CARGAR FORMULARIO --------------------------- */
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://formspree.io/f/meoqglwd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        let error = await res.json();
        alert("Upps hubo un error al enviar el mensaje");
        setLoading(false);
        throw new Error(error);
      }
      const data = await res.json();
      console.log(data);

      setForm({
        name: "",
        email: "",
        message: "",
      });
      alert("Tu mensaje fue enviado exitosamente");
      if (downloadGuide) {
        setStartDownload(true);
        setLoading(false);
      } else {
        setLoading(false);
        setShow(false);
      }
    } catch (error) {
      setForm({
        name: "",
        email: "",
        message: "",
      });
      setLoading(false);
      alert("Upps hubo un error al enviar el mensaje");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    first:
      "hover:bg-darkBlue bg-middleBlue border border-darkBlue text-darkBlue hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-500 ease-in-out",
    second:
      "hover:bg-grey bg-darkBlue text-grey hover:text-darkBlue hover:border-darkBlue hover:border-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-500 ease-in-out",
  };

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className={styleType == "first" ? styles.first : styles.second}
        type="button"
      >
        {title}
      </button>

      <div
        className={`${!show && "hidden"} bg-black bg-opacity-80 overflow-y-auto overflow-x-hidden fixed z-50 flex justify-center items-center w-full md:inset-0  max-h-full`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="bg-middleBlue flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <img src="/logo2.avif" alt="" className="h-20" />
              <h3 className="text-xl font-semibold text-gray-900 text-center dark:text-white">
                ¿Listo para dar el primer paso?
              </h3>
              <button
                type="button"
                className="transition duration-500 ease-in-out hover:border hover:border-darkBlue text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setShow(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="#23284f"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div>
              {downloadGuide && startDownload ? (
                <div className="bg-white shadow-md rounded px-16 pt-6 pb-8 mb-4">
                  <h4 className="block text-gray-700 text-center font-bold mb-4">
                    Contáctame hoy para obtener más información o para programar
                    una cita.
                  </h4>
                  <img
                    src="/guia-financiera.png"
                    alt="portada de guia financiera"
                    className="mb-4"
                  />
                  <button
                    className="transition duration-500 ease-in-out hover:border hover:border-darkBlue bg-darkBlue hover:bg-middleBlue hover:text-darkBlue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-44"
                    type="button"
                    onClick={() => {
                      handleDownload();
                      setShow(false);
                      setStartDownload(false);
                    }}
                  >
                    Descargar
                  </button>
                </div>
              ) : (
                <form
                  id="myForm"
                  onSubmit={handleSubmit}
                  className="bg-white shadow-md rounded px-16 pt-6 pb-8 mb-4"
                >
                  <h4 className="block text-gray-700 text-center font-bold mb-4">
                    Contáctame hoy para obtener más información o para programar
                    una cita.
                  </h4>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Nombre
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handlForm}
                      required
                      placeholder="Tú Nombre"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handlForm}
                      required
                      type="email"
                      placeholder="Tú Email Aquí"
                    />
                  </div>
                  <div className="">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="message"
                    >
                      Mensaje
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline h-28"
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handlForm}
                      placeholder="Tú Mensaje Aquí"
                    ></textarea>
                  </div>
                  <div className="flex items-center px-4 md:p-5 rounded-b dark:border-gray-600">
                    <button
                      disabled={loading}
                      className="transition duration-500 ease-in-out hover:border hover:border-darkBlue bg-darkBlue hover:bg-middleBlue hover:text-darkBlue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-44"
                      type="submit"
                    >
                      {loading ? "Enviando..." : "Enviar"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
