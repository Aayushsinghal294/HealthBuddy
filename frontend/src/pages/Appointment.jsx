import React from "react";

const Appointment = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 text-center text-gray-800"
      style={{
        fontFamily: "ui-rounded, Nunito, Inter, Arial, sans-serif",
      }}
    >
      <img
        src="https://d1uhlocgth3qyq.cloudfront.net/ValuePropsBook___893a8.svg"
        alt="Book your appointment"
        className="w-48 md:w-64 h-auto"
      />
      <h1 className="text-2xl md:text-3xl font-semibold">
        Book Your Appointment with Ease
      </h1>
      <p className="text-base text-gray-600 max-w-md">
        Schedule visits with the right doctors in seconds. Skip the waiting room
        and secure your spot — all online.
      </p>
    </div>
  );
};

export default Appointment;
