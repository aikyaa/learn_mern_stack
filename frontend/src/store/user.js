import { create } from "zustand";

export const useUserData = create((set) => ({
    users: [],
    setUsers: (users) => set({users}),
    createUser: async(newUser) => {
        if (!newUser.name || !newUser.email || !newUser.password){
            return {success: false, message: "Please provide all the details"};
        }
        const res= await fetch("/api/register",{
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(newUser),    
        })

        const data= await res.json();
        //console.log(data);
        
        if (!data.success) {
            return { success: false, message: data.message };
        }

        set((state) => ({users:[...state.users, data]}));
        return{success:true, message:"Account created successfully"};
    }, 

    checkCredentials: async(newUser) => {
        if (!newUser.password || !newUser.email){
            return {success: false, message: "Please provide all the details"};
        }
        const res= await fetch("/api/login",{
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(newUser),    
        })

        const data= await res.json();
        console.log(data);
        if (!data.success) {
            return { success: false, message: data.message };
        }

        localStorage.setItem("token", data.token);
        
        return{success:true, message:"Login Sucessful"};
    }, 
}));

// const [state, setState]