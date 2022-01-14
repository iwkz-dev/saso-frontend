import LoggedInMain from "../../src/components/Main/loggedInMain/loggedInMain";
import MenuTable from "../../src/components/Tables/MenuTable";

const index = () => {
  const pageData = { name: "Menu", href: "/menu", current: true };
  const pageTitle = "Saso App | Menu";

  return (
    <LoggedInMain title={pageTitle} pageData={pageData}>
      <MenuTable />
    </LoggedInMain>
  );
};

export default index;
