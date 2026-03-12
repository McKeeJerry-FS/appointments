import React from "react";

export const CustomerForm = ({ original, onSubmit }) => (
  <form onSubmit={() => onSubmit(original)}>
    <label htmlFor="firstName">First Name</label>
    <input type="text" name="firstName" id="firstName" value={original.firstName} />
    <button type="submit">Submit</button>
  </form>
);
