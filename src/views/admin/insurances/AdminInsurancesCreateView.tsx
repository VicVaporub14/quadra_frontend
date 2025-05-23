import { useForm } from "react-hook-form"
import { InsuranceFormData } from "../../../types"
import ErrorMessage from "../../../components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { createInsurance } from "../../../api/InsurancesAPI"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export default function AdminInsuranceCreateView() {

    const navigate = useNavigate()

    const initialValues : InsuranceFormData = {
        tipo: '',
        cobertura: '',
        precio: 0,
        descripcion: ''
    }

    const { register, handleSubmit, formState: {errors} } = useForm({ defaultValues: initialValues})

    const { mutate } = useMutation({
        mutationFn: createInsurance,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (response) => {
            toast.success(response)
            navigate('/admin/insurances')
        }
    })

    const handleRegister = (data: InsuranceFormData) => {
        // Convertir el precio de string a number
        const formattedData = {
            ...data,
            precio: Number(data.precio),
        };
        mutate(formattedData);
    }

    return (
        <>
            <div className=" max-w-2xl mx-auto p-10">
                <h2 className="text-2xl font-bold mb-8 text-gray-700">Crear un Nuevo Seguro</h2>
                <div className="bg-white p-6 rounded-lg">
                    <form 
                        className="w-full"
                        noValidate
                        onSubmit={handleSubmit(handleRegister)}
                    >

                        <div className="mb-4">
                            <label 
                                className="block text-gray-700 mb-2" 
                                htmlFor="tipo"
                            >Tipo</label>

                            <input
                                id="tipo"
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                                placeholder="Ej: Basico o Premium"
                                {...register("tipo", {
                                    required: "El Tipo de Seguro es obligatorio",
                                })}
                            />
                            {errors.tipo && (
                                <ErrorMessage>{errors.tipo.message}</ErrorMessage>
                            )}
                        </div>

                        <div className="mb-4">
                            <label 
                                className="block text-gray-700 mb-2" 
                                htmlFor="cobertura"
                            >Cobertura</label>

                            <input
                                id="cobertura"
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                                placeholder="Ej: Total o de Terceros"
                                {...register("cobertura", {
                                    required: "La Cobertura es obligatoria"
                                })}
                            />
                            {errors.cobertura && (
                                <ErrorMessage>{errors.cobertura.message}</ErrorMessage>
                            )}
                        </div>

                        <div className="mb-4">
                            <label 
                                className="block text-gray-700 mb-2" 
                                htmlFor="precio"
                            >Precio</label>

                            <input
                                id="precio"
                                type="number"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                                placeholder="Ej: 4500"
                                {...register("precio", {
                                    required: "El precio es obligatorio"
                                })}
                            />
                            {errors.precio && (
                                <ErrorMessage>{errors.precio.message}</ErrorMessage>
                            )}
                        </div>

                        <div className="mb-4">
                            <label 
                                className="block text-gray-700 mb-2" 
                                htmlFor="descripcion"
                            >Descripcion</label>

                            <textarea
                                id="descripcion"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                                {...register("descripcion", {
                                    required: "La descripcion es obligatoria"
                                })}
                            />
                            {errors.descripcion && (
                                <ErrorMessage>{errors.descripcion.message}</ErrorMessage>
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
                            <span className="relative z-10">Crear Seguro</span>
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
