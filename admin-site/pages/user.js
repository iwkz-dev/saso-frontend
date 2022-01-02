import LoggedInMain from "../src/components/Main/loggedInMain/loggedInMain";

const user = () => {
    const pageData = { name: 'User', href: '/user', current: true };
    const pageTitle = "Saso App | User";

    return (
        <LoggedInMain title={pageTitle} pageData={pageData}>
            <p>
                {"I'm user page"}
            </p>
        </LoggedInMain>
    );
};

export default user;
