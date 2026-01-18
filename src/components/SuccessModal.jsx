const SuccessModal = () => {

  return (
    <div className="bg-[hsl(187,24%,22%)] p-4 text-white rounded-md text-sm fixed z-10 top-[5%] left-1/2 -translate-x-1/2">
      <h3 className="flex gap-2 font-bold mb-2">
        <img src="icon-success-check.svg" alt="success" className="w-4"/>
        Message sent!
      </h3>
      <p className="font-light text-[12px]">Thanks for completing the form. We'll be in touch soon!</p>
    </div>
  );
};
export default SuccessModal;
