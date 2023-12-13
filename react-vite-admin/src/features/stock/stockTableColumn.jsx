export const columns = [

    { id: 'filePreview', label: 'File Preview', maxWidth: 60 }, //0
    { id: 'fileDownload', label: 'File Download', minWidth: 100 },//1
    { id: 'fileType', label: 'File Type', minWidth: 100 },//1
    {
      id: 'email_user',
      label: 'Email User',
      minWidth: 170,
      align: 'left',
    },//2
  
    {
      id: 'title',
      label: 'title',
      minWidth: 170,
      align: 'left',
    },//2
    {
      id: 'action',
      label: 'Action',
      minWidth: 170,
      align: 'left',
      format: (value) => value.toFixed(2),
    },//3
  ];