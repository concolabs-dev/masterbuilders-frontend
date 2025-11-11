import axios, { AxiosError } from "axios";
import { Category, Item, Material, PaymentRecord, Professional, ProfessionalFilters, ProfessionalSearchResult, ProfessionalTypesResponse, Project, ProjectWithProfessional, Supplier, SupplierWithRecord } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const BACKEND_API_SECRET = process.env.NEXT_PUBLIC_BACKEND_API_SECRET || "";

const backend_api_axios = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Helper to get token from our route (client-only)
async function getAuthTokenFromRoute(): Promise<string | null> {
	try {
		if (typeof window === "undefined") return null;
		const res = await fetch("/api/token", {
			method: "GET",
			credentials: "include",
			headers: { Accept: "application/json" },
		});
		if (!res.ok) return null;
		const data: { token?: string; accessToken?: string } = await res.json();
		return data.token || data.accessToken || null;
	} catch (e) {
		console.warn("Failed to fetch /api/token:", (e as Error).message);
		return null;
	}
}

// Add request interceptor to automatically add token
backend_api_axios.interceptors.request.use(
	async (config) => {
		try {
			// Client: get token via our Next.js route
			const token = await getAuthTokenFromRoute();
			console.log("Auth token:", token);
			if (token) {
				config.headers = config.headers ?? {};
				config.headers.Authorization = `Bearer ${token}`;
			}

			// Optional: server-side fallback header (if you need server calls)
			if (typeof window === "undefined" && BACKEND_API_SECRET) {
				config.headers = config.headers ?? {};
				config.headers["x-backend-api-secret"] = BACKEND_API_SECRET;
			}
		} catch (error) {
			console.warn("Auth token not attached:", (error as Error).message);
		}
		return config;
	},
	(error) => Promise.reject(error)
);
// Add response interceptor for error handling
backend_api_axios.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("API Error:", error.response?.data || error.message);
		return Promise.reject(error);
	}
);

export const getSuppliers = async () => {
	const response = await backend_api_axios.get<Supplier[]>("/suppliers");
	return response.data;
};

export const getAllSuppliers = async () => {
	const response = await backend_api_axios.get<SupplierWithRecord[]>("/suppliers-all");
	return response.data;
};

export const getSupplierById = async (id: string) => {
	const response = await backend_api_axios.get<Supplier>(`/suppliers/${id}`);
	return response.data;
};
export const getSupplierByPID = async (pid: string) => {
	const response = await backend_api_axios.get<Supplier>(
		`/suppliers/pid/${pid}`
	);
	return response.data;
};

// export const getSupplierByPPID = async (pid: string) => {
// 	const response = await backend_api_axios.get<Supplier>(
// 		`/suppliers/pid/napproved/${pid}`
// 	);
// 	return response.data;
// };

export const getSupplierByPPID = async (
	pid: string
): Promise<Supplier | undefined> => {
	try {
		const response = await backend_api_axios.get<Supplier>(
			`/suppliers/pid/napproved/${pid}`
		);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;

		// Handle "not found" (HTTP 404) as "no supplier exists"
		if (err.response?.status === 404) {
			return undefined;
		}

		// Throw other errors (network, 500s, etc.)
		console.error("Error fetching Suppliers by PID:", err);
		throw err;
	}
};

export const getSupplierByEmail = async (email: string) => {
	const response = await backend_api_axios.get<Supplier>(
		`/suppliers/email/${email}`
	);
	return response.data;
};
export const createSupplier = async (supplier: Omit<Supplier, "id">) => {
	console.log(supplier);
	const response = await backend_api_axios.post<Supplier>(
		"/suppliers",
		supplier
	);
	return response.data;
};

export const updateSupplier = async (
	id: string,
	supplier: Partial<Supplier>
) => {
	const response = await backend_api_axios.put<Supplier>(
		`/suppliers/${id}`,
		supplier
	);
	return response.data;
};

export const deleteSupplier = async (id: string) => {
	await backend_api_axios.delete(`/suppliers/${id}`);
};

export const updateSupplierStatus = async (
	id: string
) => {
	const response = await backend_api_axios.put<Supplier>(
		`/suppliers/approved/${id}`
	);
	return response.data;
};

// Materials API calls
export const getExchangeRates = async () => {
	const response = await backend_api_axios.get("/forex");
	return response.data.major_currencies;
};

export const searchMaterials = async (query: string, subcategory?: string) => {
	const params = new URLSearchParams({ q: query });
	if (subcategory) params.append("subcategory", subcategory);

	const response = await backend_api_axios.get<Material[]>("/search", {
		params,
	});
	return response.data;
};
export const getMaterials = async () => {
	const response = await backend_api_axios.get<Material[]>("/materials");
	console.log(response.data);
	return response.data;
};

export const getMaterialById = async (id: string) => {
	const response = await backend_api_axios.get<Material>(`/materials/${id}`);
	return response.data;
};

