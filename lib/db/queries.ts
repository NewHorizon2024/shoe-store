export const insertUserQuery = `
    INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
  `;

export const getAllProducts = `SELECT * FROM public.products ORDER BY id ASC`;
