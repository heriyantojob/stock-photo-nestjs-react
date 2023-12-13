export const columns = [
    // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'username', headerName: 'Username', minWidth: 130 },
        { field: 'email', headerName: 'Email', minWidth: 130 },
        { field: 'name', headerName: 'Name', minWidth: 130 },
        
        {
            field: 'status',
            headerName: 'Status',
    
            minWidth: 90,
        },
        {
            id: 'action',
            label: 'Action',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toFixed(2),
        },//3
    
    ];
    