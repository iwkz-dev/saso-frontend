import { useRouter } from 'next/router';
import LoggedInMain from "../../../src/components/Main/loggedInMain/loggedInMain";
import MenuForms from "../../../src/components/Forms/MenuForms";


const id = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    const { id } = router.query;
    const pageData = { name: 'Menu', href: '/menu/edit/'+ {id}, current: true };
    const pageTitle = "Saso App | Menu";

    return (
        <LoggedInMain title={pageTitle} pageData={pageData}>
            <MenuForms id={id}/>
        </LoggedInMain>
    );
};

export default id;
