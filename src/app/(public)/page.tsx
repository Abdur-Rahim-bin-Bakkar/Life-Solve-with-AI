import Hero from "@/components/home/Hero"
import Stats from "@/components/home/Stats"
import EmergencyBanner from "@/components/home/EmergencyBanner"
import HowItWorks from "@/components/home/HowItWorks"
import Categories from "@/components/home/Categories"
import FeaturedProblems from "@/components/home/FeaturedProblems"
import PlatformChart from "@/components/home/PlatformChart"
import AIShowcase from "@/components/home/AIShowcase"
import Testimonials from "@/components/home/Testimonials"
import FAQ from "@/components/home/FAQ"
import CTA from "@/components/home/CTA"
import SectionDivider from "@/components/ui/SectionDivider"

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProblems />
      <SectionDivider variant={1} />
      <Stats />
      <SectionDivider variant={2} />
      <PlatformChart />
      <SectionDivider variant={3} />
      <EmergencyBanner />
      <SectionDivider variant={4} />
      <HowItWorks />
      <SectionDivider variant={5} />
      <Categories />
      <SectionDivider variant={1} />
      <AIShowcase />
      <SectionDivider variant={2} />
      <Testimonials />
      <SectionDivider variant={3} />
      <FAQ />
      <SectionDivider variant={4} />
      <CTA />
    </>
  )
}
