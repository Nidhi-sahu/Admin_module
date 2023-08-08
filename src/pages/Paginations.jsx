import React from "react";

import {Button} from 'react-bootstrap'

const Paginations =({totalPosts,postsPerPage,setCurrentPage}) => {
    let pages = []

    for (let i=1; i <= Math.ceil(totalPosts/postsPerPage); i++)
    {
        pages.push(i)
    }

    console.log(pages,'pages of pagination')
    return(
        <>
        {
            pages.map((page,index) =>{
                return(
                    <>
                    
                     <button type="button" class="btn btn-light" style={{width:'25px',height:'25px',paddingRight:'20px',paddingBottom:'22px',marginLeft:'10px'}} key={index} onClick={() => setCurrentPage(page)}>{`${page}`}</button> 
                   
                        
                  </>
                   
                )
            })
        }
        
        </>
    )
}

export default Paginations;