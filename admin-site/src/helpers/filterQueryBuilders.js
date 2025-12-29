const filtersQueryBuilder = (vals) => {
    if (!Array.isArray(vals) || vals.length === 0) return "";
    return vals
        .map((f) => `${encodeURIComponent(f.name)}=${encodeURIComponent(f.id)}`)
        .join("&");
};

export default filtersQueryBuilder;
