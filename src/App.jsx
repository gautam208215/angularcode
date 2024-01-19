import Protected from "./components/protected";
import Public from "./components/public";
import useAuth from "./hook/useAuth";

function App() {
  const [isLogin, token, Logout] = useAuth();
  return isLogin ? (
    <>
      <button type="submit" onClick={Logout}>
        Logout
      </button>
      <Protected token={token} />
    </>
  ) : (
    <Public />
  );
}

export default App;
