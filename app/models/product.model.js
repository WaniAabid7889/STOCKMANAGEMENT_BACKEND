const connection = require('../config/db.connect.js');

async function getProduct(){
    try{
        const result = await connection.query(`
        SELECT prod.*, cat.name AS category_name  from products prod inner join product_category cat on prod.category_id = cat.id
        `);
        return result.rows;
    }catch(error){
        throw error;
    }
}

async function getProductById(productId){
    try {
        const query = `
            SELECT p.*, pc.name AS category_name 
            FROM products p
            INNER JOIN product_category pc ON p.category_id = pc.id
            WHERE p.id = $1
        `;
        const result = await connection.query(query, [productId]);
        console.log(result.rows[0]);
        return result.rows; 
    } catch (error) {
        throw error;
    }
}


async function addProduct(product){
    try{
        const result = await connection.query(`INSERT INTO public.products (name, category_id, description ,status, total_buy_quantity, total_issue_quantity) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
        [product.name, product.category_id,product.description,product.status,product.total_buy_quantity,product.total_issue_quantity]);
        return result.rows;
    }catch(error){
        throw error;
    }
}

async function updateProductStock(id, product){
    console.log('Updating productStock', id, product)
    try{
        const result = await connection.query(`UPDATE public.products SET total_buy_quantity=$1, total_issue_quantity=$2 WHERE id=$3 RETURNING *`,
        [product.total_buy_quantity, product.total_issue_quantity, id]);
        return result.rows;
    }catch(error){
        throw error;
    }
}

async function updateProduct(id, product){
    console.log('product data',id,product)
    try{
        const result = await connection.query(`UPDATE public.products SET name=$1, category_id=$2, description=$3, status=$4, total_buy_quantity=$5, total_issue_quantity=$6 WHERE id=$7 RETURNING *`,
        [product.name, product.category_id,product.description,product.status,product.total_buy_quantity,product.total_issue_quantity, id]);
        return result.rows;
    }catch(error){
        throw error;
    }
}

async function deleteProduct(id){
    try{
        const result = await connection.query(`DELETE FROM public.products WHERE id=$1 RETURNING *`, [id]);
        return result.rows;
    }catch(error){
        throw error;
    }
}

module.exports = {
    getProduct,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    updateProductStock,
}