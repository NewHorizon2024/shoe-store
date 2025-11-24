export const insertUserQuery = `
    INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
  `;

export const getAllProducts = `SELECT * FROM public.products ORDER BY id ASC`;

export const getProductDetails = `SELECT *
FROM products
WHERE LOWER(title) = LOWER($1)
`;

export const getUserCart = `SELECT id FROM carts WHERE user_id = $1`;

export const createUserCart = `INSERT INTO carts (user_id, created_at, updated_at)
VALUES ($1, NOW(), NOW())
RETURNING id;
`;

export const getProductFromCartItems = `
SELECT id, quantity 
FROM cart_items 
WHERE cart_id = $1 AND product_id = $2;
`;

export const updateUSerCartItems = `INSERT INTO cart_items (cart_id, product_id, quantity)
VALUES ($1, $2, $3)
RETURNING *;
`;

export const updateProductQuantity_ADD = `UPDATE cart_items
SET quantity = quantity + 1
WHERE cart_id = $1 AND product_id = $2;
`;

export const updateProductQuantity_SUB = `UPDATE cart_items
SET quantity = quantity - 1
WHERE cart_id = $1 AND product_id = $2;
`;

export const getUserCartItems = `
SELECT * FROM public.cart_items
WHERE cart_id = $1;
`;

export const getProductDetailsFromItems = `
SELECT id, quantity, image_url, title, price 
FROM products 
WHERE id = $1;
`;

export const deleteProduct = `
DELETE FROM public.cart_items
WHERE product_id = $1;
`;

export const getcartProductsIs = `
SELECT *
FROM public.products
WHERE id = ANY($1::int[]);
`;
