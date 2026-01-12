import { getAllUsers } from './actions/user-actions';
 
export default  async function  sitemap(){
   const allUsers = await getAllUsers();
       let usrRoutes =  allUsers.map((user)=>{
         return  {
                url:`${String(process.env.HOST_NAME ||  process.env.NEXT_PUBLIC_HOST_NAME)}/${user.routeName}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 1,
              }
            }
        )
  return [
    usrRoutes,
    {
      url:String( process.env.HOST_NAME ||  process.env.NEXT_PUBLIC_HOST_NAME),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
        url:`${String(process.env.HOST_NAME ||  process.env.NEXT_PUBLIC_HOST_NAME)}/about-us`,
        lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
        url:`${String(process.env.HOST_NAME ||  process.env.NEXT_PUBLIC_HOST_NAME)}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
        url:`${String(process.env.HOST_NAME ||  process.env.NEXT_PUBLIC_HOST_NAME)}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
        url:`${String(process.env.HOST_NAME ||  process.env.NEXT_PUBLIC_HOST_NAME)}/pricing-policy`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
        url:`${String(process.env.HOST_NAME ||  process.env.NEXT_PUBLIC_HOST_NAME)}/refund-policy`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
        url:`${String(process.env.HOST_NAME ||  process.env.NEXT_PUBLIC_HOST_NAME)}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
        url:`${String(process.env.HOST_NAME ||  process.env.NEXT_PUBLIC_HOST_NAME)}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
        url:`${String(process.env.HOST_NAME ||  process.env.NEXT_PUBLIC_HOST_NAME)}/create-portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
        url:`${String(process.env.HOST_NAME ||  process.env.NEXT_PUBLIC_HOST_NAME)}/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
        url:`${String(process.env.HOST_NAME ||  process.env.NEXT_PUBLIC_HOST_NAME)}/support-us`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}