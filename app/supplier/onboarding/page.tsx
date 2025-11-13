"use client";

import React from "react";
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
import { Check, ChevronRight, MapPin } from "lucide-react";
import {
	createSupplier,
	getSupplierByPID,
	getSupplierByPPID,
	getProfessionalByPID,
} from "@/app/api";
import { Package, PaymentContainer } from "@concolabs-dev/payment";
import { Professional, Supplier } from "@/types";
import { SUPPLIER_PACKAGE } from "@/lib/constants";
import { z } from "zod";
// import dynamic from "next/dynamic"

function SupplierOnboarding() {
	const router = useRouter();
	const [step, setStep] = useState(1);
	const totalSteps = 5;
	const progress = (step / totalSteps) * 100;
	const { user } = useUser();
	const [alreadyRegistered, setAlreadyRegistered] = useState<
		boolean | undefined
	>(undefined);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const formRef = React.useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (!user?.sub) return;
		getSupplierByPPID(user.sub)
			.then((existing: Supplier | undefined) => {
				if (existing) {
					setAlreadyRegistered(true);
					router.push(
						"/api/auth/login?prompt=none&returnTo=/supplier/dashboard"
					);
				} else {
					setAlreadyRegistered(false);
				}
			})
			.catch((err) => console.error("Failed checking supplier by PID:", err));
		getProfessionalByPID(user.sub)
			.then((existing: Professional | undefined) => {
				if (existing) {
					router.push("/professionals/dashboard");
					setAlreadyRegistered(true);
				} else {
					setAlreadyRegistered(false);
				}
			})
			.catch((err) =>
				console.error("Failed checking professional by PID:", err)
			);
	}, [user?.sub, router]);

	useEffect(() => {
		if (step === totalSteps && alreadyRegistered === false)
			formRef.current?.requestSubmit();
	}, [step, alreadyRegistered]);

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
	// const [errors, setErrors] = useState<Record<string, string>>({});

	const updateFormData = (field: string, value: string) =>
		setFormData({ ...formData, [field]: value });

	const handleNext = () => {
		setErrors({}); // Clear old errors

		let currentSchema;
		if (step === 1) currentSchema = step1Schema;
		else if (step === 2) currentSchema = step2Schema;
		else if (step === 3) currentSchema = step3Schema;
		else {
			setStep(step + 1); // just continue
			return;
		}

		const validationResult = currentSchema.safeParse(formData);

		if (validationResult.success) {
			if (step < totalSteps) {
				setStep(step + 1);
				window.scrollTo(0, 0);
			}
		} else {
			const newErrors: Record<string, string> = {};
			for (const issue of validationResult.error.issues) {
				const path = issue.path.join(".");
				newErrors[path] = issue.message;
			}
			setErrors(newErrors);
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
		// if (!validateStep()) return;
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
				latitude: parseFloat(formData.location.lat) || 1.0,
				longitude: parseFloat(formData.location.lng) || 1.0,
			},
			profile_pic_url: formData.profileImage,
			cover_pic_url: formData.coverImage,
			status: "pending"
		};
		try {
			const response = await createSupplier(supplierPayload);
			console.log("Supplier created successfully:", response);
		} catch (err) {
			console.error("Failed to create supplier", err);
		} finally {
			// setIsSubmitting(false)
		}
	};

	const onboardingSchema = z.object({
		/**
		 * Step 1: Basic Information
		 */
		name: z.string().min(1, { message: "Business name is required" }),
		description: z
			.string()
			.max(400, { message: "Description cannot exceed 400 characters" })
			.optional(),

		/**
		 * Step 2: Contact Details
		 */
		email: z.email({ message: "Invalid email address" }),
		telephone: z
			.string()
			.regex(/^\d{10}$/, { message: "Must be a 10-digit telephone number" })
			.min(1, { message: "Telephone number is required" }),
		/**
		 * Step 3: Location
		 */
		address: z.string().min(1, { message: "Address is required" }),
		location: z.object({
			lat: z.string().min(1, "Latitude is required"),
			lng: z.string().min(1, "Longitude is required"),
		}),
	});

	const step1Schema = onboardingSchema.pick({
		name: true,
		description: true,
	});

	const step2Schema = onboardingSchema.pick({
		email: true,
		telephone: true,
	});

	const step3Schema = onboardingSchema.pick({
		address: true,
		location: true,
	});

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
						{step === 5 && "Payments"}
					</CardTitle>
					<CardDescription>
						{step === 1 && "Tell us about your business"}
						{step === 2 && "How can customers reach you?"}
						{step === 3 && "Where are you located?"}
						{step === 4 && "Upload your profile and cover images"}
						{step === 5 && "Complete your payment to finish onboarding"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form id="onboardingForm" ref={formRef} onSubmit={handleSubmit}>
						{step === 1 && (
							<div className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="name">Business Name</Label>
									<Input
										id="name"
										placeholder="Your business name"
										value={formData.name}
										onChange={(e) => updateFormData("name", e.target.value)}
										className={errors.name ? "border-destructive" : ""}
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
										className={`min-h-[120px] ${
											errors.description ? "border-destructive" : ""
										}`}
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
										className={errors.email ? "border-destructive" : ""}
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
										className={errors.telephone ? "border-destructive" : ""}
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
										className={errors.address ? "border-destructive" : ""}
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
											className={
												errors["location.lat"] ? "border-destructive" : ""
											}
										/>
										{errors["location.lat"] && (
											<p className="text-red-500">{errors["location.lat"]}</p>
										)}
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
											className={
												errors["location.lng"] ? "border-destructive" : ""
											}
										/>
										{errors["location.lng"] && (
											<p className="text-red-500">{errors["location.lng"]}</p>
										)}
									</div>
								</div>

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
										label="Profile Image"
										description="Upload supplier profile image"
										dimensions={{ width: 400, height: 400 }}
										enableCrop={true}
										maxFileSize={4}
										quality={88}
										allowedFormats={["image/jpeg", "image/png", "image/webp"]}
										imageClassName="w-32 h-32 object-cover rounded-lg"
									/>
								</div>
								<div className="space-y-2">
									<Label>Cover Image</Label>
									<ImageUpload
										value={formData.coverImage}
										onChange={(url) => updateFormData("coverImage", url)}
										label="Cover Image"
										description="Upload supplier cover/banner image"
										dimensions={{ width: 1200, height: 400 }}
										enableCrop={true}
										maxFileSize={8}
										quality={85}
										allowedFormats={["image/jpeg", "image/png", "image/webp"]}
										imageClassName="w-full h-40 object-cover rounded-lg"
									/>
								</div>
							</div>
						)}
						{step === 5 && user != undefined && (
							<PaymentContainer
								backendUrl={process.env.NEXT_PUBLIC_PAYMENT_API_URL || ""}
								cancelUrl={process.env.NEXT_PUBLIC_FRONTEND_API_URL || ""}
								successUrl={(() => {
									const base = process.env.NEXT_PUBLIC_FRONTEND_API_URL;
									if (!base) return "";
									return new URL(
										"/api/auth/login?prompt=none&returnTo=/supplier/onboarding/success",
										base
									).toString();
								})()}
								packageList={SUPPLIER_PACKAGE}
								stripekey={process.env.NEXT_PUBLIC_STRIPE_SECRET || ""}
								puid={user?.sub || ""}
								code={"BML"}
							/>
						)}
					</form>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="outline" onClick={handleBack} disabled={step === 1}>
						Back
					</Button>
					{step < totalSteps && (
						<Button onClick={handleNext}>
							Continue <ChevronRight className="ml-2 h-4 w-4" />
						</Button>
					)}
				</CardFooter>
			</Card>
		</div>
	);
}

export default withPageAuthRequired(SupplierOnboarding);
