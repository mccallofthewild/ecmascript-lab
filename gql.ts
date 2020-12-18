export const gql = (...templateLiteral: Parameters<typeof String.raw>) => {
  const query = String.raw(...templateLiteral);
  let variables;
  const request = () =>
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query,
        ...(variables ? { variables } : {}),
      }),
    })
      .then((r) => r.json())
      .then((r) => r.data);
  return createInvocablePromise(
    (vars) => {
      variables = vars;
      return request();
    },
    (resolve, reject) => {
      const timeout = setTimeout(() => {
        if (variables) return resolve(true);
        return resolve(request());
      }, 0);
    }
  );
};
