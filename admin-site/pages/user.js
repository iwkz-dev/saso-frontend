import LoggedInLayout from "../src/components/Layout/loggedInLayout/loggedInLayout";

const user = () => {
    const pageData = { name: "User", href: "/user", current: true };
    const pageTitle = "Saso App | User";

    return (
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <p>user page</p>
        </LoggedInLayout>
    );
};

export default user;
