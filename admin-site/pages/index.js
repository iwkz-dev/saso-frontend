import LoggedInMain from "../src/components/Main/loggedInMain/loggedInMain";

const index = () => {
  const pageData = { name: "Dashboard", href: "/", current: true };
  const pageTitle = "Saso App | Main Page";

  return (
    <LoggedInMain title={pageTitle} pageData={pageData}>
      <p>Welcome to SASO APP</p>
    </LoggedInMain>
  );
};

export default index;
