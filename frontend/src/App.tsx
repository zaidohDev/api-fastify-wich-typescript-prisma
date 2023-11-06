import { FiTrash } from 'react-icons/fi'
import { api } from './services/api'
import { FormEvent, useEffect, useRef, useState } from 'react'


interface Customer {
  id: string
  name: string
  email: string
  status: string
  created_at: string
}

function App() {

  
  const [customers, setCustomer] = useState<Customer []> ([])
  const nameRef = useRef<HTMLInputElement | null >(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  useEffect(()=>{
    loadCustomer()
  }, [])

  async function loadCustomer() {
    const response = await api.get("/customers")
    setCustomer(response.data)
  }
 
 async function removeCustomer(id: string) {
  if (confirm("Deseja deletar?") != true){return }    
  try { 
    await api.delete("/customer", {
      params: {
        id: id,
      }
    })

    setCustomer(customers.filter(customer => customer.id !== id ))

   } catch (error) {
    console.log(error)
   }
 }

  async function createCustomer(e: FormEvent) {
    e.preventDefault() 
  
    if (!nameRef.current?.value || !emailRef.current?.value) {
      return
    }
    
    const res = await api.post("/customer", {
      name: nameRef.current?.value,
      email: emailRef.current?.value
    }) 

    setCustomer(allCustomers => [...allCustomers, res.data])
    
    nameRef.current.value = "" 
    emailRef.current.value = ""
  }

  return (
    <>
    <div className="flex justify-center px-4 w-full min-h-screen bg-slate-900">
    
    <main className="my-10 w-full md:max-w-2xl ">
      <h1 className="text-4xl font-medium text-yellow-50">Clientes</h1>
    <form onSubmit={createCustomer}  className="flex flex-col my-6">
      <label className="text-white">Nome:</label>
      <input 
        type="text" 
        placeholder="Informe seu nome..."
        className="w-full p-2 mb-5 rounded"
        ref={nameRef}
        />

    <label className="text-white">Email:</label>
      <input 
        type="email" 
        placeholder="Informe seu e-mail..."
        className="w-full p-2 mb-5 rounded"
        ref={emailRef}
        />

      <input type="submit" value="Cadastrar" className="w-full cursor-pointer bg-cyan-400 font-medium rounded p-2" />
    </form>
    <section className="flex flex-col gap-4">
     { customers.map( (customer) => (
       <article 
       key={customer.id}
        className="w-full bg-slate-50 rounded p-2 relative hover:scale-105 duration-200">
       <p><span className="font-bold mr-1">Nome:</span>{customer.name}</p>
       <p><span className="font-bold mr-1">Email:</span>{customer.email}</p>
       <p><span className="font-bold mr-1">Status:</span>{customer.status ? "Ativo": "Inativo"}</p>
       <button
        onClick={ () => removeCustomer(customer.id) } 
        className="bg-red-600 absolute w-7 h-7 rounded-lg right-0 -top-2 flex items-center justify-center"

        >
       <FiTrash size={18} color="#fff" />  
       </button>
     </article>
     ) )}
    </section>
    </main>
    </div> 
    </>
  )
}

export default App
