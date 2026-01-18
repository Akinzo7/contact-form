import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import SuccessModal from "./components/SuccessModal";

function App() {
   const [isSuccess, setSuccess] = useState(false);


   function handleSuccess(data) {
    setSuccess(true);
    console.log(data);
  }
  useEffect(() => {
    if(isSuccess){
      const timeId = setTimeout(() =>{
        setSuccess(false)
      } ,5000)
      return () =>{
        clearTimeout(timeId)
      }
    }
  },[isSuccess])

  return (
    <>
      {" "}
      <main className="md:grid md:place-items-center bg-[hsl(148,38%,91%)] mx-auto px-4 py-6 size-full min-h-screen">
        <ContactForm onSuccess={handleSuccess} />
        {isSuccess && <SuccessModal  />}
      </main>
    </>
  );
}

export default App;
