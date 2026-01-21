export const defaultRefKeyMap = {
    category: "categories",
    vendor: "vendors",
    event: "events",
    paymentType: "paymentTypes",
};

export const getList = (refMap, refKey) => refMap?.get?.(refKey) ?? [];

export const resolveId = (val) =>
    val && typeof val === "object" ? val._id : val;

export const resolveLabel = (val, list, labelFields = ["name"]) => {
    if (val && typeof val === "object") {
        for (const f of labelFields) {
            if (val[f]) return val[f];
        }
    }

    const id = resolveId(val);
    const found = list.find((x) => x._id === id);
    if (found) {
        for (const f of labelFields) {
            if (found[f]) return found[f];
        }
    }
    return "";
};

export const buildRefRender = (refMap, refKey, labelFields) => (val) =>
    resolveLabel(val, getList(refMap, refKey), labelFields);

export const getDisabledByEvents = (record, eventsList) => {
    const eventId = record?.event?._id ?? record?.event;
    const e = eventsList.find((ev) => ev?._id === eventId);
    return e ? e.status !== 1 : true;
};

// ---- Select helpers
export const serializeSelectValue = (id, value) =>
    JSON.stringify({ id, value });

export const getDefaultValue = (options = [], currentCode, id) => {
    const matched = Array.isArray(options)
        ? options.find((o) => o.code === currentCode)
        : undefined;

    const value = matched?.value ?? options?.[0]?.value ?? "";
    return serializeSelectValue(id, value);
};

// ---- Actions helper
export const getHasActions = ({
    actionsOff,
    linkToEdit,
    deleteOff,
    linkToView,
}) => !(actionsOff || (!linkToEdit && deleteOff && !linkToView));
