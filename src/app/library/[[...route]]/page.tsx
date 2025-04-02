export default async function Page({
    params,
  }: {
    params: Promise<{ route?: string[] }>
  }) {
    const { route } = await params
    var actualRoute: string = "/"
    route?.forEach((routeElem)=>{
      actualRoute += routeElem + "/"
    })
    return <h1>POST: {actualRoute}</h1>
  }/*  */