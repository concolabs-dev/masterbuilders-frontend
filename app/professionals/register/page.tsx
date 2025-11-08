"use client";

import React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, ChevronRight, MapPin } from "lucide-react";
import {
	createProfessional,
	getProfessionalByPID,
	getSupplierByPPID,
} from "@/app/api";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0/client";
import { Package, PaymentContainer } from "@concolabs-dev/payment";
import Loading from "@/components/loading";
import { Professional, Supplier } from "@/types";
import { PROFESSIONAL_PACKAGE, PROFESSIONAL_TYPES, SERVICE_OPTIONS, SPECIALTY_OPTIONS } from "@/lib/constants";

function ProfessionalRegistration() {
	const router = useRouter();
	const [step, setStep] = useState(1);
	const totalSteps = 5;
	const progress = (step / totalSteps) * 100;

	const { user } = useUser();
	const [alreadyRegistered, setAlreadyRegistered] = useState<
		boolean | undefined
	>(undefined);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const formRef = React.useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (!user?.sub) return;
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
	}, [user?.sub, router]);

	useEffect(() => {
		if (step === totalSteps && alreadyRegistered === false)
			formRef.current?.requestSubmit();
	}, [step, alreadyRegistered]);

	const [formData, setFormData] = useState({
		companyName: "",
		type: "",
		email: "",
		telephone: "",
		website: "",
		address: "",
		location: { lat: "", lng: "" },
		description: "",
		founded: "",
		employees: "",
		specialties: [] as string[],
		services: [] as string[],
		certifications: [] as string[],
		logo: "",
		coverImage: "",
	});

	const updateFormData = (field: string, value: string | string[]) => {
		setFormData({ ...formData, [field]: value });
	};

	const handleNext = () => {
		if (step < totalSteps) {
			setStep(step + 1);
			window.scrollTo(0, 0);
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
		if (isSubmitting) return; // Prevent double submit
		setIsSubmitting(true);
		console.log("Form submitted:", formData);
		const professionalPayload = {
			company_name: formData.companyName, // Maps to CompanyName in Go
			company_type: formData.type, // Maps to CompanyType in Go
			company_description: formData.description, // Maps to CompanyDescription in Go
			year_founded: parseInt(formData.founded, 10), // Maps to YearFounded in Go
			number_of_employees: parseInt(formData.employees, 10) || 1, // Maps to NumberOfEmployees in Go
			email: formData.email, // Maps to Email in Go
			telephone_number: formData.telephone, // Maps to TelephoneNumber in Go
			website: formData.website || "", // Maps to Website in Go
			address: formData.address || "", // Maps to Address in Go
			location: {
				latitude: parseFloat(formData.location.lat) || 1.0, // Maps to Location.Latitude in Go
				longitude: parseFloat(formData.location.lng) || 1.0, // Maps to Location.Longitude in Go
			},
			specializations: formData.specialties || [], // Maps to Specializations in Go
			services_offered: formData.services || [], // Maps to ServicesOffered in Go
			certifications_accreditations: formData.certifications || [], // Maps to CertificationsAccreditations in Go
			company_logo_url: formData.logo || "", // Maps to CompanyLogoUrl in Go
			cover_image_url: formData.coverImage || "", // Maps to CoverImageURL in Go
			pid: user?.sub || "", // Maps to PID in Go
		};
		console.log("Professional Payload:", professionalPayload);

		try {
			const response = await createProfessional(professionalPayload);
			if (response) {
				setIsSubmitting(false);
				console.log("Professional created successfully");
			}
		} catch (err) {
			console.error("Failed to create professional", err);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			{alreadyRegistered == undefined ? (
				 <Loading />
			) : alreadyRegistered ? (
				 <Loading text="Redirecting Dashboard" />
			) : (
				<div className="container max-w-3xl py-10">
					<div className="mb-8 space-y-4">
						<h1 className="text-3xl font-bold">
							Professional Company Registration
						</h1>
						<p className="text-muted-foreground">
							Complete your company profile to join our network of trusted
							professionals.
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
								{step === 1 && "Company Information"}
								{step === 2 && "Contact Details"}
								{step === 3 && "Specializations & Services"}
								{step === 4 && "Company Images"}
								{step === 5 && "Payments"}
							</CardTitle>
							<CardDescription>
								{step === 1 && "Tell us about your company"}
								{step === 2 && "How can clients reach you?"}
								{step === 3 && "What services and specialties do you offer?"}
								{step === 4 && "Upload your company logo and cover image"}
								{step === 5 &&
									"Choose a subscription package to complete your registration"}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form id="registrationForm" ref={formRef} onSubmit={handleSubmit}>
								{step === 1 && (
									<div className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="companyName">Company Name</Label>
											<Input
												id="companyName"
												placeholder="Your company name"
												value={formData.companyName}
												onChange={(e) =>
													updateFormData("companyName", e.target.value)
												}
												required
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="type">Company Type</Label>
											<Select
												value={formData.type}
												onValueChange={(value) => updateFormData("type", value)}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select company type" />
												</SelectTrigger>
												<SelectContent>
													{PROFESSIONAL_TYPES.map((type) => (
														<SelectItem key={type} value={type}>
															{type}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>
										<div className="space-y-2">
											<Label htmlFor="description">Company Description</Label>
											<Textarea
												id="description"
												placeholder="Tell us about your company, its history, and what makes it unique"
												value={formData.description}
												onChange={(e) =>
													updateFormData("description", e.target.value)
												}
												className="min-h-[120px]"
											/>
										</div>
										<div className="grid grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label htmlFor="founded">Year Founded</Label>
												<Input
													id="founded"
													placeholder="e.g. 2010"
													value={formData.founded}
													onChange={(e) =>
														updateFormData("founded", e.target.value)
													}
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="employees">Number of Employees</Label>
												<Select
													value={formData.employees}
													onValueChange={(value) =>
														updateFormData("employees", value)
													}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select range" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="1-10">1-10</SelectItem>
														<SelectItem value="11-50">11-50</SelectItem>
														<SelectItem value="51-200">51-200</SelectItem>
														<SelectItem value="201-500">201-500</SelectItem>
														<SelectItem value="500+">500+</SelectItem>
													</SelectContent>
												</Select>
											</div>
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
												placeholder="company@example.com"
												value={formData.email}
												onChange={(e) =>
													updateFormData("email", e.target.value)
												}
												required
											/>
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
												required
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="website">Website (Optional)</Label>
											<Input
												id="website"
												type="url"
												placeholder="https://www.example.com"
												value={formData.website}
												onChange={(e) =>
													updateFormData("website", e.target.value)
												}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="address">Address</Label>
											<Textarea
												id="address"
												placeholder="Your company address"
												value={formData.address}
												onChange={(e) =>
													updateFormData("address", e.target.value)
												}
												required
											/>
										</div>
										{/* <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude (Optional)</Label>
                    <Input
                      id="latitude"
                      placeholder="e.g. 6.9271"
                      value={formData.location.lat}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          location: { ...formData.location, lat: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude (Optional)</Label>
                    <Input
                      id="longitude"
                      placeholder="e.g. 79.8612"
                      value={formData.location.lng}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          location: { ...formData.location, lng: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center p-4 border rounded-md border-dashed">
                  <div className="text-center">
                    <MapPin className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Map integration will be available soon. For now, please enter your coordinates manually if known.
                    </p>
                  </div>
                </div> */}
									</div>
								)}

								{step === 3 && (
									<div className="space-y-6">
										<div className="space-y-2">
											<Label>Specializations</Label>
											<p className="text-sm text-muted-foreground mb-3">
												Select the areas your company specializes in
											</p>
											<div className="grid grid-cols-2 gap-2">
												{SPECIALTY_OPTIONS.map((specialty) => (
													<div
														key={specialty}
														className="flex items-center space-x-2"
													>
														<Checkbox
															id={`specialty-${specialty}`}
															checked={formData.specialties.includes(specialty)}
															onCheckedChange={(checked: boolean) => {
																if (checked) {
																	updateFormData("specialties", [
																		...formData.specialties,
																		specialty,
																	]);
																} else {
																	updateFormData(
																		"specialties",
																		formData.specialties.filter(
																			(s) => s !== specialty
																		)
																	);
																}
															}}
														/>
														<Label
															htmlFor={`specialty-${specialty}`}
															className="text-sm font-normal"
														>
															{specialty}
														</Label>
													</div>
												))}
											</div>
										</div>

										<div className="space-y-2">
											<Label>Services Offered</Label>
											<p className="text-sm text-muted-foreground mb-3">
												Select the services your company provides
											</p>
											<div className="grid grid-cols-2 gap-2">
												{SERVICE_OPTIONS.map((service) => (
													<div
														key={service}
														className="flex items-center space-x-2"
													>
														<Checkbox
															id={`service-${service}`}
															checked={formData.services.includes(service)}
															onCheckedChange={(checked: boolean) => {
																if (checked) {
																	updateFormData("services", [
																		...formData.services,
																		service,
																	]);
																} else {
																	updateFormData(
																		"services",
																		formData.services.filter(
																			(s) => s !== service
																		)
																	);
																}
															}}
														/>
														<Label
															htmlFor={`service-${service}`}
															className="text-sm font-normal"
														>
															{service}
														</Label>
													</div>
												))}
											</div>
										</div>

										<div className="space-y-2">
											<Label htmlFor="certifications">
												Certifications & Accreditations
											</Label>
											<p className="text-sm text-muted-foreground mb-3">
												Enter any certifications or accreditations your company
												has (one per line)
											</p>
											<Textarea
												id="certifications"
												placeholder="e.g. ISO 9001:2015&#10;Chartered Architects&#10;Green Building Council"
												value={formData.certifications.join("\n")}
												onChange={(e) =>
													updateFormData(
														"certifications",
														e.target.value.split("\n").filter((c) => c.trim())
													)
												}
												className="min-h-[120px]"
											/>
										</div>
									</div>
								)}

								{step === 4 && (
									<div className="space-y-6">
										<div className="space-y-2">
											<Label>Company Logo</Label>
											<ImageUpload
												value={formData.logo}
												onChange={(url) => updateFormData("logo", url)}
												label="Company Logo"
												description="Upload your company logo (square format recommended)"
												dimensions={{ width: 300, height: 300 }}
												enableCrop={true}
												maxFileSize={3}
												quality={90}
												allowedFormats={[
													"image/jpeg",
													"image/png",
													"image/webp",
												]}
												imageClassName="w-32 h-32 object-cover rounded-xl"
											/>
										</div>
										<div className="space-y-2">
											<Label>Cover Image</Label>
											<ImageUpload
												value={formData.coverImage}
												onChange={(url) => updateFormData("coverImage", url)}
												label="Cover Image"
												description="Upload a cover image for your company profile"
												dimensions={{ width: 1200, height: 400 }}
												enableCrop={true}
												maxFileSize={8}
												quality={85}
												allowedFormats={[
													"image/jpeg",
													"image/png",
													"image/webp",
												]}
												imageClassName="w-full h-40 object-cover rounded-xl"
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
												"/professionals/register/success",
												base
											).toString();
										})()}
										packageList={PROFESSIONAL_PACKAGE}
										stripekey={process.env.NEXT_PUBLIC_STRIPE_SECRET || ""}
										puid={user?.sub || ""}
										code={"BML"}
									/>
								)}
							</form>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button
								variant="outline"
								onClick={handleBack}
								disabled={step === 1}
							>
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
			)}
		</>
	);
}

export default withPageAuthRequired(ProfessionalRegistration);
