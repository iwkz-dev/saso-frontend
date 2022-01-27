import LoggedInMain from "../../../src/components/Main/loggedInMain/loggedInMain";

const id = () => {
  const pageData = {
    name: "Menu",
    href: `/menu/add/`,
    current: true,
  };
  const pageTitle = "Saso App | Menu";

  return (
    <LoggedInMain title={pageTitle} pageData={pageData}>
      This is add menu page
    </LoggedInMain>
  );
};

export default id;
