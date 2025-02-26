// Validate if object is empty
export const validationObjectIsEmpty = (object: any) => {
    if((Object.keys(object).length === 0)){
        return true;
    }
}