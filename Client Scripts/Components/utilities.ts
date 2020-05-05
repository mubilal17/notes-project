

function cssObjectToString(cssObject)
{
    let classString = "";
    Object.values(cssObject).forEach(value => classString += value + " ");
    return classString;
}

export {cssObjectToString};