"use server";

import HomePageNavbar from "./_components/home-page-navbar";
import HeroSection from "./_components/hero-section";
// import FeaturesSection from "./_components/features-section";
import { getCurrentUser } from "@/lib/session";
import { getProfile, getUserEmailAndName } from "@/data-access/profiles";
import FAQSection from "./_components/faq-section";
import HowToUse from "./_components/how-to-use";
// import SupportProject from "./_components/support-project";
import { FooterComponent } from "@/components/footer";
import { redirect } from "next/navigation";
import { getUserRouteByUserId } from "@/actions/route_actions";
import { ContactUS } from "./_components/contact-us";
import { BenefitsSection } from "./_components/benefits";
import { FeaturesSection } from "./_components/features";
import { CommunitySection } from "./_components/community";
import { PricingSection } from "./_components/pricing-section";
import { TestimonialSection } from "./_components/testimonial";
import Link from "next/link";
import { Cover } from "./_components/cover";
import SupportProject from "./_components/support-project";

export default async function HomePage() {
  const user = await getCurrentUser();
  if (user && user?.userType !== "free") redirect("/dashboard");
  const profile = await getProfile(user?.id ?? 0);

  const profileRoute = await getUserRouteByUserId(user ? user.id : null);

  const userNameAndEmail = await getUserEmailAndName(user?.id ?? 0);

  return (
    <>
      <HomePageNavbar
        user={user}
        profile={profile}
        profileRoute={profileRoute}
      />
        <HeroSection />
      <div className="container flex h-full flex-grow flex-col items-center justify-center gap-4 px-2 py-2 sm:py-4 md:px-4">
        <FeaturesSection />
        {/* <HowToUse /> */}
        <SupportProject/>
        <TestimonialSection />
      </div>
      {/* <CommunitySection /> */}
      {/* <PricingSection user={user} userNameAndEmail={userNameAndEmail} /> */}
      <FAQSection />
      <ContactUS />
      <FooterComponent />

      {/* product hunt banner */}
      {/* <Link
        className="fixed bottom-28 right-6 z-10"
        href="https://www.producthunt.com/posts/portly-dev?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-portly&#0045;dev"
        target="_blank"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=679820&theme=light"
          alt="Portfoliopilot&#0046;dev - Effortless&#0032;portfolio&#0032;builder&#0032;for&#0032;everyone | Product Hunt"
          style={{ width: "250px", height: "54px" }}
          width="250"
          height="54"
        />
      </Link> */}
    </>
  );
}
// export default async function HomePage() {
//   const user = await getCurrentUser();

//   return (
//     <div className="flex h-full flex-grow flex-col items-center justify-center gap-4 px-2 py-2 sm:py-4 md:px-4">
//       <section className="container flex w-full flex-col items-center justify-center gap-4 lg:flex-row">
//         <RightSection user={user} />
//         <Suspense fallback={<UserTableSkeletonComponent />}>
//           <UserTableWrapper />
//         </Suspense>
//       </section>
//     </div>
//   );
// }
