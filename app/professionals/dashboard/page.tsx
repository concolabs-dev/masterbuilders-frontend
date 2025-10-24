"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Grid, List, Search } from "lucide-react";
import { ProfessionalProfile } from "@/components/professional-profile";
import { ProjectCard } from "@/components/project-card";
import { ProjectList } from "@/components/project-list";
import { AddProjectDialog } from "@/components/add-project-dialog";
import { EditProjectDialog } from "@/components/edit-project-dialog";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
	Professional,
	Project,
	getProfessionalByPID,
	getProjectsByPID,
	createProject,
	updateProfessional,
	PaymentRecord,
	getPaymentRecordById,
} from "@/app/api";
import Loading from "../loading";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { withRoleGuard } from "@/app/hoc/withRoleGuard";
import { Package, PaymentManagePortal } from "@concolabs-dev/payment";
import { RequirePaymentDialog } from "@/components/payment-require";
// Mock projects data - keeping this for now
const initialProjects = [
	{
		id: "1",
		name: "Serenity Heights Residences",
		type: "Residential",
		location: "Colombo 07",
		year: "2022",
		description:
			"A luxury apartment complex featuring 50 units with modern amenities and sustainable design elements.",
		images: [
			"/placeholder.svg?height=400&width=600",
			"/placeholder.svg?height=400&width=600",
			"/placeholder.svg?height=400&width=600",
		],
		featured: true,
	},
	{
		id: "2",
		name: "Ocean View Commercial Plaza",
		type: "Commercial",
		location: "Galle",
		year: "2021",
		description:
			"A mixed-use commercial development with retail spaces, offices, and recreational areas overlooking the Indian Ocean.",
		images: [
			"/placeholder.svg?height=400&width=600",
			"/placeholder.svg?height=400&width=600",
		],
		featured: true,
	},
	{
		id: "3",
		name: "Green Valley Eco Resort",
		type: "Hospitality",
		location: "Kandy",
		year: "2020",
		description:
			"An eco-friendly resort nestled in the hills of Kandy, featuring sustainable architecture and minimal environmental impact.",
		images: [
			"/placeholder.svg?height=400&width=600",
			"/placeholder.svg?height=400&width=600",
			"/placeholder.svg?height=400&width=600",
			"/placeholder.svg?height=400&width=600",
		],
		featured: false,
	},
	{
		id: "4",
		name: "Innovation Hub Tech Campus",
		type: "Institutional",
		location: "Colombo 04",
		year: "2019",
		description:
			"A state-of-the-art technology campus designed to foster innovation and collaboration among tech startups.",
		images: [
			"/placeholder.svg?height=400&width=600",
			"/placeholder.svg?height=400&width=600",
		],
		featured: true,
	},
];

// TODO: check price ids
const packageTypes: Package[] = [
	{
		title: "User Monthly",
		price: "LKR 3,000",
		features: [],
		priceId: "price_1SEsBlHb6l5GodkUfSAHUCjA", // test price
		// priceId: "price_1SEsFpHb6l5GodkUY5ifwNvu",
		highlighted: false,
		packageName: "BML_SUP_BASIC",
	},
	// {
	//   title: "Gold User",
	//   price: "LKR 10,000",
	//   features: [],
	//   highlighted: false,
	//   priceId: "price_1SEsFYHb6l5GodkUuXISMv2N",
	//   packageName: "BML_GOLD",
	// },
	{
		title: "Year at Once",
		price: "LKR 30,000",
		features: [],
		highlighted: false,
		priceId: "price_1SEsIPHb6l5GodkU3hFnjLKe",
		packageName: "BML_SUP_ANUAL",
	},
];

