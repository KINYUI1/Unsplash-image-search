import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useGlobalContext } from "./Context"

const url = `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_API_KEY}`

const Gallery = () => {
  const {searchTerm} = useGlobalContext()
  const response = useQuery({
    queryKey:['images',searchTerm],
    queryFn: async ()=> {
      const result = await axios.get(`${url}&query=${searchTerm}`)
      return result.data
    }
  })
  if(response.isLoading){
    return <section className={'image-container'}>
      <h4>Loading...</h4>
    </section>
  }
  if(response.isError){
    return <section className={'image-container'}>
      <h4>there was an error..</h4>
    </section>
  }
  const result = response.data.results
  if(result.length < 1){
    return <section className={'image-container'}>
      <h4>no result found</h4>
    </section>
  }
  return (
    <section className='image-container'>
      {response?.data?.results.map((image)=>{
        return <img src={image.urls.regular} key={image.id} alt={image.alt} className='img'/>
      })}
    </section>
  )
}
export default Gallery