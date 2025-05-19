import { getAccessToken, handleLogout } from "@auth0/nextjs-auth0";

const BACKEND_API_URL = process.env.BACKEND_API_URL || "";
const BACKEND_API_SECRET = process.env.BACKEND_API_SECRET || "";

async function forwardRequest(request: Request, params: { backend?: string[] }): Promise<Response> {
	const originalUrl = new URL(request.url);
	const backendPath = params.backend ? params.backend.join("/") : "";
	const url = `${BACKEND_API_URL}/${backendPath}${originalUrl.search}`;
	const {accessToken} = await getAccessToken();
  
	const headers = new Headers(request.headers);
	headers.delete("host");
    headers.append("api-secert", BACKEND_API_SECRET);

	if (accessToken){
		headers.set("Authorization", `Bearer ${accessToken}`);
	}
	// else{
	// 	await handleLogout();   handle redirect in the frontend(default users must have access)
	// }
	
    const init: RequestInit = {
		method: request.method,
		headers,
		body: request.method !== "GET" && request.method !== "HEAD" ? await request.text() : undefined,
	};

    return await fetch(url, init);
}

export async function GET(request: Request, { params }: { params: { backend?: string[] } }): Promise<Response> {
	return forwardRequest(request, params);
}

export async function POST(request: Request, { params }: { params: { backend?: string[] } }): Promise<Response> {
	return forwardRequest(request, params);
}

export async function PUT(request: Request, { params }: { params: { backend?: string[] } }): Promise<Response> {
	return forwardRequest(request, params);
}

export async function PATCH(request: Request, { params }: { params: { backend?: string[] } }): Promise<Response> {
	return forwardRequest(request, params);
}

export async function DELETE(request: Request, { params }: { params: { backend?: string[] } }): Promise<Response> {
	return forwardRequest(request, params);
}

export async function OPTIONS(request: Request, { params }: { params: { backend?: string[] } }): Promise<Response> {
	return forwardRequest(request, params);
}