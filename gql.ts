export const gql = createTemplateFunction((query) => {
	let variables;
	const request = (): Promise<GqlTypes.Query> =>
		fetch(
			'https://api.thegraph.com/subgraphs/name/1inch-exchange/one-inch-v2',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					query,
					...(variables ? { variables } : {}),
				}),
			}
		)
			.then((r) => r.json())
			.then((r) => r.data);
	return createInvocablePromise<GqlTypes.Query>(
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
});
