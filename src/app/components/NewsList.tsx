'use client'
import { useEffect, useState, useRef } from 'react';
import NewsItems from '../[news]/newsItems';
import { getNews } from '../lib/actions';
import Image from 'next/image';

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

interface NewsListProps {
    initialArticles: NewsArticle[];
    queryParam: string;
    totalResults: number;
}

export default function NewsList({ initialArticles, queryParam, totalResults }: NewsListProps) {
    const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(initialArticles.length < totalResults);
    const [isLoading, setIsLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    const loadMore = async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        const nextPage = page + 1;

        try {
            const data = await getNews(queryParam, nextPage, 15);

            if (data.articles.length === 0) {
                setHasMore(false);
            } else {
                setArticles(prev => [...prev, ...data.articles]);
                setPage(nextPage);
                setHasMore(articles.length + data.articles.length < totalResults);
            }
        } catch (error) {
            console.error('Error loading more articles:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    loadMore();
                }
            },
            { threshold: 0.5 }
        );

        const currentLoader = loaderRef.current;
        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        };
    },);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 sm:px-6 lg:px-10">
                {articles.map((article: NewsArticle, index: number) => (
                    <NewsItems key={`${article.title}-${index}`} article={article} queryParam={queryParam} />
                ))}
            </div>
            {hasMore && (
                <div ref={loaderRef} className="flex justify-center items-center py-8">
                    <Image
                        src="/loading.gif"
                        alt="Loading more articles..."
                        width={64}
                        height={64}
                        unoptimized={true}
                    />
                </div>
            )}

            {!hasMore && articles.length > 0 && (
                <p className="text-center py-8 text-gray-600 dark:text-gray-400">
                    No more articles to load
                </p>
            )}
        </>
    );
}
