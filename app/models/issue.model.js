const connection = require('../config/db.connect.js');

async function getIssue(){
    try{
        const result = await connection.query(`
            Select i.*, u.name As user_name ,p.name As product_name , b.name As branch_name from issues i 
			inner join users u on i.user_id = u.id
			inner join products p on i.product_id = p.id
			inner join branches b on i.branch_id = b.id
        `);
        return result.rows;
    }catch(error){
        throw error;
    }
};

async function getIssueById(id) {
    try {
        const result = await connection.query(`
            SELECT 
                i.*, 
                i.issue_date AS issue_date,
                u.name AS user_name,
                p.name AS product_name,
                b.name AS branch_name 
            FROM 
                issues i
            INNER JOIN 
                users u ON i.user_id = u.id
            INNER JOIN 
                products p ON i.product_id = p.id
            INNER JOIN 
                branches b ON i.branch_id = b.id 
            WHERE 
                i.id = $1`, [id]);
        return result.rows;
    } catch (error) {
        throw error;
    }
}



async function addIssue(issue){
    
    try{
        const result = await connection.query(`INSERT INTO public.issues(user_id, product_id,quantity, issue_date,status, description, branch_id) VALUES($1, $2, $3, $4, $5, $6,$7)`,
         [issue.user_id, issue.product_id, issue.quantity, issue.issue_date,issue.status, issue.description, issue.branch_id]);
        return result.rows;
    }catch(err) {
        throw err;
    }
};

async function removeIssue(){
    try{
        const result = await connection.query(`DELETE FROM public.issues`);
        return result.rows;
    }catch(error){
        throw error;
    }
};

async function updateIssue(id, issue){
    try{
        const result = await connection.query(`UPDATE public.issues SET user_id=$1, product_id=$2,quantity=$3, issue_date=$4,status=$5, description=$6, branch_id=$7 WHERE id=$8 RETURNING *`,
         [issue.user_id, issue.product_id, issue.quantity, issue.issue_date,issue.status, issue.description, issue.branch_id, id]);
        return result.rows;
    }catch(error){
        throw error;
    }
};

async function updateIssueQuantity(id,issue){
    try{
        const result = await connection.query(`UPDATE public.issues SET quantity=$1 WHERE id=$2 RETURNING *`,
         [issue.quantity, id]);
        return result.rows;
    }catch(error){
        throw error;
    }
}


module.exports = {
    getIssue,
    getIssueById,
    addIssue,
    removeIssue,
    updateIssue,
    updateIssueQuantity,
};