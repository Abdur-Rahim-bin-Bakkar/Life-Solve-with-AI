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

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProblems />
      <Stats />
      <PlatformChart />
      <EmergencyBanner />
      <HowItWorks />
      <Categories />
      <AIShowcase />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  )
}
