const connection = require('../config/db.connect.js');

async function getOrderLineItem() {
    try {
        const result = await connection.query('SELECT * FROM public.order_line_item');
        return result.rows;
    } catch (error) {
        throw error;
    }
}

async function getOrderLineItemById(id) {
   console.log('getOrderLineItemById', id);
    try {
        const result = await connection.query(`SELECT order_line_item.*, order_line_item.id As orderLineItem_id, orders.*, products.name AS product_name
            FROM public.order_line_item
            INNER JOIN public.orders ON order_line_item.order_id = orders.id
            INNER JOIN public.products ON order_line_item.product_id = products.id
            WHERE order_line_item.order_id = $1`, [id]);
        console.log('getOrderLineItemById', result.rows);
        return result.rows;
    } catch (error) {
        throw error;
    }
}



async function addOrderLineItems(orderLineItems) {

    const client = await connection.connect();
    try {
        await client.query('BEGIN');
        const qry = 'INSERT INTO public.order_line_item (product_id, price, quantity) VALUES ($1, $2, $3) RETURNING *';
        const resultRows = [];
        for (const item of orderLineItems) {
            const values = [item.product_id, item.price, item.quantity];
            const result = await client.query(qry, values);
            resultRows.push(result.rows[0]);
        }
        await client.query('COMMIT');
        return resultRows;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}



async function updateOrderLineItemQuantity(id, orderLineItem) {
    const isArray = Array.isArray(orderLineItem);
    const item = isArray ? orderLineItem[0] : orderLineItem;
    console.log('update order line item ', id, item);
    try {
        const result = await connection.query(
            'UPDATE public.order_line_item SET quantity=$1 WHERE id=$2 RETURNING *',
            [item.quantity, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating order line item:', error);
        throw error;
    }
}


async function updateOrderLineItem(id, orderLineItem) {
    const isArray = Array.isArray(orderLineItem);
    const item = isArray ? orderLineItem[0] : orderLineItem;
    console.log('update order line item ', id, item);

    try {
        const result = await connection.query(
            'UPDATE public.order_line_item SET order_id=$1, product_id=$2, price=$3, quantity=$4 WHERE id=$5 RETURNING *',
            [item.order_id, item.product_id, item.price, item.quantity, id]
        );
        console.log('update order line item', result.rowCount, result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error updating order line item:', error);
        throw error;
    }
}


async function deleteOrderLineItem(id) {
    try {
        const result = await connection.query('DELETE FROM public.order_line_item WHERE id=$1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getOrderLineItem,
    getOrderLineItemById,
    updateOrderLineItemQuantity,
    addOrderLineItems,
    updateOrderLineItem,
    deleteOrderLineItem,
};
