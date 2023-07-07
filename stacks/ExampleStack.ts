import { StackContext, Api, StaticSite } from "sst/constructs";

export function ExampleStack({ stack, app }: StackContext) {
	// Create Api
	const api = new Api(stack, "Api", {
		authorizers: {
			auth0: {
				type: "jwt",
				jwt: {
					issuer: process.env.AUTH0_DOMAIN + "/",
					audience: [process.env.AUTH0_DOMAIN + "/api/v2/"],
				},
			},
		},
		defaults: {
			authorizer: "auth0",
		},
		routes: {
			"GET /private": "packages/functions/src/private.main",
			"GET /public/bitchass": {
				function: "packages/functions/src/public.main",
				authorizer: "none",
			},
		},
	});

	// Show the API endpoint and other info in the output
	stack.addOutputs({
		ApiEndpoint: api.url,
	});
}
