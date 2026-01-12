"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

const reviewList: ReviewProps[] = [
  {
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "James Wilson",
    userName: "Full-Stack Developer",
    comment:
      "portfoliopilot.in has made building my portfolio so easy! The custom subdomain feature gives my portfolio a professional touch, and the analytics help me understand how visitors interact with my work.",
    rating: 5.0,
  },
  {
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    name: "Emily Carter",
    userName: "UI/UX Designer",
    comment:
      "I love how customizable the sections are! The layouts are modern and clean, and I can tweak each section to perfectly represent my skills and projects. The Pro plan is totally worth it.",
    rating: 4.9,
  },
  {
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    name: "Michael Brown",
    userName: "Software Engineer",
    comment:
      "Having a personalized subdomain like michael.portfoliopilot.in has boosted my online presence. The SEO optimization ensures my portfolio ranks well in search results. Highly recommend it for professionals.",
    rating: 4.8,
  },
  {
    image: "https://randomuser.me/api/portraits/women/36.jpg",
    name: "Sarah Chen",
    userName: "Data Analyst",
    comment:
      "I was hesitant at first, but the Pro plan is fantastic! The portfolio analytics feature has been a game changer, helping me track visitors and improve my profile.",
    rating: 5.0,
  },
  {
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "Lucas Martinez",
    userName: "Freelance Graphic Designer",
    comment:
      "portfoliopilot.in's flexibility lets me showcase my creative projects beautifully. Being able to change my custom subdomain anytime is a great perk!",
    rating: 4.9,
  },
  {
    image: "https://randomuser.me/api/portraits/women/25.jpg",
    name: "Emma Thompson",
    userName: "Marketing Specialist",
    comment:
      "portfoliopilot.in's sections like Skills and Connect make it so easy to highlight my strengths. I've gotten positive feedback from potential clients, and the updates keep making the platform even better!",
    rating: 5.0,
  },
];

export const TestimonialSection = () => {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-center text-lg tracking-wider text-primary">
          Reviews
        </h2>

        <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
          What Our Users Say
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="relative mx-auto w-[80%] sm:w-[90%] lg:max-w-screen-xl"
      >
        <CarouselContent>
          {reviewList.map((review) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-muted/50 dark:bg-card">
                <CardContent className="pb-0 pt-6">
                  <div className="flex gap-1 pb-6">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`size-4 ${
                          index < Math.floor(review.rating)
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  {`"${review.comment}"`}
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage src={review.image} alt={review.name} />
                      <AvatarFallback>
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.userName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
