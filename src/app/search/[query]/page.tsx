export default async function Page({
    params,
  }: {
    params: Promise<{ query?: string }>
  }) {
    const { query } = await params
    return <h1>Search query: {query}</h1>
  }/*  */