export const updateUtility = (oldObject, updatedObject)=>{
    return{
        ...oldObject,
        ...updatedObject
    }
}

export const checkValidity = (rules, value) => {
    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxlength) {
        isValid = value.length <= rules.maxlength && isValid;
    }

    if(rules.isEmail){
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9])/
        isValid = pattern.test(value) && isValid
    }
    if(rules.isNumeric){
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }
    // console.log(isValid);
    // console.log('validation');
    return isValid;
};
    
        


