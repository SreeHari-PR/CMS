"use client"

import { FileText, MessageCircle, ThumbsUp, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LaunchOfferCTA() {
    return (
        <section className="relative overflow-hidden py-32 mx-auto max-w-7xl">
            {/* Concentric arcs */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1200 600"
                fill="none"
            >
                <circle
                    cx="600"
                    cy="300"
                    r="260"
                    stroke="#E5E7EB"
                    strokeWidth="1"
                />
                <circle
                    cx="600"
                    cy="300"
                    r="360"
                    stroke="#E5E7EB"
                    strokeWidth="1"
                />
                <circle
                    cx="600"
                    cy="300"
                    r="460"
                    stroke="#E5E7EB"
                    strokeWidth="1"
                />
            </svg>

            {/* Floating icon cards */}
            <IconCard icon={FileText} className="top-24 left-1/4" />
            <IconCard icon={MessageCircle} className="top-32 right-1/4" />
            <IconCard icon={User} className="bottom-40 left-1/4" />
            <IconCard icon={ThumbsUp} className="bottom-32 right-1/4" />

            {/* Content */}
            <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
                <p className="text-sm font-medium tracking-wide text-muted-foreground mb-4">
                    SPECIAL LAUNCH OFFER
                </p>

                <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
                    Your journey to better <br /> health starts now
                </h2>

                <p className="text-muted-foreground mb-10">
                    Get 50% off your first 3 months when you start your trial today!
                </p>

                {/* Download buttons */}
                <div className="flex justify-center gap-4 mb-12">
                    <Button
                        size="lg"
                        variant="outline"
                        className="flex items-center gap-2 bg-transparent font-bold rounded-full"
                    >
                        <img src="/apple.svg" alt="Apple" className="w-5 h-5" />
                        Download
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        className="flex items-center gap-2 bg-transparent font-bold rounded-full"
                    >
                        <img src="/google.svg" alt="Google" className="w-5 h-5" />
                        Download
                    </Button>
                </div>

            </div>
        </section>
    )
}

/* Floating icon card */
function IconCard({
    icon: Icon,
    className,
}: {
    icon: React.ElementType
    className?: string
}) {
    return (
        <div
            className={`absolute z-10 w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center ${className}`}
        >
            <Icon className="w-6 h-6 text-muted-foreground" />
        </div>
    )
}
