import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async(newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.category || !newProduct.seller_id){
            return {success: false, message: "Please provide all the details"};
        }
        const res= await fetch("/api/products",{
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(newProduct),    
        })

        const data= await res.json();
        //console.log(data);
        
        set((state) => ({products:[...state.products, data]}));
        return{success:true, message:"Product created successfully"};
    }
}))

// const [state, setState]