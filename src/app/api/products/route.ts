import * as Yup from 'yup'
import { Product, User } from "@prisma/client";
import ProductRepository from "@/backend/repositories/productRepository";
import UserRepository from "@/backend/repositories/userRepository";

const productSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório").min(3, "Este nome é muito curto"),
  description: Yup.string().required("Descrição é obrigatória"),
  price: Yup.number().required("Preço é obrigatório").positive("O preço deve ser um valor positivo"),
  stock: Yup.number().required("Quantidade do estoque é obrigatória").positive("O estoque deve ser um valor positivo")
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userToExclude = parseInt(searchParams.get("excludeUser") ?? "")
  const userToSearch = parseInt(searchParams.get("fromUser") ?? "")
  let products: Product[] = []
  
  if (userToExclude) {
    products = await ProductRepository.findAll({
      where: { NOT: { userId: userToExclude } } 
    }) 
  } else if (userToSearch) {
    products = await ProductRepository.findAll({
      where: { userId: userToSearch }
    })
  } else {
    products = await ProductRepository.findAll()
  }

  const promises = products.map(async (item: Product) => {
    const user: User = await UserRepository.findOneById(item.userId)
    return {
      ...item,
      userEmail: user.email
    }
  })

  const result = await Promise.all(promises)
  return Response.json({"products": result})
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    await productSchema.validate(body, { abortEarly: false })

    const { name, description, price, stock } = body
    const user: User = await UserRepository.findOneById(1)

    const product: Product = await ProductRepository.createOne({
      name: name,
      description: description,
      price: parseFloat(price),
      stock: parseInt(stock),
      userId: user.id
    })
  
    return Response.json(product)

  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const validationErrors = error.inner.map(err => ({ field: err.path, message: err.message }))
      return Response.json({ errors: validationErrors }, { status: 400 })
    }
    return Response.json({ error: "Erro ao cadastrar o produto" }, { status: 500 })
  }
}
