import { portfolioItems } from "@/lib/portfolio-data";
import PortfolioItemPageContent from './portfolio-item-content';
import { notFound } from "next/navigation";

// Generate static paths for each portfolio item
export async function generateStaticParams() {
  return portfolioItems.map((item) => ({
    id: item.id,
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  const item = portfolioItems.find((p) => p.id === params.id);

  if (!item) {
    notFound();
  }

  return <PortfolioItemPageContent item={item} />;
}
