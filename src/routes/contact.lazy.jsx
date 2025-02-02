import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";

import postContact from "../api/postContact";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: function (e) {
      e.preventDefault();
      const formData = new FormData(e.target);

      return postContact({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      });
    },
  });

  return (
    <div className="contact">
      <h2>Contact Us</h2>
      {mutation.isSuccess ? (
        <>
          <h3>Submitted!</h3>
          <p>
            Thanks for sending your message. We will take care of your message.
          </p>
        </>
      ) : (
        <form onSubmit={mutation.mutate}>
          <input type="text" placeholder="Name" name="name" />
          <input type="email" placeholder="Email" name="email" />
          <textarea placeholder="Message" name="message"></textarea>
          <button type="submit">Send Message</button>
        </form>
      )}
    </div>
  );
}
