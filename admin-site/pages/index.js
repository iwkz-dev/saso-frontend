import LoggedInLayout from "../src/components/Layout/loggedInLayout/loggedInLayout";

const index = () => {
    const pageData = { name: "Dashboard", href: "/", current: true };
    const pageTitle = "Saso App | Dashboard";

    return (
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <p>Dashboard is here</p>
        </LoggedInLayout>
    );
};

export default index;
