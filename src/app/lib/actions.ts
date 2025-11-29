"use server";
// interface NewsSource {
//   id: string | null;
//   name: string;
// }
// interface NewsArticle {
//   source: NewsSource;
//   author: string | null;
//   title: string;
//   description: string;
//   url: string;
//   urlToImage: string;
//   publishedAt: string;
//   content: string;
// }
export async function getNews(
  queryParam: string,
  page: number = 1,
  limit: number = 15
) {
  const result = await fetch(
    `https://newsapi.org/v2/top-headlines?${queryParam}&page=${page}&pageSize=${limit}&apiKey=${process.env.NEWS_API}`,
    { cache: "no-store" }
  );
  const data = await result.json();
  return {
    articles: data.articles || [],
    totalResults: data.totalResults || 0,
  };
}
