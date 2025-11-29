import { JSX } from "react";
import NewsList from "../components/NewsList";

interface NewsSource {
  id: string | null;
  name: string;
}

interface NewsArticle {
  source: NewsSource;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface CatePageProps {
  params: Promise<{
    news: string;
  }>;
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function newsPage({ params, searchParams }: CatePageProps): Promise<JSX.Element> {
  const cat = await params;
  const search = await searchParams;
  let queryParam = "";
  if (search.q) {
    queryParam = `q=${search.q}`;
  } else {
    queryParam = `category=${cat.news || "general"}`;
  }

  async function getInitialNews(): Promise<{ articles: NewsArticle[], totalResults: number }> {
    const result = await fetch(
      `https://newsapi.org/v2/top-headlines?${queryParam}&page=1&pageSize=15&apiKey=${process.env.NEWS_API}`,
      { cache: "no-store" }
    );
    const data = await result.json();
    return {
      articles: data.articles || [],
      totalResults: data.totalResults || 0
    };
  }

  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const { articles, totalResults } = await getInitialNews();
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="relative isolate px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="py-32">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {search.q ? `Search Results for: ${search.q}` : `${capitalizeFirstLetter(cat.news)} News`}
          </h3>
          <NewsList
            initialArticles={articles}
            queryParam={queryParam}
            totalResults={totalResults}
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>
    </div>
  );
}
