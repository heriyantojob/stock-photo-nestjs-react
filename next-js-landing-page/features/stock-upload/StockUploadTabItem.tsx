interface TabItem {
    name: string, url: string
}


export  const STOCK_UPLOAD_TAB_ITEM :TabItem[]=[ 
    { name:"New",url:"/stock-upload/new"},
    {name:"Review",url:"/stock-upload/review"},
    {name:"Publish",url:"/stock-upload/publish"},
    {name:"Reject",url:"/stock-upload/reject"},
]
export default STOCK_UPLOAD_TAB_ITEM

