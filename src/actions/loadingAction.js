import { loadingType } from "../constant/loading";

export const startLoading = () => ({
    type: loadingType.start
});

export const endLoading = () => ({
    type: loadingType.end
})