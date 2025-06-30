export const Home = () => {
  return (
    <>
      <div>Home</div>
      <form
        action="http://localhost:4242/create-checkout-session"
        method="POST"
      >
        <button type="submit">Checkout</button>
      </form>
    </>
  );
};

export default Home;
