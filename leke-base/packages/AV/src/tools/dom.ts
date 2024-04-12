export function setProps(el, properties = {}, attributes = {}) {
    Object.getOwnPropertyNames(properties).forEach(function (propName) {
        const val = properties[propName];

        if (propName.indexOf('aria-') !== -1 || propName === 'role' || propName === 'type') {
            console.warn('Setting attributes in the second argument of setProps()\n' +
                'has been deprecated. Use the third argument instead.\n' +
                `setProps(el, properties, attributes). Attempting to set ${propName} to ${val}.`);
            el.setAttribute(propName, val);

        } else if (el[propName] !== val) {
            el[propName] = val;
        }
    });

    Object.getOwnPropertyNames(attributes).forEach(function (attrName) {
        el.setAttribute(attrName, attributes[attrName]);
    });

    return el;
}

function throwIfWhitespace(str) {
    if (str.indexOf(' ') >= 0) {
        throw new Error('class has illegal whitespace characters');
    }
}

function classRegExp(className) {
    return new RegExp('(^|\\s)' + className + '($|\\s)');
}

export function hasClass(element, classToCheck) {
    throwIfWhitespace(classToCheck);
    if (element.classList) {
        return element.classList.contains(classToCheck);
    }
    return classRegExp(classToCheck).test(element.className);
}

export const dom2str =(dom:Element)=>{
    const $outer = document.createElement('div');
    $outer.appendChild(dom);
    return $outer.innerHTML;
};
export const str2dom =(str:string)=>{
    const $outer = document.createElement('div');
    $outer.innerHTML=str;
    return $outer.children;
};

export function addClass(element, classToAdd) {
    if (element.classList) {
        element.classList.add(classToAdd);
    } else if (!hasClass(element, classToAdd)) {
        element.className = (element.className + ' ' + classToAdd).trim();
    }
    return element;
}

export function removeClass(element, classToRemove) {
    if (element.classList) {
        element.classList.remove(classToRemove);
    } else {
        throwIfWhitespace(classToRemove);
        element.className = element.className.split(/\s+/).filter(function (c) {
            return c !== classToRemove;
        }).join(' ');
    }
    return element;
}

export function getStyle(styles={}){
    const keys=Object.keys(styles);
    return keys.length?keys.reduce((s,i)=>{
        return s+=`${i}:${styles[i]};`;
    },''):'';
}