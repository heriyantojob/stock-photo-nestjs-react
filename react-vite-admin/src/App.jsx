import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

// import LayoutDrawerMini from "./layout/LayoutDrawerMini/LayoutDrawerMini"
import LayoutMinimal from "./layout/LayoutMinimal/LayoutMinimal"
import LayoutDrawerResponsive from "./layout/LayoutDrawerResponsive/LayoutDrawerResponsive"



import  DashboardContent  from './features/dashboard/DashboardContent';
// auth
import  Login  from './features/auth/Login';
import  Prefetch  from './features/auth/Prefetch';
import  ProfileForm  from './features/user/ProfileForm'
// user
import UserView from "./features/user/UserView"
import UserList from "./features/user/UserList"
import UserEdit from "./features/user/UserEdit"
// import UserAdd from "./features/user/UserEdit"

import UserAdd from "./features/user/UserAdd"



// admin role
import AdminList from "./features/admin/AdminList"

import AdminAdd from './features/admin/AdminAdd'
import AdminView from './features/admin/AdminView'
import AdminEdit from './features/admin/AdminEdit'

import AdminRoleList from './features/admin-role/AdminRoleList'
import AdminRoleAdd from './features/admin-role/AdminRoleAdd'
import AdminRoleEdit from './features/admin-role/AdminRoleEdit'

//stock
import StockNewList from './features/stock/StockNewList'
import StockList from './features/stock/StockList'
import StockEdit from './features/stock/StockEdit'
import StockView from './features/stock/StockView'

import PersistLogin from './features/auth/PersistLogin'
import PageList from './features/page/PageList';
import PageAdd from './features/page/PageAdd';
import PageEdit from './features/page/PageEdit';


function App() {

  return (
    <>
     <Routes>
     <Route path="/" element={<LayoutMinimal />}>
        <Route path="login" element={<Login />} />
   
      </Route>
      <Route element={<PersistLogin />}>
        {/* <Route element={<Prefetch />}>
         
        </Route> */}
        <Route path="/" element={<LayoutDrawerResponsive />}>
              <Route index element={<DashboardContent />} />
              <Route path="/profile" element={<ProfileForm />} />
              <Route path="/user/add" element={<UserAdd />} />
              <Route path="/user" element={<UserList />} />
              <Route path="/user/edit/:id" element={<UserEdit />} />
              <Route path="/user/view/:id" element={<UserView />} />
              
              <Route path="/admin" element={<AdminList />} />
              <Route path="/admin/add" element={<AdminAdd />} />
              <Route path="/admin/edit/:id" element={<AdminEdit />} />
              <Route path="/admin/view/:id" element={<AdminView />} />

              <Route path="/admin-role" element={<AdminRoleList />} />
              <Route path="/admin-role/add" element={<AdminRoleAdd />} />
              <Route path="/admin-role/edit/:id" element={<AdminRoleEdit />} />

              <Route path="/stock/:status" element={<StockList />} />
              <Route path="/stock/:status/edit/:id" element={<StockEdit />} />
              <Route path="/stock/:status/view/:id" element={<StockView />} />

              {/* content */}
     

              <Route path="/page" element={<PageList />} />
              <Route path="/page/add" element={<PageAdd />} />
              <Route path="/page/edit/:id" element={<PageEdit />} />
              {/* <Route path="/page/edit/:id" element={<AdminEdit />} />
              <Route path="/page/view/:id" element={<AdminView />} /> */}

          </Route>
      </Route>
    

     
    </Routes>
    </>
  )
   
}

export default App
