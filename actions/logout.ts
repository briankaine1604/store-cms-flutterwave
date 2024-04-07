'use server'

import { signOut } from "@/auth";



const Logout = async() => {
   //some server stuff
   await signOut()
}
 
export default Logout;