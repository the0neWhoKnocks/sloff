const charTypes = {
  '```': {
    allowed: '(.|\n)',
    end: '```',
    fn: child => `<div className="multiline-code">${child}</div>`,
  },
  '`': {
    allowed: '.',
    end: '`',
    fn: child => `<div className="inline-code">${child}</div>`,
  },
  '_': {
    allowed: '.',
    end: '_',
    fn: child => `<div className="underline">${child}</div>`,
  },
  '~': {
    allowed: '.',
    end: '~',
    fn: child => `<div className="strikethrough">${child}</div>`,
  },
  '*': {
    allowed: '.',
    end: '\\*',
    fn: child => `<div className="bold">${child}</div>`,
  },
  '>': {
    end: '$',
    fn: child => `<div className="italic">${child}</div>`,
  },
  // ":": {
  //   allowed: "[a-z_]",
  //   end: ":",
  //   object: (child) => <Emojione type={child[0]} />
  // },
  // "@": {
  //   allowed: "[a-z_.\-A-Z0-9]",
  //   end: " ",
  //   object: (child) => <User data={child} />
  // }
};
const CHAR_TYPES = Object.keys(charTypes);
  
export function compileToJSON(str) {
  const result = [];
  let minNdx = -1;
  let minNdxKey;
  
  for (let i=0; i<CHAR_TYPES.length; i++) {
    const startVal = CHAR_TYPES[i];
    const ndx = str.indexOf(startVal);
    
    if (ndx >= 0 && (minNdx < 0 || ndx < minNdx)) {
      minNdx = ndx;
      minNdxKey = startVal;
    }
  }
  
  if (minNdxKey) {
    const char = minNdxKey;
    const { allowed, end } = charTypes[char];
    const _allowed = allowed || '.';
    const _end = end ? '?' : '';
    const endGroupPtrn = end ? '('+end+')' : '';
    let strLeft = str.substr(0, minNdx);
    let strRight = str.substr(minNdx + char.length);
    
    // Search for the end of the element in the remaining text
    const [
      matchedStr,
      startGroup,
      endGroup,
    ] = strRight.match(
      new RegExp(`^(${_allowed}*${_end})${endGroupPtrn}`, 'm')
    ) || [];
    
    if (!matchedStr) {
      strLeft += char;
      result.push(strLeft);
    }
    else {
      if (strLeft) result.push(strLeft);
      
      // Iterate over the rest of the text, and build out the JSON
      const obj = {
        content: compileToJSON(startGroup),
        end: endGroup,
        start: char,
      }
      
      result.push(obj);
      strRight = strRight.substr(matchedStr.length);
    }
    
    return result.concat(compileToJSON(strRight));
  }
  
  return str ? [str] : [];
}

export function compileToHTML(arr) {
  const result = [];
  
  for (let i=0; i<arr.length; i++) {
    const item = arr[i];
    
    if (typeof item === 'string') result.push(item);
    else {
      const { content, start } = item;
      
      if (start) {
        result.push(
          charTypes[start].fn(compileToHTML(content))
        );
      }
    }
  }
  
  return result;
}

export function compileToText(arr) {
  return arr.join('');
}
