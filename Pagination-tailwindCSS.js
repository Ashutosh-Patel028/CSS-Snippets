import { useState,useEffect } from "react";
//Simple Pagination Logic Styling done using tailwindCSS, shows 10 items per page by calling API

function Pagination(){
    const URL = "https://picsum.photos/v2/list";
    const [products,setProducts] = useState([]);
    const [page,setPage]=useState(1);
    
    const fetchData = async()=>{
        const res = await fetch(URL);
        const jsonData = await res.json();
        if(jsonData){
            setProducts(jsonData);
        }
    }
    
    useEffect(()=>{
        fetchData();
    },[])
    
    const selectPageHandler = (selectedPage)=>{
        if(selectedPage>=1 && selectedPage<=products.length/10 && selectedPage!==page)
            setPage(selectedPage);
    }
    
    return (
        <div className="flex flex-wrap">
            {
                products.length>0 &&
                products.slice((page-1)*10,page*10).map((prod,ind)=>{
                    return (
                        <span key={ind} className="border border-red-300 m-6">
                            <img src={prod.download_url} alt={prod.id} className="w-60 h-60"/>
                            <span>{prod.id}</span>
                        </span>
                    )
                })
            }
            {
                products.length>0 &&
                <div className="pagination flex text-center justify-center w-full">
                    <span 
                        className="text-2xl text-center p-2 font-medium border-2 cursor-pointer hover:bg-slate-400"
                        onClick={()=>selectPageHandler(page-1)}
                        disabled={page===1?true:false}
                    >◀</span>
                    {
                        [...Array(products.length/10)].map((_,ind)=>{
                            return <span key={ind} 
                                className={"text-2xl text-center py-2 px-4 font-medium border-2 cursor-pointer hover:bg-slate-400"+(ind+1===page?" bg-slate-400":"")}
                                onClick={()=>selectPageHandler(ind+1)}
                            >{ind+1}</span>
                        })
                    }
                    <button 
                        className="text-2xl text-center p-2 font-medium border-2 cursor-pointer hover:bg-slate-400"
                        onClick={() => selectPageHandler(page+1)}
                        disabled={(page===products.length/10) ? true : false}
                    >▶</button>
                </div>
            }
        </div>
    )
}

export default Pagination;