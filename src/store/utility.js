export const updateObj = (oldObj, updProp) => {
    return {
        ...oldObj,
        ...updProp
    }
}