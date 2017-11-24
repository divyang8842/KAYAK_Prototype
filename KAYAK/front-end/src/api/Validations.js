//zipcode validation:

var regPostalCode = new RegExp("^\\d{5}(-\\d{4})?$");

export const validateZipCode =  function(postal_code){
    return regPostalCode.test(postal_code);
}




