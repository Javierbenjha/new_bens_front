import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login-fashion.jpg";

// Validaciones
const loginSchema = z.object({
    email: z.string().email({ message: "Ingresa un email válido." }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

export const LoginForm = () => {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof loginSchema>) {
        // Aquí iría el llamado a tu api.post('/auth/login', values)
        console.log("Valores enviados", values);
        // Simular un login exitoso
        localStorage.setItem("erp_token", "fake_token");
        navigate("/admin");
    }

    return (
        <div className="w-full lg:grid lg:grid-cols-2 h-screen flex-col">
            <div className="flex items-center justify-center bg-gray-50 px-4 py-12 h-full">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Bienvenido/a !!</CardTitle>
                        <CardDescription className="text-center">
                            Ingresa tus credenciales para continuar.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Correo Electrónico</FormLabel>
                                            <FormControl>
                                                <Input placeholder="usuario@empresa.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contraseña</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="********" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">
                                    Iniciar Sesión
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            <div className="relative hidden bg-background lg:block h-full p-2.5">
                <img
                    src={loginImage}
                    alt="Imagen de login"
                    className="h-full w-full object-cover rounded-2xl dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
};
