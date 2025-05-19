"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CategorySidebar from "@/components/categorySidebar";
import { Plus, Grid, List } from "lucide-react";
import { SupplierProfile } from "@/components/supplier-profile";
import { SupplierItemCard } from "@/components/supplier-item-card";
import { SupplierItemList } from "@/components/supplier-item-list";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0/client";
import {
  getSupplierByPPID,
  getSupplierByEmail,
  getItemsBySupplier,
  createItem,
  updateItem,
  deleteItem,
  getTypes,
  getMaterialsByCategory,
  getSupplierByPID,
} from "@/app/api";
import { Supplier, Item, Material, Category } from "@/app/api";
import { ImageUpload } from "@/components/image-upload"; // adjust path as needed
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { withRoleGuard } from "@/app/hoc/withRoleGuard";

function SupplierDashboardPage() {
  const { user, error: userError, isLoading: userLoading } = useUser();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [supplierLoading, setSupplierLoading] = useState(true);
  const [supplierError, setSupplierError] = useState<Error | null>(null);

  // Items loaded from the API.
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // State for new item dialog selections.
  const [types, setTypes] = useState<Category[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );

  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [unit, setUnit] = useState("");
  // State for image upload in add item dialog.
  const [addImageUrl, setAddImageUrl] = useState("");
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  // Fetch supplier using user's email.
  useEffect(() => {
    if (user && typeof user.sub === "string") {
      console.log(user.sub);
      if (!user?.sub) return;
      getSupplierByPPID(user.sub)
        .then((existing: Supplier | undefined) => {
          if (existing) setAlreadyRegistered(true);
        })
        .catch((err) => console.error("Failed checking supplier by PID:", err));
      getSupplierByPID(user.sub)
        .then((data) => {
          setSupplier(data);
          setAlreadyRegistered(false);
          console.log("efef");
          setSupplierLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching supplier:", err);
          setSupplierError(err);
          setSupplierLoading(false);
        });
    } else {
      setSupplierLoading(false);
    }
  }, [user]);

  // Fetch supplier items once the supplier data is loaded.
  useEffect(() => {
    if (supplier) {
      getItemsBySupplier(supplier.pid)
        .then((data) => setItems(data))
        .catch((err) => console.error("Error fetching items:", err));
    }
  }, [supplier]);

  // Fetch available types for item creation.
  useEffect(() => {
    getTypes()
      .then((data) => setTypes(data))
      .catch((err) => console.error("Error fetching types:", err));
  }, []);

  // When category selections change, fetch materials matching those selections.
  useEffect(() => {
    if (selectedCategory && selectedSubcategory) {
      getMaterialsByCategory(selectedCategory, selectedSubcategory)
        .then((data) => setMaterials(data))
        .catch((err) => console.error("Error fetching materials:", err));
    } else if (selectedCategory) {
      getMaterialsByCategory(selectedCategory)
        .then((data) => {
          setMaterials(data);
          console.log(data[0].id);
        })
        .catch((err) => console.error("Error fetching materials:", err));
    } else {
      setMaterials([]);
      setSelectedMaterial("");
    }
    console.log(materials);
  }, [selectedCategory, selectedSubcategory]);

  // Map API supplier to the shape required by SupplierProfile.
  const mapSupplierToProfile = (supplier: Supplier) => ({
    id: supplier.id,
    name: supplier.business_name,
    email: supplier.email,
    telephone: supplier.telephone,
    address: supplier.address,
    location: {
      lat: supplier.location.latitude.toString(),
      lng: supplier.location.longitude.toString(),
    },
    profileImage: supplier.profile_pic_url,
    coverImage: supplier.cover_pic_url,
    description: supplier.business_description,
  });

  // Filter items by search query.
  // const filteredItems = items.filter(
  //   (item) =>
  //     item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  // )
  const filteredItems =
    items &&
    items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      // If selectedType is empty, we allow all items by default.
      const matchesType =
        !selectedType ||
        item.type?.toLowerCase() === selectedType.toLowerCase();

      // If selectedCategory is empty, we allow all items by default.
      const matchesCategory =
        !selectedCategory ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      // If selectedSubcategory is empty/null, we allow all items by default.
      const matchesSubcategory =
        !selectedSubcategory ||
        item.subcategory.toLowerCase() === selectedSubcategory.toLowerCase();

      return (
        matchesSearch && matchesType && matchesCategory && matchesSubcategory
      );
    });

  // Handle adding a new item using the API.
  const handleAddItem = async (e: FormEvent<HTMLFormElement>) => {
    console.log(supplier?.id);
    console.log(selectedMaterial);
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const selectedMat = materials.find((m) => m.id === selectedMaterial);
    const newItem = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      supplierPid: supplier?.pid || "",
      materialId: selectedMaterial,
      type: selectedType,
      category: selectedCategory,
      subcategory: selectedSubcategory || "",
      unit: unit,
      price: Number(formData.get("price")),
      // Use addImageUrl state instead of a plain text input.
      imgUrl: addImageUrl,
    };
    try {
      const created = await createItem(newItem);
      setItems([...items, created]);
      e.currentTarget.reset();
      // Reset selection states.
      setSelectedType("");
      setSelectedCategory("");
      setSelectedSubcategory("");
      setMaterials([]);
      setSelectedMaterial("");
      setAddImageUrl("");
    } catch (err) {
      console.error("Error creating item", err);
    }
    window.location.reload();
  };

  // Handle updating an item.
  const [editImageUrl, setEditImageUrl] = useState("");
  useEffect(() => {
    if (selectedItem) {
      setEditImageUrl(selectedItem.imgUrl);
    }
  }, [selectedItem]);
  const handleUpdateItem = async (id: string, updatedItem: Partial<Item>) => {
    try {
      const updated = await updateItem(id, updatedItem);
      setItems(items.map((item) => (item.id === id ? updated : item)));
      setSelectedItem(null);
      window.location.reload();
    } catch (err) {
      console.error("Error updating item", err);
    }
  };

  // Handle deleting an item.
  const handleDeleteItem = async (id: string) => {
    try {
      await deleteItem(id);
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting item", err);
    }
  };

  if (userLoading || supplierLoading) {
    return <div>Loading...</div>;
  }
  if (alreadyRegistered) {
    return (
      <div className="container max-w-3xl py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">You’re already registered!</h1>
        <p className="text-muted-foreground mb-8">
          The dashboard will be available soon after approval.
        </p>
      </div>
    );
  }
  if (userError || supplierError) {
    return <div>Error loading supplier data.</div>;
  }

  if (!supplier) {
    return <div>No supplier found for {user?.email}.</div>;
  }

  return (
    <div className="container mx-auto py-10">
      {supplier && (
        <SupplierProfile
          supplier={mapSupplierToProfile(supplier)}
          admin={true}
        />
      )}
      <Tabs defaultValue="catalogue" className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="catalogue">Catalogue</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-secondary" : ""}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-secondary" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="catalogue" className="space-y-4">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4">
              <CategorySidebar
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubcategory={selectedSubcategory}
                setSelectedSubcategory={setSelectedSubcategory}
              />
            </div>
            <div className="md:w-3/4 ml-4">
              <div className="flex justify-between items-center">
                <div className="flex-1 max-w-sm mb-3">
                  <Input
                    placeholder="Search your catalogue..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Add Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add New Item</DialogTitle>
                      <DialogDescription>
                        Add a new item to your catalogue. Select the type,
                        category, subcategory and material.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddItem}>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" name="name" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" name="description" />
                        </div>
                        {/* Select for Type */}
                        <div className="grid gap-2">
                          <Label htmlFor="type">Type</Label>
                          <select
                            id="type"
                            value={selectedType}
                            onChange={(e) => {
                              setSelectedType(e.target.value);
                              // Reset dependent selections.
                              setSelectedCategory("");
                              setSelectedSubcategory("");
                            }}
                            className="p-2 border rounded"
                            required
                          >
                            <option value="">Select Type</option>
                            {types.map((t) => (
                              <option key={t.id} value={t.name}>
                                {t.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        {/* Select for Category */}
                        <div className="grid gap-2">
                          <Label htmlFor="category">Category</Label>
                          <select
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => {
                              setSelectedCategory(e.target.value);
                              setSelectedSubcategory("");
                            }}
                            className="p-2 border rounded"
                            required
                          >
                            <option value="">Select Category</option>
                            {selectedType &&
                              types
                                .find((t) => t.name === selectedType)
                                ?.categories.map((cat) => (
                                  <option key={cat.name} value={cat.name}>
                                    {cat.name}
                                  </option>
                                ))}
                          </select>
                        </div>
                        {/* Select for Subcategory */}
                        <div className="grid gap-2">
                          <Label htmlFor="subcategory">Subcategory</Label>
                          <select
                            id="subcategory"
                            value={selectedSubcategory ?? ""}
                            onChange={(e) =>
                              setSelectedSubcategory(e.target.value)
                            }
                            className="p-2 border rounded"
                          >
                            <option value="">Select Subcategory</option>
                            {selectedCategory &&
                              types
                                .find((t) => t.name === selectedType)
                                ?.categories.find(
                                  (cat) => cat.name === selectedCategory
                                )
                                ?.subcategories?.map((sub) => (
                                  <option key={sub.name} value={sub.name}>
                                    {sub.name}
                                  </option>
                                ))}
                          </select>
                        </div>
                        {/* Select for Material */}
                        <div className="grid gap-2">
                          <Label htmlFor="material">Material</Label>
                          <select
                            id="material"
                            value={selectedMaterial}
                            onChange={(e) => {
                              setSelectedMaterial(e.target.value);
                              const foundMat = materials.find(
                                (m) => m.id === e.target.value
                              );
                              setUnit(foundMat?.Unit || "");
                            }}
                            className="p-2 border rounded"
                            required
                          >
                            <option value="">Select Material</option>
                            {materials.map((mat) => (
                              <option key={mat.id} value={mat.id}>
                                {mat.Name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="unit">Unit</Label>
                            <input
                              id="unit"
                              name="unit"
                              value={unit}
                              onChange={(e) => setUnit(e.target.value)}
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="price">Price (Rs.)</Label>
                            <Input
                              id="price"
                              name="price"
                              type="number"
                              required
                            />
                          </div>
                        </div>
                        {/* Replace plain input with ImageUpload for add item */}
                        <div className="grid gap-2">
                          <Label htmlFor="image">Image URL</Label>
                          <ImageUpload
                            value={addImageUrl}
                            onChange={(url) => setAddImageUrl(url)}
                            label="Upload Image"
                            description="Upload an image for the item"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save Item</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems &&
                    filteredItems.map((item) => (
                      <SupplierItemCard
                        key={item.id}
                        item={item}
                        onEdit={() => setSelectedItem(item)}
                        onDelete={() => handleDeleteItem(item.id)}
                        admin={true}
                        displayCurrency="Rs."
                      />
                    ))}
                </div>
              ) : (
                filteredItems && (
                  <SupplierItemList
                    items={filteredItems}
                    onEdit={(item) => setSelectedItem(item)}
                    onDelete={(id) => handleDeleteItem(id)}
                    admin={true}
                    displayCurrency="Rs."
                  />
                )
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                View your sales and performance metrics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Analytics features coming soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Manage your account settings and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Settings features coming soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Item Dialog */}
      <Dialog
        open={!!selectedItem}
        onOpenChange={(open) => {
          if (!open) {
            setTimeout(() => setSelectedItem(null), 0);
          }
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>
              Make changes to your item. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const updatedItem = {
                  name: formData.get("name") as string,
                  description: formData.get("description") as string,

                  unit: formData.get("unit") as string,
                  price: Number(formData.get("price")),
                  imgUrl: editImageUrl,
                };
                handleUpdateItem(selectedItem.id, updatedItem);
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    defaultValue={selectedItem.name}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    name="description"
                    defaultValue={selectedItem.description}
                  />
                </div>
                {/* <div className="grid gap-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Input id="edit-category" name="category" defaultValue={selectedItem.category} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-subcategory">Subcategory</Label>
                  <Input id="edit-subcategory" name="subcategory" defaultValue={selectedItem.subcategory} />
                </div> */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-unit">Unit</Label>
                    <Input
                      id="edit-unit"
                      name="unit"
                      defaultValue={selectedItem.unit}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-price">Price (Rs.)</Label>
                    <Input
                      id="edit-price"
                      name="price"
                      type="number"
                      defaultValue={selectedItem.price}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-image">Image URL</Label>
                  <ImageUpload
                    value={editImageUrl}
                    onChange={(url) => setEditImageUrl(url)}
                    label="Upload Image"
                    description="Upload an image for the item"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withRoleGuard(SupplierDashboardPage, ["supplier", "admin"]);
