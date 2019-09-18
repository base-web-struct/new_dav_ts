export class Utils {
  public toJSON (proto: any) {
    const joined: any = {}
    const toConvert = proto || this;
    Object.getOwnPropertyNames(toConvert).forEach((prop) => {
      const val = toConvert[prop];
      // don't include those
      if (prop === 'toJSON' || prop === 'constructor') {
        return;
      }
      if (typeof val === 'function') {
        joined[prop] = val.bind(joined);
        return;
      }
      joined[prop] = val;
    });

    const inherited = Object.getPrototypeOf(toConvert);
    if (inherited !== null) {
      Object.keys(this.toJSON(inherited)).forEach(key => {
        if (!!joined[key] || key === 'constructor' || key === 'toJSON') {
          return;
        }
        if (typeof inherited[key] === 'function') {
          joined[key] = inherited[key].bind(joined);
          return;
        }
        joined[key] = inherited[key];
      });
    }
    return joined;
  }
}
