export interface Register {
  registerTime: string | Date;
  getRetisterTime: () => string | Date;
}

export function addRegisterTime<T extends { new (...args: any[]): {} }> (constructor: T) {

  return class extends constructor implements Register {
    public registerTime = new Date().toUTCString()

    public getRetisterTime (): string | Date {
      return this.registerTime
    }
  }
}