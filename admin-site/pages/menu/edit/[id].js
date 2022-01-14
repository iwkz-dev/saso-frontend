import { useRouter } from "next/router";
import LoggedInMain from "../../../src/components/Main/loggedInMain/loggedInMain";
import MenuForm from "../../../src/components/Forms/MenuForm";

const id = () => {
  const router = useRouter();
  const { id } = router.query;
  const pageData = {
    name: "Menu",
    href: `/menu/edit/${{ id }}`,
    current: true,
  };
  const pageTitle = "Saso App | Menu";

  return (
    <LoggedInMain title={pageTitle} pageData={pageData}>
      <MenuForm id={id} />
    </LoggedInMain>
  );
};

export default id;
