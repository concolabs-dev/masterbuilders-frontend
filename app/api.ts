import axios from "axios"
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

