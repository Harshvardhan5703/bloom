import type { Metadata } from "next";
import PublicLanding from "@/components/PublicLanding";

export const metadata: Metadata = {
  title: "Bloom | Better conversations start here",
  description:
    "A simpler space for meetings, collaboration, and the conversations that move work forward.",
};

export default function LandingPage() {
  return <PublicLanding />;
}
