export const insertKeytoData = (data) => {
    if (data?.length > 0) {
        data = data.map((d, i) => {
            return {
                ...d,
                key: i,
            };
        });
    }
    return data;
};