export const getMaterialsByCategory = async (
	category: string,
	subcategory?: string,
	subSubcategory?: string
) => {
	const params = new URLSearchParams({ category });
	if (subcategory) params.append("subcategory", subcategory);
	if (subSubcategory) params.append("subSubcategory", subSubcategory);
	const response = await backend_api_axios.get<Material[]>(
		"/materials/filter",
		{ params }
	);
	// console.log(response.data)
	return response.data;
};

export const createMaterial = async (material: Material) => {
	const response = await backend_api_axios.post<Material>(
		"/materials",
		material
	);
	return response.data;
};

export const updateMaterial = async (
	id: string,
	material: Partial<Material>
) => {
	const response = await backend_api_axios.put<Material>(
		`/materials/${id}`,
		material
	);
	return response.data;
};

export const deleteMaterial = async (id: string) => {
	await backend_api_axios.delete(`/materials/${id}`);
};

// Types API calls
export const getTypes = async () => {
	const response = await backend_api_axios.get<Category[]>("/types");
	console.log(response.data);
	return response.data;
};

export const getTypeById = async (id: string) => {
	const response = await backend_api_axios.get<Category>(`/types/${id}`);
	return response.data;
};

export const createType = async (type: Omit<Category, "id">) => {
	const response = await backend_api_axios.post<Category>("/types", type);
	return response.data;
};

export const updateType = async (id: string, type: Partial<Category>) => {
	const response = await backend_api_axios.put<Category>(`/types/${id}`, type);
	return response.data;
};

export const deleteType = async (id: string) => {
	await backend_api_axios.delete(`/types/${id}`);
};

// Items API calls
export const getItems = async () => {
	const response = await backend_api_axios.get<Item[]>("/items");
	return response.data;
};

export const getItemsBySupplier = async (supplierPid: string) => {
	// URL encode the supplierPid in case it contains special characters like '|'
	const response = await backend_api_axios.get<Item[]>(
		`/items/supplier/${encodeURIComponent(supplierPid)}`
	);
	return response.data;
};

export const getItemsByMaterial = async (materialId: string) => {
	const response = await backend_api_axios.get<Item[]>(
		`/items/material/${materialId}`
	);
	return response.data;
};

export const createItem = async (item: Omit<Item, "id">) => {
	const response = await backend_api_axios.post<Item>("/items", item);
	return response.data;
};

export const updateItem = async (id: string, item: Partial<Item>) => {
	const response = await backend_api_axios.put<Item>(`/items/${id}`, item);
	return response.data;
};

export const deleteItem = async (id: string) => {
	await backend_api_axios.delete(`/items/${id}`);
};
export const getItemsByMaterialID = async (materialId: string) => {
	console.log(materialId);
	const response = await backend_api_axios.get<Item[]>(
		`/items/material/${materialId}`
	);
	return response.data;
};

export const getPaymentRecords = async () => {
	const response = await backend_api_axios.get<PaymentRecord[]>(
		"/paymentRecords"
	);
	return response.data;
};

export const getPaymentRecordById = async (pid: string, type: string) => {
	const response = await backend_api_axios.get<PaymentRecord>(
		`/paymentRecords/${encodeURIComponent(pid)}/${type}`
	);
	return response.data;
};

export const createPaymentRecord = async (
	record: Omit<PaymentRecord, "id">
) => {
	const response = await backend_api_axios.post<PaymentRecord>(
		"/paymentRecords",
		record
	);
	return response.data;
};

export const updatePaymentRecord = async (
	id: string,
	record: Partial<PaymentRecord>
) => {
	const response = await backend_api_axios.put<PaymentRecord>(
		`/paymentRecords/${id}`,
		record
	);
	return response.data;
};

export const deletePaymentRecord = async (id: string) => {
	await backend_api_axios.delete(`/paymentRecords/${id}`);
};

// Professionals API calls
export const getProfessionals = async () => {
	const response = await backend_api_axios.get<Professional[]>(
		"/professionals"
	);
	console.log(response.data);
	return response.data;
};

export const getProfessionalById = async (id: string) => {
	const response = await backend_api_axios.get<Professional>(
		`/professionals/${id}`
	);
	return response.data;
};

// export const getProfessionalByPID = async (pid: string) => {
// 	const response = await backend_api_axios.get<Professional>(
// 		`/professionals/pid/${pid}`
// 	);
// 	return response.data;
// };

export const getProfessionalByPID = async (
	pid: string
): Promise<Professional | undefined> => {
	try {
		const response = await backend_api_axios.get<Professional>(
			`/professionals/pid/${pid}`
		);
		return response.data;
	} catch (error) {
		const err = error as AxiosError;

		// Handle "not found" (HTTP 404) as "no professional exists"
		if (err.response?.status === 404) {
			return undefined;
		}

		// Throw other errors (network, 500s, etc.)
		console.error("Error fetching professional by PID:", err);
		throw err;
	}
};

