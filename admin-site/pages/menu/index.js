import LoggedInMain from "../../src/components/Main/loggedInMain/loggedInMain";
import MenuTables from "../../src/components/Tables/MenuTables";


const index = () => {
    const pageData = { name: 'Menu', href: '/menu', current: true };
    const pageTitle = "Saso App | Menu";

    return (
        <LoggedInMain title={pageTitle} pageData={pageData}>
            <MenuTables/>
        </LoggedInMain>
    );
};

export default index;
