export interface ApiParams {
    page: number,
    search?: string,
    limit?: number,
    order?: 'asc' | 'desc',
    orderBy?: string,
    minPrice?: number,
    maxPrice?: number,
    isNew?: boolean,
    stock?: number
}
