import React from "react";
import MainLayout from "../../components/organismus/MainLayout/MainLayout";
import CartContent from "../../components/organismus/CartContent/CartContent";

const index = () => {
    return (
        <MainLayout isAuthRequired={false}>
            <CartContent />
        </MainLayout>
    );
};

export default index;
