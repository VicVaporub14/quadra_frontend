import { useForm } from "react-hook-form"
import { BranchFormData } from "../../../types"
import ErrorMessage from "../../../components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { createBranch } from "../../../api/BranchesAPI"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export default function AdminBranchesCreateView() {

    const navigate = useNavigate()

    const initialValues : BranchFormData = {
        nombre: '',
        direccion: '',
        telefono: ''
    }

    const { register, handleSubmit, formState: {errors} } = useForm({ defaultValues: initialValues})

    const { mutate } = useMutation({
        mutationFn: createBranch,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (response) => {
            toast.success(response)
            navigate('/admin/branches')
        }
    })

    const handleRegister = (data: BranchFormData) => mutate(data)

    return (
        <>
            <div className=" max-w-2xl mx-auto p-10">
                <h2 className="text-2xl font-bold mb-8 text-gray-700">Dar de alta Nueva Sucursal</h2>
                <div className="bg-white p-6 rounded-lg">
                    <form 
                        className="w-full"
                        noValidate
                        onSubmit={handleSubmit(handleRegister)}
                    >

                        <div className="mb-4">
                            <label 
                                className="block text-gray-700 mb-2" 
                                htmlFor="nombre"
                            >Nombre</label>

                            <input
                                id="nombre"
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                                placeholder="Ingrese su nombre"
                                {...register("nombre", {
                                    required: "El nombre de la sucursal es obligatorio",
                                })}
                            />
                            {errors.nombre && (
                                <ErrorMessage>{errors.nombre.message}</ErrorMessage>
                            )}
                        </div>

                        <div className="mb-4">
                            <label 
                                className="block text-gray-700 mb-2" 
                                htmlFor="direccion"
                            >Direccion</label>

                            <input
                                id="direccion"
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                                placeholder="Ej: Av. Tecnologico 1414 Col. Castilagua Lerdo"
                                {...register("direccion", {
                                    required: "La direccion es obligatoria"
                                })}
                            />
                            {errors.direccion && (
                                <ErrorMessage>{errors.direccion.message}</ErrorMessage>
                            )}
                        </div>

                        <div className="mb-4">
                            <label 
                                className="block text-gray-700 mb-2" 
                                htmlFor="telefono"
                            >Telefono</label>

                            <input
                                id="telefono"
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                                placeholder="Ej: 8717998877"
                                {...register("telefono", {
                                    required: "El telefono es obligatorio"
                                })}
                            />
                            {errors.telefono && (
                                <ErrorMessage>{errors.telefono.message}</ErrorMessage>
                            )}
                        </div>

                        <button 
                            type="submit"
                            className="relative group w-full text-white font-bold py-3 rounded-lg overflow-hidden mt-6"
                        >
                            {/* Capa de fondo inicial */}
                            <div className="absolute inset-0 bg-gradient-to-l from-blue-400 to-blue-500 transition-opacity duration-1000 group-hover:opacity-0"></div>
                            {/* Capa de fondo para el hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 transition-opacity duration-1000 group-hover:opacity-100"></div>
                            {/* Contenido del botón */}
                            <span className="relative z-10">Crear Sucursal</span>
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
