var cloneDeep = (function () {
  const tempMap = new Map();

  const getType = (value) => {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
  }
  
  const createTarget = (origin) => {
    const type = getType(origin);

    switch (type) {
      case 'object':
        return {};
      case 'array':
        return [];
      case 'map':
        return new Map();
      case 'set':
        return new Set();
      default:
        return {};
    }
  };

  return function (origin) {
    tempMap.clear();

    function cloneDeep (origin) {
      if (typeof origin !== 'object') {
        throw new TypeError('Please pass an object.')
      }
    
      const target = createTarget(origin);
    
      const _cloneDeep = (origin, target) => {
        const type = getType(origin);
        const cloneFunctionMap = {
          object: _cloneObject,
          array: _cloneArray,
          set: _cloneSet,
          map: _cloneMap
        };
        cloneFunctionMap[type] && tempMap.set(origin, target);
        return cloneFunctionMap[type] ? cloneFunctionMap[type](origin, target) : origin;
      };
    
      const _cloneObject = (origin, target) => {
        for (const key in origin) {
          if (origin.hasOwnProperty(key)) {
            if (typeof origin[key] === 'object') {
              target[key] = tempMap.has(origin[key]) ? tempMap.get(origin[key]) : cloneDeep(origin[key]);
            } else {
              target[key] = origin[key];
            }
          }
        }
        return target;
      }
    
      const _cloneArray = (origin, target) => {
        for (let i = 0; i < origin.length; i ++) {
          if (typeof origin[i] === 'object') {
            target[i] = tempMap.has(origin[i]) ? tempMap.get(origin[i]) : cloneDeep(origin[i]);
          } else {
            target[i] = origin[i];
          }
        }
        return target;
      }
    
      const _cloneSet = (origin, target) => {
        for (const value of origin) {
          if (typeof value === 'object') {
            target.add(tempMap.has(value) ? tempMap.get(value) : cloneDeep(value));
          } else {
            target.add(value);
          }
        }
        return target;
      }
    
      const _cloneMap = (origin, target) => {
        for (const [key, value] of origin.entries()) {
          if (typeof value === 'object') {
            target.set(key, tempMap.has(value) ? tempMap.get(value) : cloneDeep(value));
          } else {
            target.set(key, value);
          }
        }
        return target;
      }
    
      return _cloneDeep(origin, target);
    }

    return cloneDeep(origin);
  }
})();

