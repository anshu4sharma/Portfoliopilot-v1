import Portfolio from "./_components/portfolio";


type Props = {};

export default async function PortfolioPage({ }: Props) {


  return (
    <div className="mx-auto py-3">
      <h1 className="container mx-auto mb-8 px-4 text-2xl font-bold sm:px-8">
        Edit Your Portfolio{" "}
      </h1>
      <Portfolio />
    </div>
  );
}