function ProfessionalDashboardPage() {
	const { user, isLoading: isUserLoading, error: userError } = useUser();
	const [professionalData, setProfessionalData] = useState<Professional | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Projects state (using dummy data for now)
	const [projects, setProjects] = useState(initialProjects);
	const [selectedProject, setSelectedProject] = useState<
		null | (typeof initialProjects)[0]
	>(null);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [searchQuery, setSearchQuery] = useState("");
	const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false);
	const [isEditProjectDialogOpen, setIsEditProjectDialogOpen] = useState(false);
	const [isPaymentRequireDialogOpen, setIsPaymentRequireDialogOpen] =
		useState(false);
	const [paidUserApprovedStatus, setPaidUserApprovedStatus] = useState(false);

	// Fetch professional data when user is loaded
	useEffect(() => {
		const fetchData = async () => {
			if (!user?.sub) return;

			try {
				setIsLoading(true);

				// Fetch professional data
				const professional = await getProfessionalByPID(user.sub);
				
				if (!professional) {
					setError("Professional profile not found.");
					throw new Error("Professional profile not found.");
				}

				setProfessionalData(professional);

				// Fetch projects associated with the professional's PID
				const projects = await getProjectsByPID(user.sub);
				if (projects) {
					setProjects(
						projects.map((project) => ({
							...project,
							id: project.id ?? "", // Ensure id is always a string
							featured: project.featured ?? false,
						}))
					);
				} else {
					setProjects([]);
				}
				getPaymentRecordById(user.sub, "professional")
					.then((data: PaymentRecord) => {
						setPaidUserApprovedStatus(data.approved);
						if (data.approved === false) {
							setIsPaymentRequireDialogOpen(true);
						}
					})
					.catch((err: any) => {
						console.error("Error fetching professional payments:", err);
						setError(JSON.stringify(err));
					});

				setError(null);
			} catch (err) {
				console.error("Failed to fetch data:", err);
				setError("Failed to load your data. Please try again later.");
			} finally {
				setIsLoading(false);
			}
		};

		if (user?.sub) {
			fetchData();
		}
	}, [user?.sub]);

	const handleProfessionalUpdate = async (
		updatedProfessional: Professional
	) => {
		if (!professionalData?.id) return;

		try {
			await updateProfessional(professionalData.id, updatedProfessional);
			setProfessionalData({ ...professionalData, ...updatedProfessional });
			console.log("Professional updated:", updatedProfessional);
		} catch (err) {
			console.error("Failed to update professional:", err);
		}
	};

	// Filter projects based on search query
	const filteredProjects = projects.filter(
		(project) =>
			project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			project.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
			project.location.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleAddProject = async (newProject: Omit<Project, "id" | "pid">) => {
		if (!professionalData?.pid) return;

		try {
			const createdProject = await createProject({
				...newProject,
				pid: professionalData.pid, // Associate the project with the professional's PID
			});
			setProjects([
				...projects,
				{ ...createdProject, id: createdProject.id ?? "" },
			]);
			setIsAddProjectDialogOpen(false);
		} catch (err) {
			console.error("Failed to add project:", err);
		}
	};

	const handleUpdateProject = async (
		id: string,
		updatedProject: Partial<Project>
	) => {
		try {
			const updatedProjects = projects.map((project) =>
				project.id === id ? { ...project, ...updatedProject } : project
			);
			setProjects(updatedProjects);
			setSelectedProject(null);
			setIsEditProjectDialogOpen(false);
		} catch (err) {
			console.error("Failed to update project:", err);
		}
	};

	const handleDeleteProject = (id: string) => {
		setProjects(projects.filter((project) => project.id !== id));
	};

	const handleToggleFeature = (id: string) => {
		setProjects(
			projects.map((project) =>
				project.id === id
					? { ...project, featured: !project.featured }
					: project
			)
		);
	};

	// Loading state
	if (isUserLoading || isLoading) {
		return (
			<div className="container mx-auto py-10 space-y-6">
				{/* <Skeleton className="h-[300px] w-full rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-[200px] rounded-lg" />
          <Skeleton className="h-[200px] rounded-lg" />
        </div> */}
				<Loading />
			</div>
		);
	}

	// Error state
	if (userError || error) {
		return (
			<div className="container mx-auto py-10">
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						{error ||
							"There was an error loading your profile. Please try again later."}
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	// No professional profile found
	if (!professionalData) {
		return (
			<div className="container mx-auto py-10 text-center">
				<h1 className="text-2xl font-bold mb-4">
					No Professional Profile Found
				</h1>
				<p className="text-muted-foreground mb-6">
					It seems you don't have a professional profile yet. Please complete
					the onboarding process.
				</p>
				<Button onClick={() => (window.location.href = "/onboarding")}>
					Complete Onboarding
				</Button>
			</div>
		);
	}

    if (professionalData && !paidUserApprovedStatus && !isLoading) {
      return (
        <div className="container max-w-3xl py-10 text-center">
          <h1 className="text-2xl font-bold mb-4">You’re already registered!</h1>
          <p className="text-muted-foreground mb-8 flex flex-col items-center gap-[10px]">
            Your trial period has ended. Please upgrade your plan within 7 days to
            ensure uninterrupted access to the service.
            <Button
              onClick={() => setIsPaymentRequireDialogOpen(true)}
              disabled={paidUserApprovedStatus}
            >
              Activate Now
            </Button>
          </p>
          <RequirePaymentDialog
            open={isPaymentRequireDialogOpen}
            onOpenChange={setIsPaymentRequireDialogOpen}
            packageTypes={packageTypes}
            puid={user?.sub || ""}
            successUrl={(() => {
              const base = process.env.NEXT_PUBLIC_FRONTEND_API_URL;
              if (!base) return "";
              return new URL("/professionals/register/success", base).toString();
            })()}
          />
        </div>
      );
    }

	return (
		<div className="container mx-auto py-10">
			<ProfessionalProfile
				professional={professionalData}
				onUpdate={handleProfessionalUpdate}
			/>

			<Tabs defaultValue="projects" className="mt-8">
				<div className="flex justify-between items-center mb-4">
					<TabsList>
						<TabsTrigger value="projects">Projects</TabsTrigger>
						<TabsTrigger value="services">Services</TabsTrigger>
						<TabsTrigger value="analytics">Analytics</TabsTrigger>
						<TabsTrigger value="settings">Settings</TabsTrigger>
						<TabsTrigger value="payments">Payments</TabsTrigger>
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

				<TabsContent value="projects" className="space-y-4">
					<div className="flex justify-between items-center">
						<div className="relative flex-1 max-w-sm">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search projects..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-9"
							/>
						</div>
						<Button onClick={() => setIsAddProjectDialogOpen(true)}>
							<Plus className="mr-2 h-4 w-4" /> Add Project
						</Button>
					</div>

					{viewMode === "grid" ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredProjects.map((project) => (
								<ProjectCard
									key={project.id}
									project={project}
									onEdit={() => {
										setSelectedProject(project);
										setIsEditProjectDialogOpen(true);
									}}
									onDelete={() => handleDeleteProject(project.id)}
									onToggleFeature={() => handleToggleFeature(project.id)}
								/>
							))}
						</div>
					) : (
						<ProjectList
							projects={filteredProjects}
							onEdit={(project) => {
								setSelectedProject(project);
								setIsEditProjectDialogOpen(true);
							}}
							onDelete={(id) => handleDeleteProject(id)}
							onToggleFeature={(id) => handleToggleFeature(id)}
						/>
					)}

					{filteredProjects.length === 0 && (
						<div className="text-center py-12 text-muted-foreground">
							No projects found. Add your first project to showcase your work.
						</div>
					)}
				</TabsContent>

				<TabsContent value="services" className="space-y-4">
					<Card>
						<CardContent className="p-6">
							<h2 className="text-xl font-semibold mb-4">Manage Services</h2>
							<p className="text-muted-foreground mb-6">
								Edit your services and specializations to showcase your
								expertise to potential clients.
							</p>

							<div className="mb-6">
								<h3 className="text-lg font-medium mb-3">Your Services</h3>
								<ul className="list-disc pl-5 space-y-2">
									{professionalData.services_offered?.map((service, index) => (
										<li key={index}>{service}</li>
									)) || (
										<li className="text-muted-foreground">
											No services added yet
										</li>
									)}
								</ul>
							</div>

							<div className="mb-6">
								<h3 className="text-lg font-medium mb-3">
									Your Specializations
								</h3>
								<div className="flex flex-wrap gap-2">
									{professionalData.specializations?.map((spec, index) => (
										<span
											key={index}
											className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
										>
											{spec}
										</span>
									)) || (
										<span className="text-muted-foreground">
											No specializations added yet
										</span>
									)}
								</div>
							</div>

							<Button>Edit Services & Specializations</Button>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="analytics" className="space-y-4">
					<Card>
						<CardContent className="p-6">
							<h2 className="text-xl font-semibold mb-4">Analytics</h2>
							<p className="text-muted-foreground">
								View insights about your profile views and engagement.
							</p>
							<div className="text-center py-12 text-muted-foreground">
								Analytics features coming soon.
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="settings" className="space-y-4">
					<Card>
						<CardContent className="p-6">
							<h2 className="text-xl font-semibold mb-4">Account Settings</h2>
							<div className="space-y-4">
								<div>
									<h3 className="font-medium mb-1">Company Name</h3>
									<p>{professionalData.company_name}</p>
								</div>
								<div>
									<h3 className="font-medium mb-1">Company Type</h3>
									<p>{professionalData.company_type}</p>
								</div>
								<div>
									<h3 className="font-medium mb-1">Email</h3>
									<p>{professionalData.email}</p>
								</div>
								<div>
									<h3 className="font-medium mb-1">Phone</h3>
									<p>{professionalData.telephone_number}</p>
								</div>
								<div>
									<h3 className="font-medium mb-1">Address</h3>
									<p>{professionalData.address}</p>
								</div>
								<div>
									<h3 className="font-medium mb-1">Website</h3>
									<p>{professionalData.website || "Not specified"}</p>
								</div>
							</div>
							<div className="mt-6">
								<Button>Edit Account Settings</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="payments" className="space-y-4">
					<Card>
						<CardContent className="p-6">
							<h2 className="text-xl font-semibold mb-4">Payments</h2>
							<p className="text-muted-foreground">
								Manage Your Payments Here.
							</p>
							<div className="flex flex-col items-start gap-[10px] mt-6">
								<PaymentManagePortal
									customClassName="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#f26f18] text-white shadow hover:bg-[#f26f18]/90 h-9 px-4 py-2"
									backendUrl={process.env.NEXT_PUBLIC_PAYMENT_API_URL || ""}
									returnUrl={process.env.NEXT_PUBLIC_FRONTEND_API_URL || ""}
									puid={user?.sub || ""}
									token={
										"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiQk1MIn0.TvMGIrH9i1mtMw2He6_Fs3am_xXd5FxLtX8nhyF9fio"
									}
								/>
								<Button
									onClick={() => setIsPaymentRequireDialogOpen(true)}
									disabled={paidUserApprovedStatus}
								>
									Activate Now
								</Button>
							</div>
							<RequirePaymentDialog
								open={isPaymentRequireDialogOpen}
								onOpenChange={setIsPaymentRequireDialogOpen}
								packageTypes={packageTypes}
								puid={user?.sub || ""}
								successUrl={(() => {
									const base = process.env.NEXT_PUBLIC_FRONTEND_API_URL;
									if (!base) return "";
									return new URL(
										"/api/auth/login?prompt=none&returnTo=/onboarding/success",
										base
									).toString();
								})()}
							/>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			{/* Add Project Dialog */}
			<AddProjectDialog
				open={isAddProjectDialogOpen}
				onOpenChange={setIsAddProjectDialogOpen}
				onSubmit={handleAddProject}
			/>

			{/* Edit Project Dialog */}
			<EditProjectDialog
				open={isEditProjectDialogOpen}
				onOpenChange={setIsEditProjectDialogOpen}
				project={selectedProject}
				onSubmit={(updatedProject) =>
					handleUpdateProject(selectedProject?.id ?? "", updatedProject)
				}
			/>
		</div>
	);
}
const GuardedDashboardPage = withRoleGuard(ProfessionalDashboardPage, [
	"professional",
	"admin",
]);
export default GuardedDashboardPage;
