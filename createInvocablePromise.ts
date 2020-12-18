function createInvocablePromise<
  PromiseReturnType,
  FunctionType extends Function = Function
>(
  fn: FunctionType,
  promiseCb: ConstructorParameters<typeof Promise>[0]
): Promise<PromiseReturnType> & Function {
  const promiseDescriptors = Object.getOwnPropertyDescriptors(
    Promise.prototype
  );
  const promiseInstance = new Promise(promiseCb);
  for (let thing in promiseDescriptors) {
    promiseDescriptors[thing].value = promiseDescriptors[thing].value.bind(
      promiseInstance
    );
  }
  Object.defineProperties(fn, promiseDescriptors);
  return (fn as unknown) as Promise<PromiseReturnType> & Function;
}
