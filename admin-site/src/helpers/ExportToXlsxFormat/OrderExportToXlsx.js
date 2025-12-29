import * as XLSX from "xlsx";
import { message } from "antd";

import getStatusDescription from "../getStatusDescription";

const getFileName = (event) => {
    const base = event?.name || "event";
    return base.replace(/[\\/:*?"<>|]+/g, "_");
};

const OrderExportToXlsx = (orders, event) => {
    try {
        if (!orders?.length) {
            message.info("No orders to export.");
            return;
        }

        const menuNames = Array.from(
            new Set(
                orders.flatMap((o) =>
                    (o?.menus || []).map((m) => m?.name).filter(Boolean),
                ),
            ),
        );

        const orderSheetData = orders.map((order) => {
            const rec = {
                OrderID: order?._id || "",
                InvoiceNumber: order?.invoiceNumber || "",
                Status: getStatusDescription(order?.status),
                CustomerName: order?.customerFullname || "",
                CustomerEmail: order?.customerEmail || "",
                CustomerPhone: order?.customerPhone || "",
                PaymentType: order?.paymentType || "",
                TotalPrice: order?.totalPrice ?? "",
                Event: event?.name || "",
                Note: order?.note || "",
                CreatedAt: order?.created_at || "",
                UpdatedAt: order?.updated_at || "",
            };

            menuNames.forEach((name) => {
                const found = (order?.menus || []).find(
                    (m) => m?.name === name,
                );
                rec[name] =
                    found && Number(found.totalPortion) !== 0
                        ? found.totalPortion
                        : "";
            });

            return rec;
        });

        const fileName = getFileName(event);

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(orderSheetData);
        XLSX.utils.book_append_sheet(wb, ws, "Orders");
        XLSX.writeFile(wb, `${fileName}-orders.xlsx`);
    } catch (e) {
        message.error("Failed to export to XLSX");
        console.error(e);
    }
};

export default OrderExportToXlsx;
