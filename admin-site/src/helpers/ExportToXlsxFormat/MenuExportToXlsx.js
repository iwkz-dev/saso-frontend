import * as XLSX from "xlsx";
import { message } from "antd";

const getFileName = (event) => {
    const base = event?.name || "event";
    return base.replace(/[\\/:*?"<>|]+/g, "_");
};

const MenuExportToXlsx = (menus, event, vendors = [], categories = []) => {
    try {
        if (!menus?.length) {
            message.info("No menus to export.");
            return;
        }

        const categoryMap = new Map(
            categories.map((c) => [String(c._id), c.name]),
        );

        const vendorMap = new Map(vendors.map((v) => [String(v._id), v.name]));

        const menuSheetData = menus.map((menu) => {
            const categoryId =
                typeof menu?.category === "object"
                    ? menu?.category?._id
                    : menu?.category;

            const vendorId =
                typeof menu?.vendor === "object"
                    ? menu?.vendor?._id
                    : menu?.vendor;

            return {
                MenuID: menu?._id || "",
                Name: menu?.name || "",
                Barcode: menu?.barcode || "",
                Description: menu?.description || "",
                Note: menu?.note || "",
                Quantity: menu?.quantity ?? "",
                QuantityOrder: menu?.quantityOrder ?? "",
                Price: menu?.price ?? "",
                Currency: "EUR",
                Category: categoryMap.get(String(categoryId)) || "",
                Vendor: vendorMap.get(String(vendorId)) || "",
                Event: event?.name || "",
                CreatedAt: menu?.created_at || "",
                UpdatedAt: menu?.updated_at || "",
            };
        });

        const fileName = getFileName(event);

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(menuSheetData);
        XLSX.utils.book_append_sheet(wb, ws, "Menus");
        XLSX.writeFile(wb, `${fileName}-menus.xlsx`);
    } catch (e) {
        message.error("Failed to export menus to XLSX");
        console.error(e);
    }
};

export default MenuExportToXlsx;
