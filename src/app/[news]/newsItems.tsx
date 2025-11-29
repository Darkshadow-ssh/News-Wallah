"use client";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

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

interface NewsItemProps {
    article: NewsArticle;
    queryParam: string;
}

function NewsItems({ article, queryParam }: NewsItemProps) {
    let cleanParam = queryParam;
    if (queryParam.startsWith("category=")) {
        cleanParam = queryParam.substring(9);
    } else if (queryParam.startsWith("q=")) {
        cleanParam = queryParam.substring(2);
    }
    return (
        <div>
            <Link href={`/${cleanParam}/${article.source.name}`}>
                <article className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg dark:shadow-gray-700/25">
                    <Image
                        alt={article.title || "News article image"}
                        src={article.urlToImage || "/default.jpg"}
                        className="h-56 w-full object-cover"
                        height={224}
                        width={400}
                        loading="lazy"
                        quality={75}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    <div className="bg-white p-4 sm:p-6 dark:bg-gray-900">
                        {article.author && (
                            <time className="block text-xs text-gray-500 dark:text-gray-400">
                                {article.author}
                            </time>
                        )}
                        <time className="block text-xs text-gray-500 dark:text-gray-400">
                            {new Date(article.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </time>
                        <div>
                            <h3 className="mt-0.5 text-lg text-gray-900 dark:text-white">
                                {article.title ? article.title.slice(0, 60) : "Untitled"}
                            </h3>
                        </div>
                        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
                            {article.description ? article.description.slice(0, 80) : "No description available"}
                        </p>
                    </div>
                </article>
            </Link>
        </div>
    );
}

export default memo(NewsItems, (prevProps, nextProps) => {
    return (
        prevProps.article.title === nextProps.article.title &&
        prevProps.article.publishedAt === nextProps.article.publishedAt &&
        prevProps.queryParam === nextProps.queryParam
    );
});
