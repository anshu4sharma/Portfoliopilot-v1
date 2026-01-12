import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {};

const faqData = [
  {
    question: "How do I create a portfolio with Portfoliopilot?",
    answer:
      "Creating a portfolio with Portfoliopilot is simple. Click 'Create your Portfolio' and follow our easy step-by-step guide. You'll have a professional portfolio ready in just a minute with Portfoliopilot!",
  },
  {
    question: "Is Portfoliopilot free to use?",
    answer:
      "Yes, Portfoliopilot offers a free plan with basic features. For Pro features, we currently have a limited-time offer at ₹33/month (regular price ₹100/month) or $0.40/month (regular price $1.20/month), billed quarterly.",
  },
  {
    question: "What features are included in the Pro plan on Portfoliopilot?",
    answer:
      "The Pro plan on Portfoliopilot includes a custom subdomain (e.g., username.portfoliopilot.in), SEO optimization, portfolio analytics, customizable designs, access to all portfolio sections, and regular updates.",
  },
  {
    question: "How long does it take to set up a portfolio with Portfoliopilot?",
    answer:
      "Setting up your portfolio with Portfoliopilot takes approximately 1 minute. Our platform is designed for a quick and hassle-free setup experience.",
  },
  {
    question: "Can I use my own domain with Portfoliopilot?",
    answer:
      "Not yet, but this feature is under consideration on Portfoliopilot. Stay tuned for updates as we work to improve your experience!",
  },
  {
    question: "Can I change my portfolio subdomain on Portfoliopilot?",
    answer:
      "Yes! With the Pro plan on Portfoliopilot, you can change your custom subdomain unlimited times, providing great flexibility for your personal branding.",
  },
  {
    question: "What sections can I add to my portfolio with Portfoliopilot?",
    answer:
      "Portfoliopilot Pro users can add sections like Hero, Skills, Projects, Work Experience, Education, and Connect, with customizable layouts for each to make your portfolio truly unique.",
  },
  {
    question: "Is my data secure on Portfoliopilot?",
    answer:
      "Absolutely. Portfoliopilot uses industry-standard encryption and security practices to keep your data safe and secure. You can trust Portfoliopilot to protect your information.",
  },
  {
    question: "Can I create multiple portfolios on Portfoliopilot?",
    answer: 
      "No, each Portfoliopilot user can create only one portfolio per account, ensuring a focused and high-quality experience.",
  },
];

export default function FAQSection({ }: Props) {
  return (
    <section id="faq" className="relative w-full overflow-hidden py-16">
      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-bold text-primary">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem
              value={`item-${index + 1}`}
              key={index}
              className="overflow-hidden rounded-lg border border-primary/20"
            >
              <AccordionTrigger className="bg-background/80 px-4 py-3 text-xl font-medium text-primary transition-colors hover:bg-muted/50 hover:text-primary/80">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="bg-background/80 px-4 py-3 text-lg text-primary/80">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
