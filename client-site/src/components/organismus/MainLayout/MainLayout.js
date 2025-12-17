import { Layout, Result } from "antd";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Navbar from "../../molecules/Navbar/Navbar";
import FooterComponent from "../../atoms/Footer/Footer";
import { isAuth } from "../../../helpers/authHelper";
import { fetchEventBySlug, fetchEvents } from "../../../stores/reducers/event";

const { Content } = Layout;

const MainLayout = ({ children, isAuthRequired }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { eventSlug } = router.query;

    useEffect(() => {
        if (!router.isReady) return;

        if (eventSlug) {
            dispatch(fetchEventBySlug(eventSlug));
        } else {
            dispatch(fetchEvents("approved"));
        }
    }, [router.isReady, eventSlug, dispatch]);

    const authorized = !isAuthRequired || isAuth();

    return (
        <Layout
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#ffffff",
            }}>
            <Navbar />

            {/* Main content grows and pushes footer down */}
            <Content style={{ flex: 1 }}>
                {authorized ? (
                    children
                ) : (
                    <Result
                        status="403"
                        title="403"
                        subTitle="Sorry, you are not authorized to access this page."
                    />
                )}
            </Content>

            <FooterComponent />
        </Layout>
    );
};

export default MainLayout;
