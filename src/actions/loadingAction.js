import { type } from "../constant/type";

export const startLoading = () => ({
    type: type.loading.start
});

export const endLoading = () => ({
    type: type.loading.end
})