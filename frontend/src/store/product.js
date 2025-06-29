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
    },
    fetchProducts: async() =>{
        const res= await fetch("/api/products");
        const received= await res.json();
        //console.log("data", received);
        set({products:received.data})
    },
    deleteProduct: async(pid) =>{
        //console.log("Deleting product, URL:", `/api/products/${pid}`);
        const res= await fetch(`/api/products/${pid}`,{
            method:"DELETE",
        });
        const data= await res.json();
        //console.log(data);
        if(data.success==false) return{success: false, message:data.message};
        set(state=>({products: state.products.filter(product=>product._id!=pid)}));
        return{success: true, message:"Product has been deleted."}
    },
    updateProduct: async(pid, updatedProduct)=>{
        const res=await fetch(`/api/products/${pid}`,{
            method: "PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data=await res.json();
        if(!data.success) return{success:false, message:data.message};
        set(state=>({
            products: state.products.map(product=> product._id ==pid?data.data : product)
        }));
        return {success:true, message: "Updated successfully!"};
    },  
}));

// const [state, setState]