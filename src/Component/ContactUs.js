import React, { useState } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const respone = await fetch(
      "https://movies-2a006-default-rtdb.firebaseio.com/contact.json",
      {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data= respone.json();
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        className="py-4 px-4"
        style={{ width: "50%" }}
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label
            htmlFor="exampleInputName"
            className="form-label font-weight-bold"
          >
            Name
          </label>
          <input
            type="name"
            name="name"
            value={form.name}
            className="form-control"
            onChange={handleChange}
            id="exampleInputName"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputEmail1"
            className="form-label font-weight-bold"
          >
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            className="form-control"
            onChange={handleChange}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputPhone"
            className="form-label font-weight-bold"
          >
            Phone Number
          </label>
          <input
            type="phone"
            name="phone"
            value={form.phone}
            className="form-control"
            onChange={handleChange}
            id="exampleInputPhone"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
