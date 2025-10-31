"use client";

import { Button } from "@/components/ui/button";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useState, KeyboardEvent, useEffect } from "react";
import { Menu } from "@headlessui/react";
import {
	getPaymentRecordById,
	getProfessionalByPID,
	getSupplierByPPID,
} from "@/app/api"; // Import your API functions
import { TopBanner } from "./top-banner";

export function SiteHeader() {
	const { user, error, isLoading } = useUser();
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");
	const [userType, setUserType] = useState<"professional" | "supplier" | null>(
		null
	);
	const [isBannerVisible, setIsBannerVisible] = useState(false);

	useEffect(() => {
		const checkUserStatusAndPayment = async () => {
			if (!user?.sub) {
				setIsBannerVisible(false);
				return;
			}

			setIsBannerVisible(false);
			let userRole: "professional" | "supplier" | null = null;

			try {
				const professional = await getProfessionalByPID(user.sub);
				if (professional) {
					setUserType("professional");
					userRole = "professional";
				} else {
					const supplier = await getSupplierByPPID(user.sub as string);
					if (supplier && userType !== "professional") {
						setUserType("supplier");
						userRole = "supplier";
					}
				}

				if (userRole) {
					const paymentRecord = await getPaymentRecordById(user.sub, userRole);
					console.log("Payment Record:", paymentRecord);
					if (paymentRecord.approved === false) {
						setIsBannerVisible(true);
					}
				}
			} catch (err) {
				console.error("Failed checking user type or payment:", err);
				setIsBannerVisible(false);
			}
		};

		checkUserStatusAndPayment();
	}, [user?.sub]);

	const handleSearch = () => {
		if (searchTerm.trim()) {
			router.push(`/supplier?search=${encodeURIComponent(searchTerm)}`);
		}
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	const handleLogout = async () => {
		window.location.href = "/api/auth/logout";
	};

	const handleDashboardClick = () => {
		if (userType === "professional") {
			router.push("/professionals/dashboard");
		} else if (userType === "supplier") {
			router.push("/supplier/dashboard");
		} else {
			// Fallback to supplier dashboard if type is unknown
			router.push("/supplier/dashboard");
		}
	};

	return (
		<>
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
				<div className="container flex h-16 items-center">
					<MainNav />
					<MobileNav />
					<div className="flex flex-1 items-center justify-end space-x-4">
						<div className="hidden w-full flex-1 md:flex md:max-w-xs items-center space-x-2">
							<Search className="h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search..."
								className="h-9 md:w-[200px] lg:w-[300px]"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								onKeyDown={handleKeyDown}
							/>
						</div>
						{user ? (
							<div className="relative z-[100]">
								<Menu>
									<Menu.Button
										as={Button}
										className="hidden z-[100] md:flex items-center space-x-2"
									>
										<span>Dashboard</span>
										<ChevronDown className="h-4 z-[100] w-4" />
									</Menu.Button>
									<Menu.Items className="absolute right-0  z-[100] mt-2 w-48 bg-white border rounded-md shadow-lg">
										<Menu.Item>
											{({ active }) => (
												<button
													className={`${
														active ? "bg-gray-100" : ""
													} w-full text-left px-4 py-2 z-[100] text-sm text-gray-700`}
													onClick={handleDashboardClick}
												>
													Dashboard
												</button>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<button
													className={`${
														active ? "bg-gray-100" : ""
													} w-full text-left px-4 z-[100] py-2 text-sm text-gray-700`}
													onClick={handleLogout}
												>
													Logout
												</button>
											)}
										</Menu.Item>
									</Menu.Items>
								</Menu>
							</div>
						) : (
							<Button
								className="hidden md:flex"
								onClick={() => {
									router.push("/register/");
								}}
							>
								Get Started
							</Button>
						)}
					</div>
				</div>
			</header>
			<TopBanner
				text="Your trial period has ended. Please upgrade your plan within 7 days to
					ensure uninterrupted access to the service."
				backgroundColor="#FFC107"
				textColor="#1F1F1F"
				isVisible={isBannerVisible}
				onActivate={handleDashboardClick}
			/>
		</>
	);
}
