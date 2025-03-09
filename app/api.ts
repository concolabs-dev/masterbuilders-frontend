import axios from "axios"
import { getAccessToken } from "@auth0/nextjs-auth0";
const API_BASE_URL = "https://ravinduhiran.live"

// Types
export interface Material {
  ID: string
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



export const getSuppliers = async () => {
  const response = await axios.get<Supplier[]>(`${API_BASE_URL}/suppliers`)
  return response.data
}

export const getSupplierById = async (id: string) => {
  const response = await axios.get<Supplier>(`${API_BASE_URL}/suppliers/${id}`)
  return response.data
}
export const getSupplierByEmail = async (email: string) => {
  const response = await axios.get<Supplier>(`${API_BASE_URL}/suppliers/email/${email}`)
  return response.data
}
export const createSupplier = async (supplier: Omit<Supplier, "id">) => {
  console.log(supplier)
  const response = await axios.post<Supplier>(`${API_BASE_URL}/suppliers`, supplier)
  return response.data
}

export const updateSupplier = async (id: string, supplier: Partial<Supplier>) => {
  const response = await axios.put<Supplier>(`${API_BASE_URL}/suppliers/${id}`, supplier)
  return response.data
}

export const deleteSupplier = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/suppliers/${id}`)
}


// Materials API calls
export const getExchangeRates = async () => {
  const response = await axios.get(`${API_BASE_URL}/forex`)
  return response.data.major_currencies
}

export const searchMaterials = async (query: string, subcategory?: string) => {
  const params = new URLSearchParams({ q: query })
  if (subcategory) params.append("subcategory", subcategory)

  const response = await axios.get<Material[]>(`${API_BASE_URL}/search`, { params })
  return response.data
}
export const getMaterials = async () => {
  const response = await axios.get<Material[]>(`${API_BASE_URL}/materials`)
  console.log(response.data)
  return response.data
}

export const getMaterialById = async (id: string) => {
  const response = await axios.get<Material>(`${API_BASE_URL}/materials/${id}`)
  return response.data
}

export const getMaterialsByCategory = async (category: string, subcategory?: string, subSubcategory?: string) => {
  const params = new URLSearchParams({ category })
  if (subcategory) params.append("subcategory", subcategory)
  if (subSubcategory) params.append("subSubcategory", subSubcategory)
  const response = await axios.get<Material[]>(`${API_BASE_URL}/materials/filter`, { params })
  console.log(response.data)  
  return response.data
}

export const createMaterial = async (material: Omit<Material, "Number">) => {
  const response = await axios.post<Material>(`${API_BASE_URL}/materials`, material)
  return response.data
}

export const updateMaterial = async (id: string, material: Partial<Material>) => {
  const response = await axios.put<Material>(`${API_BASE_URL}/materials/${id}`, material)
  return response.data
}

export const deleteMaterial = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/materials/${id}`)
}

// Types API calls
export const getTypes = async () => {

  try {
    const token = await getAccessToken()
    console.log(token)
  } catch (err) {
    console.log(err)
  }

  const response = await axios.get<Category[]>(`${API_BASE_URL}/types`)
  console.log(response.data)
  return response.data
}

export const getTypeById = async (id: string) => {
  const response = await axios.get<Category>(`${API_BASE_URL}/types/${id}`)
  return response.data
}

export const createType = async (type: Omit<Category, "id">) => {
  const response = await axios.post<Category>(`${API_BASE_URL}/types`, type)
  return response.data
}

export const updateType = async (id: string, type: Partial<Category>) => {
  const response = await axios.put<Category>(`${API_BASE_URL}/types/${id}`, type)
  return response.data
}

export const deleteType = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/types/${id}`)
}
//items api calls
export const getItems = async () => {
  const response = await axios.get<Item[]>(`${API_BASE_URL}/items`)
  return response.data
}

export const getItemsBySupplier = async (supplierPid: string) => {
  // URL encode the supplierPid in case it contains special characters like '|'
  const response = await axios.get<Item[]>(`${API_BASE_URL}/items/supplier/${encodeURIComponent(supplierPid)}`)
  return response.data
}

export const getItemsByMaterial = async (materialId: string) => {
  const response = await axios.get<Item[]>(`${API_BASE_URL}/items/material/${materialId}`)
  return response.data
}

export const createItem = async (item: Omit<Item, "id">) => {
  const response = await axios.post<Item>(`${API_BASE_URL}/items`, item)
  return response.data
}

export const updateItem = async (id: string, item: Partial<Item>) => {
  const response = await axios.put<Item>(`${API_BASE_URL}/items/${id}`, item)
  return response.data
}

export const deleteItem = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/items/${id}`)
}