// assets
import DashboardIcon from '@mui/icons-material/Dashboard';
import StarBorder from '@mui/icons-material/StarBorder';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import FilterIcon from '@mui/icons-material/Filter';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import Filter4Icon from '@mui/icons-material/Filter4';
// constant

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const menuPages = [
    // dashboard
        {
                
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
    
            url: '',
            target: true,
            icon: <DashboardIcon/>,

          
        },

        // user management

        {
            
        
            id: 'userManagement',
            title: 'User Management',
            type: 'collapse',
            icon: <ManageAccountsIcon/>,

            children: [
                {
                    id: 'user',
                    title: 'User',
                    type: 'item',
                    url: '/user',
                    target: true,
                    icon: <PersonIcon/>,
            
                },
                {
                    id: 'admin',
                    title: 'Admin',
                    type: 'item',
                    url: '/admin',
                    target: true,
                    icon: <GroupIcon/>,
            
                },
                {
                    id: 'adminRole',
                    title: 'Admin role',
                    type: 'item',
                    url: '/admin-role',
                    target: true,
                    icon: <SupervisedUserCircleIcon/>,
            
                },
            
            ],
        },



         // stock
         {
                
            id: 'stock',
            title: 'Stock',
            type: 'collapse',
    
          
            icon: <FilterIcon/>,
            children: [
            
                {
                    id: 'newStock',
                    title: 'New Stock',
                    type: 'item',
                    url: '/stock/new',
                    target: true,
                    icon: <Filter1Icon/>,
            
                },
                {
                    id: 'reviewStock',
                    title: 'Review stock',
                    type: 'item',
                    url: '/stock/review',
                    target: true,
                    icon: <Filter2Icon/>,
                },
                ,
                {
                    id: 'publishStock',
                    title: 'Publish stock',
                    type: 'item',
                    url: '/stock/publish ',
                    target: true,
                    icon: <Filter3Icon/>,
                },

                {
                    id: 'rejectStock',
                    title: 'Reject stock',
                    type: 'item',
                    url: '/stock/reject',
                    target: true,
                    icon: <Filter4Icon/>,
            
                },
                // {
                //     id: 'adminAdd',
                //     title: 'Add Admin',
                //     type: 'item',
                //     url: '/admin/add',
                //     target: true,
                //     icon: <GroupAddIcon/>,
                // }
            ],

          
        },

          // Page
          {
                
            id: 'content',
            title: 'content',
            type: 'collapse',
    
          
            icon: <FilterIcon/>,
            children: [
            
   

                {
                    id: 'page',
                    title: 'Page',
                    type: 'item',
                    url: '/page',
                    target: true,
                    icon: <Filter4Icon/>,
            
                },
                // {
                //     id: 'adminAdd',
                //     title: 'Add Admin',
                //     type: 'item',
                //     url: '/admin/add',
                //     target: true,
                //     icon: <GroupAddIcon/>,
                // }
            ],

          
        },
    

       


           
        

   
];

export default menuPages;
