import LoggedInLayout from "../src/components/Layout/loggedInLayout/loggedInLayout";

const event = () => {
    const pageData = { name: "Event", href: "/event", current: true };
    const pageTitle = "Saso App | Event";

    return (
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <p>test event</p>
        </LoggedInLayout>
    );
};

export default event;
