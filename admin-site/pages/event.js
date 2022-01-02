import LoggedInMain from "../src/components/Main/loggedInMain/loggedInMain";

const event = () => {
    const pageData = { name: 'Event', href: '/event', current: true };
    const pageTitle = "Saso App | Event";

    return (
        <LoggedInMain title={pageTitle} pageData={pageData}>
            <p>test event</p>
        </LoggedInMain>
    );
};

export default event;