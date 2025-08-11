"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ImageUpload } from "@/components/image-upload";
import { PaymentPackage } from "@/components/paymentPackage";
import { Check, ChevronRight, MapPin } from "lucide-react";
import {
  createSupplier,
  getSupplierByPID,
  Supplier,
  getSupplierByPPID,
} from "../api";
// import dynamic from "next/dynamic"

// const DynamicMapPicker = dynamic(() => import("@/components/MapPicker"), { ssr: false })

function SupplierOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;
  const { user } = useUser();
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (!user?.sub) return;
    getSupplierByPPID(user.sub)
      .then((existing: Supplier | undefined) => {
        if (existing) setAlreadyRegistered(true);
      })
      .catch((err) => console.error("Failed checking supplier by PID:", err));
    getSupplierByPID(user.sub)
      .then((existing: Supplier | undefined) => {
        if (existing) router.push("/supplier/dashboard");
      })
      .catch((err) => console.error("Failed checking supplier by PID:", err));
  }, [user?.sub, router]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    address: "",
    location: { lat: "", lng: "" },
    profileImage: "",
    coverImage: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (field: string, value: string) =>
    setFormData({ ...formData, [field]: value });

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.name) newErrors.name = "Business name is required";
      if (!formData.description || formData.description.length < 20) {
        newErrors.description = "Description must be at least 20 characters";
      }
    }
    if (step === 2) {
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.telephone) newErrors.telephone = "Telephone is required";
      else if (!/^(0\d{9}|\+\d{2}\d{9})$/.test(formData.telephone)) {
        newErrors.telephone = "Invalid telephone number";
      }
    }
    if (step === 3) {
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.location.lat || !formData.location.lng) {
        newErrors.location = "Coordinates are required";
      }
    }
    if (step === 4) {
      if (!formData.profileImage)
        newErrors.profileImage = "Profile image is required";
      if (!formData.coverImage)
        newErrors.coverImage = "Cover image is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < totalSteps) {
        setStep(step + 1);
        window.scrollTo(0, 0);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // final validation
    if (isSubmitting) return;
    if (!validateStep()) return;
    setIsSubmitting(true);
    const supplierPayload = {
      email: formData.email,
      pid: user?.sub || "",
      business_name: formData.name,
      business_description: formData.description,
      telephone: formData.telephone,
      email_given: formData.email,
      address: formData.address,
      location: {
        latitude: parseFloat(formData.location.lat),
        longitude: parseFloat(formData.location.lng),
      },
      profile_pic_url: formData.profileImage,
      cover_pic_url: formData.coverImage,
    };
    try {
      const response = await createSupplier(supplierPayload);
      console.log("Supplier created successfully:", response);

      if (response) {
        router.push("/onboarding/success");
      }
    } catch (err) {
      console.error("Failed to create supplier", err);
    } finally {
      setIsSubmitting(false);
    }
  };
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
  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Supplier Onboarding</h1>
        <p className="text-muted-foreground">
          Complete your profile to join our network of trusted suppliers.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">
            Step {step} of {totalSteps}
          </span>
          <span className="text-sm font-medium">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Basic Information"}
            {step === 2 && "Contact Details"}
            {step === 3 && "Location"}
            {step === 4 && "Profile Images"}
            {step === 5 && "Payment & Subscription"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Tell us about your business"}
            {step === 2 && "How can customers reach you?"}
            {step === 3 && "Where are you located?"}
            {step === 4 && "Upload your profile and cover images"}
            {step === 5 && "Get the subscription plan that suits your needs"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="onboardingForm" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Business Name</Label>
                  <Input
                    id="name"
                    placeholder="Your business name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                  />
                  {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your business and the products"
                    value={formData.description}
                    onChange={(e) =>
                      updateFormData("description", e.target.value)
                    }
                    className="min-h-[120px]"
                  />
                  {errors.description && (
                    <p className="text-red-500">{errors.description}</p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telephone">Telephone Number</Label>
                  <Input
                    id="telephone"
                    type="tel"
                    placeholder="Your contact number"
                    value={formData.telephone}
                    onChange={(e) =>
                      updateFormData("telephone", e.target.value)
                    }
                  />
                  {errors.telephone && (
                    <p className="text-red-500">{errors.telephone}</p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Your business address"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                  />
                  {errors.address && (
                    <p className="text-red-500">{errors.address}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      placeholder="e.g. 6.9271"
                      value={formData.location.lat}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          location: { ...prev.location, lat: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      placeholder="e.g. 79.8612"
                      value={formData.location.lng}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          location: { ...prev.location, lng: e.target.value },
                        }))
                      }
                    />
                  </div>
                </div>
                {errors.location && (
                  <p className="text-red-500">{errors.location}</p>
                )}
                <div className="flex items-center justify-center p-4 border rounded-md border-dashed">
                  <div className="text-center">
                    <MapPin className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      To find your coordinates: <br />
                      1) Open Google Maps and navigate to your address.
                      <br />
                      2) Right-click the location and select “What’s here?”
                      <br />
                      3) Copy the latitude and longitude shown.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Profile Picture</Label>
                  <ImageUpload
                    value={formData.profileImage}
                    onChange={(url) => updateFormData("profileImage", url)}
                    label="Upload profile picture"
                    description="This will be displayed on your supplier profile"
                    imageClassName="w-32 h-32 rounded-full object-cover"
                  />
                  {errors.profileImage && (
                    <p className="text-red-500">{errors.profileImage}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <ImageUpload
                    value={formData.coverImage}
                    onChange={(url) => updateFormData("coverImage", url)}
                    label="Upload cover image"
                    description="This will be displayed at the top of your supplier profile"
                    imageClassName="w-full h-40 object-cover rounded-md"
                  />
                  {errors.coverImage && (
                    <p className="text-red-500">{errors.coverImage}</p>
                  )}
                </div>
              </div>
            )}
            {step === 5 && (
              <div className="flex flex-row items-center space-x-6">
                {/* TODO: add fildes */}
                <PaymentPackage
                  title="Basic"
                  price="LKR 1,000"
                  features={[
                    "1 user",
                    "Basic support",
                    "Access to core features",
                  ]}
                />
                <PaymentPackage
                  title="Standard"
                  price="LKR 1,000"
                  features={[
                    "1 user",
                    "Basic support",
                    "Access to core features",
                  ]}
                  highlighted={true}
                />
                <PaymentPackage
                  title="Premium"
                  price="LKR 1,000"
                  features={[
                    "1 user",
                    "Basic support",
                    "Access to core features",
                  ]}
                />
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            Back
          </Button>
          {step < totalSteps ? (
            <Button onClick={handleNext}>
              Continue <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" form="onboardingForm" className="bg-primary">
              {isSubmitting ? "Creating..." : "Complete"}{" "}
              <Check className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default withPageAuthRequired(SupplierOnboarding);
