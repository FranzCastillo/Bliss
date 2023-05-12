import supabase from '../supabase/client.js'

export default async function fetchTable(table){

    const {data, error} = await supabase
      .from(table)
      .select()

      if (error){
        console.log(error)
        return(error)
      }
      if(data){
        return(data)
      }
}