/**
 * @param {string} expression
 * @return {boolean}
 */
var parseBoolExpr = function(expression) {
    
    if(expression[0] === '&') {
        const start_index = expression.indexOf('&');
        const end_index = calculateEndIndex(expression, start_index);
        const subString = expression.substring(start_index + 2, end_index);
        const returnedVal = parseBoolExpr(subString);
        return isAndCheck(expression[start_index], returnedVal);
    }
    if(expression[0] === '|') {
        const start_index = expression.indexOf('|');
        const end_index = calculateEndIndex(expression, start_index);
        const subString = expression.substring(start_index + 2, end_index);
        const returnedVal = parseBoolExpr(subString);
        return isOrCheck(expression[start_index], returnedVal);
    }
    if(expression[0] === '(') {
        const start_index = expression.indexOf('(')
        const end_index = expression.length - 1;
        const boolExpr = expression.substring(start_index, end_index);
        return boolExpr;
    }
    else {
        return expression;
    }
};

const calculateEndIndex = (expression, start_index) => {
    return expression.length - 1;
}

const isAndCheck = (cond_operator, expression) => {
   if(expression.length > 1){
       const fullArray =  expression.split(',');
       const filteredArray = fullArray.filter(value => value === 't')
       if(fullArray.length === filteredArray.length) {
           return true;
       }
       else {
           return false;
       }
   }
   else{
       return expression === 't' ? true : false 
   } 
   
}


const isOrCheck = (cond_operator, expression) => {
   if(expression.length > 1){
       const fullArray =  expression.split(',');
       const filteredArray = fullArray.filter(value => value === 'f')
       if(fullArray.length === filteredArray.length) {
           return false;
       }
       else {
           return true;
       }
   }
   else{
       return expression === 't' ? true : false 
   } 
   
}

console.log(parseBoolExpr("&(t,t,t)"));
