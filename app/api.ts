import axios from "axios"
import { getAccessToken } from "@auth0/nextjs-auth0";
const API_BASE_URL = "/api/backend"

const BACKEND_API_SECRET = process.env.BACKEND_API_SECRET;
const backend_api_axios = axios.create({
	baseURL: API_BASE_URL,
});

// Types
export interface Material {
  id: string
  Number: string
  Name: string
  Type: string
  Category: {
    Category: string
    Subcategory: string | null
    "Sub subcategory": string | null
  }
  Qty: number
  Unit: string
  Prices: [string, number | null][]
  Source: string | null
  Items?: MaterialItem[] 
}
export interface MaterialItem {
  id: string
  name: string
  // Add additional properties as needed.
}

export interface Category {
  id: string
  name: string
  categories: {
    name: string
    subcategories: {
      name: string
      sub_subcategories: string[]
    }[]
  }[]
}
// Suppliers Types and API calls

export interface Location {
  latitude: number
  longitude: number
}

export interface Supplier {
  id: string
  email: string
  pid: string
  business_name: string
  business_description: string
  telephone: string
  email_given: string
  address: string
  location: Location
  profile_pic_url: string
  cover_pic_url: string
}
export interface Item {
  id: string
  name: string
  description: string
  supplierPid: string
  materialId: string
  type: string
  category: string
  subcategory: string
  unit: string
  price: number
  imgUrl: string
}
// Professional type definition matching the Go struct
export interface Professional {
  id: string
  company_name: string
  company_type: string
  company_description: string
  year_founded: number
  number_of_employees: number
  email: string
  telephone_number: string
  website: string
  address: string
  location: Location
  specializations: string[]
  services_offered: string[]
  certifications_accreditations: string[]
  company_logo_url: string
  cover_image_url: string
  pid: string
}


export interface Payment {
  Month: string    // ISO date string (e.g. "2025-03-01T00:00:00.000Z")
  Amount: number
  paymentDate: string // ISO date string
}

// PaymentRecord model
export interface PaymentRecord {
  id: string
  Supplierpid: string
  Approved: boolean
  Payments: Payment[]
  Deleted: boolean
}

export const getSuppliers = async () => {
  const response = await backend_api_axios.get<Supplier[]>("/suppliers")
  return response.data
}

export const getSupplierById = async (id: string) => {
  const response = await backend_api_axios.get<Supplier>(`/suppliers/${id}`)
  return response.data
}
export const getSupplierByPID = async (pid: string) => {
  const response = await backend_api_axios.get<Supplier>(`/suppliers/pid/${pid}`)
  return response.data
}
export const getSupplierByPPID = async (pid: string) => {
  const response = await backend_api_axios.get<Supplier>(`/suppliers/pid/napproved/${pid}`)
  return response.data
}

export const getSupplierByEmail = async (email: string) => {
  const response = await backend_api_axios.get<Supplier>(`/suppliers/email/${email}`)
  return response.data
}
export const createSupplier = async (supplier: Omit<Supplier, "id">) => {
  console.log(supplier)
  const response = await backend_api_axios.post<Supplier>("/suppliers", supplier)
  return response.data
}

export const updateSupplier = async (id: string, supplier: Partial<Supplier>) => {
  const response = await backend_api_axios.put<Supplier>(`/suppliers/${id}`, supplier)
  return response.data
}

export const deleteSupplier = async (id: string) => {
  await backend_api_axios.delete(`/suppliers/${id}`)
}

// Materials API calls
export const getExchangeRates = async () => {
  const response = await backend_api_axios.get("/forex")
  return response.data.major_currencies
}

export const searchMaterials = async (query: string, subcategory?: string) => {
  const params = new URLSearchParams({ q: query })
  if (subcategory) params.append("subcategory", subcategory)

  const response = await backend_api_axios.get<Material[]>("/search", { params })
  return response.data
}
export const getMaterials = async () => {
  const response = await backend_api_axios.get<Material[]>("/materials")
  console.log(response.data)
  return response.data
}

export const getMaterialById = async (id: string) => {
  const response = await backend_api_axios.get<Material>(`/materials/${id}`)
  return response.data
}

export const getMaterialsByCategory = async (category: string, subcategory?: string, subSubcategory?: string) => {
  const params = new URLSearchParams({ category })
  if (subcategory) params.append("subcategory", subcategory)
  if (subSubcategory) params.append("subSubcategory", subSubcategory)
  const response = await backend_api_axios.get<Material[]>("/materials/filter", { params })
  // console.log(response.data)  
  return response.data
}

