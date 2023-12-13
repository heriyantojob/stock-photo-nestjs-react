export const columns = [

    { id: 'title', label: 'Title', minWidth: 200 }, //0
    { id: 'slug', label: 'Slug', minWidth: 150 },//1
  
    {
      id: 'language',
      label: 'language',
      minWidth: 100,

    },//2
    {
      id: 'action',
      label: 'Action',
      minWidth: 100,
      align: 'left',
      format: (value) => value.toFixed(2),
    },//3
  ];