export const getProfessionalByEmail = async (email: string) => {
	const response = await backend_api_axios.get<Professional>(
		`/professionals/email/${email}`
	);
	return response.data;
};

export const createProfessional = async (
	professional: Omit<Professional, "id">
) => {
	const response = await backend_api_axios.post<Professional>(
		"/professionals",
		professional
	);
	console.log(response.data);
	return response.data;
};

export const updateProfessional = async (
	id: string,
	professional: Professional
) => {
	const response = await backend_api_axios.put<Professional>(
		`/professionals/${id}`,
		professional
	);
	return response.data;
};

export const deleteProfessional = async (id: string) => {
	await backend_api_axios.delete(`/professionals/${id}`);
};
// Project API calls

// Get all projects
export const getProjects = async (): Promise<Project[]> => {
	const response = await backend_api_axios.get<Project[]>("/projects");
	return response.data;
};

// Get projects by PID
export const getProjectsByPID = async (pid: string): Promise<Project[]> => {
	const response = await backend_api_axios.get<Project[]>(
		`/projects/professional/${pid}`
	);
	return response.data;
};

// Get a project by ID
export const getProjectById = async (id: string): Promise<Project> => {
	const response = await backend_api_axios.get<Project>(`/projects/${id}`);
	return response.data;
};

// Create a new project
export const createProject = async (
	project: Omit<Project, "id">
): Promise<Project> => {
	const response = await backend_api_axios.post<Project>("/projects", project);
	return response.data;
};

// Update an existing project
export const updateProject = async (
	id: string,
	project: Partial<Project>
): Promise<void> => {
	await backend_api_axios.put(`/projects/${id}`, project);
};

// Delete a project
export const deleteProject = async (id: string): Promise<void> => {
	await backend_api_axios.delete(`/projects/${id}`);
};
export const getProjectsWithFilters = async (filters: {
	pid?: string;
	year?: string;
	company_type?: string;
}): Promise<Project[]> => {
	const params = new URLSearchParams();

	if (filters.pid) params.append("pid", filters.pid);
	if (filters.year) params.append("year", filters.year);
	if (filters.company_type) params.append("company_type", filters.company_type);

	const response = await backend_api_axios.get<Project[]>("/projects/filter", {
		params,
	});
	return response.data;
};

// Search projects by name or description
export const searchProjects = async (
	searchQuery: string,
	filters?: {
		pid?: string;
		year?: string;
		type?: string;
	}
): Promise<{
	query: string;
	count: number;
	results: Project[];
}> => {
	const params = new URLSearchParams({ q: searchQuery });

	if (filters?.pid) params.append("pid", filters.pid);
	if (filters?.year) params.append("year", filters.year);
	if (filters?.type) params.append("type", filters.type);

	const response = await backend_api_axios.get("/projects/search", { params });
	return response.data;
};

// Get projects with professional information included


export const getProjectsWithProfessionalInfo = async (filters?: {
	pid?: string;
	year?: string;
	company_type?: string;
}): Promise<ProjectWithProfessional[]> => {
	const params = new URLSearchParams();

	if (filters?.pid) params.append("pid", filters.pid);
	if (filters?.year) params.append("year", filters.year);
	if (filters?.company_type)
		params.append("company_type", filters.company_type);

	const response = await backend_api_axios.get<ProjectWithProfessional[]>(
		"/projects/with-professional",
		{ params }
	);
	return response.data;
};

export const searchProfessionals = async (
	searchQuery: string,
	filters?: {
		company_type?: string;
		location?: string;
	}
): Promise<ProfessionalSearchResult> => {
	const params = new URLSearchParams({ q: searchQuery });

	if (filters?.company_type)
		params.append("company_type", filters.company_type);
	if (filters?.location) params.append("location", filters.location);

	const response = await backend_api_axios.get<ProfessionalSearchResult>(
		"/professionals/search",
		{ params }
	);
	return response.data;
};

// NEW: Get professionals with various filters
export const getProfessionalsWithFilters = async (
	filters: ProfessionalFilters = {}
): Promise<Professional[]> => {
	const params = new URLSearchParams();

	if (filters.company_type) params.append("company_type", filters.company_type);
	if (filters.location) params.append("location", filters.location);
	if (filters.year_from) params.append("year_from", filters.year_from);
	if (filters.year_to) params.append("year_to", filters.year_to);
	if (filters.employees_min)
		params.append("employees_min", filters.employees_min);
	if (filters.employees_max)
		params.append("employees_max", filters.employees_max);
	if (filters.specialization)
		params.append("specialization", filters.specialization);
	if (filters.service) params.append("service", filters.service);

	const response = await backend_api_axios.get<Professional[]>(
		"/professionals/filter",
		{ params }
	);
	return response.data;
};

// NEW: Get all unique professional/company types
export const getProfessionalTypes =
	async (): Promise<ProfessionalTypesResponse> => {
		const response = await backend_api_axios.get<ProfessionalTypesResponse>(
			"/professionals/types"
		);
		return response.data;
	};
