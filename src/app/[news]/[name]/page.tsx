import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { cache } from 'react'

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

interface NamePageProps {
  params: Promise<{
    name: string;
    news: string;
  }>;
  searchParams: Promise<{
    q?: string;
  }>;
}

const getArticles = cache(async (category: string, searchQuery?: string): Promise<NewsArticle[]> => {
  try {
    let queryParam = "";
    
    if (searchQuery) {
      queryParam = `q=${encodeURIComponent(searchQuery)}`;
    } else {
      queryParam = `category=${category}`;
    }
    
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?${queryParam}&apiKey=${process.env.NEWS_API}`,
      { cache: "no-store" }
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    
    const data = await res.json();
    
    if (Array.isArray(data)) {
      return data;
    } else if (data?.articles && Array.isArray(data.articles)) {
      return data.articles;
    } else if (data?.data && Array.isArray(data.data)) {
      return data.data;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
});

export async function generateStaticParams() {
  const articles = await getArticles("general");
  const uniqueSources = [...new Set(articles.map(article => article.source.name))];
  
  return uniqueSources.map((name) => ({
    name: encodeURIComponent(name),
  }));
}

export async function generateMetadata({ params, searchParams }: NamePageProps) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const newname = decodeURIComponent(resolvedParams.name);
  const category = decodeURIComponent(resolvedParams.news);
  
  const articles = await getArticles(category, resolvedSearch.q);
  const article = articles.find(a => a.source.name === newname);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }
  
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.urlToImage ? [article.urlToImage] : [],
    },
  };
}

export default async function NewsContent({ params, searchParams }: NamePageProps) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const newname = decodeURIComponent(resolvedParams.name);
  const category = decodeURIComponent(resolvedParams.news);
  
  const articles = await getArticles(category, resolvedSearch.q);
  
  if (!Array.isArray(articles)) {
    console.error("Expected array but got:", typeof articles);
    notFound();
  }
  
  const data = articles.find(article => article.source.name === newname);
  
  if (!data) {
    notFound();
  }
  
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <svg
          className="absolute top-0 left-[max(50%,25rem)] h-256 w-512 -translate-x-1/2 stroke-gray-800 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>

      <article className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
     
        <header className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-indigo-400">
                {data.source.name}
              </p>
              <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {data.title}
              </h1>
              {data.description && (
                <p className="mt-6 text-xl leading-8 text-gray-300">
                  {data.description}
                </p>
              )}
            </div>
          </div>
        </header>

        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <Image
            alt={data.title || "News article image"}
            src={data.urlToImage || "/default.jpg"}
            width={1216}
            height={800}
            priority 
            className="w-228 max-w-none rounded-xl bg-gray-800 shadow-xl ring-1 ring-white/10"
            sizes="(max-width: 1024px) 100vw, 57rem"
            placeholder="blur"
            blurDataURL="image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8cPj4fwAHJwLkLqgzHgAAAABJRU5ErkJggg=="
          />
        </div>

        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-400 lg:max-w-lg">
              {data.content && (
                <p className="text-gray-300">{data.content}</p>
              )}

              <ul role="list" className="mt-8 space-y-8 text-gray-400">
                {data.author && (
                  <li className="flex gap-x-3">
                    <CloudArrowUpIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-400" />
                    <span>
                      <strong className="font-semibold text-white">Author:</strong> {data.author}
                    </span>
                  </li>
                )}
                <li className="flex gap-x-3">
                  <LockClosedIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-400" />
                  <span>
                    <strong className="font-semibold text-white">Published:</strong>{' '}
                    <time dateTime={data.publishedAt}>
                      {new Date(data.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ServerIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-400" />
                  <span>
                    <strong className="font-semibold text-white">Source:</strong> {data.source.name}
                  </span>
                </li>
              </ul>

              <p className="mt-8">
                <a 
                  href={data.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Read full article <span aria-hidden="true">→</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
