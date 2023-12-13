 const languageList = [
    {
      value: "en",
      label: 'english'
    },
    {
      value: "id",
      label: 'indonesia'
    },
 
  ];

  export const languageListGetLabel = (value)  => {
    try{
         const label = languageList.find(item => item.value === value).label;
         return label
    }catch(e){
        return ""
    }
  };
  export default languageList