export const Home = () => {
  return (
    <>
      <div>Home</div>
      <form
        action="http://localhost:4242/create-checkout-session"
        method="POST"
      >
        <input
          name="firstName"
          type="text"
          placeholder="Enter your first name"
        />
        <input name="lastName" type="text" placeholder="Enter your last name" />
        <button type="submit">Checkout</button>
      </form>
    </>
  );
};

export default Home;
