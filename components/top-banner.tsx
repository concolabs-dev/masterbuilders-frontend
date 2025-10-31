import type React from "react";

interface TopBannerProps {
	text: string;
	backgroundColor: string;
	textColor: string;
	isVisible: boolean;
	onClose?: () => void;
	onActivate?: () => void;
}

export function TopBanner({
	text,
	backgroundColor,
	textColor,
	isVisible,
	onClose,
	onActivate,
}: TopBannerProps) {
	return (
		<>
			{isVisible && (
				<div className="mx-4">
					<div
						className="relative mt-2 mb-2 flex w-full items-center justify-center rounded-lg p-2 text-sm"
						style={{ backgroundColor: backgroundColor, color: textColor }}
					>
						<span className="font-medium">{text}</span>
						{onActivate && (
							<button
								onClick={onActivate}
								className="absolute right-10 top-1/2 -translate-y-1/2 rounded-md px-3 py-1 text-xs font-bold"
								style={{
									backgroundColor: textColor,
									color: backgroundColor,
								}}
							>
								Activate
							</button>
						)}

						{onClose && (
							<button
								onClick={onClose}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-lg font-semibold opacity-70 hover:opacity-100"
								style={{ color: textColor }}
								aria-label="Dismiss"
							>
								&times;
							</button>
						)}
					</div>
				</div>
			)}
		</>
	);
}
