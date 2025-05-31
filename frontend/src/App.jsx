 
import { createBrowserRouter } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import './index.css'
import Login from './components/auth/Login.jsx'
import Signup from './components/auth/Signup.jsx'
import { RouterProvider } from 'react-router'
import Home  from './components/Home.jsx'
import Scholarships from './components/Scholarships'
import Browse from './components/Browse'
import Profile from './components/Profile'
import ScholarshipDescription from './components/ScholarshipDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import Adminscholarships from './components/admin/Adminscholarships'
import Postscholarship from './components/admin/Postscholarship'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
const appRouter =createBrowserRouter([{
  path:'/',
  element:<Home/>
},{
  path:'/login',
  element:<Login/>
},{
  path:'/signup',
  element:<Signup/>
},{
  path:'/scholarships',
  element:<Scholarships/>
},
{
  path:'/description/:id',
  element:<ScholarshipDescription/>
},
{
  path:'/browse',
  element:<Browse/>
},{
  path:'/profile',
  element:<Profile/>
},
// for admin
{
    path:'admin/companies',
    element:<ProtectedRoute><Companies/></ProtectedRoute>
},
{
  path:'/admin/comapanies/create',
  element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
},{
  path:'/admin/comapanies/:id',
  element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
},{
  path:'/admin/scholarships',
  element:<ProtectedRoute><Adminscholarships/></ProtectedRoute>
},{
  path:'/admin/scholarships/create',
  element:<ProtectedRoute><Postscholarship/></ProtectedRoute>
},{
   path:'/admin/scholarships/:id/applicants',
   element:<ProtectedRoute><Applicants/></ProtectedRoute>
},
])
function App() { 
  return ( 
    <> 
    <div>
        <RouterProvider router={appRouter}/>
    </div> 
    </> 
 
  )
}

export default App
