import React from 'react'
import {useRouter} from "next/router";
import { useGetStockUploadNewQuery } from './stockUploadApiSlice'
function StockUploadNewList() {
  const { data, error, isLoading } = useGetStockUploadNewQuery(1)
    let template = [
        { id_template:"DSDSDS",
          resultfile:{
            file_name:"DSdsds",
           
          }
          
        },
        {
          id_template:"dsds",
          resultfile:{
            file_name:"dssdds"
          }
        },
      ]

      const router = useRouter();
  return (
    <div className="overflow-x-auto w-full">

    {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <p>ada data</p>
          <p>data: {JSON.stringify(data)}</p>

          {/* <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} /> */}
        </>
      ) : <div>Gak ada data</div>}



      {isLoading && (
        <div>Loading...</div>
      )}
    <table className="table w-full"> 

      {/* head table */}
      <thead>
          <tr>
              <th>
              <label>
                  <input type="checkbox" className="checkbox" />
              </label>
              </th>
              <th>Produk</th>
              <th>file</th>
              <th>status</th>
         
              <th></th>
          </tr>
      </thead>
      {/* end table */}
      <tbody>{template?.map((item) =>
            <tr key={item.id_template}>
              <th>
                  <label>
                      <input type="checkbox" className="checkbox" />
                  </label>
              </th>
              <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={process.env.NEXT_PUBLIC_ENV_BASE_URL_API+"/template-file/download/"+item.id_template+"/"} />
                        </div>
                    </div>
                    <div>{item?.resultfile?.file_name}</div>
                  </div>
              </td>
              <td> 
            
                  <span className="badge badge-ghost badge-sm">success</span>
              </td>

            <th>
              <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={(e) => {router.push('/template-upload/edit/'+item.id_template)}}>
                    Edit
                  </button>
                  <button className="btn btn-secondary">Download</button>
                  <button className="btn btn-error">Delete</button>
              </div>
            </th>
          </tr> 
           )}</tbody> 
  
    </table>
    
</div>

  )
}

export default StockUploadNewList