import { Request, Response } from 'express';
const availableRoutes = `
'/products/list': show available products.
'/products/list/id': show the product you want by typing the product id.
'/products/update/id': to update a product with its corresponding id.
'/products/save': to save a product.
'/products/delete/id': to delete a product with its id.

'/cart/list': to list the products in the cart.
'/cart/list/id': to show a product in the cart by its id.
'/cart/delete/id': to delete a product from the cart by typing its id.
'/cart/add/id': to add a product to the cart with its id.`;

const unknownRoute = (req: Request, res: Response) => {
    res.status(404).json({
        message: `The route doesn't exist, please try the followings: ${availableRoutes} `,
    });
};

export default unknownRoute;
