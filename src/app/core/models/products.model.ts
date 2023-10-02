export interface Product {
    _id?: number,
    name: string,
    description: string,
    price: number,
    sku: string,
    image: string,
    stock: number,
    status?: boolean,
    isProductNew: boolean,
    creationDate?: string
    productsStock?: ProductStock[];
    tags?: string[]
}

export interface ProductStock {
    _id?: number,
    price: number,
    stock: number,
    status: boolean,
    creationDate: string
}

export interface ProductResponse {
    status: boolean,
    product?: Product,
    products?: Product[],
    result?: any,
}