export const createMaterial = async (material: Omit<Material, "Number">) => {
  const response = await backend_api_axios.post<Material>("/materials", material)
  return response.data
}

export const updateMaterial = async (id: string, material: Partial<Material>) => {
  const response = await backend_api_axios.put<Material>(`/materials/${id}`, material)
  return response.data
}

export const deleteMaterial = async (id: string) => {
  await backend_api_axios.delete(`/materials/${id}`)
}

// Types API calls
export const getTypes = async () => {

  try {
    const token = await getAccessToken()
    console.log(token)
  } catch (err) {
    console.log(err)
  }

  const response = await backend_api_axios.get<Category[]>("/types")
  console.log(response.data)
  return response.data
}

export const getTypeById = async (id: string) => {
  const response = await backend_api_axios.get<Category>(`/types/${id}`)
  return response.data
}

export const createType = async (type: Omit<Category, "id">) => {
  const response = await backend_api_axios.post<Category>("/types", type)
  return response.data
}

export const updateType = async (id: string, type: Partial<Category>) => {
  const response = await backend_api_axios.put<Category>(`/types/${id}`, type)
  return response.data
}

export const deleteType = async (id: string) => {
  await backend_api_axios.delete(`/types/${id}`)
}
//items api calls
export const getItems = async () => {
  const response = await backend_api_axios.get<Item[]>("/items")
  return response.data
}

export const getItemsBySupplier = async (supplierPid: string) => {
  // URL encode the supplierPid in case it contains special characters like '|'
  const response = await backend_api_axios.get<Item[]>(`/items/supplier/${encodeURIComponent(supplierPid)}`)
  return response.data
}

export const getItemsByMaterial = async (materialId: string) => {
  const response = await backend_api_axios.get<Item[]>(`/items/material/${materialId}`)
  return response.data
}

export const createItem = async (item: Omit<Item, "id">) => {
  const response = await backend_api_axios.post<Item>("/items", item)
  return response.data
}

export const updateItem = async (id: string, item: Partial<Item>) => {
  const response = await backend_api_axios.put<Item>(`/items/${id}`, item)
  return response.data
}

export const deleteItem = async (id: string) => {
  await backend_api_axios.delete(`/items/${id}`)
}
export const getItemsByMaterialID = async (materialId: string) => {

  console.log(materialId) 
  const response = await backend_api_axios.get<Item[]>(`/items/material/${materialId}`)
  return response.data
}

export const getPaymentRecords = async () => {
  const response = await backend_api_axios.get<PaymentRecord[]>("/paymentRecords")
  return response.data
}

export const getPaymentRecordById = async (id: string) => {
  const response = await backend_api_axios.get<PaymentRecord>(`/paymentRecords/${id}`)
  return response.data
}

export const createPaymentRecord = async (record: Omit<PaymentRecord, "id">) => {
  const response = await backend_api_axios.post<PaymentRecord>("/paymentRecords", record)
  return response.data
}

export const updatePaymentRecord = async (id: string, record: Partial<PaymentRecord>) => {
  const response = await backend_api_axios.put<PaymentRecord>(`/paymentRecords/${id}`, record)
  return response.data
}

export const deletePaymentRecord = async (id: string) => {
  await backend_api_axios.delete(`/paymentRecords/${id}`)
}



// Professionals API calls
export const getProfessionals = async () => {
  const response = await backend_api_axios.get<Professional[]>("/professionals")
  return response.data
}

export const getProfessionalById = async (id: string) => {
  const response = await backend_api_axios.get<Professional>(`/professionals/${id}`)
  return response.data
}

export const getProfessionalByPID = async (pid: string) => {
  const response = await backend_api_axios.get<Professional>(`/professionals/pid/${pid}`)
  return response.data
}

export const getProfessionalByEmail = async (email: string) => {
  const response = await backend_api_axios.get<Professional>(`/professionals/email/${email}`)
  return response.data
}

export const createProfessional = async (professional: Omit<Professional, "id">) => {
  const response = await backend_api_axios.post<Professional>("/professionals", professional)
  return response.data
}

export const updateProfessional = async (id: string, professional: Partial<Professional>) => {
  const response = await backend_api_axios.put<Professional>(`/professionals/${id}`, professional)
  return response.data
}

export const deleteProfessional = async (id: string) => {
  await backend_api_axios.delete(`/professionals/${id}`)
}
